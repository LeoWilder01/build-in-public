# Record format

One file per capture day: `records/YYYY/YYYY-MM-DD.md`. Use the user's timezone, or the environment timezone if unspecified. The filename supplies the date; multiple checkpoints append to it. Omit empty days.

The entire file is YAML front matter. Each entry records **one concept or one event**; two independent definitions or outcomes belong in separate entries. Both languages express the same claim, scope, evidence, and uncertainty.

```yaml
---
entries:
  - project: TinyML
    context: architecture-selection
    topics: [weight-sharing]
    title:
      en: "Once-for-All supports shared-weight subnetworks"
      zh: "Once-for-All 支持共享权重子网络"
    text:
      en: "Once-for-All trains a shared-weight network supporting multiple subnetworks."
      zh: "Once-for-All 训练一个支持多种子网络的共享权重网络。"
---
```

This is a format example, not a new record. Only these fields are allowed:

| Field | Meaning |
| --- | --- |
| `title` | Required `en` and `zh` nonempty strings naming the single concept, question, or outcome. The record title is distinct from its broader context. |
| `text` | Required `en` and `zh` nonempty strings. Keep each concise; preserve useful public HTTPS Markdown links in both versions. |
| `project` | Optional exact value from [_data/projects.yml](../_data/projects.yml). The user maintains this list; choose only a clearly fitting existing project, otherwise omit. |
| `context` | Reference to one scope in [_data/contexts.yml](../_data/contexts.yml). Locate the concept/event within a larger idea or purpose, not just its subject name. Omit only when the source does not establish a defensible scope; never invent the user's goals. |
| `topics` | Zero to three descriptive kebab-case labels; preserve existing labels and use `[]` when unnecessary. Stored for possible future use, but excluded from website display, filters, and search. |

## Concrete wording

Apply this rule to record text, context labels, and website copy in both languages: name the actual objects, quantities, mechanisms, or goals. Each label must be understandable without the originating conversation. Do not hide meaning behind generic words such as “resources,” “constraints,” “information,” or “optimization.” For example, replace “fit models to resource limits” with “reduce neural-network computation, memory use, and inference latency”; explain memory as weights and intermediate activations when relevant. If no concise term covers the scope, list several concrete examples followed by “etc.” / “等” rather than replacing them with a vague umbrella term. Use only examples supported by the source; specificity must not introduce invented facts or goals. Prefer a slightly longer clear phrase over an ambiguous short one.

## Shared context

Each context has a stable key, a bilingual `label`, and an optional `parent` key. Use one readable label, at most one sentence, to explain the scope's role in the broader purpose; do not pair a vague heading with a second explanatory sentence. Parent links must resolve and be acyclic; prefer one or two visible levels. These keys identify shared scopes, not individual records.

Reuse a context while the discussion is solving the same problem, even when new terms appear. Add a scope only for a distinct, reusable discussion; do not create a node per concept or infer a goal merely from a keyword. The same concept can serve different purposes in different conversations. Projects and contexts are independent, so general knowledge can have context without a project. Translate new or changed context labels together.

The website displays contexts as nested, collapsible folders, with one label per folder and no repeated explanatory subtitle. Records have their own titles; within each folder, dates sort newest first and same-day entry order is preserved. A date activity grid enables only days containing records; its counts reflect the whole archive, while text and project filters narrow the displayed records. English is the default; `?lang=zh` selects Chinese. Search covers titles, both language versions, projects, and context labels, never topics. No entry IDs, kinds, duplicated dates, or extra fields are needed.

Website copy should contain only user-requested content and necessary control labels. Do not add explanatory subtitles, hints, or duplicate descriptions without user approval. Show CN / EN directly; dates default to a compact recent-activity rectangle, with the full date browser available on demand.
