# Checkpoints

Use these checkpoints to keep the user in control before the project becomes hard to change in Remotion.

## 1. Strict Telop Split Check

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

## 2. Scene Plan Check

Output a table:

| Draft Scene ID | Narration | Purpose | Estimated Seconds | Image Group Hint | Notes |
| --- | --- | --- | --- | --- | --- |

Ask:
`このシーン計画で進めて大丈夫ですか？直したい区切り、短くしたい部分、まとめたい部分があれば教えてください。`

Do not create a manifest yet.

## 3. Image Group Check

Output a table:

| Image Group | Scenes | Shared Visual | Why Shared | Change Risk |
| --- | --- | --- | --- | --- |

Ask:
`この画像グループで進めて大丈夫ですか？別画像にしたい場面、同じ画像でよい場面を確認してください。`

Do not create image prompts until approved.

## 4. Image Prompt Check

For each image group, output:

- image group ID
- covered scenes
- suggested filename
- copyable prompt in a fenced code block
- negative notes such as "no text in image" when needed

Ask the user to generate images externally and place or upload them.

## 5. Asset Mapping Check

Output:

| Scene ID | Image Path | Audio Path | Duration | Status |
| --- | --- | --- | --- | --- |

Mark missing assets clearly. Do not hide missing audio or video.

## 6. Manifest Check

Only create or update manifest after the strict telop split, scene plan, and image groups are approved.

Keep stable IDs:

- Story scenes: `sc_001`, `sc_002`, ...
- Insert scenes: `INSERT_*`
- Image groups: `image_001`, `image_002`, ...

Explain that manifest is the timeline source for Remotion.

## 7. Preview Check

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

## 8. Handmade Direction Check

Do not implement immediately. Output candidates with:

| Priority | Scene | Reason | Suggested Direction | Risk |
| --- | --- | --- | --- | --- |

Ask which set to implement first.

## 9. Video AI Check

Ask whether to use:

- no video generation
- Higgsfield
- another image-to-video AI
- manual video files supplied by the user

For each video candidate, output:

| Scene/Image | Motion Goal | Suggested Seconds | Source Image | Prompt |
| --- | --- | --- | --- | --- |

Warn that numbers, tables, and Japanese text should usually stay in Remotion.
