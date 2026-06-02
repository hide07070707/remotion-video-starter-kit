---
name: remotion-story-video-workflow
description: Guide a beginner-friendly, checkpoint-based workflow for making long-form Remotion story videos from a new script and optional supplemental YouTube publishing notes. Use when the user wants to create a new story video, separate script from supplemental material, split a script into strict telop scenes, create a combined scene plan and image-group proposal, create character master image prompts for ChatGPT image2.0, Nano Banana Pro, or another image-generation tool, create copyable image prompts, build a manifest, preview in Remotion, open the correction UI, propose handmade direction, create optional video-AI prompts, record production changes, create YouTube description/chapter/tag drafts, or render the final MP4.
---

# Remotion Story Video Workflow

Use this skill as a production guide for making a new Remotion story video from a script. The most important rule is: do not jump straight from script to Remotion. Move through confirmation checkpoints so the user can fix the structure early.

## Core Rules

- Keep the workflow beginner-friendly. At every step, explain what was created, what the user should check, and what the next instruction should be.
- Ask questions before acting when important details are missing or ambiguous.
- At intake, separate `A. Completed Script` from `B. Supplemental YouTube Publishing Notes` when both are provided. Use only the completed script for narration, telops, scenes, and the video body.
- After intake, save the original pasted materials before splitting: `public/assets/<story>/metadata/source-script.md` for `A. Completed Script` and `public/assets/<story>/metadata/supplemental-notes.md` for `B. Supplemental Notes` when present. If the story folder name is unknown, ask for a simple slug or propose one from the title. Use these saved files as the source of truth for strict telop splitting.
- Save every approved checkpoint artifact before moving on. Use `references/artifact-storage.md` for file names. Do not rely on chat history for source text, approved telop splits, scene plans, character master prompts, image prompt batches, asset maps, or production changes.
- Never turn supplemental notes into narration, telops, scene text, or video overlays unless the user explicitly moves specific text into the completed script.
- Use supplemental notes only to understand intent, record production changes, prepare the final YouTube description, adjust chapters to real timestamps, organize sources, and propose tag candidates.
- Keep a lightweight production log whenever the approved script changes, extra overlays are added, chapter structure changes, or sources/tags need later publishing follow-up. Use `references/production-log.md` when the final YouTube draft needs this context.
- Do not ask for visual style before strict telop splitting. Ask for visual style only after the strict telop split is approved and before creating scene plans, image groups, character master prompts, or image prompts. Offer a few examples and tell the user they may provide reference images for "something like this" style guidance.
- Stop for confirmation at major checkpoints: strict telop split, combined scene plan and image-group proposal, character master prompts, image prompts, asset mapping, manifest draft, Remotion preview, handmade direction, optional video generation, and final render.
- Do strict telop splitting before creative scene planning. Preserve the original script text exactly.
- Default strict telop splitting to scene 1 and the full `A. Completed Script` unless the user specifies another start number or range. For beginners, say "通常は1番から始めます。1番からで進めて大丈夫ですか？" instead of asking an open-ended start-number question. If the script is long, propose splitting in chapter-sized batches for easier checking.
- Do not create or rewrite the manifest until the strict telop split and combined scene plan/image-group proposal are approved.
- Treat text, numbers, tables, citations, and checklists as Remotion work. Do not send these to video AI unless the user explicitly asks.
- If character consistency matters, create character master prompts after the scene plan/image groups are approved and before image-group prompts. Use the already selected visual style automatically; if no style is selected, ask first. Ask the user to choose the target prompt format from `ChatGPT image2.0`, `Nano Banana Pro`, or `Other`.
- If API keys are needed, tell the user to put them in `.env` and confirm `.env` is ignored by Git. Never print or commit API keys.
- Prefer adding scenes or overlays over rewriting existing approved scenes.

## Workflow

