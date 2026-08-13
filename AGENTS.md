# Agent guide

This file provides guidance to AI coding agents (Claude Code, GitHub Copilot, Cursor, Codex, etc.) when working with code in this repository. It is the canonical source — `AGENTS.md` and `CLAUDE.md` point to the same content.

## Generative AI policy

This project follows the Vivliostyle organization's generative AI policy, disclosed in [`AI_POLICY.md`](AI_POLICY.md) per NLnet's guidelines. Agents must follow that policy:

- Add an `Assisted-by:` trailer naming the agent and the exact model version to every commit that contains AI-generated changes, in the Linux-kernel format `Assisted-by: AGENT_NAME:MODEL_VERSION`, e.g. `Assisted-by: Claude Code:claude-fable-5`. Do not add a `Co-authored-by:` trailer for the AI.
- When drafting a pull request description, include the same `Assisted-by:` line in the body, and describe the human/AI division of labor (what was delegated to the AI, and what the human contributor designed, decided, reviewed, and verified) inside a `<details>` block, following the example in `AI_POLICY.md`.
- Never emit code that reproduces third-party copyrighted material.
