# Auto-documentation source PoC

A deliberately small web calculator used to prove an issue-to-code-to-documentation workflow. It uses plain HTML/CSS/JavaScript and Python standard-library automation: no build step and no third-party runtime dependencies, which keeps the PoC auditable.

## Calculator

Open `index.html` through any static web server. It supports add, subtract, multiply, divide, clear, invalid-input feedback, and a dedicated divide-by-zero error. Pressing Enter in either number input performs addition.

```sh
npm test
python -m unittest discover -s test -p 'test_*.py'
python -m http.server 8000
```

## Repository setup

The repository administrator must configure:

- Secret `OPENAI_API_KEY`: OpenAI project API key.
- Secret `AUTO_DOC_GITHUB_TOKEN`: fine-grained token with **Contents: read/write** and **Pull requests: read/write** on `kohei-yoshida/auto-doc-result-test`, plus **Issues: read** and **Pull requests: read** on this repository. A GitHub App installation token is preferable for production.
- Optional repository variable `OPENAI_MODEL`; default is `gpt-4.1-mini`.
- Protect `main`: require pull requests and human approval. Do not grant the automation bypass permission.

Never commit secret values. GitHub Actions reads them only from repository Secrets.

## End-to-end flow

1. Create an issue describing a calculator change.
2. Implement it on a branch and open a PR whose body contains `Fixes #<issue>`.
3. A human reviews and merges the implementation PR into `main`.
4. `update-docs.yml` gathers the merged PR, closing issues, changed files, patches, and the docs repository's current `main` Markdown.
5. The OpenAI Responses API performs impact analysis, chooses affected files, and generates Markdown.
6. Automation creates an `auto-doc/...` branch in the docs repository and opens a Docs PR. It never writes directly to docs `main`.
7. A human reviews the Docs PR. Review comments can trigger an AI revision in the same branch; final approval and merge remain human actions.

The docs `main` branch is the source of truth. Generated documentation is proposal-only until its PR is merged. The docs layout is compatible with a future `docs/main → static build → hosting` stage, but hosting is intentionally outside this PoC.

## Verification scenario

After adding Secrets, use the prepared PoC issue (or create one), change calculator behavior on a branch, open a PR with `Fixes #...`, and merge it. Confirm a Docs PR appears. Add a line-level review comment to that PR and confirm a new `[auto-doc]` commit appears on the same branch. Approve and merge manually.

## Safety and limits

- Repository content is explicitly treated as untrusted data in the model prompt.
- Generated paths must remain Markdown files inside the docs checkout.
- Bot-authored source PRs and non-merged PRs are ignored.
- Runs are serialized per source PR. Docs automation commits do not retrigger either workflow.
- API requests and prompt size are intentionally bounded for this PoC; production use should add pagination, retry/backoff, audit retention, and tighter allowlists.
