# ✦ Post-Demo Experiments — Ranked

Five experiments that emerged from the world-building sessions, Jun 19.
Not specced yet. Preserved so the energy isn't lost.
Pick up after Friday's demo is shipped and verified.

---

## 1 — Venus Relic ⬅ START HERE
**Full spec already written:** `VENUS_RELIC_SPEC.md`

**Why it's interesting:** Turns El's artwork from backdrop into a discoverable sacred object. The first expression of "Ancient Temenos as a world of found knowledge" rather than a sequence of conversations. Combines the things El is most excited about: artwork, mythology, hidden knowledge, contemplation, discovery.

**Hypothesis:** A seeker who *finds* something in a chamber will feel the world is inhabited and alive in a way that conversation alone doesn't produce. Discovery creates a qualitatively different emotional memory than oracle exchange.

**Effort:** Small. One overlay, one glint, one fragment, one `localStorage` flag. Existing overlay pattern and motion grammar. No new assets. El writes the fragment.

**Suggested order:** First.

---

## 2 — The Whispering Olives
**Why it's interesting:** The cheapest possible test of *inhabited*. Anonymized fragments of seekers' questions drift and fade — overheard, never addressed to you. No gaze, no feed, no profiles. Pure atmosphere of lineage.

**Hypothesis:** Traces of other seekers — even seeded, even fictional — make the sanctuary feel alive in a way that changes how a visitor holds their own experience. "I am alone here, but not lonely."

**Effort:** Small. One overlay (same pattern as Teachings), one hand-written array of 40–60 distilled fragments El writes, one drift animation. Swap to live data when the membership backend exists.

**Suggested order:** Second. Runs alongside or just after the Relic — tests the inhabited feeling from the other direction (traces of others vs. discovery of objects).

---

## 3 — The Long Water
**Why it's interesting:** A screen with no ask. No oracle, no prompt, no question. A still reflective surface. One line that surfaces slowly and dissolves. The only place in the temple where nothing is wanted from you.

**Hypothesis:** Seekers will tolerate — and value — stillness. If they linger here, Ancient Temenos is a world. If they bounce immediately, it's still a tool. This is the most important thing to learn early, and the cheapest test available.

**Effort:** Tiny. One screen, one ambient asset or pure CSS, minimal text. The emotional risk is higher than the build cost.

**Suggested order:** Third. Can be built in an afternoon. Best tested with real seekers rather than solo.

---

## 4 — Hidden Fragments (Scriptorium unlock)
**Why it's interesting:** Scatter unlabeled glyphs in existing chambers. Touch one → it reveals a hidden fragment of lore (myth, decoded symbol, Kybalion line) → a `localStorage` flag unlocks a new card in the Teachings overlay. Knowledge grows because you wandered and looked, not because you asked. Rewards curiosity with more world.

**Hypothesis:** If seekers discover that the chambers contain hidden knowledge beyond the oracle conversation, return visits will increase and the world will feel deeper and more alive with each session.

**Effort:** Medium. Click targets in existing chambers + `localStorage` unlock flags + new cards injected into the existing Teachings overlay. No new overlay needed. El writes the lore fragments.

**Suggested order:** Fourth. Builds on the Relic experiment — only worth doing if discovery lands.

---

## 5 — Your Book (Grimoire as vault)
**Why it's interesting:** The Grimoire already seals a session. Add `localStorage` persistence so seals survive and reopen. Add a shelf of closed, unreadable books beside yours — seeded in v1 — so you are one keeper among many. The world remembers you. You return to your own past as discoverable knowledge.

**Hypothesis:** If seekers can return to their own sealed sessions, and see their book among others (anonymously), the Grimoire transforms from a one-time export into a reason to come back. Tests "the world remembers me" and "alone but not lonely" simultaneously.

**Effort:** Medium-large. `localStorage` persistence on the existing Grimoire overlay + seeded shelf UI + return-visit logic. The shelf of closed books is the emotionally significant piece and needs care.

**Suggested order:** Fifth. The most architecturally touching of the five — save until the others have been tested and the direction is confirmed.

---

## The through-line

All five experiments test the same underlying hypothesis from different angles:

> *Ancient Temenos is more than a conversation. It is a place that can be inhabited, wandered, discovered, and returned to — and that becomes more alive the longer it exists.*

If any one of them lands strongly, pursue that thread. If the Relic and the Olives both land, the world direction is confirmed and Your Book becomes the priority. If the Long Water bounces, lean harder into discovery over atmosphere.

Test in order. Don't spec ahead of the signal.
