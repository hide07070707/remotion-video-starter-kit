const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const PORT = Number(process.env.PORT || 3101);
const HOST = '127.0.0.1';
const ROOT = path.resolve(__dirname, '..');
const PUBLIC_DIR = path.join(ROOT, 'public');

const detectStorySlugFromRoot = () => {
  const rootFile = path.join(ROOT, 'src', 'Root.tsx');
  if (!fs.existsSync(rootFile)) return undefined;
  const source = fs.readFileSync(rootFile, 'utf8');
  const match = source.match(/manifestPath:\s*['"]assets\/([^/'"]+)\/(?:manifest|manifest\.sample)\.json['"]/);
  return match?.[1];
};

const storySlug = process.env.STORY_SLUG || detectStorySlugFromRoot() || 'sample-story';
const STORY_DIR = path.join(PUBLIC_DIR, 'assets', storySlug);
const MANIFEST = process.env.MANIFEST_PATH
  ? path.resolve(ROOT, process.env.MANIFEST_PATH)
  : fs.existsSync(path.join(STORY_DIR, 'manifest.json'))
    ? path.join(STORY_DIR, 'manifest.json')
    : path.join(STORY_DIR, 'manifest.sample.json');
const IMAGES_DIR = path.join(STORY_DIR, 'images');
const AUDIO_DIR = path.join(STORY_DIR, 'audio');
const VIDEOS_DIR = path.join(STORY_DIR, 'videos');
const METADATA_DIR = path.join(STORY_DIR, 'metadata');
const SHARED_DIR = path.join(PUBLIC_DIR, 'assets', 'shared');
const STORY_RULES = path.join(METADATA_DIR, 'pronunciation-rules.json');
const SHARED_RULES = path.join(SHARED_DIR, 'pronunciation-rules.json');
const SHARED_RULE_BACKUP_DIR = path.join(SHARED_DIR, 'pronunciation-backups');
const UI = path.join(__dirname, 'template-tools-ui.html');
const MAX_BODY_BYTES = 220 * 1024 * 1024;

fs.mkdirSync(IMAGES_DIR, { recursive: true });
fs.mkdirSync(AUDIO_DIR, { recursive: true });
fs.mkdirSync(VIDEOS_DIR, { recursive: true });
fs.mkdirSync(METADATA_DIR, { recursive: true });
fs.mkdirSync(SHARED_DIR, { recursive: true });
fs.mkdirSync(SHARED_RULE_BACKUP_DIR, { recursive: true });

const send = (res, status, body, type = 'text/plain; charset=utf-8') => {
  res.writeHead(status, { 'Content-Type': type, 'Cache-Control': 'no-store' });
  res.end(body);
};

const json = (res, body, status = 200) => {
  send(res, status, JSON.stringify(body), 'application/json; charset=utf-8');
};

