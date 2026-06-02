# Character Master Images

Use this reference after the combined scene plan/image-group proposal is approved and before creating image-group prompts.

The goal is to create reference images for characters that must stay visually consistent across generated scene images. Codex creates prompts only. The user generates all images in an external image-generation tool.

## Why This Comes After Image Groups

Do not create master character prompts immediately after reading the script unless the user explicitly asks. First make the scene plan and image groups, because that reveals:

- which characters appear repeatedly
- whether current and flashback versions are both needed
- whether a character is important enough to generate
- whether clothing, age, or expression must change by chapter
- whether the character is better handled as an existing Remotion asset
- which generated scene prompts should reference the master image later

## Required Checks

If the visual style is already selected, reuse it automatically in the `○○風` / style slot. If no visual style is selected, ask before writing final prompts.

Ask the user to choose the target prompt format:

- `ChatGPT image2.0`
- `Nano Banana Pro`
- `Other`

Do not output multiple formats unless the user asks for them. The prompt can stay mostly provider-neutral, but adapt wording for the selected tool. If the user chooses `Other`, ask for the tool name and any prompt constraints they already know. If they are unsure, create a clear provider-neutral prompt.

## How Beginners Provide Generated Master Images

After the user generates the master images externally, do not ask them to find a deep folder manually. Create and open this receiving folder:

```text
public/assets/<story>/inbox/characters/
```

Tell the user:

```text
受け取り用フォルダを開きました。
外部画像生成AIで作ったキャラクターマスター画像を、この開いたフォルダへドラッグ＆ドロップしてください。
ファイル名はそのままで大丈夫です。
入れ終わったら「入れました」と教えてください。
```

After the user says the files are in the folder, inspect the folder. If mapping is obvious, rename/move the files into:

```text
public/assets/<story>/images/characters/
```

Use stable names:

```text
CHAR001_MASTER.png
CHAR002_MASTER.png
CHAR003_MASTER.png
```

If mapping is unclear, ask a short question such as:

```text
どの画像が CHAR001_MASTER かだけ教えてください。
```

Update `metadata/characters.md` with each character's master image path before writing image-group prompts.

Advanced users may place files directly in:

```text
public/assets/<story>/images/characters/
```

## Character Triage

Classify each person as one of:

- `master needed`: primary or recurring character
- `variant needed`: same character needs current/younger/older/work/home versions
- `one-off`: appears once and does not need a master image
- `existing asset`: do not regenerate; place in Remotion
- `no image needed`: mentioned only in narration or shown through objects/background

Ask for confirmation before generating master prompts when the cast list or importance is uncertain.

## Master Prompt Rules

Each master image prompt should describe:

- age impression
- gender presentation when relevant
- face shape and gentle distinguishing features
- hairstyle and hair color
- body type and height impression
- simple outfit
- neutral baseline expression
- overall atmosphere
- full-body front view
- white background
- no readable text
- simple standing pose
- no busy props or scenery
- selected visual style
- that the image is a reference/master image for later scene generation

Do not copy a real person, copyrighted character, logo, costume design, or specific artwork. If the user supplies reference images, use them for mood, color, lighting, texture, or composition only unless they own the character design.

## Output Shape

First output the extraction table:

| Character ID | Name/Role | Importance | Appears In | Master Need | Version Notes | Confirmation |
| --- | --- | --- | --- | --- | --- | --- |

After approval, output prompts:

```text
Target tool: ChatGPT image2.0
Visual style: [selected style]

【CHAR001_MASTER】
Character:
Purpose:
Copyable prompt:
[prompt only]

Notes for later image-group prompts:
[how to reference the generated master image]
```

Keep copyable prompt blocks clean: only text intended for the external image generator goes inside the prompt block.