1. Intake
   Ask the user to paste the completed script and optional supplemental YouTube publishing notes using the simple `A/B` template in `references/prompt-templates.md`. If both are pasted together, identify which range is `A. Completed Script` and which range is `B. Supplemental Notes`. Ask clarifying questions if the boundary is unclear. Save the separated text into `public/assets/<story>/metadata/` before any splitting. For beginners, assume the split starts at scene 1 and covers all of `A. Completed Script`; ask only whether scene 1 is okay, whether the full script should be split at once, and whether headings or separator lines should be included. Do not ask for visual style yet.

2. Strict Telop Split
   Use the strict prompt in `references/prompt-templates.md`. Split the full `A. Completed Script` unless the user asks for a specific chapter/range. For long scripts, split in chapter-sized batches so the user can check safely. Keep all original characters, punctuation, particles, symbols, ellipses, and brackets unchanged. Start from scene 1 unless the user specifies another start number. Stop and ask the user to approve or edit this strict split. After approval, save it to `metadata/telop-split.md`. Tell beginners this Markdown file can be edited by hand; if they edit it, reread the file and verify it still matches `metadata/source-script.md` before continuing.

3. Visual Style
   After the strict telop split is approved, ask for the visual style before any scene planning or image grouping. Offer examples such as warm hand-drawn animation, watercolor picture-book style, clean editorial illustration, realistic cinematic look, manga-like monochrome, or simple flat illustration. Tell the user they can attach reference images to show the desired atmosphere. Save the approved style note to `metadata/visual-style.md`.

4. Combined Scene Plan and Image-Group Proposal
   After the visual style is decided, create one combined proposal that covers scene role, scene type, emotional goal, production method, image group ID, visual memo, and why scenes can share the same image. Start with a compact table for easy review. Use the detailed prompt in `references/prompt-templates.md` when the user wants full direction notes. Stop and ask the user to approve or edit this combined proposal before continuing. After approval, save it to `metadata/scene-plan-image-groups.md`.

5. Character Master Prompts
   After the combined scene plan/image-group proposal is approved, extract the characters that need visual consistency. Classify each as primary, recurring, minor, one-off, existing asset, or no image needed. Use `references/character-master.md` and the selected visual style to create master-image prompts only for characters that should be generated externally. Ask the user to choose `ChatGPT image2.0`, `Nano Banana Pro`, or `Other` before outputting the copyable prompts. Save the approved cast list and prompts to `metadata/characters.md` and `prompts/character-master-prompts.md`. Stop and ask the user to generate or approve the master images before writing image-group prompts that reference them. For beginners, create and open `inbox/characters/`; tell them to drag generated master images into the opened folder. Then Codex should inspect, rename/map, and move them to `images/characters/`.

6. Copyable Image Prompts
   Create copyable prompts for external image-generation tools, grouped by approved image group. Do not generate images inside Codex. Use visible prompt-sheet IDs such as `img_001`; if variants are needed, use `img_001_A`, `img_001_B`. For each prompt, include the save name the user should apply after downloading, such as `保存名: img_001.png`. Keep scene text unchanged. Do not put readable text inside images. If existing character assets are used, do not regenerate them with image AI; write separate Remotion placement instructions instead. For long projects, output prompts in batches of 10-20 image groups and pause for user review before continuing; ask the user to check each batch, not necessarily generate images immediately. Save each approved batch to `prompts/image-groups-001-010.md`, `prompts/image-groups-011-020.md`, and so on. When the user is ready to provide generated images, create and open the matching batch folder under `inbox/images/`, such as `inbox/images/001-010/`; tell them to put only that range there and rename each chosen image so the ID is recognizable, preferably exactly like `img_001.png`, but acceptable as `img_001(2).png`, `img_001_修正版.png`, or similar. Codex should normalize recognizable names to the final file names. If the ID is not recognizable, ask them to add a simple note mapping the random file name to the image ID. Codex should inspect, ask only about unclear mappings, then rename/map and move files to `images/`. Use the normal prompt template for simple projects. Use the detailed prompt template when character consistency, master-image references, A/B variations, Remotion overlay separation, or range-by-range output control matters.

7. Asset Mapping
   After the user provides images/audio, map files to scenes and image groups. Save the mapping to `metadata/asset-map.md`. If audio is missing, use temporary durations or placeholder paths only when the user approves.

