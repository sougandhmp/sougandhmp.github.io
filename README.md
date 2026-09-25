# sougandh.dev

Personal portfolio of **Sougandh Manikkoth Paremmal**, Senior Android Engineer & Tech Lead.

Live at **https://sougandh.dev**, served by GitHub Pages from the `develop` branch.

The site is plain HTML, CSS and JavaScript. There is no framework, no package manager and no build step.

---

## Preview locally

Open `index.html` in a browser:

```sh
open index.html
```

Everything works from the file system. Fonts load from Google Fonts, so you need an internet connection to see the right typefaces.

## Deploy

Commit and push to `develop`. GitHub Pages publishes it within a minute or two.

```sh
git add -A
git commit -m "Describe the change"
git push origin develop
```

The custom domain comes from `CNAME` (`sougandh.dev`). Don't delete that file.

Don't amend or force-push commits that are already on GitHub. Make a new commit instead, so your local branch and GitHub don't drift apart.

---

## Project structure

| Path | What it is |
|---|---|
| `index.html` | All page content: hero, experience, skills, projects, recommendations, about/contact, résumé viewer |
| `css/styles.css` | All styles. Theme colours and fonts are at the top |
| `js/main.js` | Page behaviour (see [JavaScript](#javascript)) |
| `js/floaters.js` | The floating tech-logo tiles in the page margins, as a data list |
| `cover.html` | Animated cover banner (1500×500), embedded in the hero through an `<iframe>` |
| `tools/og-card.html` | Source for the link-preview image `og-image.png` |
| `cover.png` | Static 3000×1000 render of `cover.html` |
| `og-image.png` | 1200×630 link-preview card for LinkedIn, X, Slack and similar sites |
| `avatar.png` | Caricature used on the cover |
| `profile.png` | Photo in the About section (droidcon Berlin 2021) |
| `Sougandh_MP_Resume_Sydney.pdf` | Résumé, for viewing and downloading |
| `resume-1.png`, `resume-2.png` | Résumé pages as images, shown on phones and browsers without a PDF viewer |
| `favicon-32.png`, `favicon-192.png`, `apple-touch-icon.png` | Browser and home-screen icons |
| `CNAME` | Custom domain for GitHub Pages |

---

## Page sections (`index.html`)

In page order:

1. **Nav**: the SMP monogram, the section links and the theme toggle. The full name next to the monogram appears only after the cover scrolls out of view.
2. **Cover**: `cover.html` in an iframe. It's scaled to fit the window by a `ResizeObserver` in `main.js`.
3. **Hero**: eyebrow tag, headline, intro paragraph, location line, call-to-action buttons and three highlight tiles.
4. **Experience** (`#experience`): one `.job` block per role.
5. **Skills** (`#skills`): one `.skillrow` per category.
6. **Projects** (`#projects`): project cards with Android and Compose filters.
7. **What people say** (`#recommendations`): LinkedIn recommendations, quoted word for word.
8. **About & contact** (`#contact`): photo, short bio, education, languages and contact buttons.
9. **Résumé dialog**: opened by any link with `data-resume`.
10. **Footer**: the year is filled in by JavaScript.

### Common edits

**Add a job.** Copy an existing `<div class="job">` block in `#experience`. Bullets marked `class="more"` stay hidden until the visitor clicks "Show more".

```html
<div class="job">
  <div class="when">Jan 2027 – Present</div>
  <div>
    <h3>Job title</h3>
    <div class="org">Company · City</div>
    <ul>
      <li>Always visible bullet.</li>
      <li class="more">Shown after "Show more".</li>
    </ul>
    <button class="job-toggle" type="button">Show more ↓</button>
  </div>
</div>
```

**Add a project.** Copy a `<div class="card">` in `#projects`. `data-category` controls which filter buttons show the card. Use space-separated values from `android` and `compose`.

```html
<div class="card" data-category="android compose">
  <h3>Project name</h3>
  <p>One or two sentences on what it is and what you did.</p>
  <div class="stack">Kotlin · Jetpack Compose</div>
  <a href="https://github.com/…">View on GitHub →</a>
</div>
```

- **Several links:** wrap them in `<div class="links">…</div>`, as on the MEGA Android card.
- **No public link:** use `<span class="note">Client work, not public</span>` instead.

**Add an award badge.** It appears on the Synechron job and the banking project card:

```html
<span class="award"><svg …trophy…></svg>Top Engineer of the Month · Feb 2026</span>
```

**Add a recommendation.** Copy a `<figure class="quote">` in `#recommendations`. Put each paragraph of the recommendation in its own `<p>` inside the `<blockquote>`, and quote it exactly as written on LinkedIn. The caption holds the initials, name, current role and how you worked together.

**Change the headline.** Edit the `<h1>` in the hero. Wrap the words you want highlighted in amber in `<span class="name">…</span>`.

**Update the résumé.**
1. Replace `Sougandh_MP_Resume_Sydney.pdf`. If you rename it, update the four references in `index.html`.
2. Re-export `resume-1.png` and `resume-2.png` from the new PDF, one image per page (the current ones are 1224×1584).

**Update page titles and link previews.** The `<title>`, `description`, `og:*` and `twitter:*` tags are at the top of `index.html`.

---

## Styling (`css/styles.css`)

### Theme colours

Both themes are defined as CSS custom properties at the top of the file:

- **Dark (default):** `:root`
- **Light:** `[data-theme="light"]`

Change a colour in these two blocks and it updates across the whole site.

| Token | Used for |
|---|---|
| `--bg`, `--fg` | Page background and main text |
| `--muted`, `--faint` | Secondary and tertiary text |
| `--line` | Borders and dividers |
| `--accent`, `--accent-strong`, `--accent-soft` | Android green: links, buttons, tags, monogram |
| `--secondary` | Amber: company names, stack labels, headline highlight, award badge |
| `--card`, `--surface` | Card and tile backgrounds |

The primary button (`.btn.primary`) always uses Android green `#3ddc84`, in both themes.

### Fonts

The fonts are loaded from Google Fonts in the `<head>` of `index.html` and assigned in `:root`:

| Token | Font | Used for |
|---|---|---|
| `--display` | Sora | Headline, job titles, card titles, stat numbers, nav name |
| `--body` | Instrument Sans | Body text |
| `--mono` | JetBrains Mono | Section labels, tags, dates, code-style details |

If you change a font, update both the Google Fonts `<link>` and the token. `cover.html` loads Sora and JetBrains Mono on its own.

### Responsive layout and motion

- **Breakpoint:** most mobile rules sit in one `@media (max-width: 700px)` block.
- **Floating icons:** they get smaller and fainter below 1300px, and half of them are hidden below 700px.
- **Reduced motion:** a `prefers-reduced-motion` block turns off every animation for visitors who ask for less motion.

---

## JavaScript

### `js/main.js`

| Feature | How it works |
|---|---|
| Cover scaling | A `ResizeObserver` scales the 1500×500 cover iframe to fill the banner without cropping |
| Nav name | An `IntersectionObserver` on the cover toggles `nav.hide-brand`. The name shows once less than 35% of the cover is visible |
| Theme toggle | Switches `data-theme` on `<html>` and remembers the choice in `localStorage` |
| Mobile menu | The ☰ button opens and closes the nav links and updates `aria-expanded` |
| Job "Show more" | Toggles `.expanded` on a `.job` to reveal its `li.more` bullets |
| Project filters | Hides cards whose `data-category` doesn't include the selected filter |
| Active nav link | Highlights the nav link for the section currently in view |
| Scroll reveal | Fades in elements with `data-reveal` as they enter the screen |
| Résumé viewer | Opens a dialog with the browser's PDF viewer, or with `resume-1/2.png` on phones and browsers without one |
| Footer year | Fills in the current year |

### `js/floaters.js`

Each floating logo is one entry in the `FLOATERS` list:

```js
{ name: "Gradle", side: 'l', y: 53.9, r: 7, d: 6.8, delay: -5.4, dx: 6, svg: "<svg …>" },
```

| Field | Meaning |
|---|---|
| `name` | Tooltip text |
| `side` | `'l'` for the left margin, `'r'` for the right |
| `y` | Vertical position, as a percentage of the page height |
| `r` | Tilt in degrees |
| `d`, `delay` | Drift animation length and starting offset, in seconds |
| `dx` | Small horizontal nudge, in pixels |
| `stack` | Optional `true` for tiles that show a small logo above a text label (KMP, TF Lite) |

Logo paths come from [Simple Icons](https://simpleicons.org). Open an icon's SVG there, copy its `d` attribute, and choose a fill colour that reads well on the dark tiles.

- **Dark brand colours** (such as Gradle and Java): use `var(--fg)` so the logo switches with the theme.
- **Kotlin logos:** they share the `#fl-kt` gradient defined in the script.

---

## Cover and images

### `cover.html`

A self-contained 1500×500 banner: name, skill chips, caricature, a code card that types itself out, a "BUILD SUCCESSFUL" chip, a robot and drifting tech tiles. It has its own inline CSS and needs no JavaScript.

### Regenerating `cover.png` and `og-image.png`

These two are static pictures of the cover. Regenerate them whenever `cover.html` changes: link previews use `og-image.png`, and it's built from `cover.png`.

From the repo root on macOS, with Google Chrome installed:

```sh
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

# 1. cover.png: 3000×1000 (2× scale), after the typing animation finishes
"$CHROME" --headless=new --hide-scrollbars --force-device-scale-factor=2 \
  --window-size=1500,500 --virtual-time-budget=8000 \
  --screenshot="$PWD/cover.png" "file://$PWD/cover.html"

# 2. og-image.png: 1200×630 card built from cover.png (tools/og-card.html)
"$CHROME" --headless=new --hide-scrollbars --force-device-scale-factor=1 \
  --window-size=1200,630 --virtual-time-budget=6000 \
  --screenshot="$PWD/og-image.png" "file://$PWD/tools/og-card.html"
```

Always run step 1 before step 2. The tagline, domain and keywords at the bottom of the card are in `tools/og-card.html`.

After pushing a new card, paste https://sougandh.dev into [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/). This refreshes LinkedIn's cached preview.

---

## Accessibility notes

- **Decorative elements:** the cover iframe and floating logos are `aria-hidden` and can't receive keyboard focus.
- **Monogram link:** it has `aria-label="Sougandh Manikkoth Paremmal, back to top"`.
- **Mobile menu button:** it reports its state with `aria-expanded`.
- **Reduced motion:** animations stop for visitors who've asked for less motion.
- **Contrast:** check it in both themes when changing a colour token.
