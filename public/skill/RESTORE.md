# OpenClaw Restore Skill (Full System + Awareness Memory)

Official refs:
- OpenClaw docs: https://docs.openclaw.ai/
- Awareness docs: https://awareness.market/docs

## Restore sequence

### 1) Restore OpenClaw files

Restore the full backup archive (recommended):

```bash
tar -xzf <BACKUP_FILE>.tar.gz -C /
```

Then ensure these paths exist:
- `~/.openclaw/openclaw.json`
- `~/.openclaw/agents/`
- `~/.openclaw/extensions/`
- `~/.openclaw/skills/` and `~/.openclaw/workspace/skills/`

### 2) Reinstall/verify Awareness plugin

```bash
openclaw plugins install @awareness-sdk/openclaw-memory
```

### 3) Set API key

```bash
export AWARENESS_API_KEY="<YOUR_AWARENESS_API_KEY>"
```

### 4) Recover memory

- Run `awareness_init`
- List memories
- User selects one existing historical `MEMORY_ID`
- Verify in sequence on same `MEMORY_ID`:
  - `awareness_lookup` / `awareness_recall`
  - `awareness_record`
  - `awareness_lookup` / `awareness_recall`

## Fallback (plugin failure)

Use MCP headers:
- `Authorization: Bearer <AWARENESS_API_KEY>`
- `X-Awareness-Memory-Id: <MEMORY_ID>`

## Rules

- If no historical memory exists, stop and return error
- Never auto-create a new memory
- Keep all reads/writes on the same selected `MEMORY_ID`
