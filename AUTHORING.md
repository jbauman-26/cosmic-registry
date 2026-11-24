# Writing a kit

[README.md](README.md) is the page people see. Keep it plain. Maintainer notes live here.

## What a kit is

The reader of a kit is an agent, not a package manager. A kit is a runbook with its evidence:

```
kits/<name>/
  kit.yaml     manifest: name, version, title, summary, keywords, needs, requires_cli, writes, secrets, files
  AGENT.md     the steps, ending in a "## Verify" checklist
  README.md    one short paragraph for people
  files/       reference files AGENT.md points at, such as an output template
shared/
  editing-standard.md   copied next to every kit that writes words for people
index.json     generated catalog, read by the CLI
```

## Rules

- Nothing sends. A kit may write only what `writes` says, and only after the user approves a plan in the same conversation.
- Every number a kit tells the agent to report must come from CLI output. Missing facts are written as [NEEDS NUMBER] or [NEEDS SOURCE].
- Attributed revenue is called attributed revenue, every time.
- No em or en dashes in any file.
- Name each step's tool by its MCP name (`list_metrics`, `metric`, `query`, `reconcile`, `run_tool`) and give the terminal command second. Kits run in the Cosmic AI app for people who have no terminal.
- A paid provider call runs on the owner's own key, shows its cost first, stays inside a limit the owner set, and is never started twice.
- A platform write waits for the owner's approval unless that connection is set to `Change without asking`.
- Customer names, emails and addresses are never read or written.
- Bump `version` on every change, and set `requires_cli` to the oldest CLI that has every command the runbook uses.

## Workflow

```sh
lifecycle kits validate . --write-index   # rebuild index.json and the catalog in README.md
lifecycle kits validate .                 # the same checks CI runs from scripts/validate.mjs
lifecycle kits list --registry .          # try it against this folder
lifecycle kits add NAME --registry . --into /tmp/try
```

CI runs `scripts/validate.mjs`, a copy of the CLI's checks, because the CLI repo is private and CI cannot download it. Change both together. CI fails if index.json does not match the kit folders, a runbook has no Verify checklist, or a file it points at is missing.
