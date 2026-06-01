---
name: remotion-story-video-workflow
description: Guide a beginner-friendly, checkpoint-based workflow for making long-form Remotion story videos from a new script and optional supplemental YouTube publishing notes. Use when the user wants to create a new story video, separate script from supplemental material, split a script into strict telop scenes, create a combined scene plan and image-group proposal, create copyable image prompts, build a manifest, preview in Remotion, open the correction UI, propose handmade direction, create optional video-AI prompts, record production changes, create YouTube description/chapter/tag drafts, or render the final MP4.
---

# Remotion Story Video Workflow

Use this skill as a production guide for making a new Remotion story video from a script. The most important rule is: do not jump straight from script to Remotion. Move through confirmation checkpoints so the user can fix the structure early.

## Core Rules

- Keep the workflow beginner-friendly. At every step, explain what was created, what the user should check, and what the next instruction should be.
- Ask questions before acting when important details are missing or ambiguous.
- At intake, separate `A. Completed Script` from `B. Supplemental YouTube Publishing Notes` when both are provided. Use only the completed script for narration, telops, scenes, and the video body.
- Never turn supplemental notes into narration, telops, scene text, or video overlays unless the user explicitly moves specific text into the completed script.
- Use supplemental notes only to understand intent, record production changes, prepare the final YouTube description, adjust chapters to real timestamps, organize sources, and propose tag candidates.
- Ask for the visual style before creating scene plans or image prompts. Offer a few examples and tell the user they may provide reference images for "something like this" style guidance.
- Stop for confirmation at major checkpoints: strict telop split, combined scene plan and image-group proposal, image prompts, asset mapping, manifest draft, Remotion preview, handmade direction, optional video generation, and final render.
- Do strict telop splitting before creative scene planning. Preserve the original script text exactly.
- If the start number, chapter range, source text, or split rule is unclear, ask the user before splitting.
- Do not create or rewrite the manifest until the strict telop split and combined scene plan/image-group proposal are approved.
- Treat text, numbers, tables, citations, and checklists as Remotion work. Do not send these to video AI unless the user explicitly asks.
- If API keys are needed, tell the user to put them in `.env` and confirm `.env` is ignored by Git. Never print or commit API keys.
- Prefer adding scenes or overlays over rewriting existing approved scenes.

## Workflow

1. Intake
   Ask for the completed script and, if available, supplemental YouTube publishing notes. If both are pasted together, identify which range is `A. Completed Script` and which range is `B. Supplemental Notes`. Ask clarifying questions if the boundary is unclear. Also ask for basic choices: story title, audience, tone, target length, aspect ratio, narration style, image generation tool, voice/audio tool, whether video AI will be used, and visual style. For visual style, offer examples such as warm hand-drawn animation, watercolor picture-book style, clean editorial illustration, realistic cinematic look, manga-like monochrome, or simple flat illustration. Tell the user they can attach reference images to show the desired atmosphere.

2. Strict Telop Split
   Use the strict prompt in `references/prompt-templates.md`. Split only the supplied chapter into telop units. Keep all original characters, punctuation, particles, symbols, ellipses, and brackets unchanged. Use the user-specified start number. If the start number is missing, ask for it. Stop and ask the user to approve or edit this strict split.

3. Combined Scene Plan and Image-Group Proposal
   After the strict telop split is approved, create one combined proposal that covers scene role, scene type, emotional goal, production method, image group ID, visual memo, and why scenes can share the same image. Start with a compact table for easy review. Use the detailed prompt in `references/prompt-templates.md` when the user wants full direction notes. Stop and ask the user to approve or edit this combined proposal before continuing.

4. Copyable Image Prompts
   Create copyable prompts for external image-generation tools, grouped by approved image group. Do not generate images inside Codex. Use image IDs such as `IMG001A`. Keep scene text unchanged. Do not put readable text inside images. If existing character assets are used, do not regenerate them with image AI; write separate Remotion placement instructions instead. For long projects, output prompts in batches of 10-20 image groups and pause for user review before continuing. Use the normal prompt template for simple projects. Use the detailed prompt template when character consistency, master-image references, A/B variations, Remotion overlay separation, or range-by-range output control matters.

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
   Ask whether the user wants no video AI, Higgsfield, another video AI, or manual replacement. For video AI, create provider-neutral image-to-video prompts and tell the user which source image, duration, aspect ratio, and motion should be used.

10. Final Render
   Before rendering, check for missing media and suspicious video files. For long videos, chunked rendering and concatenation is acceptable. Report the output path clearly.

11. YouTube Publishing Draft
   After the final video timing is known, use the supplemental notes and the recorded production changes to create a copy-ready YouTube description, corrected chapters, source/reference section, hashtags, and separate YouTube Studio tag candidates. Include only what the finished video actually covers. Do not invent URLs, sources, or claims. If exact timestamps are not known, create a timestamp confirmation checklist first and ask the user to fill in the actual times before writing the final copy.

## User Prompts to Recommend

- `新しい台本を渡します。まず厳密テロップ分割から確認しながら進めてください。`
- `完成台本と補助資料を渡します。補助資料は本編に使わず、説明欄作成とチャプター調整用として扱ってください。`
- `台本と補助資料の境界が不明な場合は、作業前に質問してください。`
- `画風はどうしますか？候補をいくつか出してください。参考画像も渡せます。`
- `今回の開始番号は48です。この章だけを原文そのままでテロップ分割してください。`
- `開始番号や章の範囲で不明な点があれば、先に質問してください。`
- `このテロップ分割で進めてください。次にシーン計画＋画像グループ候補を作ってください。`
- `シーン計画＋画像グループ候補を、まず確認しやすい表で出してください。`
- `必要なら、構図メモや制作方法まで入れた詳細版で出してください。`
- `画像プロンプトをコピーできる形で出してください。`
- `まず画像グループ001〜010の画像プロンプトを出してください。出力後、自己チェックして、次の範囲へ進む前に止まってください。`
- `Remotionで確認したいです。修正サイトも開けるようにしてください。`
- `新しい物語のmanifestから、手作り演出を入れるべきシーン一覧を作ってください。`
- `動画化した方が良いシーンを優先順位つきで出してください。`
- `完成版MP4を書き出してください。`
- `動画が完成しました。完成動画の内容に合わせて、YouTube説明欄の最終版を作ってください。`
- `正確なタイムスタンプが不明な場合は、先にタイムスタンプ確認リストを作ってください。`

## References

- `references/checkpoints.md`: output formats and stop points.
- `references/prompt-templates.md`: reusable prompt templates.
- `references/handmade-patterns.md`: handmade direction ideas learned from the sample story video production process.
