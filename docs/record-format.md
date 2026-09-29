# Record format

Each file is one independently useful change, finding, or decision. Store it at:

`records/YYYY/YYYY-MM-DD-short-slug.md`

Use the record's `date` for the year directory and filename prefix. The filename stem is the stable, archive-wide record identifier; no separate ID field is needed. Choose a short lowercase ASCII kebab-case slug describing the claim. If a name collides, choose a more specific slug. Do not rename an existing file for a wording change. If correcting its date, keep its identifier/path stable; consumers must use metadata for chronology.

## Content

A record starts with YAML front matter, followed by one short Markdown paragraph. No title, headings, repeated date, or session recap is needed.

This example illustrates the format only; it is not an actual archive entry:

```markdown
---
date: "2026-09-29"
kind: learning
project: example-tool
topics: [testing]
---

An empty fixture exposed an unchecked parser assumption; the behavior with nested input remains unverified.
```

## Fields

| Field | Requirement | Meaning |
| --- | --- | --- |
| `date` | Required | Quoted ISO calendar date, `YYYY-MM-DD`, of the change, finding, or decision. |
| `kind` | Required | One of `progress`, `learning`, or `decision`. |
| `project` | Optional | One ongoing workstream's stable lowercase ASCII kebab-case identifier. Omit when none fits. |
| `topics` | Required | YAML list of zero to three unique, broad lowercase ASCII kebab-case labels. Use `[]` if none fits. |
| `date_basis` | Optional | `captured` when the event date is unknown and `date` is the capture date. Omit when the event date is known. |
| `sources` | Optional | YAML list of public HTTPS evidence URLs, such as a commit, PR, artifact, or reference. Omit if unavailable. |
| `related` | Optional | YAML list of existing record identifiers (filename stems), for a follow-up or superseding decision. |

Do not add empty optional fields or additional keys. Dates must be real calendar dates. Source links must support the claim; related identifiers must resolve to existing records.

- `progress`: an actual completed change or milestone, including completion of a whole project. Describe only the scope completed.
- `learning`: reusable knowledge from evidence or an observed experiment; state important limits or uncertainty in the body.
- `decision`: a choice actually adopted, with a short reason when useful.

There is no planned/in-progress status: the archive records what has happened. Unfinished work may yield a completed step or an observed finding, but intent alone is not a record.

## Projects and topics

A project is an ongoing workstream, not a mandatory category. Discover and reuse identifiers by reading existing `project` values. No predeclared list or project page is required. Use at most one primary project per record; topics and related records can express connections without duplicating the claim.

Topics cut across workstreams. Start with these broad labels when they fit: `engineering`, `design`, `product`, `research`, `testing`, and `workflow`. These are suggestions, not required tags or a closed list. Prefer one or two labels and avoid redundant combinations. Introduce a label only if it describes a recurring area not covered by existing labels; use a broad domain label when the work falls outside these examples. Reuse the same label across languages.

## Reading and maintaining the archive

- Read only `records/**/*.md` as content; documentation and `.gitkeep` are not records.
- Sort by metadata `date` descending for the timeline. Break same-day ties by identifier for deterministic output; this does not imply within-day event order.
- Group by `project` for workstream views; records without a project still appear in the timeline and topic views.
- Filter by membership in `topics` for topic views. Each view references the same record.
- Resolve `related` by identifier, independently of generated page URLs.
- Preserve identifiers for durable links. Correct errors in place; capture later changes as new records. Git history tracks edits.

Before committing, review the diff and check file placement, unique identifiers, valid front matter, date/kind values, topic count and reuse, source/related references, and whether each concise claim is supported. No build tool is required for this initial archive.
