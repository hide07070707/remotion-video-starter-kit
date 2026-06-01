# Checkpoints

Use these checkpoints to keep the user in control before the project becomes hard to change in Remotion.

## 1. Intake Separation Check

When the user provides both a script and supplemental notes, identify:

| Range | Use | Must Not Be Used For | Notes |
| --- | --- | --- | --- |
| A. Completed Script | Video narration, telops, scenes, manifest text | - | The only source for the video body |
| B. Supplemental YouTube Publishing Notes | Intent, description, chapters, sources, tags, production-change log | Narration, telops, scene text, overlays | Use after or alongside production planning only |

If the boundary between script and supplemental notes is unclear, ask before continuing.

Ask:
`動画本編として使う範囲は【A. 完成台本】だけ、【B. 補助資料】は説明欄・チャプター・出典・タグ候補用として扱います。この理解で大丈夫ですか？`

Track during production:

- script text that was changed, deleted, or left unused
- added scenes, overlays, tables, captions, sound effects, and video-AI clips
- actual chapter/timestamp candidates
- sources or references that should appear in the final YouTube description
- tag and hashtag candidates

## 2. Visual Style Check

Before scene planning, image grouping, or image prompts, ask the user to choose a visual style.

Ask:
`画風はどうしますか？例として、温かみのある手描き風アニメ背景、水彩絵本風、落ち着いたリアル寄り、シンプルなフラットイラスト、漫画風モノクロ、雑誌の挿絵風などがあります。こんな感じで、という参考画像を渡しても大丈夫です。`

Record:

- selected style
- reference images, if supplied
- what to imitate: mood, color, lighting, texture, composition
- what not to imitate: specific characters, logos, copyrighted designs, exact artwork

If the user does not care, choose a neutral style that fits the audience and story topic, and state the assumption.

## 3. Strict Telop Split Check

Before splitting, confirm these inputs are available:

- start number
- chapter text to convert
- whether chapter headings are included in the source text
- whether separator lines such as `---` should be excluded

If any of these are unclear, ask the user before continuing.

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
- start from the user-specified number
- one scene is up to two lines
- one line is up to 20 Japanese characters
- if text exceeds 20 characters, split it instead of rewriting it
- do not add image groups at this stage

Ask:
`この厳密テロップ分割で進めて大丈夫ですか？原文と違う箇所、区切りを直したい箇所があれば教えてください。`

Do not create image groups or a manifest yet.

## 4. Combined Scene Plan And Image Group Check

Default compact output:

| Image Group | Scenes | Scene Role | Scene Type | Production Method | Visual Memo | Why Shared | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |

Ask:
`このシーン計画＋画像グループ候補で進めて大丈夫ですか？画像を分けたい場面、まとめたい場面、制作方法を変えたい場面があれば教えてください。`

Do not create a manifest yet.

Use the detailed format in `prompt-templates.md` when the user wants a fuller visual direction document.

Rules:

- do not change scene numbers
- do not change telop text or line breaks
- use 3-digit image group IDs such as `001`, `002`, `003`
- classify production method as one of: background AI, character + background, Remotion diagram, Remotion text emphasis, existing assets
- make clear why scenes share one image, and when the next image change should happen
- keep numbers, tables, Japanese text, and citations in Remotion rather than image-generation prompts

Do not create image prompts until approved.

## 5. Image Prompt Check

For each image group, output:

- image group ID
- covered scenes
- suggested filename
- copyable prompt in a fenced code block
- negative notes such as "no text in image" when needed

Ask the user to generate images externally and place or upload them.

## 6. Asset Mapping Check

Output:

| Scene ID | Image Path | Audio Path | Duration | Status |
| --- | --- | --- | --- | --- |

Mark missing assets clearly. Do not hide missing audio or video.

## 7. Manifest Check

Only create or update manifest after the strict telop split and combined scene plan/image-group proposal are approved.

Keep stable IDs:

- Story scenes: `sc_001`, `sc_002`, ...
- Insert scenes: `INSERT_*`
- Image groups: `image_001`, `image_002`, ...

Explain that manifest is the timeline source for Remotion.

## 8. Preview Check

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

## 9. Handmade Direction Check

Do not implement immediately. Output candidates with:

| Priority | Scene | Reason | Suggested Direction | Risk |
| --- | --- | --- | --- | --- |

Ask which set to implement first.

## 10. Video AI Check

Ask whether to use:

- no video generation
- Higgsfield
- another image-to-video AI
- manual video files supplied by the user

For each video candidate, output:

| Scene/Image | Motion Goal | Suggested Seconds | Source Image | Prompt |
| --- | --- | --- | --- | --- |

Warn that numbers, tables, and Japanese text should usually stay in Remotion.

## 11. YouTube Publishing Check

Use this only after the finished video structure and actual or user-approved timestamps are known. If timestamps are not known, do not write the final description yet. First output a timestamp confirmation checklist based on the finished chapter structure.

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
