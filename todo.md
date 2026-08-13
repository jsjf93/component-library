1. No testing at all — zero test files, no vitest/jest/testing-library configured anywhere. For a component library this is the highest-leverage gap since consumers rely on it not silently breaking.
2. No CI — no .github/workflows, so lint/build/tests (if they existed) never run automatically on PRs.
3. Missing common components — Tooltip, Table, Pagination, Popover, Accordion, Breadcrumb are all absent. These are the components most consumer apps hit within their first week of use.
4. Inconsistent accessibility — only ~6 of 21 components use aria attributes (Input, RadioGroup, Checkbox, Alert, Toggle, Select); Button, Card, Progress, Avatar, etc. have none.
5. Minor cleanup: 3 sidebar sub-components (SidebarFooter, SidebarHeader, SidebarNav) lack .stories.tsx; no dark mode theme; app/demo has no README.
