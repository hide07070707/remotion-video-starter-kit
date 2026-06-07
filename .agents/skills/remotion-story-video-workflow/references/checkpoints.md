# Checkpoints

Use these checkpoints to keep the user in control before the project becomes hard to change in Remotion.

## 1. Intake Separation Check

When the user provides both a script and supplemental notes, identify:

| Range | Use | Must Not Be Used For | Notes |
| --- | --- | --- | --- |
| A. Completed Script | Video narration, telops, scenes, manifest text | - | The only source for the video body |
| B. Supplemental YouTube Publishing Notes | Intent, description, chapters, sources, tags, production-change log | Narration, telops, scene text, overlays | Use after or alongside production planning only |

If the boundary between script and supplemental notes is unclear, ask before continuing.

For beginners, first show this simple paste format:

```text
下の形で貼ってください。
補助資料がない場合は、【B. 補助資料】は空欄で大丈夫です。

【A. 完成台本】
ここに動画本編で読み上げる台本を貼る

【B. 補助資料】
ここに説明欄下書き、仮チャプター、出典、タグ候補などを貼る
```

Ask:
`動画本編として使う範囲は【A. 完成台本】だけ、【B. 補助資料】は説明欄・チャプター・出典・タグ候補用として扱います。この理解で大丈夫ですか？`

Save before splitting:

```text
public/assets/<story>/metadata/source-script.md
public/assets/<story>/metadata/supplemental-notes.md
```

If the story folder name is unknown, ask:
`保存用の物語フォルダ名を決めます。半角英数字とハイフンで、短い名前にします。こちらで案を出してよければ、タイトルから作ります。`

Then tell the user:
`貼っていただいた台本と補助資料は、後から参照できるように metadata フォルダへ保存します。厳密テロップ分割では、チャット本文ではなく保存した source-script.md を基準にします。`

Track during production:

- script text that was changed, deleted, or left unused
- added scenes, overlays, tables, captions, sound effects, and video-AI clips
- actual chapter/timestamp candidates
- sources or references that should appear in the final YouTube description
- tag and hashtag candidates

Use `production-log.md` when these notes become too scattered to trust from memory.

For all saved artifact paths, use `artifact-storage.md`.

## 2. Strict Telop Split Check

Before splitting, confirm these inputs are available or safely defaulted:

- start number: default to `1` unless the user specifies otherwise
- text to convert: default to all of `A. Completed Script`
- whether chapter headings are included in the source text
- whether separator lines such as `---` should be excluded

For beginners, avoid open-ended questions such as "What start number?" Ask:
`通常はシーン1から始めます。1番からで進めて大丈夫ですか？`

For range, do not require the user to name a chapter if they pasted the full script. Ask:
`基本は【A. 完成台本】の全文を分割します。全文で進めて大丈夫ですか？長い場合は、こちらで確認しやすい範囲に分けて出します。`

If the full script is too long to review comfortably, propose a batch:
`全文を一度に出すと確認が大変なので、まず冒頭から区切りのよいところまで分割します。確認後、次の範囲へ進みます。`

Output:

```text
【シーン48】
字幕本文

【シーン49】
字幕本文
```

Rules:

- preserve the source text exactly
- do not summarize, reword, add, or remove text
- separator lines made only of `---` or similar marks are excluded
- start from scene 1 by default, unless the user specifies another number
- one scene is up to two lines
- one line is up to 20 Japanese characters
- before splitting, inspect the whole sentence and decide in this order:
  1. if the sentence fits within 20 Japanese characters, keep it as one line
  2. if the sentence exceeds 20 characters but fits naturally within two lines, keep it in one scene
  3. only if the sentence cannot reasonably fit within one two-line scene, split it across multiple scenes at a natural meaning boundary
- do not split just because there is a comma/period, because the line "looks long", or for visual preference
- if text exceeds the line limit, split it instead of rewriting it
- do not add image groups at this stage

