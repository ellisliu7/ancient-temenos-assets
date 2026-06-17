# Ancient Temenos — Documentation System

*The map. Read this first. It tells you what every document is for, where it lives,
and the rules that keep this system from rotting.*

**Place this file at:** `docs/README.md`
**Last reviewed:** 2026-06-17

---

## The one principle that keeps this alive for 3 years

Documentation rots when stable truths and volatile facts share a page. The fix is to
**organize by how often a thing changes**, not by topic. Four layers, from eternal to
disposable. A fact lives in exactly one layer, in exactly one document. The stable
documents stay short. The volatile documents hold all the mess. The mess never leaks upward.

Three rules underneath that one:

1. **One fact, one home.** If something is written in two places, the two will disagree
   within a year. Link, don't copy.
2. **Never rewrite history.** Decisions and conversations are append-only. You may mark
   something *superseded*; you never delete the record of why you once believed it.
3. **The short documents are the important ones.** If the Constitution grows long, the
   project has lost focus, not gained it.

---

## The hierarchy

```
docs/
├── README.md                ← this file. The map.
│
├── soul/                    ← TIER 0 · changes almost never (years)
│   ├── Constitution.md
│   └── Identity.md
│
├── canon/                   ← TIER 1 · changes rarely, on purpose (seasons)
│   ├── Design_Bible.md
│   ├── Chambers.md
│   └── Sustainability.md
│
├── working/                 ← TIER 2 · changes constantly (every session)
│   ├── Current_State.md
│   └── Decisions.md
│
└── archive/                 ← TIER 3 · frozen, append-only, never edited
    ├── Founding_Conversations/
    ├── Decisions_Archive.md
    └── State_Archive.md

SKILL.md  ← stays at its required path (the working method). See "Method" below.
```

Eight living documents, one archive folder, one operating file. That is the whole system.
Resist adding to it.

---

# TIER 0 — SOUL
*Changes almost never. A change here means the project has become a different project.
Review once a year, or when something feels fundamentally off.*

### `soul/Constitution.md`
- **Purpose:** The binding law. The promises the sanctuary makes and the lines it will not
  cross, written to constrain the future, more-tempted version of you. This is not a list
  of hopes; it is a list of *constraints*.
