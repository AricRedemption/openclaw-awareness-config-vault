# Agent Recovery Prompt

Execute Awareness recovery in plugin-first mode with strict validation.

Required:
- `AWARENESS_API_KEY`
- user-selected historical `MEMORY_ID`

Procedure:
1. Initialize Awareness connection with API key.
2. List available memories and ask user to select one `MEMORY_ID`.
3. If no historical memory is selectable, return a blocking error and stop.
4. Run verification sequence on the selected memory:
   - `awareness_lookup` or `awareness_recall`
   - `awareness_record`
   - `awareness_lookup` or `awareness_recall`
5. If plugin path fails, use MCP fallback with headers:
   - `Authorization: Bearer <AWARENESS_API_KEY>`
   - `X-Awareness-Memory-Id: <MEMORY_ID>`

Output contract:
- Report each step status
- Never auto-create a new memory when none exists
- Keep all reads/writes on the same `MEMORY_ID`
