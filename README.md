# Build in Public / Work in Public

A public archive of what I build, learn, decide, and complete.

[Website](https://leowilder01.github.io/build-in-public/) · [Records](records/)

Daily files are the source of truth. The website reads them to provide a timeline, project/topic filters, and text search; no second content database is maintained.

- [AGENTS.md](AGENTS.md): checkpoint workflow and editorial rules.
- [Record format](docs/record-format.md): file structure and metadata definitions.
- `index.html`, `assets/`, `_config.yml`: the plain GitHub Pages website.

To publish: repository **Settings → Pages → Deploy from a branch → main → /(root) → Save**. GitHub builds the site with Jekyll after commits. No theme, external fonts, or custom build workflow is required.

`/checkpoint` is a workflow shorthand, not an installed slash command. To use it from other tasks, configure a global instruction pointing to this repository's AGENTS.md. A local checkout is optional.
