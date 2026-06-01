import React from 'react';
import { Composition, staticFile } from 'remotion';
import { StoryVideo, storyVideoSchema } from './StoryVideo';

const FPS = 30;
const DEFAULT_DURATION = 30 * FPS;

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="StoryVideo"
      component={StoryVideo}
      durationInFrames={DEFAULT_DURATION}
      fps={FPS}
      width={1920}
      height={1080}
      schema={storyVideoSchema}
      defaultProps={{
        manifestPath: 'assets/sample-story/manifest.sample.json',
        subtitleBottom: 82,
        subtitleFontSize: 58,
      }}
      calculateMetadata={async ({ props }) => {
        try {
          const response = await fetch(staticFile(props.manifestPath));
          if (!response.ok) {
            return { durationInFrames: DEFAULT_DURATION };
          }
          const manifest = await response.json();
          const total = manifest.reduce(
            (sum: number, item: { durationInFrames?: number }) =>
              sum + (item.durationInFrames ?? 90),
            0,
          );
          return { durationInFrames: Math.max(total, DEFAULT_DURATION) };
        } catch {
          return { durationInFrames: DEFAULT_DURATION };
        }
      }}
    />
  );
};