Ask:
`この厳密テロップ分割で進めて大丈夫ですか？原文と違う箇所、区切りを直したい箇所があれば教えてください。`

After approval, save to `metadata/telop-split.md`.

Tell the user:
`このテロップ分割は、metadata/telop-split.md に保存します。Markdownのテキストファイルなので、手作業で修正できます。修正した場合は「telop-split.md を修正しました。確認してください」と伝えてください。Codexが source-script.md と照合して、原文が変わっていないか確認してから次へ進みます。`

If the user manually edits `metadata/telop-split.md`, reread both:

- `metadata/source-script.md`
- `metadata/telop-split.md`

Then verify:

- no source characters were added, deleted, rewritten, or reordered
- scene numbers are continuous
- 20-character sentences are not unnecessarily split
- sentences that fit in one two-line scene are not unnecessarily split across scenes
- long sentences split across multiple scenes are split at natural meaning boundaries
- each line is still within the intended readable length when possible
- separator lines excluded from source are still not included as captions

Do not create image groups or a manifest yet.

## 3. Visual Style Check

Use this only after the strict telop split is approved and before scene planning, image grouping, character master prompts, or image prompts.

Ask:
`次にシーン計画＋画像グループ候補を作るため、画風を確認します。例として、温かみのある手描き風アニメ背景、水彩絵本風、落ち着いたリアル寄り、シンプルなフラットイラスト、漫画風モノクロ、雑誌の挿絵風などがあります。こんな感じで、という参考画像を渡しても大丈夫です。`

Record:

- selected style
- reference images, if supplied
- what to imitate: mood, color, lighting, texture, composition
- what not to imitate: specific characters, logos, copyrighted designs, exact artwork

If the user does not care, choose a neutral style that fits the audience and story topic, and state the assumption.

After approval, save to `metadata/visual-style.md`.

## 4. Combined Scene Plan And Image Group Check

Default compact output:

| Image Group | Scenes | Scene Role | Scene Type | Cut Type | Production Method | Visual Memo | Why Shared | Switch Reason | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

Ask:
`このシーン計画＋画像グループ候補で進めて大丈夫ですか？画像を分けたい場面、まとめたい場面、制作方法を変えたい場面があれば教えてください。`

Do not create a manifest yet.

Use the detailed format in `prompt-templates.md` when the user wants a fuller visual direction document.

Before asking the user to fill anything in, check for saved files:

- Use `metadata/telop-split.md` as the scene list when it exists.
- Use `metadata/visual-style.md` as the approved visual style when it exists.
- Default the image group start number to `001`.
- Ask the user only if a required input is missing or ambiguous.

Beginner-friendly questions:

- `保存済みの telop-split.md を使って、画像グループ001から始めてよいですか？`
- `一度に全部出すと確認が大変なので、まず一部の範囲だけ出しますか？それとも全体案を出しますか？`

Rules:

- do not change scene numbers
- do not change telop text or line breaks
- use 3-digit image group IDs such as `001`, `002`, `003`
- keep image groups from becoming too large: default to 3-5 scenes per group, and 1-3 scenes for important emotional moments
- even in the same location/time, split groups when the camera distance, emotion, action, prop focus, or viewpoint changes
- assign a cut type to every group: W (wide), M (medium), CU (close-up), or INS (insert)
- avoid using the same cut type for 3 or more consecutive groups when possible
- consider INS shots for meaningful props such as notes, tea cups, clocks, letters, photos, old leads, tools, or other story objects
- classify production method as one of: background AI, character + background, Remotion diagram, Remotion text emphasis, existing assets
- make clear why scenes share one image, and why the next image change should happen
- follow the approved `metadata/visual-style.md`; do not hard-code a specific style or mascot/guide character unless the story has one or the user approved it
- keep numbers, tables, Japanese text, and citations in Remotion rather than image-generation prompts

Do not create image prompts until approved.

After approval, save to `metadata/scene-plan-image-groups.md`.

