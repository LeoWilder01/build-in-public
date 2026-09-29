# Build in Public / Work in Public

A durable archive of what I build, learn, decide, and complete. Updates capture meaningful state changes in one or two concise sentences. This is a working record, not a blog.

## One record, multiple views

Each day has at most one Markdown file at `records/YYYY/YYYY-MM-DD.md`. Its YAML front matter contains an `entries` list: each entry has concise `text`, an optional `project`, and reusable `topics`. The filename supplies the capture date. Multiple checkpoints on the same day append to the same file; days without new records have no file. A future website can read those entries to produce:

- A timeline ordered by date.
- Project pages grouped by the optional project identifier.
- Learning and topic pages filtered by reusable topic labels.

The records on GitHub are the source of truth. Prefer reading and committing through the GitHub connector; a local checkout is an optional working copy, not a second archive. Views and indexes should be generated, not maintained as separate copies. No website framework or database service is required yet.

## Repository layout

- [AGENTS.md](AGENTS.md): instructions for Codex, including the checkpoint workflow.
- [docs/record-format.md](docs/record-format.md): the shared record format and classification rules.
- [records/](records/): the actual archive; initially empty.

README explains the repository to people. AGENTS.md tells Codex how to maintain it. Keeping both makes agent instructions discoverable without turning the introduction into an operating manual; shared format details live only in the record-format document.

## Capture a checkpoint

Ask Codex to checkpoint meaningful progress from the available working context, using `/checkpoint` as shorthand for the workflow in AGENTS.md. These files define the workflow; they do not install a slash command or make instructions available automatically in other repositories.

When working elsewhere, explicitly ask Codex to read this repository's AGENTS.md and save the checkpoint here. Provide any context or evidence it cannot access.

A checkpoint normally appends one or two atomic entries to the daily file, and may add none. One file per day does not mean one claim per day. Completed changes, reusable findings, and decisions actually made belong here. Plans, activity lists, and session recaps do not.

Projects emerge from the work: reuse identifiers already in the archive, introduce one only for a distinct ongoing workstream, and omit it when none fits. Topics are a small shared vocabulary across projects.

Records can be written in English or Chinese, matching the working context. Keep metadata keys and identifiers consistent. Assume all record content will be public.