- **What belongs:** The non-negotiables, each phrased as something you could actually be
  caught violating. The care/safety clause (what the sanctuary owes a person who arrives in
  real distress, and the limits of what it should ever do or say). The north star, stated
  plainly: *would the person this was built for, on their worst night, be served by this?*
  A small number of explicit "we will never" lines. A note on who can amend it and how
  (so it can't be quietly edited under pressure).
- **What does NOT belong:** Aesthetic preferences (those are Design_Bible). Features,
  roadmap, or anything time-bound. Affirmations with no teeth ("we value beauty"). Marketing
  language. Money mechanics (those are Sustainability).
- **How often it changes:** Almost never. Years between edits. If you're editing it monthly,
  it isn't a constitution.

### `soul/Identity.md`
- **Purpose:** What Ancient Temenos *is*, in human terms, for any person — or any future
  collaborator — who needs to understand the thing in five minutes. The "if you read one
  document, read this" file.
- **What belongs:** The one-sentence, one-paragraph, and one-page descriptions. The
  "what it is NOT." Written entirely in terms of the human change it creates, free of any
  technical or mechanical vocabulary.
- **What does NOT belong:** How it's built. Business model. Anything that dates quickly.
  Any word that describes the machinery rather than the experience.
- **How often it changes:** Rarely. It should read the same in three years. Refine the
  wording; never let the meaning drift.

---

# TIER 1 — CANON
*The design canon. Changes rarely and only by deliberate decision, never by accident.
Review at each season / major version.*

### `canon/Design_Bible.md`
- **Purpose:** The senses of the world. Everything about how it looks, moves, sounds, and
  speaks, so that any future chamber feels like it belongs to the same place.
- **What belongs:** Color palette and its rules. Typography and the locked roles of each
  typeface. Motion and lighting principles. The voice and tone of the place. The
  "never feels like" list. The artwork's role and how it is revealed.
- **What does NOT belong:** Per-chamber specifics (those are Chambers). Why a choice was
  made (that's Decisions). Code. Asset filenames or URLs (those are working-layer or in the
  build itself — they change).
- **How often it changes:** Rarely. Adding a chamber may extend it; the core almost never moves.

### `canon/Chambers.md`
- **Purpose:** The canonical spec of every chamber: what part of a person it holds, the
  emotional arc it walks them through, and the voice that meets them there.
- **What belongs:** For each chamber — its purpose, the part-of-the-self it addresses, its
  emotional arc, the rules of its voice (what it says and never says), its symbols, and its
  status (live / prototype / planned). The council/foyer dynamic.
- **What does NOT belong:** Aesthetic rules shared across all chambers (those are
  Design_Bible). Current bugs or build status of a chamber (that's Current_State). The reasoning
  behind a design choice (that's Decisions).
- **How often it changes:** When a chamber is added or its essence is deliberately refined.
  Keep all chambers in this one file until a single chamber genuinely outgrows it; only then split.

### `canon/Sustainability.md`
- **Purpose:** How money relates to the sanctuary, written so the relationship stays honest
  as the project grows. (Named *Sustainability*, not "monetization," on purpose — the question
  is how the place keeps existing, not how it extracts.)
- **What belongs:** The principles for asking, supporting, and collecting — *when* in the
  journey, *how* it's framed, what's forbidden. The rule that the core experience is never
  gated. How keepsakes commemorate rather than unlock. What kinds of money you will and won't
  accept (the structural protection against drift). The acknowledged tension between asking
  and the sanctuary's quietness.
- **What does NOT belong:** Prices, current revenue, specific tools or vendors (those date
  fast — keep them in working-layer notes). The Constitution's care clauses. Aesthetic rules.
- **How often it changes:** Rarely as principles; the *implementation* of those principles
  lives in the working layer and can move freely.

### `canon/Lore.md` — *DEFER. Do not create yet.*
- **Purpose (if it ever earns existence):** World mythology and symbolism that genuinely
  doesn't fit inside Chambers or Design_Bible.
- **Create it only when:** A chamber's lore is straining to escape Chambers.md and starting
  to bloat it. Until then, an empty Lore file is an invitation to invent backstory the
  experience doesn't need. Restraint over spectacle applies to documents too.

---

# TIER 2 — WORKING
*Operational. Changes constantly. This is where all the mess is allowed to live.*

### `working/Current_State.md`
- **Purpose:** The single source of truth for what is live, what is broken, and the one next
  thing to ship. The first file to read at the start of any work session.
- **What belongs:** What's deployed right now. Active bugs. Known dead code. The single next
  ship. The near horizon (optional — a short "what's next" section; only spin out a separate
  Roadmap if this section grows unmanageable). Dev/test notes and URLs.
- **What does NOT belong:** Principles, vision, or anything stable (link up to Soul/Canon
  instead). Long historical logs — those move to `archive/State_Archive.md` to keep this lean.
- **How often it changes:** Every session. Keep it short by retiring old entries to the archive.

### `working/Decisions.md`
- **Purpose:** An append-only record of resolved questions and *why*, so they are never
  re-litigated. This is the project's memory of its own reasoning.
- **What belongs:** Each meaningful decision: what was decided, why, and what was tried and
  rejected. New entries on top. Mark superseded entries as superseded; never delete them.
- **What does NOT belong:** Open questions (those belong in Current_State). Principles
  (those graduate to Canon or Soul once settled). Anything you might want to rewrite later —
  this file is history, and history is not edited.
- **How often it changes:** Whenever a real decision is made. Grows forever; prune to
  `archive/Decisions_Archive.md` when it gets long, never by deletion.

---

# METHOD
*How the work itself is done. Changes only when the workflow changes.*

### `SKILL.md` *(stays at its existing required path — do not duplicate into docs/)*
- **Purpose:** The operating manual for whoever (or whatever) does the building — session
  protocol, deploy steps, scope discipline, file-navigation rules.
- **What belongs:** The session start/end protocol. Deploy and branch hygiene. Scope rules.
  How to navigate the codebase safely. Pointers up to the Soul and Canon docs as the source
  of truth for *what* to build.
- **What does NOT belong:** The vision, the principles, the chamber canon — this file should
  *point to* those, not restate them. (One fact, one home: if SKILL.md and the Canon ever
  disagree, the Canon wins.)
- **How often it changes:** When the workflow, tools, or deployment change. Not when the
  product changes.

---

# TIER 3 — ARCHIVE
*Frozen. Append-only. Never edited. This is what lets every living document stay short.*

### `archive/Founding_Conversations/`
- **Purpose:** The reasoning behind the major turns — preserved so that in three years,
  "why did we remove the gating?" or "why is the oracle free?" has an answer that isn't just
  memory. This is where today's pivot lives.
- **What belongs:** Dated records of the conversations or decisions that shaped the project's
  identity (the sanctuary-is-the-product turn; the constitution critique; the identity
  statement). Distilled is fine; the *reasoning* is what matters, not every word.
- **What does NOT belong:** Anything still in flux. Day-to-day chatter. This is for the
  conversations that *changed what the project is*, not all conversations.
- **How often it changes:** Append a new entry only when a genuinely foundational shift happens.
  Existing entries are never edited.

### `archive/Decisions_Archive.md` and `archive/State_Archive.md`
- **Purpose:** Retired history pruned out of the working-layer files, kept so nothing is lost
  while the live files stay lean.
- **What belongs:** Old decision entries and old state logs, moved here verbatim.
- **What does NOT belong:** Anything current.
- **How often it changes:** Only when you prune the working files. Append-only.

---

## Mapping from what you have today

| Current file | Moves to | Tier |
|---|---|---|
| `BIBLE.md` | `canon/Design_Bible.md` | Canon |
| `CHARACTERS.md` | `canon/Chambers.md` | Canon |
| `DECISIONS.md` | `working/Decisions.md` | Working |
| `CURRENT_STATE.md` | `working/Current_State.md` | Working |
| `SKILL.md` | stays where it is | Method |
| `ARCHIVE.md` | `archive/` (split as needed) | Archive |
| *(new)* | `soul/Constitution.md` | Soul |
| *(new)* | `soul/Identity.md` | Soul |
| *(new)* | `canon/Sustainability.md` | Canon |
| *(new)* | `archive/Founding_Conversations/` | Archive |

You are not throwing work away. Most of this is renaming and sorting what already exists into
the right layer, plus three genuinely new foundational documents from this chapter of the work.

---

## What NOT to create (the restraint list)

- **No separate Vision + Philosophy + Constitution.** They overlap, drift, and contradict.
  Constitution (the law) and Identity (the description) cover it.
- **No Lore.md until lore is straining to escape another file.** An empty vessel invites
  invention the experience doesn't need.
- **No second copy of the operating method.** SKILL.md is the one home for it.
- **No document per chamber.** One Chambers.md until a single chamber truly outgrows it.
- **No roadmap, bug, price, vendor, or status anywhere in Soul or Canon.** Volatile facts
  belong in the working layer, always. This is the rule that keeps the system from rotting.

---

## The header every document wears

Put this at the top of each living document so it self-describes and future-you knows the rules:

```
# [Document name]
Tier: [Soul / Canon / Working / Method / Archive]
Changes: [almost never / rarely / constantly / append-only]
Last reviewed: [date]
If this changes, it means: [one line — e.g. "the project's identity has shifted"]
```

---

## Review cadence

- **Soul** — once a year, or when something feels fundamentally wrong. Edits should be rare
  and deliberate enough to feel like amending a constitution, because they are.
- **Canon** — at each season or major version.
- **Working** — every session. Keep short by retiring old entries downward to the archive.
- **Archive** — only ever appended to.

---

## The single test for whether any document earns its place

> Could a thoughtful stranger, three years from now, with none of today's context, read this
> document and understand both *what* the sanctuary is and *why* it was built this way — without
> finding anything inside it that has quietly become false?

If a document can't pass that test, it's either in the wrong tier or it shouldn't exist.
