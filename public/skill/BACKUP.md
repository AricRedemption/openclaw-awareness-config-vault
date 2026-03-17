# OpenClaw Backup & Storage (Essentials)

## Goal
Backup critical OpenClaw data and store it in a safe remote location.

## 1) Backup (recommended)

```bash
tar -czf ~/openclaw-backup-$(date +%F).tar.gz ~/.openclaw
```

## 2) Store (required)

Save the archive to at least one remote target:
- Private Git repo
- Cloud object storage (S3/R2/OSS)
- Encrypted network drive

## Critical data included in `~/.openclaw/`

- `openclaw.json`, `.env`
- `workspace/`, `skills/`, `workspace/skills/`
- `agents/<agentId>/sessions/`
- `agents/<agentId>/agent/auth-profiles.json`
- `extensions/`, `credentials/`

## Verify

```bash
test -f ~/openclaw-backup-$(date +%F).tar.gz && echo "backup archive OK" || echo "backup archive MISSING"
```