## 5. Character Master Prompt Check

Use this after the combined scene plan/image-group proposal is approved and before image-group prompts.

Default extraction table:

| Character ID | Name/Role | Importance | Appears In | Master Need | Version Notes | Confirmation |
| --- | --- | --- | --- | --- | --- | --- |

Ask:
`この人物整理で進めて大丈夫ですか？マスター画像を作る人物、作らない人物、現在版・回想版などの差分を直したい場合は教えてください。`

Before final prompts, confirm:

- selected visual style
- target prompt format: `ChatGPT image2.0`, `Nano Banana Pro`, or `Other`
- whether existing character assets should be excluded from generation
- whether any reference images should be used for mood/style only

Rules:

- reuse the selected visual style automatically; ask if missing
- create master prompts only for characters that need consistency
- do not generate images inside Codex
- keep background white, full-body front view, and no readable text
- include age impression, hairstyle, outfit, body type, baseline expression, and atmosphere
- mark one-off or narration-only characters as no master needed when appropriate
- do not proceed to image-group prompts until the user has approved or generated the master images, unless the user explicitly skips this step

After approval, save the character list to `metadata/characters.md` and prompts to `prompts/character-master-prompts.md`.

Tell beginners how to provide generated master images:
`受け取り用フォルダ public/assets/<story>/inbox/characters/ をこちらで作って開きます。外部画像生成AIで作った画像を、その開いたフォルダへドラッグ＆ドロップしてください。ファイル名はそのままで大丈夫です。入れ終わったら「入れました」と教えてください。Codexが確認して、必要に応じて CHAR001_MASTER.png のような名前へ整理します。`

## 6. Image Prompt Check

For each image group, output:

- image group ID
- covered scenes
- image ID such as `img_001`; use `img_001_A` and `img_001_B` only when A/B variants are needed
- simple user-facing purpose and image type
- copyable prompt in a fenced code block
- negative notes such as "no text in image" when needed
- Remotion overlay notes outside the prompt block
- existing character placement notes outside the prompt block, if any

Ask the user to generate images externally and place or upload them.

Tell beginners to check only the essentials first:

- Does the image match the mood of the scene?
- Is the same image being used for too long?
- Are readable text, arrows, labels, tables, or checklists kept out of the generated image?

Rules:

- create prompts by image group, not by individual scene
- for long projects, output image prompts in batches of 10-20 image groups, such as `001-010`, `011-020`, and `021-030`
- after each batch, include a brief self-check and wait for user confirmation before continuing to the next batch
- ask the user to check the prompt batch; do not imply they must generate images before the next prompt batch
- do not output all image groups at once unless the project is short or the user explicitly asks for a full one-pass output
- do not change scene text
- do not include readable text inside generated images
- code blocks must contain only the prompt to paste into an external image generator
- do not regenerate existing character assets with image AI
- if existing characters are needed, describe their Remotion placement separately
- usually output only pattern A; add pattern B only for important scenes or when requested.
- use the normal template for quick prompt creation
- use the detailed template when the user needs master-image consistency, reference-image handling, A/B variants, range-by-range output, or strict separation of Remotion overlays from generated image content
- when approved character master images exist, reference them in the image-group prompts instead of re-describing characters from scratch
- if the visual style has not been decided, ask the user before producing final prompts
- even for Remotion diagrams, cards, comparison tables, checklists, or text emphasis scenes, create a background/atmosphere prompt with enough empty space for overlays
- do not leave diagram scenes as blank white backgrounds unless the user explicitly wants that style

After each approved batch, save to `prompts/image-groups-001-010.md` style files.

After outputting a prompt batch, say:
`まず画像グループ001〜010の画像プロンプトを出しました。確認してください。次の範囲へ進む場合は「011〜020へ進んで」と言ってください。`

