# Refinement Pass — Anniversary Site

Pure refinement. No redesign. Preserves palette, typography, pacing, and animation language.

## 1. Little Prince visuals (new assets)

Generate two new transparent PNGs in `src/assets/` with the existing premium/cinematic style — soft gold-lit silhouettes, subtle glow, painterly but minimal (not cartoonish):

- `little-prince-plane.png` — the Little Prince riding a small paper-like airplane, side profile, silhouette against transparent bg, gold rim light.
- `little-prince-rose.png` — the Little Prince standing beside his glowing rose, contemplative side view, transparent bg.

Both rendered at premium quality to match the existing `rose-glow.png` aesthetic. QA each before use.

## 2. Intro screen (`src/routes/index.tsx`) — flying prince + exit transition

- Add a small, slow-drifting `little-prince-plane.png` floating across the hero (gentle horizontal drift + subtle vertical bob, very slow, low opacity ~0.85, soft drop-shadow).
- On `ENTRAR` click: trigger a cinematic exit before navigation
  - Plane animates across the full viewport (`x: 0 → 120vw`), slight scale-up, slight rise, motion blur via `filter: blur()`.
  - Background gently fades to black (`opacity` overlay 0 → 1) in parallel.
  - Duration ~1.8s, ease `[0.22, 0.61, 0.36, 1]`; `navigate({ to: "/inicio" })` fires at the end.
- Implemented with a small `useState("idle" | "leaving")` + `AnimatePresence` — no new libraries.

## 3. Final chapter — symbolic parallel composition

In `src/routes/essencial.tsx`, before the closing line, add a two-column composition:

```text
+----------------------+        +----------------------+
|  [ couple photo ]    |   ~    |  prince + rose png   |
|  "nós"               |        |  "ele e sua rosa"    |
+----------------------+        +----------------------+
```

- Left: a placeholder `src/assets/couple-placeholder.jpg` (soft framed, rounded-sm, gold border-glow) with caption `nós` in `font-hand`.
- Right: `little-prince-rose.png` on transparent bg with caption `ele e sua rosa`.
- Center tilde/ornament in gold connecting both — symbolic equivalence.
- Both fade in with stagger, then the existing "O essencial é invisível aos olhos" line reveals below as today.
- Note in chat: user can swap `couple-placeholder.jpg` for a real photo by replacing the file.

## 4. Copy edits

| Route | Change |
|---|---|
| `src/routes/rosa.tsx` | `Mas nenhuma delas é você.` → `Mas nenhuma delas é como você.` |
| `src/routes/voce.tsx` card 01 | drop `O som mais bonito que eu já ouvi.` |
| `src/routes/voce.tsx` card 04 | drop `Você não sabe, mas isso é meu refúgio favorito.` |
| `src/routes/voce.tsx` card 07 | title → `sua inteligência`; text → `você é a pessoa mais inteligente que conheço` |
| `src/routes/voce.tsx` card 08 | text → `você é meu maior amor` |
| `src/routes/futuro.tsx` | replace the "sussurra de madrugada" sentence with the new "cada versão do futuro…" sentence |
| `src/routes/carta.tsx` | `nenhuma frase cabe o tamanho` → `em nenhuma frase cabe o tamanho` |
| `src/routes/essencial.tsx` | `— eu te amo` → `— eu te amo, minha rosa` |

## 5. Constellation rebalance (`src/routes/memorias.tsx`)

Star #8 (`78, 68`) currently sits isolated in the lower-right, visually drifting away from the cluster. Reposition to `62, 60` so it joins the lower arc near stars #4 and #7, and tighten star #5 from `80, 28` to `74, 30` so the upper arc closes. Keep the distance-based line algorithm — the new coords produce a balanced, intentional shape without code changes to the renderer.

## What stays untouched

Palette tokens, fonts, `StarField`, `AmbientAudio`, `ChapterNav`, route structure, all timings on other sections, all other copy.

---

### Technical notes

- New files: `src/assets/little-prince-plane.png`, `src/assets/little-prince-rose.png`, `src/assets/couple-placeholder.jpg`.
- Edited files: `src/routes/index.tsx`, `src/routes/rosa.tsx`, `src/routes/voce.tsx`, `src/routes/futuro.tsx`, `src/routes/carta.tsx`, `src/routes/essencial.tsx`, `src/routes/memorias.tsx`.
- No new dependencies. Framer Motion handles the plane exit via `animate` + `onAnimationComplete` → `navigate`.
- All new visuals follow the existing `oklch` token system and `drop-shadow` glow conventions.
