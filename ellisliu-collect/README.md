# ellisliu-collect

The collection preview for **Ellis Liu — Available Works**.
Single self-contained `index.html`. No build step, no dependencies.

Destined for `collect.ellisliu.art`, but **not connected yet** — this is a
private preview. The page carries `noindex, nofollow` and has no `CNAME`, so
nothing points at it and search engines ignore it until it is promoted.

---

## ⚠ Two inferred renames — confirm or correct

1. **"Union of the Divine Masculine & Feminine" → "Divine Feminine and
   Masculine"** — same work, same S$2,222 / 40cm oil on canvas. Flagged
   inline in the `WORKS` array in `index.html`.
2. **"Fragments of the Infinite" → "Lemuria Awakening"** — inferred, not
   confirmed. The `images/` filename list had exactly 8 groups matching this
   page's 8 catalogue works, with "Lemuria Awakening" in Fragments' place and
   no "fragments-of-the-infinite" files. Year, medium, dimensions, price and
   status were carried over unchanged from Fragments — nothing was invented.
   **If Lemuria Awakening is actually a separate, new work**, tell Claude and
   it will split it back into two entries and ask for Lemuria's own record.

---

## Deploy the preview (2 minutes, one-time)

1. Create a new **public** repo on GitHub named `ellisliu-collect`.
2. Add these files (drag them into GitHub Desktop, commit, push):
   - `index.html`
   - `README.md`
   - `images/` (folder — put the artwork photography inside)
3. On github.com → the repo → **Settings → Pages** → Source: `Deploy from a
   branch` → Branch: `main` → `/ (root)` → Save.
4. Wait ~1 minute. The preview goes live at:

   **https://ellisliu7.github.io/ellisliu-collect/**

That URL is private in practice (unlisted, noindex). Share it with anyone you
want to review the page.

---

## Image files

Every work has an `images` array in `index.html`. The entry marked
`type: "original"` is always the grid thumbnail and always shown first in the
detail overlay. `type: "interior"` entries appear only inside the detail
overlay's gallery, captioned "Shown in an interior setting."

| Work | Filenames |
|---|---|
| Portal of Infinite Reflections | `portal-of-infinite-reflections-original.jpg`, `-interior-01.jpg` |
| Lemuria Awakening *(was Fragments of the Infinite)* | `lemuria-awakening-original.jpg`, `-interior-01.jpg` |
| Eye of Cleopatra | `eye-of-cleopatra-original.jpg`, `-interior-01.jpg` |
| Divine Feminine and Masculine *(was Union of the Divine Masculine & Feminine)* | `divine-feminine-and-masculine-original.jpg`, `-interior-01.jpg` |
| Dreamscape | `dreamscape-original.jpg`, `-interior-01.jpg` |
| The Glitch Between Realms | `the-glitch-between-realms-original.jpg` (single image, no carousel) |
| Birth and Beginnings | `birth-and-beginnings-original.jpg`, `-interior-01.jpg` |
| Evolution and Growth | `evolution-and-growth-original.jpg`, `-interior-01.jpg` |

All filenames are prefixed with `images/`. Drop a correctly named file into
`/images/` and push — the placeholder for that image disappears automatically,
no HTML editing required. A missing file never shows a broken-image icon; it
falls back to a composed "Photography forthcoming" tile.

**Venus & Ganymede** load from the temple repository (real photography from
day one) — the only cross-repo references in the file, set via the `images`
field for those two entries.

To add a third image to any work, append another object to its `images`
array (e.g. a second interior render as `interior-02`) — no other code
changes needed.

---

## Edit prices, titles, notes, status

Everything is in one array (`WORKS`) near the bottom of `index.html`. Change
a value, push, done. Setting a work's `status` to `'private'` removes its
price and enquiry link and marks it *Private collection*.

---

## Promote to the live domain (only when the page feels complete)

Three deliberate steps, done together on launch day:

1. Add a file named `CNAME` (no extension) containing exactly:
   `collect.ellisliu.art`
2. At your domain registrar / DNS, add a **CNAME record**:
   `collect` → `ellisliu7.github.io`
3. Remove the `<meta name="robots" content="noindex, nofollow">` line from
   `index.html`, and add an **Original Artworks** link in the Carrd portfolio nav.

---

## Enquiries

All enquiries POST to the existing Formspree endpoint (`xkoakgkk`) with the
subject line `Collection enquiry — [work title]`, so they are easy to tell
apart from temple enquiries in the same inbox. If this form has domain
restrictions enabled in the Formspree dashboard, add `collect.ellisliu.art`
(and the `ellisliu7.github.io` preview host) to its allowed domains.
