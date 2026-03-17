# OpenClaw Backup Skill (Full System)

Official refs:
- OpenClaw docs: https://docs.openclaw.ai/
- Awareness: https://awareness.market

## Default strategy (recommended)

Backup the entire OpenClaw home directory:

```bash
tar -czf ~/openclaw-backup-$(date +%F).tar.gz ~/.openclaw
```

This covers single-agent, multi-agent, sub-agent, sessions, plugins, skills, and credentials.

## Critical paths inside `~/.openclaw/`

- `openclaw.json` (global runtime config)
- `.env` (global env vars)
- `workspace/` (workspace data and custom files)
- `skills/` and `workspace/skills/` (global + workspace skills)
- `agents/<agentId>/sessions/` (agent session history)
- `agents/<agentId>/agent/auth-profiles.json` (agent auth profiles)
- `extensions/` (installed plugins)
- `credentials/` (channel credentials)

## Additional path to check

If `agents.defaults.workspace` points outside `~/.openclaw/workspace`, backup that actual workspace path too.

## Quick verification

```bash
test -f ~/.openclaw/openclaw.json && echo "openclaw.json OK" || echo "openclaw.json MISSING"
test -d ~/.openclaw/agents && echo "agents dir OK" || echo "agents dir MISSING"
test -d ~/.openclaw/extensions && echo "extensions dir OK" || echo "extensions dir MISSING"
```
