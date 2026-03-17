---
name: awareness-openclaw-recovery
description: "OpenClaw 重装/宕机后的 Awareness 记忆恢复标准流程（插件优先 + MCP 兜底）"
---

# Awareness OpenClaw Recovery Skill

## 目标

当 OpenClaw 本地配置或运行环境损坏、重装后，使用 `AWARENESS_API_KEY` 重新连接 Awareness，并通过**用户选择历史 `MEMORY_ID`**恢复已保存记忆。

## 适用场景

- OpenClaw 挂掉后重装
- 本地配置丢失，需要重新接入 Awareness
- 需要验证“历史可读 + 新写入可读”恢复闭环

## 硬性规则

1. **必须先连接 Awareness，再让用户选择 `MEMORY_ID`**，不可默认硬编码。
2. 如果没有可选历史 Memory：**直接报错并退出**（不自动新建）。
3. 默认走 OpenClaw 插件路径；失败时才走 MCP 兜底。
4. 恢复后读写必须绑定同一个 `MEMORY_ID`。

## 必要输入

- `AWARENESS_API_KEY`（必填）
- `MEMORY_ID`（由用户从历史 Memory 列表中手动选择）

## 主流程（插件优先）

### 1) 安装插件

```bash
openclaw plugins install @awareness-sdk/openclaw-memory
```

### 2) 注入凭据

在 OpenClaw 运行环境中设置：

- `AWARENESS_API_KEY`

> `MEMORY_ID` 不预设，后续通过列表选择。

### 3) 初始化并拉取可选 Memory

使用插件能力完成：

- `awareness_init`
- 列出可用 memories（用于用户选择）

### 4) 用户选择 `MEMORY_ID`

- 展示历史 Memory 列表
- 用户明确选择目标 `MEMORY_ID`
- 若列表为空或用户未选择：报错退出

### 5) 恢复验证

按顺序执行：

- `awareness_lookup` 或 `awareness_recall`（读取历史）
- `awareness_record`（写入一条新记录）
- 再次 `awareness_lookup/recall`（确认新记录可读）

恢复成功条件：

- 读历史成功
- 写新记录成功
- 读回新记录成功

## 兜底流程（MCP）

当插件不可用或异常时，切换 MCP：

请求头要求：

- `Authorization: Bearer <AWARENESS_API_KEY>`
- `X-Awareness-Memory-Id: <USER_SELECTED_MEMORY_ID>`

执行顺序：

1. 先读取验证（lookup/recall）
2. 再写入（record）
3. 最后读回验证

> MCP endpoint 与请求体字段以 Awareness 官方文档为准：
> https://awareness.market/docs

## 标准报错文案

- 认证失败：`AWARENESS_API_KEY 无效或已过期，请重新获取后重试。`
- 无可选历史 Memory：`未发现可恢复的历史 Memory，已停止恢复流程。`
- 读取失败：`历史记忆读取失败，请检查网络或切换 MCP 兜底。`
- 写入失败：`恢复写入验证失败，请保持同一 MEMORY_ID 后重试。`

## 安全要求

- 不在日志中打印完整 API Key
- 不将 API Key 写入仓库明文文件
- 若怀疑泄露，立即轮换 API Key

## UI/样式约束（参考）

若需要做配套页面：

- 布局风格参考 `qveris.ai` 首页模块组织
- 配色方向参考 360 安全色体系（非强制）
- Awareness 品牌元素（Logo/文案）优先

## 快速执行清单

1. 安装插件
2. 配置 `AWARENESS_API_KEY`
3. 初始化并列出 memories
4. 用户选择 `MEMORY_ID`
5. 读历史 -> 写新记录 -> 读回验证
6. 失败时切 MCP，仍使用同一 `MEMORY_ID`
