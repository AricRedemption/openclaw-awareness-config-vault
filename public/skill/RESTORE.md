# OpenClaw Restore from Awareness (Closed Loop)

Official refs:
- Awareness: https://awareness.market
- Awareness docs: https://awareness.market/docs
- OpenClaw docs: https://docs.openclaw.ai/

## Goal
Recover OpenClaw with a complete closed loop:
`Read backup index from Awareness -> Locate archive -> Restore files -> Restore memory`.

## Prerequisites

- `AWARENESS_API_KEY`
- Existing historical `MEMORY_ID` (must not create a new one)
- Access permission to the backup archive location recorded in Awareness

## Closed-Loop Procedure

### 1) Read backup index from Awareness

1. Install plugin (if missing):

```bash
openclaw plugins install @awareness-sdk/openclaw-memory
```

2. Export key and initialize on the same historical memory:

```bash
export AWARENESS_API_KEY="<YOUR_AWARENESS_API_KEY>"
```

3. Run `awareness_init` with the target historical `MEMORY_ID`.
4. Query backup index record by `awareness_lookup` / `awareness_recall` and obtain:
- `archive_uri` (or equivalent archive location field)
- `backup_timestamp`
- `backup_scope` (what was included)
- optional integrity info (checksum/signature if present)

Exit with error if no valid backup index record is found.

### 2) Locate and validate archive

1. Use `archive_uri` from step 1 to fetch/copy archive to local restore host.
2. Confirm archive matches index metadata:
- filename/version matches
- timestamp is expected
- checksum matches (if checksum exists in index)
3. Define restore source artifact as `<BACKUP_FILE>.tar.gz`.

Exit with error if archive cannot be reached or validation fails.

### 3) Restore OpenClaw files

Restore from the validated archive:

```bash
tar -xzf <BACKUP_FILE>.tar.gz -C /
```

Required paths after restore:
- `~/.openclaw/openclaw.json`
- `~/.openclaw/agents/`
- `~/.openclaw/extensions/`
- `~/.openclaw/skills/`
- `~/.openclaw/workspace/skills/`

Run a file-level sanity check (existence + readable permissions) for all required paths.

### 4) Restore memory and verify round-trip

Keep using the exact same `MEMORY_ID` from step 1:

1. `awareness_lookup` / `awareness_recall` to confirm historical context is readable.
2. `awareness_record` with a restore marker event (for example: restore timestamp and archive id).
3. `awareness_lookup` / `awareness_recall` again to verify the new marker is readable.

Success condition:
- historical records are readable
- new restore marker is written and can be read back
- file restore sanity checks are all green

## Fallback (plugin failure)

Use MCP headers:
- `Authorization: Bearer <AWARENESS_API_KEY>`
- `X-Awareness-Memory-Id: <MEMORY_ID>`

Then execute the same 4-step closed loop above through MCP calls.

## Rules

- Never auto-create a new memory during restore
- If backup index is missing, stop and return error
- If archive location is invalid, stop and return error
- Keep all restore and verification operations on the same selected `MEMORY_ID`
