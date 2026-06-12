const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const envPath = path.join(rootDir, '.env');
const storySlug = process.env.STORY_SLUG || 'sample-story';
const storyDir = path.join(rootDir, 'public', 'assets', storySlug);
const manifestPath = process.env.MANIFEST_PATH
  ? path.resolve(rootDir, process.env.MANIFEST_PATH)
  : fs.existsSync(path.join(storyDir, 'manifest.json'))
    ? path.join(storyDir, 'manifest.json')
    : path.join(storyDir, 'manifest.sample.json');
const audioDir = path.join(storyDir, 'audio');
const storyRulesPath = path.join(storyDir, 'metadata', 'pronunciation-rules.json');
const sharedRulesPath = path.join(
  rootDir,
  'public',
  'assets',
  'shared',
  'pronunciation-rules.json',
);

const readEnv = () => {
  if (!fs.existsSync(envPath)) {
    return;
  }

  const lines = fs.readFileSync(envPath, 'utf8').split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) {
      continue;
    }

    const index = trimmed.indexOf('=');
    if (index === -1) {
      continue;
    }

    const key = trimmed.slice(0, index).trim();
    const value = trimmed.slice(index + 1).trim();
    if (key && !process.env[key]) {
      process.env[key] = value;
    }
  }
};

const parseArgs = () => {
  const args = process.argv.slice(2);
  const result = { from: 1, to: 3 };

  for (let i = 0; i < args.length; i += 1) {
    if (args[i] === '--from') {
      result.from = Number(args[i + 1]);
      i += 1;
    } else if (args[i] === '--to') {
      result.to = Number(args[i + 1]);
      i += 1;
    }
  }

  if (!Number.isInteger(result.from) || !Number.isInteger(result.to)) {
    throw new Error('--from and --to must be integers.');
  }
  if (result.from < 1 || result.to < result.from) {
    throw new Error('Invalid scene range.');
  }

  return result;
};

const assertConfigured = () => {
  const apiKey = process.env.ELEVENLABS_API_KEY;
  const voiceId = process.env.ELEVENLABS_VOICE_ID;

  if (!apiKey || apiKey === 'your_elevenlabs_api_key_here') {
    throw new Error('ELEVENLABS_API_KEY is not set in .env.');
  }
  if (!voiceId || voiceId === 'your_elevenlabs_voice_id_here') {
    throw new Error('ELEVENLABS_VOICE_ID is not set in .env.');
  }
};

const readRules = (filePath) => {
  if (!fs.existsSync(filePath)) {
    return {};
  }

  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  return data.words || {};
};

const applyPronunciationRules = (text) => {
  const rules = {
    ...readRules(sharedRulesPath),
    ...readRules(storyRulesPath),
  };

  return Object.entries(rules).reduce(
    (result, [from, to]) => result.split(from).join(to),
    text,
  );
};

const generateAudio = async (scene) => {
  const voiceId = process.env.ELEVENLABS_VOICE_ID;
  const modelId = process.env.ELEVENLABS_MODEL_ID || 'eleven_v3';
  const promptTag = process.env.ELEVENLABS_PROMPT_TAG || '';
  const stability = Number(process.env.ELEVENLABS_STABILITY || 0.78);
  const similarityBoost = Number(process.env.ELEVENLABS_SIMILARITY_BOOST || 0.84);
  const style = Number(process.env.ELEVENLABS_STYLE || 0.12);
  const url = new URL(
    `https://api.elevenlabs.io/v1/text-to-speech/${encodeURIComponent(
      voiceId,
    )}`,
  );
  url.searchParams.set('output_format', 'mp3_44100_128');

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'xi-api-key': process.env.ELEVENLABS_API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text: `${promptTag ? `${promptTag} ` : ''}${applyPronunciationRules(scene.subtitle)}`,
      model_id: modelId,
      language_code: 'ja',
      voice_settings: {
        stability,
        similarity_boost: similarityBoost,
        style,
        use_speaker_boost: true,
      },
    }),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(
      `ElevenLabs request failed for ${scene.id}: ${response.status} ${message}`,
    );
  }

  const arrayBuffer = await response.arrayBuffer();
  const sceneNumber = scene.id.match(/\d+$/)?.[0] || scene.id;
  const outputPath = path.join(audioDir, `scene_${sceneNumber}.mp3`);
  fs.writeFileSync(outputPath, Buffer.from(arrayBuffer));
  return outputPath;
};

const main = async () => {
  readEnv();
  assertConfigured();

  const { from, to } = parseArgs();
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  const scenes = manifest.slice(from - 1, to);

  if (scenes.length !== to - from + 1) {
    throw new Error('Requested scene range is outside the manifest.');
  }

  fs.mkdirSync(audioDir, { recursive: true });

  for (const scene of scenes) {
    const outputPath = await generateAudio(scene);
    console.log(`Created ${path.relative(rootDir, outputPath)}`);
  }

  console.log(`Done. Generated ${scenes.length} audio file(s).`);
};

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
