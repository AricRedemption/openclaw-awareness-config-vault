# Awareness Recovery Prompt

Install Awareness OpenClaw memory integration and recover historical context with strict recovery flow.

Requirements:
- `AWARENESS_API_KEY`
- user-selected historical `MEMORY_ID`

Procedure:
1. Connect Awareness with `AWARENESS_API_KEY`.
2. List existing memories and ask user to choose one `MEMORY_ID`.
3. If no historical memory is available, return error and stop.
4. Verify recovery in sequence:
   - `awareness_lookup` / `awareness_recall`
   - `awareness_record`
   - `awareness_lookup` / `awareness_recall`
5. If plugin path fails, fallback to MCP with:
   - `Authorization: Bearer <AWARENESS_API_KEY>`
   - `X-Awareness-Memory-Id: <MEMORY_ID>`

Rules:
- Never auto-create a new memory when none exists.
- Keep all reads/writes on the same selected `MEMORY_ID`.
- Report each step status clearly.
