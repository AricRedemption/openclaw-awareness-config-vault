# OpenClaw Backup Skill (Files Only)

Official refs:
- OpenClaw docs: https://docs.openclaw.ai/
- Awareness: https://awareness.market

## Goal
Backup all critical OpenClaw files required for disaster recovery.

## Backup these paths

1. `~/.openclaw/openclaw.json`
2. `~/.openclaw/.env`
3. `~/.openclaw/workspace/`
4. `~/.openclaw/workspace/skills/`
5. Workspace root prompt files (if present):
   - `AGENTS.md`
   - `SOUL.md`
   - `TOOLS.md`
6. `~/.openclaw/credentials/` (if channel credentials exist)

## Minimal backup command (Linux/macOS)

```bash
mkdir -p ~/openclaw-backup
cp -a ~/.openclaw/openclaw.json ~/.openclaw/.env ~/.openclaw/workspace ~/.openclaw/credentials ~/openclaw-backup/ 2>/dev/null || true
```

## Verify backup

```bash
test -f ~/openclaw-backup/openclaw.json && echo "openclaw.json OK" || echo "openclaw.json MISSING"
test -d ~/openclaw-backup/workspace && echo "workspace OK" || echo "workspace MISSING"
```
