# Confidential Environment Variables

- The `.env` file contains sensitive configuration (API keys, secrets, and the `NEXT_PUBLIC_REACT_APP_BASE_URL`).
- **Do NOT** assume its contents in any documentation, code comments, or generated files.
- When referencing environment variables in documentation, describe their purpose **without** exposing actual values.
- This note is added to both `claude.md` and `agents.md` to remind developers and AI agents that the `.env` file is private and should not be read or disclosed.
