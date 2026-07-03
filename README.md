# Michalis Philippides — Portfolio

A single-page portfolio built with React, Vite, Tailwind CSS, and Framer Motion,
positioning Michalis as a quant researcher moving into fintech — not a generic
software engineer portfolio.

## Stack

- **React 19 + Vite** — app shell and dev/build tooling
- **Tailwind CSS 3** — styling (custom theme in `tailwind.config.js`: deep green/teal
  "signal" accent, near-black "ink" background, Fraunces display serif + Inter body +
  JetBrains Mono for stats/metrics)
- **Framer Motion** — scroll-triggered reveals, tab transitions, the flip cards, the
  custom cursor
- **Recharts** — the Sharpe ratio / max drawdown comparison charts in the flagship
  project section (lazy-loaded, see below)

## Getting started

```bash
npm install
npm run dev       # http://localhost:5173
```

```bash
npm run build     # production build to dist/
npm run preview   # serve the production build locally
```

## Project structure

```
src/
  data.js                 # ALL site content lives here — edit this file to
                           # update copy, stats, links, and project details
                           # without touching any component
  components/
    Nav.jsx                # fixed nav bar + mobile menu
    Hero.jsx                # name, rotating role line, social links
    About.jsx
    AcademicRecord.jsx      # interactive stats dashboard (animated bars, count-ups)
    FlagshipProject.jsx     # the MoE-LSTM capstone — tabbed accuracy/risk widget
                            # + SHAP bars. Lazy-loaded (see below).
    Projects.jsx            # secondary projects (myInsurance365, SpecWall, ...)
    Experience.jsx          # scroll-triggered timeline
    Leadership.jsx
    BeyondTheDesk.jsx       # tap-to-flip hobby cards
    Skills.jsx
    Education.jsx
    Footer.jsx
    ui/
      Section.jsx           # shared section shell + eyebrow/title
      Reveal.jsx            # scroll-in-view fade/rise wrapper
      Stat.jsx              # animated count-up number
      CustomCursor.jsx      # desktop-only cursor follower, no-ops on touch
      DataGridBackground.jsx# hero's animated grid + line-chart motif
      BrandIcons.jsx        # inline GitHub/LinkedIn glyphs (see note below)
```

## Editing content

Everything text/numeric on the page — the bio, academic marks, project
descriptions, experience timeline, links — is centralized in `src/data.js`.
Update that file and the whole site updates; no JSX edits required for
copy changes.

**Placeholders to fill in before shipping:**
- `hero.photoPlaceholder` in `data.js` — ✅ **integrated** into `Hero.jsx` with
  a responsive grid layout and smooth animations.
- `flagship.githubUrl` in `data.js` — currently `'#'`, marked `// TODO` at its
  usage site in `FlagshipProject.jsx`.
- `projects[].githubUrl` / `projects[].demoUrl` in `data.js` — SpecWall's live
  URL and the Child Well-Being repo link are marked `// TODO` placeholders.

## Notes on a couple of implementation choices

- **`lucide-react`'s installed version dropped brand/logo icons** (GitHub,
  LinkedIn, etc. were removed upstream). `ui/BrandIcons.jsx` supplies two
  small inline SVGs styled to match the rest of the icon set rather than
  pulling in a second icon library for two glyphs.
- **No `react-countup` dependency** — the count-up stat (`ui/Stat.jsx`) is a
  ~15-line hook built directly on Framer Motion's `animate()`, since that's
  already a dependency and the effect is simple.
- **`FlagshipProject` is lazy-loaded** (`React.lazy` in `App.jsx`) because it's
  the only section pulling in Recharts — splitting it out keeps the initial
  bundle smaller for the sections everyone scrolls through first.
- **Flip cards in `BeyondTheDesk`** flip on click/tap (component state), not
  CSS `:hover`, so the interaction is identical on mobile and desktop.
- **Custom cursor** only activates behind a `(hover: hover) and (pointer: fine)`
  media query check — it never attaches listeners on touch devices.

## Deploying

This is a static Vite build — `npm run build` outputs to `dist/`, deployable
as-is to:

- **Vercel**: import the repo, framework preset "Vite", no config needed.
- **Netlify**: build command `npm run build`, publish directory `dist`.
- **GitHub Pages**: run `npm run build`, then publish `dist/` (e.g. via the
  `gh-pages` package or a GitHub Actions workflow). If deploying under a
  subpath (`username.github.io/repo-name`), set `base: '/repo-name/'` in
  `vite.config.js`.
