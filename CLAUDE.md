# Project Rules & Architecture

- **Context Preservation:** Assume the existence of `src/hooks/`, `src/utils/`, and `src/components/`.
- **Architectural Guardrail:** NEVER create reusable logic or helper functions inside component files. Always extract them to `src/utils/` or `src/hooks/` immediately.
- **Dependency Tracking:** You are permitted to read files imported by the files I provide via `@`. Do not run global `grep` or `ls -R` unless I explicitly ask you to "find" something.
- **Tech Stack:** React, Tailwind, TypeScript. Use functional components and hooks.