const readJson = (file) => JSON.parse(fs.readFileSync(file, 'utf8'));
const writeJson = (file, data) => fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`);

const ensureRules = (file) => {
  if (!fs.existsSync(file)) {
    writeJson(file, { words: {} });
  }
};

const parseBody = (req) =>
  new Promise((resolve, reject) => {
    let body = '';
    let tooLarge = false;
    req.on('data', (chunk) => {
      if (tooLarge) return;
      body += chunk;
      if (Buffer.byteLength(body, 'utf8') > MAX_BODY_BYTES) {
        tooLarge = true;
        reject(new Error('Request too large'));
        req.destroy();
      }
    });
    req.on('end', () => {
      if (tooLarge) return;
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (error) {
        reject(error);
      }
    });
  });

const mime = (filePath) => {
  const ext = path.extname(filePath).toLowerCase();
  return {
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.webp': 'image/webp',
    '.mp3': 'audio/mpeg',
    '.wav': 'audio/wav',
    '.mp4': 'video/mp4',
    '.webm': 'video/webm',
    '.mov': 'video/quicktime',
  }[ext] || 'application/octet-stream';
};

const safeName = (name, fallback) => {
  const base = path.basename(String(name || fallback));
  return base.replace(/[^a-zA-Z0-9._-]/g, '_') || fallback;
};

const sceneNumber = (sceneId) => {
  const match = String(sceneId || '').match(/(\d+)$/);
  return match ? Number(match[1]) : NaN;
};

const listFiles = (dir, extensions, prefix) => {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((name) => extensions.test(name))
    .sort()
    .map((name) => `assets/${storySlug}/${prefix}/${name}`);
};

const getMp3DurationSec = (filePath) => {
  const buf = fs.readFileSync(filePath);
  let offset = 0;
  let frames = 0;
  if (buf[0] === 0x49 && buf[1] === 0x44 && buf[2] === 0x33) {
    const id3Size =
      ((buf[6] & 0x7f) << 21) |
      ((buf[7] & 0x7f) << 14) |
      ((buf[8] & 0x7f) << 7) |
      (buf[9] & 0x7f);
    offset = 10 + id3Size;
  }
  while (offset + 4 < buf.length) {
    if (buf[offset] !== 0xff || (buf[offset + 1] & 0xe0) !== 0xe0) {
      offset += 1;
      continue;
    }
    const b1 = buf[offset + 1];
    const b2 = buf[offset + 2];
    const versionBits = (b1 >> 3) & 0x03;
    const layerBits = (b1 >> 1) & 0x03;
    const bitrateBits = (b2 >> 4) & 0x0f;
    const sampleBits = (b2 >> 2) & 0x03;
    const padding = (b2 >> 1) & 0x01;
    if (bitrateBits === 0 || bitrateBits === 15 || sampleBits === 3 || layerBits === 0 || versionBits === 1) {
      offset += 1;
      continue;
    }
    const bitrates = [0, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, 0];
    const bitrate = bitrates[bitrateBits] * 1000;
    const sampleRates = versionBits === 3 ? [44100, 48000, 32000] : [22050, 24000, 16000];
    const sampleRate = sampleRates[sampleBits];
    const frameSize = Math.floor((1152 * bitrate) / 8 / sampleRate) + padding;
    frames += 1;
    offset += frameSize || 1;
  }
  return frames > 0 ? (frames * 1152) / 44100 : 0;
};

const refreshAudioDuration = (manifest, index) => {
  const scene = manifest[index];
  if (!scene?.audio) return false;
  const audioPath = path.join(PUBLIC_DIR, scene.audio.replace(/\//g, path.sep));
  if (!fs.existsSync(audioPath)) return false;
  const seconds = Math.min(Math.max(getMp3DurationSec(audioPath), 0.5), 20);
  scene.durationInFrames = Math.round(seconds * 30);
  scene.note = `audio duration refreshed ${seconds.toFixed(2)}s`;
  return true;
};

const runNode = (args) =>
  new Promise((resolve) => {
    const proc = spawn(process.execPath, args, { cwd: ROOT });
    let output = '';
    proc.stdout.on('data', (chunk) => {
      output += chunk.toString();
    });
    proc.stderr.on('data', (chunk) => {
      output += chunk.toString();
    });
    proc.on('close', (code) => resolve({ code, output }));
  });

const ruleFiles = {
  story: STORY_RULES,
  shared: SHARED_RULES,
};

const readRules = () => {
  ensureRules(STORY_RULES);
  ensureRules(SHARED_RULES);
  return {
    story: readJson(STORY_RULES),
    shared: readJson(SHARED_RULES),
  };
};

const writeRule = (scope, from, to) => {
  const file = ruleFiles[scope] || STORY_RULES;
  ensureRules(file);
  const data = readJson(file);
  data.words = data.words || {};
  data.words[from] = to;
  writeJson(file, data);
};

const updateRule = (scope, oldFrom, from, to) => {
  const file = ruleFiles[scope] || STORY_RULES;
  ensureRules(file);
  const data = readJson(file);
  data.words = data.words || {};
  if (oldFrom && oldFrom !== from) {
    delete data.words[oldFrom];
  }
  data.words[from] = to;
  writeJson(file, data);
};

const deleteRule = (scope, from) => {
  const file = ruleFiles[scope] || STORY_RULES;
  ensureRules(file);
  const data = readJson(file);
  data.words = data.words || {};
  delete data.words[from];
  writeJson(file, data);
};

const normalizeImportedRules = (data) => {
  const words = data?.words || data;
  if (!words || typeof words !== 'object' || Array.isArray(words)) {
    throw new Error('Invalid pronunciation dictionary format.');
  }

  const normalized = {};
  for (const [from, to] of Object.entries(words)) {
    const key = String(from || '').trim();
    const value = String(to || '').trim();
    if (key && value) {
      normalized[key] = value;
    }
  }

  return { words: normalized };
};

const backupSharedRules = () => {
  ensureRules(SHARED_RULES);
  const now = new Date();
  const timestamp = now.toISOString().replace(/[:.]/g, '-');
  const backupName = `shared-pronunciation-rules-before-import-${timestamp}.json`;
  const backupPath = path.join(SHARED_RULE_BACKUP_DIR, backupName);
  fs.copyFileSync(SHARED_RULES, backupPath);
  return path.relative(ROOT, backupPath);
};

const server = http.createServer(async (req, res) => {
  try {
    if (!fs.existsSync(MANIFEST)) {
      json(res, { error: `manifest not found: ${path.relative(ROOT, MANIFEST)}` }, 500);
      return;
    }

    const parsed = new URL(req.url || '/', `http://${HOST}:${PORT}`);
    const pathname = decodeURIComponent(parsed.pathname);

    if (req.method === 'GET' && (pathname === '/' || pathname === '/index.html')) {
      send(res, 200, fs.readFileSync(UI, 'utf8'), 'text/html; charset=utf-8');
      return;
    }

    if (req.method === 'GET' && pathname === '/api/info') {
      json(res, { storySlug, manifest: path.relative(ROOT, MANIFEST) });
      return;
    }

    if (req.method === 'GET' && pathname === '/api/scenes') {
      json(res, readJson(MANIFEST));
      return;
    }

    if (req.method === 'POST' && pathname === '/api/scenes') {
      const manifest = await parseBody(req);
      writeJson(MANIFEST, manifest);
      json(res, { ok: true });
      return;
    }

    if (req.method === 'GET' && pathname === '/api/images') {
      json(res, listFiles(IMAGES_DIR, /\.(png|jpe?g|webp)$/i, 'images'));
      return;
    }

    if (req.method === 'GET' && pathname === '/api/pronunciation-rules') {
      json(res, readRules());
      return;
    }

    if (req.method === 'GET' && pathname === '/api/pronunciation-rules/shared/export') {
      ensureRules(SHARED_RULES);
      const rules = readJson(SHARED_RULES);
      const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
      res.writeHead(200, {
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Disposition': `attachment; filename="shared-pronunciation-rules-${timestamp}.json"`,
        'Cache-Control': 'no-store',
      });
      res.end(`${JSON.stringify(rules, null, 2)}\n`);
      return;
    }

    if (req.method === 'POST' && pathname === '/api/pronunciation-rules/shared/import') {
      const body = await parseBody(req);
      const imported = normalizeImportedRules(body);
      const backupPath = backupSharedRules();
      writeJson(SHARED_RULES, imported);
      json(res, { ok: true, count: Object.keys(imported.words).length, backupPath });
      return;
    }

    if (req.method === 'POST' && pathname === '/api/pronunciation-rule') {
      const { scope, from, to } = await parseBody(req);
      if (!from || !to) {
        json(res, { error: 'from and to are required' }, 400);
        return;
      }
      writeRule(scope === 'shared' ? 'shared' : 'story', from, to);
      const manifest = readJson(MANIFEST);
      const matches = manifest
        .filter((scene) => String(scene.subtitle || '').includes(from))
        .map((scene) => scene.id);
      json(res, { ok: true, matches });
      return;
    }

    if (req.method === 'PUT' && pathname === '/api/pronunciation-rule') {
      const { scope, oldFrom, from, to } = await parseBody(req);
      if (!from || !to) {
        json(res, { error: 'from and to are required' }, 400);
        return;
      }
      updateRule(scope === 'shared' ? 'shared' : 'story', oldFrom || from, from, to);
      const manifest = readJson(MANIFEST);
      const matches = manifest
        .filter((scene) => String(scene.subtitle || '').includes(from))
        .map((scene) => scene.id);
      json(res, { ok: true, matches });
      return;
    }

    if (req.method === 'DELETE' && pathname === '/api/pronunciation-rule') {
      const { scope, from } = await parseBody(req);
      if (!from) {
        json(res, { error: 'from is required' }, 400);
        return;
      }
      deleteRule(scope === 'shared' ? 'shared' : 'story', from);
      json(res, { ok: true });
      return;
    }

    if (req.method === 'GET' && pathname === '/api/pronunciation-matches') {
      const from = parsed.searchParams.get('from') || '';
      const manifest = readJson(MANIFEST);
      const matches = from
        ? manifest
            .filter((scene) => String(scene.subtitle || '').includes(from))
            .map((scene) => ({
              id: scene.id,
              subtitle: scene.subtitle,
              audio: scene.audio,
              image: scene.image,
            }))
        : [];
      json(res, matches);
      return;
    }

    if (req.method === 'GET' && pathname === '/api/videos') {
      json(res, listFiles(VIDEOS_DIR, /\.(mp4|webm|mov)$/i, 'videos'));
      return;
    }

    if (req.method === 'GET' && pathname.startsWith('/asset/')) {
      const rel = pathname.slice('/asset/'.length).replace(/\//g, path.sep);
      const filePath = path.resolve(PUBLIC_DIR, rel);
      if (!filePath.startsWith(PUBLIC_DIR) || !fs.existsSync(filePath)) {
        send(res, 404, 'Not found');
        return;
      }
      res.writeHead(200, { 'Content-Type': mime(filePath), 'Cache-Control': 'no-store' });
      fs.createReadStream(filePath).pipe(res);
      return;
    }

    if (req.method === 'POST' && pathname === '/api/upload-image') {
      const { name, dataUrl } = await parseBody(req);
      const ext = path.extname(name || '').toLowerCase() || '.png';
      const isVideo = /\.(mp4|webm|mov)$/i.test(ext);
      const filename = safeName(name, `uploaded_${Date.now()}${ext}`);
      const base64 = String(dataUrl || '').replace(/^data:[^;]+;base64,/, '');
      const targetDir = isVideo ? VIDEOS_DIR : IMAGES_DIR;
      const targetType = isVideo ? 'videos' : 'images';
      fs.writeFileSync(path.join(targetDir, filename), Buffer.from(base64, 'base64'));
      json(res, { ok: true, path: `assets/${storySlug}/${targetType}/${filename}` });
      return;
    }

    if (req.method === 'POST' && pathname === '/api/assign-image') {
      const { sceneId, image, media, applyToGroup } = await parseBody(req);
      const nextMedia = media || image;
      const manifest = readJson(MANIFEST);
      const target = manifest.find((scene) => scene.id === sceneId);
      if (!target) {
        json(res, { error: 'scene not found' }, 404);
        return;
      }
      const oldMedia = target.video || target.image;
      const useVideo = /\/videos\//.test(nextMedia || '');
      let count = 0;
      for (const scene of manifest) {
        const sceneMedia = scene.video || scene.image;
        if (applyToGroup ? sceneMedia === oldMedia : scene.id === sceneId) {
          if (useVideo) {
            scene.video = nextMedia;
            delete scene.image;
          } else {
            scene.image = nextMedia;
            delete scene.video;
          }
          count += 1;
        }
      }
      writeJson(MANIFEST, manifest);
      json(res, { ok: true, count });
      return;
    }

    if (req.method === 'POST' && pathname === '/api/regenerate-audio') {
      const { sceneId } = await parseBody(req);
      const number = sceneNumber(sceneId);
      if (!Number.isInteger(number)) {
        json(res, { error: 'scene number not found' }, 400);
        return;
      }
      const generated = await runNode(['scripts/generate-elevenlabs-test-audio.js', '--from', String(number), '--to', String(number)]);
      if (generated.code !== 0) {
        json(res, { ok: false, output: generated.output }, 500);
        return;
      }
      const manifest = readJson(MANIFEST);
      const index = number - 1;
      if (manifest[index]) {
        manifest[index].audio = `assets/${storySlug}/audio/scene_${String(number).padStart(3, '0')}.mp3`;
        refreshAudioDuration(manifest, index);
        writeJson(MANIFEST, manifest);
      }
      json(res, { ok: true, output: generated.output });
      return;
    }

    if (req.method === 'POST' && pathname === '/api/regenerate-audio-bulk') {
      const { sceneIds } = await parseBody(req);
      const ids = Array.isArray(sceneIds) ? sceneIds : [];
      const manifest = readJson(MANIFEST);
      const results = [];

      for (const sceneId of ids) {
        const number = sceneNumber(sceneId);
        if (!Number.isInteger(number)) {
          results.push({ sceneId, ok: false, output: 'scene number not found' });
          continue;
        }
        const generated = await runNode([
          'scripts/generate-elevenlabs-test-audio.js',
          '--from',
          String(number),
          '--to',
          String(number),
        ]);
        const index = number - 1;
        if (generated.code === 0 && manifest[index]) {
          manifest[index].audio = `assets/${storySlug}/audio/scene_${String(number).padStart(3, '0')}.mp3`;
          refreshAudioDuration(manifest, index);
        }
        results.push({ sceneId, ok: generated.code === 0, output: generated.output });
      }

      writeJson(MANIFEST, manifest);
      json(res, { ok: results.every((result) => result.ok), results });
      return;
    }

    send(res, 404, 'Not found');
  } catch (error) {
    json(res, { error: String(error.message || error) }, 500);
  }
});

server.listen(PORT, HOST, () => {
  console.log(`Story correction tool: http://${HOST}:${PORT}/`);
  console.log(`Editing manifest: ${path.relative(ROOT, MANIFEST)}`);
});
