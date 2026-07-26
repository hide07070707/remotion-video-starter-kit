---
name: character-master-image-workflow
description: Create a reusable character master sheet from one character-design prompt. Use when the user wants to generate a character for a video, animation, story, or illustration and needs a consistent front image, full-body three-view sheet, attractive bust-up key visual, and final reference sheet. Accept one pasted character prompt and guide the image-generation workflow in order, preserving identity and asking for approval between stages.
---

# Character Master Image Workflow

Create a stable character reference package from one character-design prompt. The required input is the character prompt produced by the user's planning workflow; do not make the user paste a new prompt at every stage.

## Operating rules

- Treat the user's character-design prompt as the source of truth for identity, age, appearance, clothing, palette, personality, and art style.
- Preserve the same character across every stage. Reuse the generated images as references when the image tool supports image references.
- Do not silently change the character's face, hair or fur, body shape, clothing, accessories, colors, age, or style.
- Never mix two characters in one master package. For multiple characters, complete one character at a time and keep separate image groups and filenames.
- Use a calm, collaborative workflow: generate one stage, ask the user to check it, and wait for approval before continuing. If the user requests a correction, revise the current stage and do not advance.
- Do not add text, labels, captions, logos, watermarks, speech bubbles, or decorative lettering inside generated images unless the user explicitly requests them.
- Do not claim that an image was saved to a local folder unless the environment actually saved it. When local saving is unavailable, tell the user to download the approved image and provide a safe filename.

## Required input

If the user has not supplied a character-design prompt, ask for it before generating anything. A prompt may be pasted directly or supplied as an attached text file. Also accept optional reference images.

If the user supplies only a character name, ask for the missing character description instead of inventing important identity details. It is acceptable to infer minor staging details, but state those assumptions briefly.

At the start, identify:

- character name or working label;
- the complete character-design prompt;
- attached reference images, if any;
- requested aspect ratio or image tool, if specified.

Use 16:9 for the final reference sheet when no ratio is specified. Use the user's requested ratio when one is supplied. For the three-view sheet, prioritize a clear full-body layout over a forced ratio.

## Workflow

### Stage 1: Front reference image

Convert the supplied character prompt into one clean front-facing character image. Keep the pose easy to inspect and make the identifying features visible. Use a neutral or gently natural pose unless the user asks for a dramatic pose.

Before generating, silently combine the character prompt with these requirements:

```text
Create one clear front-facing reference image of this character.
Preserve all character-defining details from the supplied character prompt.
Make the face, hairstyle or fur, body shape, clothing, accessories, and color palette easy to inspect.
Use the supplied art style consistently. Do not add text, labels, logos, watermarks, or speech bubbles.
```

If the supplied prompt already specifies background, lighting, pose, or framing, keep those instructions unless they conflict with the requirements above.

Generate the image if an image-generation tool is available. Otherwise, output one copyable prompt for the user's image tool. After the result, ask whether the character's appearance is correct. Wait for approval.

Suggested filename after approval: `<character-slug>_front_master.png`.

### Stage 2: Full-body three-view sheet

Use the approved front image as the primary reference. Create one full-body sheet showing the same character in three aligned views:

- front view;
- left or right side view;
- back view.

Use this prompt structure:

```text
Use the approved front reference image as the primary character reference.
Create a full-body three-view character sheet of the exact same character: front view, side view, and back view.
Keep all three views at the same scale and aligned on one clean white background.
Preserve the face, hairstyle or fur, body proportions, clothing, accessories, colors, and art style from the reference.
Show the character clearly and completely. Do not add text, view labels, logos, watermarks, or decorative elements.
```

Do not allow the three views to become three different designs. Correct identity drift, missing accessories, asymmetrical clothing errors, extra limbs, or cropped feet before asking for approval. Wait for approval.

Suggested filename after approval: `<character-slug>_three-view.png`.

### Stage 3: Bust-up key visual

Use the approved front image and, when useful, the approved three-view sheet as references. Create one attractive bust-up image of the same character. This is the memorable key visual, sometimes called the user's “miracle image”; do not optimize it into an unrelated new design.

Use this prompt structure:

```text
Use the approved character references and create one attractive bust-up key visual of the exact same character.
Use cinematic but appropriate lighting that supports the supplied mood and art style.
Keep the face, hair or fur, age, colors, clothing, and defining accessories consistent with the references.
Use a clean white background unless the user requested another background.
Use a 16:9 composition unless another ratio was requested.
Do not add text, labels, logos, watermarks, or speech bubbles.
```

The key visual may have a natural expression or pose that fits the character prompt, but it must remain recognizably the same character. Wait for approval.

Suggested filename after approval: `<character-slug>_key-visual.png`.

### Stage 4: Combined reference sheet

Use the approved three-view sheet and approved bust-up key visual as image references. Combine them into one clean reference sheet. Do not redraw the character into a new design while combining the images.

Use this prompt structure:

```text
Combine the two supplied approved character images into one character reference sheet.
Include the complete full-body three-view sheet and the bust-up key visual in a clean, balanced 16:9 layout.
Keep both source images readable, separated, and uncropped. Use a plain white background.
Preserve the character exactly as shown in the supplied images.
Do not add text, labels, logos, watermarks, borders, or extra character variations.
```

Check that the three views are still readable, the bust-up image is not covering them, and no important part is cropped. Ask the user to approve the final sheet.

Suggested filename after approval: `<character-slug>_master-reference-sheet.png`.

## Image-tool fallback

When the current surface cannot generate images directly:

1. Output the prompt for only the current stage.
2. Tell the user which approved image must be attached as a reference.
3. Wait for the user to attach the generated image and confirm approval.
4. Continue to the next stage without asking the user to paste the original character prompt again.

When the current surface can generate images, do not unnecessarily return a long prompt for the user to copy. Generate the current stage, then request the short approval needed to proceed.

## Completion checklist

Before declaring the package complete, verify:

- the same character is recognizable in every image;
- front, side, and back views are all full-body and readable;
- the key visual matches the approved character references;
- the final sheet contains the three-view sheet and key visual without overlap or cropping;
- no unrequested text, logo, watermark, label, or extra character appears;
- the user knows the filenames and where to place or download the approved files.

When a local project folder is explicitly available and write access is authorized, save or copy only after approval and use a character-specific subfolder. Never overwrite another project's images. Otherwise, provide filenames and let the user download the images for later organization.
