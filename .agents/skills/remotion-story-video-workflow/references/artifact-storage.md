# Artifact Storage

Use this reference whenever a workflow output will be needed later. Do not leave important materials only in chat.

Standard story folder:

```text
public/assets/<story>/
```

If `<story>` is unknown, ask for a short lowercase slug or propose one from the title. Use ASCII letters, digits, and hyphens.

## Folders

```text
public/assets/<story>/metadata/
public/assets/<story>/prompts/
public/assets/<story>/inbox/characters/
public/assets/<story>/inbox/images/
public/assets/<story>/images/
public/assets/<story>/images/characters/
public/assets/<story>/audio/
public/assets/<story>/videos/
```

## Files To Save

| When | Save As | Why |
| --- | --- | --- |
| Intake completed script | `metadata/source-script.md` | Source of truth for strict telop splitting |
| Intake supplemental notes | `metadata/supplemental-notes.md` | Source for description, chapters, sources, tags |
| Approved telop split | `metadata/telop-split.md` | Prevents re-splitting from memory |
| Approved visual style | `metadata/visual-style.md` | Keeps image, character, and prompt style consistent |
| Approved scene plan and image groups | `metadata/scene-plan-image-groups.md` | Basis for characters, prompts, and manifest |
| Character list/triage | `metadata/characters.md` | Tracks who needs master images or no image |
| Character master prompts | `prompts/character-master-prompts.md` | Copyable external image-AI prompts |
| Character master image intake | `inbox/characters/` | Beginner-friendly drag-and-drop receiving folder |
| Generated character master images | `images/characters/CHAR001_MASTER.png` | Reference images for later image prompts |
| Image-generator fixed prompt | `prompts/image-generator-fixed-prompt.md` | First prompt to paste into the external image generator to lock master images, style, no-text rules, and `Save filename` behavior |
| Generated image intake | `inbox/images/` | Beginner-friendly drag-and-drop receiving folder for many generated images |
| Image prompt batches | `prompts/image-groups-001-010.md` | Copyable external image-AI prompts by batch |
| Asset mapping | `metadata/asset-map.md` | Maps scenes to images, audio, video, duration |
| Manifest draft/final | `manifest.draft.json`, `manifest.final.json` | Timeline source for Remotion |
| Handmade direction proposal | `metadata/handmade-direction.md` | Human-approved enhancement plan |
| Video AI prompts | `prompts/video-ai-prompts.md` | Copyable external video-AI prompts |
| Production changes | `metadata/production-log.md` | Source for final YouTube description alignment |
| Timestamp checklist | `metadata/timestamp-checklist.md` | Holds actual chapter timing before final copy |
| YouTube final draft | `metadata/youtube-publishing-final.md` | Copy-ready description, chapters, tags |

For image prompt batches, continue the numbering:

```text
prompts/image-groups-001-010.md
prompts/image-groups-011-020.md
prompts/image-groups-021-030.md
```

## Save Before Moving On

After each checkpoint is approved, save the artifact and tell the user:

```text
この内容は後から参照できるように、次のファイルへ保存しました。
[path]
次に進みます。
```

If the user changes a saved artifact, update the saved file before using it downstream.

## Beginner Image Intake

Do not expect beginners to find deep folders manually. When the user needs to provide generated images, create the inbox folder and open it in Explorer.

For character master images:

```text
public/assets/<story>/inbox/characters/
```

For scene/image-group images:

```text
public/assets/<story>/inbox/images/001-010/
```

Tell the user:

```text
受け取り用フォルダを開きました。
外部画像生成AIで作った画像を、この開いたフォルダへドラッグ＆ドロップしてください。
このフォルダには、画像グループ001〜010の画像だけを入れてください。
ダウンロード名が数字の羅列になる場合は、できるだけプロンプトに書かれている保存名へ変えてください。
例: img_001.png、img_002.png
完全に同じ名前でなくても、img_001(2).png、img_001_修正版.png のように画像IDが分かれば大丈夫です。
A/B案を両方残す場合は img_001_A.png、img_001_B.png のようにしてください。
Codexが確認後、最終的なファイル名へ整えます。
画像IDが分からない名前のままになっている場合だけ、どのファイルがどの画像IDか分かる簡単なメモを一緒に渡してください。
入れ終わったら「001〜010を入れました」と教えてください。
```

After that, Codex should inspect the batch inbox, ask only if mapping is unclear, then rename/move files into the stable folders such as `images/characters/` or `images/`.
