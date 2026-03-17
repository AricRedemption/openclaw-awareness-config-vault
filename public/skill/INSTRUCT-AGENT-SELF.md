Install Awareness recovery skill and execute recovery with this flow:

1) Use `AWARENESS_API_KEY` to connect Awareness.
2) List existing memories and let user select one historical `MEMORY_ID`.
3) If no historical memory is available, stop and return error.
4) Verify recovery on selected `MEMORY_ID`:
   - `awareness_lookup` / `awareness_recall`
   - `awareness_record`
   - `awareness_lookup` / `awareness_recall`
5) If plugin path fails, fallback to MCP with:
   - `Authorization: Bearer <AWARENESS_API_KEY>`
   - `X-Awareness-Memory-Id: <MEMORY_ID>`

Rules:
- Never auto-create a new memory.
- Keep all reads/writes on the same selected `MEMORY_ID`.
