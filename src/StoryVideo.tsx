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

const RemotionImg = Img as React.ComponentType<any>;
const RemotionAudio = Audio as React.ComponentType<any>;

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

const SceneVisual: React.FC<{
  scene: Scene;
  durationInFrames: number;
  variant: number;
}> = ({ scene, durationInFrames, variant }) => {
  const frame = useCurrentFrame();
  const clampedFrame = Math.min(frame, durationInFrames);
  const effectCycle = [
    'slowZoom',
    'panLeft',
    'panRight',
    'kenBurns',
    'zoomOut',
    'panRight',
    'panLeft',
    'slowZoom',
  ] as const;
  const effectType = effectCycle[variant % effectCycle.length];
  const frameRange = [0, Math.max(1, durationInFrames)];

  let scale = 1;
  let translateX = 0;
  let translateY = 0;
  let transformOrigin = '50% 50%';

  switch (effectType) {
    case 'slowZoom':
      scale = interpolate(clampedFrame, frameRange, [1.03, 1.13], {
        extrapolateRight: 'clamp',
      });
      transformOrigin = variant % 2 === 0 ? '52% 50%' : '48% 52%';
      break;
    case 'panLeft':
      scale = 1.12;
      translateX = interpolate(clampedFrame, frameRange, [38, -38], {
        extrapolateRight: 'clamp',
      });
      transformOrigin = '50% 50%';
      break;
    case 'panRight':
      scale = 1.12;
      translateX = interpolate(clampedFrame, frameRange, [-38, 38], {
        extrapolateRight: 'clamp',
      });
      transformOrigin = '50% 50%';
      break;
    case 'kenBurns':
      scale = interpolate(clampedFrame, frameRange, [1.03, 1.16], {
        extrapolateRight: 'clamp',
      });
      translateX = interpolate(clampedFrame, frameRange, [0, 24], {
        extrapolateRight: 'clamp',
      });
      translateY = interpolate(clampedFrame, frameRange, [0, 12], {
        extrapolateRight: 'clamp',
      });
      transformOrigin = '48% 50%';
      break;
    case 'zoomOut':
      scale = interpolate(clampedFrame, frameRange, [1.16, 1.04], {
        extrapolateRight: 'clamp',
      });
      transformOrigin = '50% 52%';
      break;
  }

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
      <RemotionImg
        src={staticFile(scene.image)}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transformOrigin,
          transform: `scale(${scale}) translate(${translateX}px, ${translateY}px)`,
          willChange: 'transform',
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

type VisualGroup = {
  key: string;
  scene: Scene;
  start: number;
  durationInFrames: number;
  variant: number;
};

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

  const visualGroups = useMemo<VisualGroup[]>(() => {
    const groups: VisualGroup[] = [];
    let cursor = 0;

    for (const scene of scenes) {
      const duration = scene.durationInFrames ?? 90;
      const mediaKey = scene.video
        ? `video:${scene.video}`
        : scene.image
          ? `image:${scene.image}`
          : 'fallback';
      const previous = groups[groups.length - 1];

      if (previous?.key === mediaKey) {
        previous.durationInFrames += duration;
      } else {
        groups.push({
          key: mediaKey,
          scene,
          start: cursor,
          durationInFrames: duration,
          variant: groups.length,
        });
      }

      cursor += duration;
    }

    return groups;
  }, [scenes]);

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
      {visualGroups.map((group) => (
        <Sequence
          key={`${group.key}-${group.start}`}
          from={group.start}
          durationInFrames={group.durationInFrames}
        >
          <SceneVisual
            scene={group.scene}
            durationInFrames={group.durationInFrames}
            variant={group.variant}
          />
        </Sequence>
      ))}
      <AbsoluteFill
        style={{
          background:
            'linear-gradient(180deg, rgba(0,0,0,0.12), rgba(0,0,0,0.46))',
        }}
      />
      {scenes.map((scene, index) => (
        <Sequence
          key={scene.id}
          from={starts[index]}
          durationInFrames={scene.durationInFrames ?? 90}
        >
          <AbsoluteFill>
            {scene.audio ? <RemotionAudio src={staticFile(scene.audio)} /> : null}
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
