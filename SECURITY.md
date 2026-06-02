# Security Policy

This repository is intended for public sharing as a template. Do not commit real project secrets or private production assets.

## Do Not Commit

- `.env` or any file containing API keys
- real scripts, unpublished story text, client material, or private notes
- generated audio, video, or final MP4 files
- generated character images, scene images, or image-to-video outputs
- YouTube drafts containing private sources, unpublished URLs, or personal information

The `.gitignore` file is configured to ignore common generated files under `public/assets/<story>/`, including `metadata/`, `prompts/`, `inbox/`, `audio/`, `videos/`, generated `images/`, and manifest drafts/final manifests.

## Before Publishing Changes

Run these checks before pushing to a public GitHub repository:

```bash
git status --short
npm run test
```

Also search for accidental secrets:

```bash
rg -n -i "api[_-]?key|secret|token|password|bearer|private key|OPENAI|ELEVEN|HIGGS" .
```

False positives in `package-lock.json` can happen because package names may contain words such as `token`.

## If A Secret Was Committed

Deleting the file in a later commit is not enough. Treat the secret as exposed:

1. Revoke or rotate the API key immediately.
2. Remove the secret from Git history before making the repository public.
3. Re-check the repository before sharing it again.

## Reporting

If you find a security issue in this template, report it privately to the repository owner instead of opening a public issue with sensitive details.
