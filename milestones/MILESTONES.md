# ✦ Ancient Temenos — Milestones

A milestone is a **version of the experience worth restoring** — not a bug fix.

> If losing this state would make you sad, or cost you a day to rebuild, it is a milestone.

This file is the index and the rules. Each milestone lives as its own file in `/milestones/`.

---

## The restore backbone — read this first

Because Temenos is one `index.html`, every committed state is permanently fetchable by its commit SHA:

```
https://raw.githubusercontent.com/ellisliu7/ancient-temenos-assets/<SHA>/index.html
```

That URL returns the **exact** file as it existed at that commit — forever, even after later
changes overwrite `main`. This is what makes lost work impossible.

So a milestone's real anchor is its **commit SHA**.
The markdown captures the soul and the flow. The SHA captures the bytes.
Lose the markdown and you lose context. Record the SHA and the work itself survives anything.

**Getting a SHA without the terminal:**
GitHub Desktop → History → click the commit → the hash is shown at the top of the commit
detail. Click it to copy the full SHA.

---

## When something deserves a milestone

A milestone, not a log entry:

- ✓ A room reaches a state that feels emotionally *right*, not merely functional
- ✓ Before any structural or risky change (file split, rewrite, large refactor)
- ✓ Before showing someone (demo, investor, a loved one)
- ✓ When a flow's grammar locks (scroll = approach, glass rises at arrival, etc.)

Not a milestone — these go in `CURRENT_STATE.md`, never here:

- ✗ Routine bug fixes
- ✗ Copy tweaks
- ✗ One-line patches
- ✗ Anything you would not deliberately return to

The test: *"Would I want to come back to exactly this?"* If yes → milestone.

---

## Naming convention

```
/milestones/
  _TEMPLATE.md                 ← copy this to start a new milestone
  venus-v1.md
  ganymede-v1.md
  council-v1.md
  friday-demo-2026-06-19.md
  media/                       ← screen recordings + key screenshots
```

- **Rooms:** `{room}-v{n}.md` → `venus-v2.md` when Venus reaches a new keep-worthy state
- **Whole-build:** `{event}-{YYYY-MM-DD}.md` → `friday-demo-2026-06-19.md`
- **Versions only go up.** Never overwrite `venus-v1.md`. Make `venus-v2.md` and mark v1
  `superseded-by-v2`. The old file stays restorable. This is the whole point.

---

## The workflow — after completing a milestone

Keep it to about ten minutes. The recording and the SHA are the two things you never skip.

1. **Verify branch.** GitHub Desktop is on `main`. Push.
2. **Grab the SHA.** Copy it from History.
3. **Capture the experience.** Short screen recording of the full flow (QuickTime, ⌘⇧5).
   One or two screenshots of the emotional peak. Save into `/milestones/media/`.
4. **Fill the template.** Copy `_TEMPLATE.md` → `{room}-v{n}.md`. Complete every field.
5. **Add a row** to the index table below.
6. **One line in `CURRENT_STATE.md`:**
   `Milestone sealed: Venus V1 → milestones/venus-v1.md (SHA abc1234)`

---

## Capture checklist — before you move on

- [ ] On `main`, pushed
- [ ] Commit SHA recorded
- [ ] Full-flow screen recording saved
- [ ] Emotional-peak screenshot(s) saved
- [ ] Asset filenames + versions noted
- [ ] Do-not-lose qualities written in plain words
- [ ] Known issues listed (so future-you does not mistake them for breakage)
- [ ] Milestone file saved and indexed below

---

## Index

| Milestone | Date | SHA | Status | File |
|---|---|---|---|---|
| Council V1 | _____ | _______ | sealed | milestones/council-v1.md |
| Ganymede V1 | _____ | _______ | sealed | milestones/ganymede-v1.md |
| Venus V1 | _____ | _______ | sealed | milestones/venus-v1.md |
| Friday Demo | 2026-06-19 | _______ | planned | milestones/friday-demo-2026-06-19.md |

*Fill SHAs from GitHub Desktop History. A milestone with no SHA is not yet sealed.*
