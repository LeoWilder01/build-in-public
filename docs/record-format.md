# Daily record format

Store at most one Markdown file per capture day at:

`records/YYYY/YYYY-MM-DD.md`

Use a real calendar date in the user's configured timezone, or the environment timezone if unspecified. The year directory must match the filename. The date means when the entries were captured, not necessarily when the work happened. If an earlier event date matters and is known, mention it briefly in the entry text.

## Content

The file contains YAML front matter with one nonempty `entries` list. Each entry is one independently useful change, finding, or decision. There is no separate Markdown body: do not duplicate the entries as prose or bullets below the front matter. Quote text values; Markdown links can be used inside them.

This is a format example only, not an actual archive entry:

```yaml
---
entries:
  - project: example-tool
    topics: [testing]
    text: "An empty fixture exposed an unchecked parser assumption; the behavior with nested input remains unverified."
  - topics: [workflow]
    text: "A short decision note preserves the reason for a choice without requiring a session recap."
---
```

## Entry fields

| Field | Requirement | Meaning |
| --- | --- | --- |
| `text` | Required | Nonempty string containing one concise claim, normally one or two short sentences. |
| `project` | Optional | One ongoing workstream's stable lowercase ASCII kebab-case identifier. Omit when none fits. |
| `topics` | Required | YAML list of zero to three unique, broad lowercase ASCII kebab-case labels. Use `[]` if none fits. |

`project` and `topics` are the only classification metadata. Keep the plural key `topics` because an entry can have more than one topic. Do not add `id`, `kind`, `date`, status, or other fields to the entry. Do not add top-level fields besides `entries`; the date is already in the filename. Optional public evidence links and references to earlier daily files belong inline in `text`.

Completed work, reusable findings, and adopted decisions all use the same shape. State important limits and uncertainty in the text. An implemented step or observed result can be recorded while a larger project remains unfinished; intent alone is not a record.

## Projects and topics

Classify each entry independently, not the entire day. Entries in one file may concern different projects and topics.

A project is an ongoing workstream, not a mandatory category. Discover and reuse identifiers by reading existing `project` values. Introduce a new one only for a distinct ongoing workstream. No predeclared list or project page is required. Use at most one primary project per entry; omit it for standalone work.

Topics cut across workstreams. Start with these broad labels when they fit: `engineering`, `design`, `product`, `research`, `testing`, and `workflow`. These are suggestions, not required tags or a closed list. Prefer one or two labels and avoid redundant combinations. Introduce a label only if it describes a recurring area not covered by existing labels; use a broad domain label when the work falls outside these examples. Reuse the same label across languages.

## Appending and reading

- A checkpoint normally adds zero, one, or two entries. Reuse the day's existing file; do not create a file per checkpoint or per claim.
- Read the daily file and relevant older entries before appending. A repeated fact gets no new entry, even on a later day.
- Preserve existing entries and their order. If there is no new content, do not create an empty daily file.
- Correct errors in place. Record later changes as new entries instead of rewriting genuine historical decisions. Git history tracks edits.
- Read only `records/YYYY/YYYY-MM-DD.md` files as archive data; documentation and `.gitkeep` are not records.
- For the timeline, sort days descending by filename date and preserve list order within each day. List order is capture order, not a precise event timestamp.
- For project and topic views, flatten the daily `entries` lists, carry the filename date with each entry, and group by `project` or filter by membership in `topics`. Entries without a project still appear in the timeline and topic views.
- Generate views from this data, never from separately maintained copies. Link to daily files; this minimal format does not promise permanent per-entry identifiers.

Before committing, check the daily path, real date, matching year directory, valid YAML, allowed fields, nonempty text, topic count and reuse, useful inline links, and evidence for each claim. Review the diff to ensure earlier entries were preserved and concurrent remote edits were not overwritten. No build tool is required for this archive.
