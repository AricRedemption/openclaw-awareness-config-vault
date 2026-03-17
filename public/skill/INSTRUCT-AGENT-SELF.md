# Install Awareness Recovery Skill (Essentials)

Official website: [Awareness](https://awareness.market)

## Prerequisites

- A valid `AWARENESS_API_KEY` from Awareness dashboard
- OpenClaw installed

If you don't have an API key yet, open: https://awareness.market

## Steps

### 1) Install Awareness plugin

```bash
openclaw plugins install @awareness-sdk/openclaw-memory
```

### 2) Set API key

Set environment variable in your shell:

```bash
export AWARENESS_API_KEY="<YOUR_AWARENESS_API_KEY>"
```

### 3) Initialize and select memory

- Run `awareness_init`
- List memories
- Select one existing historical `MEMORY_ID`

### 4) Recovery verification

Run in sequence on the selected `MEMORY_ID`:

- `awareness_lookup` / `awareness_recall`
- `awareness_record`
- `awareness_lookup` / `awareness_recall`

### 5) Fallback (if plugin fails)

Use MCP headers:

- `Authorization: Bearer <AWARENESS_API_KEY>`
- `X-Awareness-Memory-Id: <MEMORY_ID>`

Reference docs: https://awareness.market/docs

## Rules

- Never auto-create a new memory when none exists
- If no historical memory is available, stop and return error
- Keep all reads/writes on the same selected `MEMORY_ID`