8. Manifest Draft
   Create the manifest only after the user has approved the previous checkpoints. Keep scene IDs stable. Include scene text, image/audio paths, duration, and optional video path fields.

9. Remotion Preview and Correction
   Start or point the user to the Remotion preview. If the user needs reading-mistake or image replacement support, use the correction tool workflow:
   `npm run tools`
   Then open `http://localhost:3101/`.

10. Handmade Direction
   Propose handmade direction before implementing. Reuse the patterns in `references/handmade-patterns.md` and, when available, use the `handmade-video-direction` skill for scene candidate lists. Save proposals to `metadata/handmade-direction.md`. If the user approves implementation, record added overlays, sounds, pauses, video clips, or deleted elements in the production log.

11. Optional Video AI
   Ask whether the user wants no video AI, Higgsfield, another video AI, or manual replacement. For video AI, create provider-neutral image-to-video prompts and tell the user which source image, duration, aspect ratio, and motion should be used. Save approved video prompts to `prompts/video-ai-prompts.md`.

12. Final Render
   Before rendering, check for missing media and suspicious video files. For long videos, chunked rendering and concatenation is acceptable. Report the output path clearly.

13. YouTube Publishing Draft
   After the final video timing is known, use the supplemental notes and the recorded production changes to create a copy-ready YouTube description, corrected chapters, source/reference section, hashtags, and separate YouTube Studio tag candidates. Read `references/production-log.md` if the production history is scattered across the chat or files. Include only what the finished video actually covers. Do not invent URLs, sources, or claims. If exact timestamps are not known, create a timestamp confirmation checklist first and ask the user to fill in the actual times before writing the final copy.

## User Prompts to Recommend

- `新しい台本を渡します。まず厳密テロップ分割から確認しながら進めてください。`
- `下の形で、完成台本と必要なら補助資料を貼ってください。`
- `完成台本と補助資料を渡します。補助資料は本編に使わず、説明欄作成とチャプター調整用として扱ってください。`
- `台本と補助資料の境界が不明な場合は、作業前に質問してください。`
- `画風はどうしますか？候補をいくつか出してください。参考画像も渡せます。`
- `通常はシーン1から始めてください。特別な指定がある場合だけ開始番号を変えます。`
- `基本は【A. 完成台本】の全文を分割してください。長すぎる場合は、確認しやすい範囲に分けて提案してください。`
- `このテロップ分割で進めてください。次にシーン計画＋画像グループ候補を作ってください。`
- `シーン計画＋画像グループ候補を、まず確認しやすい表で出してください。`
- `必要なら、構図メモや制作方法まで入れた詳細版で出してください。`
- `登場人物を整理して、必要なキャラクターマスター画像用プロンプトを作ってください。`
- `キャラクターマスター画像用プロンプトは、ChatGPT image2.0 用、Nano Banana Pro 用、その他から選べるようにしてください。`
- `画像プロンプトをコピーできる形で出してください。`
- `まず画像グループ001〜010の画像プロンプトを出してください。出力後、自己チェックして、次の範囲へ進む前に止まってください。`
- `Remotionで確認したいです。修正サイトも開けるようにしてください。`
- `新しい物語のmanifestから、手作り演出を入れるべきシーン一覧を作ってください。`
- `動画化した方が良いシーンを優先順位つきで出してください。`
- `完成版MP4を書き出してください。`
- `動画完成後の説明欄に反映するため、制作中の変更点を整理してください。`
- `動画が完成しました。完成動画の内容に合わせて、YouTube説明欄の最終版を作ってください。`
- `正確なタイムスタンプが不明な場合は、先にタイムスタンプ確認リストを作ってください。`

## References

- `references/checkpoints.md`: output formats and stop points.
- `references/artifact-storage.md`: where to save important artifacts so chat history is not the source of truth.
- `references/character-master.md`: character extraction and master-image prompt rules.
- `references/prompt-templates.md`: reusable prompt templates.
- `references/handmade-patterns.md`: handmade direction ideas learned from the sample story video production process.
- `references/production-log.md`: lightweight record format for changes that affect final YouTube publishing copy.
