# OpenClaw Backup to Awareness (Files + Memory Index)

Official refs:
- Awareness: https://awareness.market
- Awareness docs: https://awareness.market/docs
- OpenClaw docs: https://docs.openclaw.ai/

## Goal
Create a recoverable backup in two layers:
1) Local file archive
2) Awareness memory index for fast restore guidance

## Prerequisites

- `AWARENESS_API_KEY`
- Existing Awareness `MEMORY_ID` (do not create a new one for old projects)

## Layer 1: Backup local OpenClaw files

```bash
tar -czf ~/openclaw-backup-$(date +%F).tar.gz ~/.openclaw
```

Critical scope in `~/.openclaw/`:
- `openclaw.json`, `.env`
- `workspace/`, `skills/`, `workspace/skills/`
- `agents/<agentId>/sessions/`
- `agents/<agentId>/agent/auth-profiles.json`
- `extensions/`, `credentials/`

Store archive remotely (required):
- private Git / object storage / encrypted remote drive

## Layer 2: Write backup index to Awareness

1. Install plugin:

```bash
openclaw plugins install @awareness-sdk/openclaw-memory
```

2. Initialize Awareness:
- set `AWARENESS_API_KEY`
- run `awareness_init`
- select project `MEMORY_ID`

3. Record backup metadata with `awareness_record` (important):
- backup timestamp
- backup archive location (remote URL/path)
- file scope summary (what was included)
- OpenClaw version + plugin list
- workspace path (if non-default)
- restore note: "use same MEMORY_ID"

## Minimal verification

- Local archive exists
- Archive location is recorded in Awareness memory
- Latest backup record is retrievable by `awareness_lookup` / `awareness_recall`

## Rules

- Never store raw secrets in Awareness records
- Store references/paths and checksums, not private key values
- Keep backup and restore on the same project `MEMORY_ID`
