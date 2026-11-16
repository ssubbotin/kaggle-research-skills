---
name: kaggle-code-submission
description: Use when pushing, versioning, running or submitting a Kaggle code-competition notebook (internet off, time-limited GPU/CPU kernel, hidden-test rerun), packaging weights or wheels as Kaggle datasets, reading kernel logs or outputs, or when a submission errors, scores 0, times out, or the CLI returns a bare 400 or 409.
---

# Kaggle code submission: the traps that cost submissions

Distilled from the working logs of several code competitions. Every rule below is a failure that happened.

Placeholders: `<competition>` is the competition slug, `<owner>` the account that owns the kernel or dataset,
`<kernel>` the kernel slug, `<dataset>` a dataset slug, `<N>` a kernel version number.

## The CLI

- Run the `kaggle` CLI from `~` (a directory named `kaggle` in the cwd shadows the python package).
- Credentials are a bearer token in `~/.kaggle/access_token` (env `KAGGLE_API_TOKEN`); there may be no
  `kaggle.json`. Keep the token on the local machine; do not copy it to remote compute hosts.
- `kaggle competitions files <competition>` working means the rules are accepted.
- Forum topics without a browser: `kaggle forums topics show <id>`; untruncated comments via
  `POST https://api.kaggle.com/v1/discussions.DiscussionApiService/ListComments` with the bearer token.

## Kernel identity

- `kernel-metadata.json` `id` MUST equal `<owner>/<kernel>` where `<kernel>` is the slug Kaggle derives from
  `title` (lowercase, spaces and punctuation to hyphens). Otherwise the first push creates the title-slug kernel
  and every later push 409s against a non-existent id, silently (the failure line is not last; `| tail` hides it).
- Copying someone's notebook: pull with `-m`, rename the `.ipynb`, set `id`, `title`, `code_file`,
  `is_private: true`, drop `id_no`. Keep `docker_image` pinned if the original pins it (behaviour depends on it).
- **After every push, verify the artifact**: `kaggle kernels pull <owner>/<kernel> -p <tmp>` and grep for the line
  you changed. A push's exit text is not evidence.

## Running and submitting

- A kernel VERSION run (the commit run) is free; only `competitions submit` spends a daily slot.
- Submit a specific version:
  `kaggle competitions submit <competition> -k <owner>/<kernel> -v <N> -f submission.csv -m "..."`.
  Then `kaggle competitions submissions <competition>` and confirm the row is PENDING.
- The commit run sees the visible (dummy) test; the scoring rerun sees the hidden test and can take much longer.
  Notebooks detect the rerun with `KAGGLE_IS_COMPETITION_RERUN` and/or a hash of the visible test file; check what
  the notebook keys on before trusting a "smoke" commit run as a runtime estimate.
- A commit run's wall clock on the visible test is not the billed clock of the rerun. Measure the time per test
  unit (per row, per case) and multiply by the hidden test size, with margin for the competition's runtime limit
  (commonly 9 h).
- The CLI hides code-submission errors as a bare 400: open the submission on the website or read the kernel log.
- Kernel outputs: `kaggle kernels output <owner>/<kernel> -p <dir> --file-pattern "submission.csv|.*\.log"`; the
  log is JSON lines (`data` field). Output listing pages; a "Next page token" means more files.

## Never submit a silent fallback

- Guard every stage by time and by failure, and log which stages ran. A stage that fails must fail loudly or fall
  back to an explicitly named, logged fallback, never to an empty or default answer that still scores.
- A byte-size or hash canary of `submission.csv` (or of a stage output) printed in the log lets you see after the
  fact which path produced the file.
- Rejections to expect: nulls, a wrong id set and, where a row holds a ranked list of guesses, duplicate guesses
  per row or too many guesses. Validate the file shape against `sample_submission.csv` at the end of the notebook.

## Offline dependencies

- Internet is off: every wheel and weight ships as a Kaggle dataset. Build wheels for the Kaggle image's Python
  (`pip download --only-binary=:all: --platform manylinux_2_28_x86_64 --python-version 3.X`), attach the dataset,
  install with `pip install --no-index --find-links /kaggle/input/<dataset>`.
- When the metric pins a library version (hosts usually publish the exact wheel as a dataset next to the metric
  code), attach the same wheel and compute with it any derived identifier the metric compares. An identifier
  computed with another version of the library can differ from the metric's and score as a miss.
- Dataset versions: re-upload with the same filenames, bump the version, re-version the kernel; check the kernel
  attaches the new dataset version (the kernel pins a version at save time).
- Keep a local Kaggle-layout replica (`fakeinput/`: `/kaggle/input/<competition>/...`, attached datasets) on the
  compute host and dry-run the kernel script there before pushing; compare a fingerprint of the output.

## Rules that disqualify late

- Read the rules and the host's rulings on external data and weights before building on them. Look for banned
  data sources: a ban usually extends to models trained on them and to artefacts derived from them. A host can
  also require the original training code for every weights file in a selected submission.
- Final selections are few (usually two); pick them on CV, not on a small public board.