When the user is ready to provide generated images, say:
`受け取り用フォルダ public/assets/<story>/inbox/images/001-010/ をこちらで作って開きます。外部画像生成AIで作った001〜010の画像だけを、この開いたフォルダへドラッグ＆ドロップしてください。ダウンロード名が数字の羅列になる場合は、できるだけプロンプトに書かれている保存名へ変えてください。例: img_001.png、img_002.png。完全に同じ名前でなくても、img_001(2).png、img_001_修正版.png のように画像IDが分かれば大丈夫です。A/B案を両方残す場合は img_001_A.png、img_001_B.png のようにしてください。Codexが確認後、最終的なファイル名へ整えます。画像IDが分からない名前のままになっている場合だけ、どのファイルがどの画像IDか分かる簡単なメモを一緒に渡してください。入れ終わったら「001〜010を入れました」と教えてください。Codexが確認して、分からないものだけ質問してから整理します。`

## 7. Asset Mapping Check

Output:

| Scene ID | Image Path | Audio Path | Duration | Status |
| --- | --- | --- | --- | --- |

Mark missing assets clearly. Do not hide missing audio or video.

After approval, save to `metadata/asset-map.md`.

## 8. Manifest Check

Only create or update manifest after the strict telop split and combined scene plan/image-group proposal are approved.

Keep stable IDs:

- Story scenes: `sc_001`, `sc_002`, ...
- Insert scenes: `INSERT_*`
- Image groups: `image_001`, `image_002`, ...

Explain that manifest is the timeline source for Remotion.

Save drafts and final versions as `manifest.draft.json` and `manifest.final.json` when applicable.

## 9. Preview Check

Tell the user exactly what to check:

- Does each scene appear in the right order?
- Is the text readable?
- Are image changes natural?
- Are reading mistakes present?
- Does audio continue without gaps?
- Are hand-made overlays too busy or too small?

When correction UI is available, launch or point to:

`npm run tools`

`http://localhost:3101/`

## 10. Handmade Direction Check

Do not implement immediately. Output candidates with:

| Priority | Scene | Reason | Suggested Direction | Risk |
| --- | --- | --- | --- | --- |

Ask which set to implement first.

Save proposal to `metadata/handmade-direction.md`.

## 11. Video AI Check

Ask whether to use:

- no video generation
- Higgsfield
- another image-to-video AI
- manual video files supplied by the user

For each video candidate, output:

| Scene/Image | Motion Goal | Suggested Seconds | Source Image | Prompt |
| --- | --- | --- | --- | --- |

Warn that numbers, tables, and Japanese text should usually stay in Remotion.

Save approved prompts to `prompts/video-ai-prompts.md`.

## 12. YouTube Publishing Check

Use this only after the finished video structure and actual or user-approved timestamps are known. If timestamps are not known, do not write the final description yet. First output a timestamp confirmation checklist based on the finished chapter structure.

Before writing the final copy, gather the supplemental notes and the production log. If the log is missing, reconstruct only from confirmed edits, preview notes, manifest fields, and user-approved changes. Ask before using uncertain changes.

Save timestamp checklist to `metadata/timestamp-checklist.md` and final copy to `metadata/youtube-publishing-final.md`.

Timestamp confirmation checklist format:

| Chapter Candidate | What To Check In Preview | Actual Time |
| --- | --- | --- |
| Opening | Start of the main hook | user fills in |

Output:

- copy-ready YouTube description
- actual chapter list with concrete chapter names
- `参考・出典` section if sources were supplied or verified
- hashtags inside the description
- separate YouTube Studio tag candidates

Rules:

- include only content that appears in the finished video
- align title, thumbnail idea, body, and description
- do not invent URLs, sources, medical claims, or statistics
- use supplemental notes as support, not as video-body text
- if a source is unclear or unverified, ask the user instead of guessing
- output the copy-ready description separately from YouTube Studio tag candidates
- include 3 to 5 relevant hashtags in the description body
- keep SEO natural; do not stuff keywords
- chapter names must be concrete, not generic labels such as "first", "second", or "summary"
