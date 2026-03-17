# Awareness Recovery Skill Design

## 1. Context and Goal

OpenClaw local configuration and memory are currently vulnerable to loss when local/server environments fail. This design defines a single recovery-first skill specification so developers can reinstall OpenClaw and restore historical memory from Awareness quickly and consistently.

Primary goal:
- After OpenClaw is reinstalled, users recover prior memory by reconnecting to Awareness with API key and selecting an existing memory ID.

Non-goals:
- Auto-creating a new memory when historical memory is missing.
- Building UI implementation in this phase.

## 2. Scope

In scope:
- One `SKILL.md` for all developers.
- Default path: OpenClaw Awareness plugin.
- Fallback path: manual MCP access using the same selected memory ID.
- Recovery validation and failure-stop rules.

Out of scope:
- Runtime code integration changes in OpenClaw core.
- Automation scheduling.
- Mandatory visual design implementation.

## 3. User Flow (Recovery First)

1. User reinstalls OpenClaw.
2. User installs Awareness plugin.
3. User inputs `AWARENESS_API_KEY`.
4. System connects to Awareness and lists available memories.
5. User selects target `MEMORY_ID` from listed historical memories.
6. System initializes and runs recall/lookup verification.
7. If verification passes, recovery is complete.
8. If plugin path fails, user switches to MCP fallback with same `MEMORY_ID`.

Failure-stop rule:
- If no historical memory can be selected, return explicit error and stop. No auto-create path.

## 4. Architecture and Components

### 4.1 Skill Document Component

Responsibilities:
- Define standard recovery SOP.
- Define command examples and minimum required inputs.
- Define failure handling and verification checklist.

Interface:
- Input: `AWARENESS_API_KEY` and user-selected `MEMORY_ID`.
- Output: Restored read/write memory capability in OpenClaw session.

### 4.2 Path A: Plugin Recovery Component (Default)

Responsibilities:
- Install plugin: `openclaw plugins install @awareness-sdk/openclaw-memory`.
- Authenticate via API key.
- Initialize and validate memory retrieval.

Interface:
- Uses plugin tools: `awareness_init`, `awareness_recall`, `awareness_lookup`, `awareness_record`.

### 4.3 Path B: MCP Fallback Component (Backup)

Responsibilities:
- Provide manual MCP request pattern when plugin path is unavailable.
- Reuse exact selected `MEMORY_ID`.

Interface:
- Headers: `Authorization: Bearer <API_KEY>`, `X-Awareness-Memory-Id: <MEMORY_ID>`.

## 5. Data Flow

Normal flow:
- API key auth -> list memories -> user selects memory ID -> init -> recall/lookup -> optional record

Fallback flow:
- Plugin failure -> MCP auth with same API key and memory ID -> recall/lookup -> optional record

Consistency rule:
- Recovery and subsequent writes must target the same selected `MEMORY_ID`.

## 6. Error Handling

Error classes and actions:
- Authentication failed: prompt to recheck API key format and validity.
- No memory selectable: return blocking error and stop.
- Recall/lookup failed: return error with retry guidance and fallback instruction.
- Network/timeout: retry once, then route to fallback.
- Server error: preserve inputs, suggest delayed retry, keep fallback path available.

## 7. Verification and Success Criteria

Minimum recovery verification:
1. Read test: retrieve at least one historical memory item from selected memory.
2. Write test: record one new memory item.
3. Read-after-write test: confirm the new item can be queried.

Recovery is successful only if all three pass.

## 8. Security Requirements

- API key must be supplied via environment or secure secret input, never hardcoded.
- Do not print full API keys in logs.
- Keep least privilege and rotation guidance in the skill notes.

## 9. Style Guidance (Reference-Only)

If this skill later includes a web-facing helper page:
- Reference qveris.ai homepage for information hierarchy and clean enterprise presentation style.
- Use 360 security-oriented color direction as a reference palette.
- These are non-mandatory visual references and can be adapted.

## 10. Testing Strategy for the Skill Content

Document-level checks before adoption:
- Procedure completeness: setup, recovery, fallback, validation all present.
- No contradictory steps between default and fallback paths.
- No auto-create behavior for missing historical memory.
- Commands and tool names are consistent with Awareness docs.

## 11. Deliverable

- Single `SKILL.md` targeted at developers, containing:
  - Recovery-first SOP
  - Plugin-first and MCP-fallback playbook
  - Explicit user-selected memory flow
  - Failure-stop behavior for missing memory
  - Validation checklist
