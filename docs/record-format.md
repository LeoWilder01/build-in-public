# Record format

One file per capture day: `records/YYYY/YYYY-MM-DD.md`. Use the user's timezone, or the environment timezone if unspecified. The filename supplies the date; the year directory must match it. Multiple checkpoints append to the same file. Omit days with no entries.

The complete file is YAML front matter, with no repeated Markdown body:

```yaml
---
entries:
  - project: example-tool
    topics: [testing]
    text: "An empty fixture exposed an unchecked parser assumption; nested input remains unverified."
---
```

This is an example, not an archive entry. `entries` must be a nonempty list. Each entry allows only:

| Field | Meaning |
| --- | --- |
| `text` | Required nonempty string. Quote it; public HTTPS Markdown links are supported. |
| `project` | Optional workstream identifier. Reuse existing values; create one only for a distinct ongoing workstream. Omit for standalone work. No fixed project registry. |
| `topics` | Required list of zero to three broad, reusable labels; use `[]` if none fits. Prefer existing labels, such as `engineering`, `design`, `product`, `research`, `testing`, or `workflow`. Avoid task-specific tags. |

Use lowercase ASCII kebab-case for project and topic values, consistently across languages. Classify each entry independently. Do not add IDs, kinds, dates, or other fields. If a known earlier event date matters, mention it in `text`; the filename always means capture date.

The website reads daily files, orders dates newest first, and preserves entry order within each day. Project and topic views filter these same entries. Daily file links are stable; individual entries have no permanent identifiers.
