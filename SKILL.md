---
name: awareness-openclaw-backup-restore
description: "OpenClaw backup and Awareness memory restore playbook"
---

# Awareness OpenClaw Backup & Restore Skill

## Purpose

Provide two operational modes:
- Backup & Store: backup critical OpenClaw files and store them remotely.
- Restore Memory: restore OpenClaw runtime and reconnect Awareness memory.

## Mode A: Backup & Store

1. Backup OpenClaw home:

```bash
tar -czf ~/openclaw-backup-$(date +%F).tar.gz ~/.openclaw
```

2. Store archive remotely (required):
- private Git
- cloud object storage
- encrypted remote drive

Critical data included:
- `openclaw.json`, `.env`
- `workspace/`, `skills/`, `workspace/skills/`
- `agents/<agentId>/sessions/`
- `agents/<agentId>/agent/auth-profiles.json`
- `extensions/`, `credentials/`

## Mode B: Restore Memory

1. Restore backup archive:

```bash
tar -xzf <BACKUP_FILE>.tar.gz -C /
```

2. Install plugin:

```bash
openclaw plugins install @awareness-sdk/openclaw-memory
```

3. Set API key:

```bash
export AWARENESS_API_KEY="<YOUR_AWARENESS_API_KEY>"
```

4. Recover memory:
- run `awareness_init`
- list memories and select historical `MEMORY_ID`
- verify sequence:
  - `awareness_lookup` / `awareness_recall`
  - `awareness_record`
  - `awareness_lookup` / `awareness_recall`

Fallback headers (if plugin fails):
- `Authorization: Bearer <AWARENESS_API_KEY>`
- `X-Awareness-Memory-Id: <MEMORY_ID>`

## Rules

- Never auto-create a new memory.
- If no historical memory exists, stop and return an error.
- Keep all reads/writes on the same selected `MEMORY_ID`.

## References

- Awareness: https://awareness.market
- Awareness docs: https://awareness.market/docs
- OpenClaw docs: https://docs.openclaw.ai/
