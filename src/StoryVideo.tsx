import React, { useEffect, useMemo, useState } from 'react';
import {
  AbsoluteFill,
  Audio,
  Img,
  OffthreadVideo,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
} from 'remotion';
import { z } from 'zod';

export const storyVideoSchema = z.object({
  manifestPath: z.string(),
  subtitleBottom: z.number(),
  subtitleFontSize: z.number(),
});

type Scene = {
  id: string;
  subtitle: string;
  image?: string;
  audio?: string;
  video?: string;
  durationInFrames: number;
  note?: string;
};

const fallbackScenes: Scene[] = [
  {
    id: 'sample_001',
    subtitle: 'ここに、最初のシーンの字幕が入ります。',
    image: 'assets/sample-story/images/sample-kitchen.svg',
    durationInFrames: 120,
  },
  {
    id: 'sample_002',
    subtitle: '台本、画像、音声を差し替えて使います。',
    image: 'assets/sample-story/images/sample-kitchen.svg',
    durationInFrames: 120,
  },
];

const SceneVisual: React.FC<{ scene: Scene }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [0, scene.durationInFrames], [1.02, 1.08], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  if (scene.video) {
    return (
      <OffthreadVideo
        src={staticFile(scene.video)}
        muted
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    );
  }

  if (scene.image) {
    return (
      <Img
        src={staticFile(scene.image)}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transform: `scale(${scale})`,
        }}
      />
    );
  }

  return (
    <AbsoluteFill
      style={{
        background:
          'linear-gradient(135deg, #f3ecdc 0%, #d2dfda 45%, #20242c 100%)',
      }}
    />
  );
};

const SubtitleCard: React.FC<{
  text: string;
  bottom: number;
  fontSize: number;
}> = ({ text, bottom, fontSize }) => (
  <div
    style={{
      position: 'absolute',
      left: 170,
      right: 170,
      bottom,
      color: 'white',
      fontSize,
      lineHeight: 1.35,
      fontWeight: 800,
      textAlign: 'center',
      textShadow:
        '0 4px 8px rgba(0,0,0,0.72), 0 0 3px rgba(0,0,0,0.95)',
      whiteSpace: 'pre-wrap',
      letterSpacing: 0,
    }}
  >
    {text}
  </div>
);

export const StoryVideo: React.FC<z.infer<typeof storyVideoSchema>> = ({
  manifestPath,
  subtitleBottom,
  subtitleFontSize,
}) => {
  const [scenes, setScenes] = useState<Scene[]>(fallbackScenes);

  useEffect(() => {
    fetch(staticFile(manifestPath))
      .then((response) => (response.ok ? response.json() : fallbackScenes))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setScenes(data);
        }
      })
      .catch(() => setScenes(fallbackScenes));
  }, [manifestPath]);

  const starts = useMemo(() => {
    let cursor = 0;
    return scenes.map((scene) => {
      const start = cursor;
      cursor += scene.durationInFrames ?? 90;
      return start;
    });
  }, [scenes]);

  return (
    <AbsoluteFill style={{ backgroundColor: '#111' }}>
      {scenes.map((scene, index) => (
        <Sequence
          key={scene.id}
          from={starts[index]}
          durationInFrames={scene.durationInFrames ?? 90}
        >
          <AbsoluteFill>
            <SceneVisual scene={scene} />
            <AbsoluteFill
              style={{
                background:
                  'linear-gradient(180deg, rgba(0,0,0,0.12), rgba(0,0,0,0.46))',
              }}
            />
            {scene.audio ? <Audio src={staticFile(scene.audio)} /> : null}
            <SubtitleCard
              text={scene.subtitle}
              bottom={subtitleBottom}
              fontSize={subtitleFontSize}
            />
          </AbsoluteFill>
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
