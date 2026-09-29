# Build in Public / Work in Public

A durable archive of what I build, learn, decide, and complete. Updates capture meaningful state changes in one or two concise sentences. This is a working record, not a blog.

## One record, multiple views

Each atomic record lives once in `records/YYYY/YYYY-MM-DD-short-slug.md`, with YAML metadata and a short Markdown body. A future website can read those files to produce:

- A timeline ordered by date.
- Project pages grouped by the optional project identifier.
- Learning and topic pages filtered by reusable topic labels.

The records are the source of truth. Views and indexes should be generated, not maintained as separate copies. No website framework or database service is required yet.

## Repository layout

- [AGENTS.md](AGENTS.md): instructions for Codex, including the checkpoint workflow.
- [docs/record-format.md](docs/record-format.md): the shared record format and classification rules.
- [records/](records/): the actual archive; initially empty.

README explains the repository to people. AGENTS.md tells Codex how to maintain it. Keeping both makes agent instructions discoverable without turning the introduction into an operating manual; shared format details live only in the record-format document.

## Capture a checkpoint

Ask Codex to checkpoint meaningful progress from the available working context, using `/checkpoint` as shorthand for the workflow in AGENTS.md. These files define the workflow; they do not install a slash command or make instructions available automatically in other repositories.

When working elsewhere, explicitly ask Codex to read this repository's AGENTS.md and save the checkpoint here. Provide any context or evidence it cannot access.

A checkpoint normally adds one or two atomic records, and may add none. Completed changes, reusable findings, and decisions actually made belong here. Plans, activity lists, and session recaps do not.

Projects emerge from the work: reuse identifiers already in the archive, introduce one only for a distinct ongoing workstream, and omit it when none fits. Topics are a small shared vocabulary across projects.

Records can be written in English or Chinese, matching the working context. Keep metadata keys and identifiers consistent. Assume all record content will be public.
