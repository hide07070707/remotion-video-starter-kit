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

## 2. Strict Telop Split Check

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

## 3. Scene Plan Check

Output a table:

| Draft Scene ID | Narration | Purpose | Estimated Seconds | Image Group Hint | Notes |
| --- | --- | --- | --- | --- | --- |

Ask:
`このシーン計画で進めて大丈夫ですか？直したい区切り、短くしたい部分、まとめたい部分があれば教えてください。`

Do not create a manifest yet.

## 4. Image Group Check

Output a table:

| Image Group | Scenes | Shared Visual | Why Shared | Change Risk |
| --- | --- | --- | --- | --- |

Ask:
`この画像グループで進めて大丈夫ですか？別画像にしたい場面、同じ画像でよい場面を確認してください。`

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

Only create or update manifest after the strict telop split, scene plan, and image groups are approved.

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

Use this only after the finished video structure and approximate timestamps are known.

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
