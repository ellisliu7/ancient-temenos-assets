## [2026-06-30] Polish: Persephone/Psyche altar label copy

**Change:** Replaced the placeholder label "Not yet opened" with "Sealed" on the
Persephone and Psyche foyer altars (`#ps-soon`, `#py-soon`).

**Why:** "Not Yet Opened" read like an unfinished feature. "Sealed" is mythic and
intentional — it implies the chamber already exists, simply not meant to be
entered yet. Consistent with temple language ("Sigil Key opens the way," etc.)

**Scope:** Text-content-only edit. No HTML structure, CSS, JS logic, ids,
classes, hover handlers, opacity values, or transitions were touched. The
`foyerComingSoon()` toast ("[Name] · Coming Soon") was left as-is — out of
scope for this request.

**Verification:** Confirmed exactly 2 occurrences of "Sealed" in the patched
file, 0 remaining occurrences of "Not yet opened." File line count unchanged
(4884 lines) — pure inline text substitution.

**Files touched:** `index.html` only.
