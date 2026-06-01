---
name: handmade-video-direction
description: Plan hand-crafted direction for manifest-driven Remotion/story videos. Use when the user asks for handmade video direction, a list of scenes that deserve extra editing, emotional highlights, visual direction ideas, or asks "新しい物語の manifest から、手作り演出を入れるべきシーン一覧を作って".
---

# Handmade Video Direction

Use this skill to turn a generated, manifest-driven video into a more intentionally edited video. The output should be an editing plan, not immediate code changes, unless the user explicitly asks to implement it.

## Beginner Prompt

Tell users they can ask:

> 新しい物語の manifest から、手作り演出を入れるべきシーン一覧を作って

Then inspect the story manifest and propose scenes where hand-crafted direction would improve the video.

## Inputs To Prefer

Look for these files first:

- `public/assets/<story>/manifest_final.json`
- `public/assets/<story>/scenes.json`
- any chapter plan, script, or handover document the user provides

For Remotion projects, also inspect the active Composition to understand supported fields such as `telop`, `textStyle`, `filter`, `speaker`, `chapterTitle`, `doctorMemo`, and `annotation`.

## Selection Rules

Do not choose every scene with a telop. Pick the scenes where a human editor would naturally make a decision.

Prioritize:

- Opening hook
- First small discomfort or mystery
- First clear physical or emotional abnormality
- Chapter openings
- Flashbacks and memory scenes
- Expert or doctor lines that change the meaning of the story
- Numbers, totals, comparisons, warnings, or visual explanations
- Emotional reversals
- Solution or practical advice scenes
- Viewer reflection questions
- Closing image or final line

As a default, choose about 5-12% of total scenes. For long videos, produce 25-60 candidates and mark a smaller `最優先` group.

## Output Shape

Create a Markdown editing plan with these sections:

1. `最優先`
2. `物語の節目`
3. `解説・理解を助ける見せ場`
4. `実装メモ`

For each scene, include:

- scene id
- approximate timestamp if it can be calculated
- scene number or image number when available
- short scene description
- concrete handmade direction idea

Use practical direction language. Prefer ideas such as:

- pause or silence
- environmental sound
- handwritten underline, circle, note, or label
- warmer or colder color treatment
- slower image movement
- small camera shake
- subtle darkening or vignette
- old-photo or memory treatment
- softer subtitle timing
- stronger but less noisy emphasis

## Safety And Scope

Before implementation, keep this as a proposal. Do not edit `manifest_final.json`, source components, or media files unless the user asks to apply the plan.

When implementation is requested, prefer adding optional fields or using existing manifest fields before changing shared components. Preserve the generated video pipeline and only add special handling for selected scenes.
