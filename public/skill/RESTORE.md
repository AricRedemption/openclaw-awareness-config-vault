# OpenClaw Restore & Memory Recovery (Essentials)

## Goal
Restore OpenClaw runtime from backup and reconnect Awareness memory.

## 1) Restore files

```bash
tar -xzf <BACKUP_FILE>.tar.gz -C /
```

## 2) Reinstall plugin

```bash
openclaw plugins install @awareness-sdk/openclaw-memory
```

## 3) Set API key

```bash
export AWARENESS_API_KEY="<YOUR_AWARENESS_API_KEY>"
```

## 4) Recover memory

- Run `awareness_init`
- Select one existing historical `MEMORY_ID`
- Verify:
  - `awareness_lookup` / `awareness_recall`
  - `awareness_record`
  - `awareness_lookup` / `awareness_recall`

## Rules

- If no historical memory exists, stop and return error
- Never auto-create a new memory
- Keep all reads/writes on the same selected `MEMORY_ID`
