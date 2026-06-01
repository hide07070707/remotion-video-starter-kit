# Checkpoints

Use these checkpoints to keep the user in control before the project becomes hard to change in Remotion.

## 1. Scene Split Check

Output a table:

| Draft Scene ID | Narration | Purpose | Estimated Seconds | Image Group Hint | Notes |
| --- | --- | --- | --- | --- | --- |

Ask:
`このシーン分割で進めて大丈夫ですか？直したい区切り、短くしたい部分、まとめたい部分があれば教えてください。`

Do not create a manifest yet.

## 2. Image Group Check

Output a table:

| Image Group | Scenes | Shared Visual | Why Shared | Change Risk |
| --- | --- | --- | --- | --- |

Ask:
`この画像グループで進めて大丈夫ですか？別画像にしたい場面、同じ画像でよい場面を確認してください。`

Do not create image prompts until approved.

## 3. Image Prompt Check

For each image group, output:

- image group ID
- covered scenes
- suggested filename
- copyable prompt in a fenced code block
- negative notes such as "no text in image" when needed

Ask the user to generate images externally and place or upload them.

## 4. Asset Mapping Check

Output:

| Scene ID | Image Path | Audio Path | Duration | Status |
| --- | --- | --- | --- | --- |

Mark missing assets clearly. Do not hide missing audio or video.

## 5. Manifest Check

Only create or update manifest after scene and image groups are approved.

Keep stable IDs:

- Story scenes: `sc_001`, `sc_002`, ...
- Insert scenes: `INSERT_*`
- Image groups: `image_001`, `image_002`, ...

Explain that manifest is the timeline source for Remotion.

## 6. Preview Check

Tell the user exactly what to check:

- Does each scene appear in the right order?
- Is the text readable?
- Are image changes natural?
- Are reading mistakes present?
- Does audio continue without gaps?
- Are hand-made overlays too busy or too small?

When correction UI is available, launch or point to:

`npm run tools:washoku`

`http://localhost:3101/`

## 7. Handmade Direction Check

Do not implement immediately. Output candidates with:

| Priority | Scene | Reason | Suggested Direction | Risk |
| --- | --- | --- | --- | --- |

Ask which set to implement first.

## 8. Video AI Check

Ask whether to use:

- no video generation
- Higgsfield
- another image-to-video AI
- manual video files supplied by the user

For each video candidate, output:

| Scene/Image | Motion Goal | Suggested Seconds | Source Image | Prompt |
| --- | --- | --- | --- | --- |

Warn that numbers, tables, and Japanese text should usually stay in Remotion.
