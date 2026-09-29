# Maintaining this archive

Read [README.md](README.md) for purpose and [docs/record-format.md](docs/record-format.md) for the authoritative record format. Follow the same rules for manual additions and checkpoint requests.

## Checkpoint workflow

Treat `/checkpoint`, or a request to capture a checkpoint, as this workflow:

1. Read the available working context and inspect relevant artifacts, diffs, test results, or explicit user reports. Inspect existing records for duplicate claims and reusable project/topic identifiers. Never imply access to another session or repository you have not inspected.
2. Select only meaningful state changes supported by that evidence: completed work, reusable knowledge gained, or a decision actually made. An implemented step can be recorded while the larger project remains unfinished.
3. Normally write zero, one, or two records. Each contains one claim in one or two short sentences, usually no more than 60 words in English; use comparable brevity in Chinese. Split independent claims; omit minor details instead of compressing a whole session into one record. More than two requires an explicit request for a broader capture.
4. Read the current daily file and relevant older entries before writing so repeated checkpoint requests do not produce duplicates. Append new entries to `records/YYYY/YYYY-MM-DD.md`; create that file only if it does not exist and there is something new to record. Preserve all existing entries and their order. Follow the record format and metadata rules below.
5. Verify the daily path, YAML structure, project/topic reuse, brevity, and evidence against the source. Review the resulting diff. Briefly report the daily file and commit, or that there was nothing new to record.

Write into `LeoWilder01/build-in-public`. Prefer the GitHub connector: read the latest remote instructions and records before editing, then commit the update. A local checkout is optional; refresh it before use. If working from another repository, locate and read this archive first; do not create a second archive in the source project. If access or necessary context is missing, state what is missing and request only that information.

## Editorial rules

- Lead with the change, finding, or decision. No introductions, conclusions, filler, promotional language, whole-session summaries, or lists of everything attempted.
- Never invent progress, results, dates, links, metrics, or supporting evidence. An intention is not completion; a build passing is not deployment.
- Preserve scope and uncertainty. An exploratory finding must say what was observed and what remains unverified. An experiment's observed result can be reusable knowledge even if it failed.
- Record adopted decisions with a brief reason when useful. Do not present a considered option as an adopted decision.
- Prefer concrete wording: “The parser now accepts empty input; its regression test passes.” Avoid “Made great progress on reliability.”
- Include a public source link inline in `text` when available and useful; do not add a separate source field. Otherwise rely on inspected evidence or an explicit user report; attribute reported outcomes when not independently verified. Do not fabricate a citation.
- Exclude credentials, private conversations, personal data, internal paths, and confidential material. Public-safe wording must still preserve the factual claim.
- Do not add placeholder records, fictional examples, or administrative checkpoints merely to populate the archive.

## Metadata and history

Follow the field definitions in [docs/record-format.md](docs/record-format.md); do not introduce ad hoc fields.

- Discover project identifiers from existing records; there is no required project registry. Reuse an identifier for the same workstream. Add one only when evidence establishes a distinct ongoing workstream. Omit the field for standalone work; ask only when ambiguity materially changes the classification.
- Reuse broad topic labels from existing records and the format guide. Use at most three; do not create a tag for every tool, feature, task, or record.
- The filename uses the capture date in the user's configured timezone (or the environment timezone if unspecified). Do not repeat the date in YAML. If an earlier event date matters and is known, mention it briefly in `text`; never invent it.
- A repeated fact gets no new entry. A later meaningful change gets a new entry; a useful reference to an earlier daily file can go inline in `text`.
- Correct factual or formatting errors in place. Preserve genuine historical decisions even when later superseded; append the new decision as a separate entry. Do not add entry IDs, kinds, or other metadata beyond `project` and `topics`; `text` holds the content.
- Do not rename project or topic identifiers casually. An intentional normalization must update all affected metadata consistently.

Keep the repository minimal. Do not add a framework, generated views, dependencies, or automation unless requested. An explicit checkpoint request authorizes committing the new entries to this archive; never checkpoint or publish unrelated work automatically. Preserve unrelated changes. If the remote branch moves while editing, reread the changed files, merge the additions, and check duplicates again; never force-push or overwrite concurrent updates.
