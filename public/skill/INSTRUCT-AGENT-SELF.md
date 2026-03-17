# OpenClaw + Awareness Recovery Skill

Official website: https://awareness.market
OpenClaw docs: https://docs.openclaw.ai/

## Goal

Recover a broken/reinstalled OpenClaw by restoring:
- OpenClaw core configuration
- Skill definitions and prompt injection files
- Awareness memory access (`AWARENESS_API_KEY` + selected `MEMORY_ID`)

## What must be backed up (critical)

1. `~/.openclaw/openclaw.json`
   - Core runtime config (gateway/model/channels/tool/session settings)
2. `~/.openclaw/.env`
   - Global environment variables
3. `~/.openclaw/workspace/`
   - Workspace content and custom artifacts
4. `~/.openclaw/workspace/skills/`
   - Skill folders and `SKILL.md`
5. Prompt injection files in workspace root (if used):
   - `AGENTS.md`
   - `SOUL.md`
   - `TOOLS.md`
6. `~/.openclaw/credentials/` (if channel auth exists)
   - Channel login/session credentials (e.g. WhatsApp)

## Restore procedure (plugin first)

### 1) Reinstall OpenClaw and restore files

Restore the critical files/directories above to the same locations.

### 2) Install Awareness plugin

```bash
openclaw plugins install @awareness-sdk/openclaw-memory
```

### 3) Set API key

```bash
export AWARENESS_API_KEY="<YOUR_AWARENESS_API_KEY>"
```

### 4) Initialize and select memory

- Run `awareness_init`
- List available memories
- User selects one existing historical `MEMORY_ID`

### 5) Verify recovery on selected `MEMORY_ID`

- `awareness_lookup` / `awareness_recall` (read historical memory)
- `awareness_record` (write one test record)
- `awareness_lookup` / `awareness_recall` (read-back check)

## Fallback (if plugin path fails)

Use MCP with headers:
- `Authorization: Bearer <AWARENESS_API_KEY>`
- `X-Awareness-Memory-Id: <MEMORY_ID>`

Reference: https://awareness.market/docs

## Hard rules

- Never auto-create a new memory when none exists
- If no historical memory is available, stop and return error
- Keep all reads/writes on the same selected `MEMORY_ID`
