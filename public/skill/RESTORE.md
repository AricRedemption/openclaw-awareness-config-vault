# OpenClaw Restore Skill (Awareness Memory)

Official refs:
- OpenClaw docs: https://docs.openclaw.ai/
- Awareness docs: https://awareness.market/docs

## Goal
Restore OpenClaw runtime + reconnect Awareness memory after reinstall/crash.

## Restore flow

1. Restore backed up files to original locations.
2. Install plugin:

```bash
openclaw plugins install @awareness-sdk/openclaw-memory
```

3. Set API key:

```bash
export AWARENESS_API_KEY="<YOUR_AWARENESS_API_KEY>"
```

4. Run `awareness_init`, list memories, user selects one historical `MEMORY_ID`.
5. Verify on selected `MEMORY_ID`:
   - `awareness_lookup` / `awareness_recall`
   - `awareness_record`
   - `awareness_lookup` / `awareness_recall`

## Fallback (plugin failure)
Use MCP headers:
- `Authorization: Bearer <AWARENESS_API_KEY>`
- `X-Awareness-Memory-Id: <MEMORY_ID>`

## Rules
- If no historical memory exists, stop and return error.
- Never auto-create a new memory.
- Keep all reads/writes on the same selected `MEMORY_ID`.
