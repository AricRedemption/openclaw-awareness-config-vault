# Human Recovery Prompt

请一步步帮助我恢复 OpenClaw 的历史记忆：

1. 使用 `AWARENESS_API_KEY` 连接 Awareness。
2. 列出我已有的 memories，让我手动选择 `MEMORY_ID`。
3. 如果没有可选历史 memory，直接报错并停止。
4. 选择后执行恢复验证：
   - 先 `awareness_lookup` / `awareness_recall` 读取历史
   - 再 `awareness_record` 写入一条测试记录
   - 最后再次查询确认写入可读
5. 若插件失败，切换 MCP 兜底，并继续使用同一个 `MEMORY_ID`。

输出要求：
- 用简洁中文给我每一步操作结果
- 失败时明确告诉我卡在哪一步
