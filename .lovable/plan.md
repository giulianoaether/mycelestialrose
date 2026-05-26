# Anniversary Site — "Em um universo inteiro, eu encontrei você"

A slow, cinematic, emotionally-paced experience. Dark elegant atmosphere, glowing particles, serif titles, intimate copy. Inspired by — not decorated with — The Little Prince.

## Experience flow

1. **Intro / Loading** (`/`) — black screen, stars slowly appearing, soft particles, fade-in line "Em um universo inteiro… eu encontrei você." → CTA fades in → enter site.
2. **Hero** (`/inicio`) — fullscreen starfield with parallax, main line "3 anos depois… e você ainda é minha parte favorita do universo.", subtext, ambient music toggle, "Começar nossa história" button.
3. **A Rosa** (`/rosa`) — single glowing rose floating in darkness, cinematic reveal, "Existem muitas rosas no mundo. Mas nenhuma delas é você."
4. **Cativar** (`/cativar`) — constellation lines drawing slowly between stars on scroll, fox-inspired passage, "Tu te tornas eternamente responsável por aquilo que cativas."
5. **Constelação de Memórias** (`/memorias`) — interactive star map; clicking a star opens a modal with a memory (photo / note / placeholder for voice note). Seeded with 6–8 memory slots she can later fill.
6. **O que eu amo em você** (`/voce`) — floating, staggered cards with delicate handwritten-feel observations.
7. **Futuro** (`/futuro`) — infinite drifting starfield, slow camera-like movement, hopeful copy about building a life together.
8. **Carta** (`/carta`) — soft paper texture, subtle glow, handwritten-style letter, signed "Com amor, do seu garoto favorito."
9. **Final** (`/essencial`) — minimal black screen, faint stars, "O essencial é invisível aos olhos.", slow fade to black.

Each section is its own route (own `head()` metadata, shareable, SSR-friendly). A persistent minimal top nav appears after the intro with chapter dots; ambient music toggle persists.

## Visual system

- **Palette (oklch tokens in `src/styles.css`)**:
  - `--background` deep black `oklch(0.08 0.005 270)`
  - `--foreground` warm white `oklch(0.95 0.01 80)`
  - `--cream` `oklch(0.92 0.03 80)`
  - `--gold` subtle `oklch(0.78 0.11 75)`
  - `--rose` muted `oklch(0.62 0.09 20)`
  - `--glow` ambient halo color
  - Gradients: `--gradient-night` (radial deep navy→black), `--gradient-rose-glow`
  - Shadows: `--shadow-glow` (gold), `--shadow-rose`
- **Typography**: Cormorant Garamond (serif titles) + Inter (sans body), wide cinematic tracking on titles, generous line-height.
- **Motion**: Framer Motion for reveal/parallax, slow easings (1.2–2s), `prefers-reduced-motion` respected. No bouncy springs — soft, drifting.
- **Particles**: lightweight canvas starfield (no heavy libs) + CSS glow blobs. Twinkle via opacity sine.
- **Rose**: AI-generated single rose image with transparent background, layered with CSS glow + slow float animation.

## Components

- `StarField` — canvas with drifting/twinkling stars, parallax on scroll/mouse.
- `Particles` — soft floating dust motes.
- `ChapterNav` — minimal dot nav, fixed bottom-right.
- `AmbientAudio` — toggle in top-right, fades in/out, autoplay off (gesture required), localStorage memory.
- `RevealText` — word-by-word fade for poetic lines.
- `MemoryStar` — clickable star with modal (Dialog) showing photo + caption.
- `LoveCard` — floating card with delicate border + subtle parallax.
- `PaperLetter` — paper-textured container with handwritten font for the final letter.

## Assets (AI-generated)

- `rose-glow.png` (transparent, premium quality) — single luminous rose in darkness.
- `paper-texture.jpg` — warm aged paper for the letter.
- `nebula-bg.jpg` — soft dark nebula for hero/future backdrops.

(Memory photos are placeholders the user can swap in later.)

## Technical notes

- TanStack Start file-based routes under `src/routes/` (`index.tsx` = intro, then `inicio.tsx`, `rosa.tsx`, `cativar.tsx`, `memorias.tsx`, `voce.tsx`, `futuro.tsx`, `carta.tsx`, `essencial.tsx`).
- Each route sets its own `head()` (title in Portuguese, og meta).
- `framer-motion` for animations, `lucide-react` for the rare icon (volume toggle).
- Fonts loaded via `<link>` in `__root.tsx` head.
- All colors via semantic tokens — no inline hex in components.
- Fully responsive; mobile = vertical scroll storytelling, desktop = full cinematic.

## Out of scope (for this first build)

- No backend / auth / database — pure frontend poetic experience.
- Voice notes shown as placeholder UI (real audio can be added later by dropping files in `src/assets/audio/`).
- No CMS — copy lives in route files so it's easy for you to refine line-by-line.

Ready to build when you approve.