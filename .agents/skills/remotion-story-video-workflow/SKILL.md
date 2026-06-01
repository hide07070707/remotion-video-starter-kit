---
name: remotion-story-video-workflow
description: Guide a beginner-friendly, checkpoint-based workflow for making long-form Remotion story videos from a new script. Use when the user wants to create a new story video, split a script into scenes, make image groups, create copyable image prompts, build a manifest, preview in Remotion, open the correction UI, propose handmade direction, create optional Higgsfield/video-AI prompts, or render the final MP4.
---

# Remotion Story Video Workflow

Use this skill as a production guide for making a new Remotion story video from a script. The most important rule is: do not jump straight from script to Remotion. Move through confirmation checkpoints so the user can fix the structure early.

## Core Rules

- Keep the workflow beginner-friendly. At every step, explain what was created, what the user should check, and what the next instruction should be.
- Stop for confirmation at major checkpoints: scene split, image groups, image prompts, asset mapping, manifest draft, Remotion preview, handmade direction, optional video generation, and final render.
- Do not create or rewrite the manifest until the scene split and image groups are approved.
- Treat text, numbers, tables, citations, and checklists as Remotion work. Do not send these to video AI unless the user explicitly asks.
- If API keys are needed, tell the user to put them in `.env` and confirm `.env` is ignored by Git. Never print or commit API keys.
- Prefer adding scenes or overlays over rewriting existing approved scenes.

## Workflow

1. Intake
   Ask for the script and basic choices: story title, audience, tone, target length, aspect ratio, narration style, image generation tool, voice/audio tool, and whether video AI will be used.

2. Scene Split
   Split the script into a proposed scene table with scene ID, narration text, purpose, estimated duration, and image-group hint. Stop and ask the user to approve or edit the split before continuing.

3. Image Groups
   Group scenes that can share one image. Show image group ID, covered scenes, visual idea, and why the group can be shared. Stop and ask for approval.

4. Copyable Image Prompts
   Create one prompt per image group in copyable fenced code blocks. Include suggested filenames. Assume the user may generate images outside Codex, so make prompts easy to copy.

5. Asset Mapping
   After the user provides images/audio, map files to scenes and image groups. If audio is missing, use temporary durations or placeholder paths only when the user approves.

6. Manifest Draft
   Create the manifest only after the user has approved the previous checkpoints. Keep scene IDs stable. Include scene text, image/audio paths, duration, and optional video path fields.

7. Remotion Preview and Correction
   Start or point the user to the Remotion preview. If the user needs reading-mistake or image replacement support, use the correction tool workflow:
   `npm run tools`
   Then open `http://localhost:3101/`.

8. Handmade Direction
   Propose handmade direction before implementing. Reuse the patterns in `references/handmade-patterns.md` and, when available, use the `handmade-video-direction` skill for scene candidate lists.

9. Optional Video AI
   Ask whether the user wants no video AI, Higgsfield, another video AI, or manual replacement. For Higgsfield, use the Higgsfield skill when available. For other tools, create provider-neutral image-to-video prompts and tell the user which source image, duration, aspect ratio, and motion should be used.

10. Final Render
   Before rendering, check for missing media and suspicious video files. For long videos, chunked rendering and concatenation is acceptable. Report the output path clearly.

## User Prompts to Recommend

- `新しい台本を渡します。まずシーン分割から確認しながら進めてください。`
- `このシーン分割で進めてください。次に画像グループを作ってください。`
- `画像グループを確認したいです。修正しやすい表で出してください。`
- `画像プロンプトをコピーできる形で出してください。`
- `Remotionで確認したいです。修正サイトも開けるようにしてください。`
- `新しい物語のmanifestから、手作り演出を入れるべきシーン一覧を作ってください。`
- `動画化した方が良いシーンを優先順位つきで出してください。`
- `完成版MP4を書き出してください。`

## References

- `references/checkpoints.md`: output formats and stop points.
- `references/prompt-templates.md`: reusable prompt templates.
- `references/handmade-patterns.md`: handmade direction ideas learned from the WashokuStory project.
