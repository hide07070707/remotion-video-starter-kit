# YouTube Publishing Rules

Use this reference when a Remotion story video includes supplemental YouTube publishing notes, or when the user asks for final posting information after the video is complete.

## 1. Intake: Completed Script vs Supplemental Notes

When the user provides both a completed script and supplemental YouTube publishing notes, keep them strictly separate.

### Completed Script

Use the completed script as the source of truth for:

- narration
- subtitles / telops
- strict scene splitting
- scene planning
- image groups
- audio generation
- manifest text
- the video body

Do not rewrite, summarize, omit, add, reorder, or rephrase the completed script unless the user explicitly approves a script change.

### Supplemental YouTube Publishing Notes

Do not use supplemental notes as narration, subtitles, telops, scene text, or video-body text.

Use supplemental notes only as support for:

- understanding this video's unique argument, examples, judgement axis, and conclusion
- avoiding generic or mass-produced-feeling content
- later YouTube description writing
- later chapter naming
- hashtag and YouTube Studio tag candidates
- fixed comment ideas
- source, citation, and claim follow-up

At intake, summarize these six items before moving to strict telop splitting:

1. What this video is about
2. Which saved file is the video-body source of truth
3. How the supplemental notes will be used
4. What must not be used in the video body
5. What to remember so the video does not feel generic
6. The next production step

Do not create the final YouTube description at intake. Real chapter times are not known until the video timing is complete.

## 2. Proactive User Guidance

Most beginners will not know that Codex can create final YouTube posting information. Proactively offer it at the right time.

After receiving supplemental notes, say in plain language:

```text
この補助資料は、動画本編には使わず、完成後のYouTube投稿準備に使えます。
動画完成後には、タイトル・説明欄・実際の時間に合わせたチャプター・タグ・固定コメントまで整理できます。
今は本編制作を進め、完成後にこちらから投稿準備を案内します。
```

After the MP4 is completed and the user says the final check is OK, say:

```text
動画が完成しました。
次に、YouTube投稿準備へ進めます。

補助資料と完成動画の内容を照合して、タイトル、説明欄、実際のチャプター時間、ハッシュタグ、YouTube Studioタグ、固定コメントを作成できます。
進める場合は「YouTube投稿準備へ進んで」と言ってください。
```

If the user asks what comes next after final video confirmation, include YouTube posting preparation as the next normal option.

## 3. Final YouTube Posting Trigger

Use this workflow when the user says things like:

- `YouTube投稿準備をして`
- `投稿情報を作って`
- `概要欄を作って`
- `概要欄とチャプターを最終化して`
- `タイトル、説明欄、チャプター、タグ、固定コメントを作って`

Before writing final posting copy, check:

- completed script
- supplemental notes
- telop/subtitle file
- manifest
- final video timing or chapter start frames
- production log, if changes were made after the completed script

Do not write from memory when files exist.

## 4. Final Description Rules

Do not write a generic plot summary from scratch when supplemental notes exist. Prefer the video's own:

- unique argument
- specific examples
- judgement axis
- conclusion
- viewer takeaway

Remove or revise any supplemental-note content that does not appear in the finished video.

Rules:

- Match the finished video.
- Do not include content that the video does not cover.
- Avoid hype, guilt, or keyword stuffing.
- If the story can be mistaken for a literal true story, clearly say it is reconstructed or fictionalized when appropriate.
- For medical, caregiving, legal, financial, or administrative systems, recommend official confirmation instead of inventing details.
- Do not invent source names, URLs, statistics, references, or expert claims.
- Do not list materials as references if the finished video did not actually use them.

## 5. Chapter Rules

Chapters must use actual video timestamps.

Rules:

- Start with `0:00`.
- Use YouTube-compatible timestamp format.
- Do not use generic labels such as `Opening`, `Chapter 1`, `Summary`, or `Conclusion` alone.
- Make each chapter title show the section's value or meaning.
- Avoid exaggeration or claims that do not match the video.
- For story videos, keep chapter names natural and not too stiff or textbook-like.

Good style:

```text
0:00 第1章「あの夜の一声」｜介護者の限界に気づいた夜
1:32 第2章「ハルがいた頃」｜家族と老犬が積み重ねた時間
4:30 第3章「大丈夫、という言葉」｜弱音を言えない人の心理
8:12 第4章「冷めたお茶」｜一人で抱え込む介護の日々
10:30 第5章「たった一度だけ」｜声にならないSOSに気づく瞬間
13:08 第6章「もう一人じゃない」｜助けを求めることも愛情
```

Bad style:

```text
0:00 オープニング
1:32 第1章
4:30 第2章
8:12 まとめ
```

## 6. Hashtag And Tag Rules

Hashtags inside the description:

- Use 3 to 5.
- Use only terms that match the video.
- Do not add unrelated popular keywords.
- Keep them separate from YouTube Studio tags.

YouTube Studio tag candidates:

- Output separately from the description body.
- Use 3 to 5 candidates by default.
- Use searchable but accurate phrases.
- Avoid filling the field with only generic words.

## 7. Fixed Comment Rules

The fixed comment should help viewers comment naturally.

Rules:

- Thank viewers.
- Match the video theme.
- Ask a gentle question viewers can answer.
- Avoid expressions that create guilt or pressure.
- Avoid making the comment heavier than the video needs.

## 8. Required Final Output Format

When producing final posting information, output this structure:

```text
【1. タイトル 最終案】
[one final title]
[optional: up to two alternate titles]

【2. 説明欄 最終案】
[copy-ready YouTube Studio description]

【3. チャプター 最終案】
[actual timestamps starting from 0:00]

【4. ハッシュタグ】
[3-5 hashtags]

【5. YouTube Studioタグ候補】
[3-5 comma-separated tags]

【6. 固定コメント案】
[viewer-friendly fixed comment]

【7. 動画内容と投稿情報のズレ確認】
・タイトルと本編内容にズレはないか：
・説明欄と本編内容にズレはないか：
・チャプター名と実際の章内容にズレはないか：
・ハッシュタグと本編内容にズレはないか：
・タグ候補と本編内容にズレはないか：
・参考・補足に、未確認情報や誤認リスクはないか：
・量産型に見えないよう、この動画だけの独自性が見えるか：
```

Also save the final result to:

```text
public/assets/<story>/metadata/youtube-posting.md
```

or, if the project already uses another final posting file name, use that existing convention.

