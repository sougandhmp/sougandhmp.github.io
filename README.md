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

```
.
├── index.html                 Home page: hero, experience, skills, projects, recommendations, about/contact
├── project.html               One page for every project (project.html?id=flagmaster), filled in by js/project-page.js
├── cover.html                 Animated cover banner, embedded in the home page through an <iframe>
├── CNAME                      Custom domain for GitHub Pages (sougandh.dev). Don't delete
├── README.md
├── css/
│   └── styles.css             All styles. Theme colours and fonts are at the top
├── js/
│   ├── theme.js               Light/dark theme (loaded in <head> on both pages)
│   ├── main.js                Home-page behaviour (see JavaScript)
│   ├── floaters.js            Floating tech-logo tiles, as a data list
│   ├── name-morph.js          Scroll animation: "Sougandh" flies from the cover into the nav
│   ├── contact.js             "Send me a message" form (see Contact form)
│   ├── projects.js            Content for the project pages: one entry per project
│   └── project-page.js        Builds project.html from js/projects.js
├── assets/
│   ├── icons/                 favicon-32.png, favicon-192.png, apple-touch-icon.png (SMP monogram)
│   ├── images/
│   │   ├── avatar-caricature.png              Caricature used on the cover
│   │   ├── profile-droidcon-berlin-2021.png   Photo in About & contact
│   │   ├── cover.png                          Static 3000×1000 render of cover.html
│   │   ├── og-image.png                       1200×630 link-preview card (LinkedIn, X, Slack…)
│   │   └── projects/
│   │       └── flagmaster/                    App screenshots for the FlagMaster page (480px wide)
│   └── resume/
│       ├── sougandh-manikkoth-paremmal-resume.pdf   Résumé for viewing and downloading
│       └── resume-page-1.png, resume-page-2.png     The pages as images, for phones without a PDF viewer
└── tools/                     Sources for generated images, not linked from the site
    ├── og-card.html           Builds assets/images/og-image.png
    └── icon.html              Builds the icons in assets/icons/
```

### Naming conventions

- **File and folder names:** lowercase kebab-case (`name-morph.js`, `profile-droidcon-berlin-2021.png`). No spaces, capitals or underscores. GitHub Pages URLs are case-sensitive, and this keeps links predictable.
- **Describe the content, not the order:** e.g. `results-screen.png`, not `screenshot-2.png`.
- **Where files go:**
  - **Pages:** at the root (`index.html`, `project.html`, `cover.html`).
  - **Code:** in `css/` and `js/`.
  - **Everything else:** in `assets/`. That's `icons/` for icons, `images/` for images (per-project screenshots in `images/projects/<project-id>/`, using the same ID as `js/projects.js`), and `resume/` for the résumé.
- **Résumé download name:** the download link sets a readable file name, `Sougandh-Manikkoth-Paremmal-Resume.pdf`, through its `download` attribute, independent of the stored name.

---

## Page sections (`index.html`)

In page order:

1. **Nav**: the SMP monogram, section links (Experience, Skills, Projects, Recommendations, About), a Résumé button and the sun/moon theme switch.
   - **Name:** as you scroll down from the top, the whole name on the cover ("Sougandh" and "Manikkoth Paremmal") flies up into the nav and shrinks to fit, landing side by side. Scrolling back up reverses it (`js/name-morph.js`). With reduced motion, the name simply fades in once the cover scrolls away. It's hidden between 961px and 1080px, where there isn't room for it.
   - **701px to 960px (tablets):** the links collapse behind a menu button. The theme switch stays in the bar.
   - **700px and below (phones):** a bottom navigation bar (`.tabbar`, Material 3 style) replaces the top menu, with Work, Skills, Projects, Reviews and About one thumb-tap away. The top bar keeps just the monogram and the theme switch.
   - **Keyboard:** a "Skip to content" link appears when a keyboard user presses Tab on arrival.
2. **Cover**: `cover.html` in an iframe. It's scaled to fit the window by a `ResizeObserver` in `main.js`.
3. **Hero**: built so a recruiter gets the essentials in the first few seconds. In order: role tag, headline, a one-line hiring summary (`.summary`), the core stack (`.hero-stack`), location and availability with a pulsing green status dot (`.availability`), call-to-action buttons, then the longer intro paragraph and three highlight tiles.
4. **Experience** (`#experience`): a vertical timeline, with one `.job` block per role inside `.timeline`, newest first. On desktop, dates sit on the left, a line with a dot per role runs down the middle, and details are on the right. On phones, the line runs down the left edge. The most recent role gets a filled, glowing dot. The line and dots are pure CSS (`.timeline::before`, `.job::before`), so adding a role is just another `.job` block.
5. **Skills** (`#skills`): three rows, deliberately short so the Android signal isn't diluted: **Core** (`.skillrow.core`, highlighted green), **Engineering** and **Additional**. Add a skill only if you'd want a recruiter to ask about it.
6. **Projects** (`#projects`): project cards with Android, Jetpack Compose and Flutter filters. Clicking anywhere on a card opens that project's own page, `project.html?id=…` (see **Add or edit project details** under [Common edits](#common-edits)).
7. **What people say** (`#recommendations`): LinkedIn recommendations, quoted word for word.
8. **About & contact** (`#contact`): photo, short bio, education, languages and contact buttons, followed by the **Send me a message** form (`#message`). The hero's **Get in touch** button links to the form.
9. **Résumé dialog**: opened by any link with `data-resume`.
10. **Footer**: the year is filled in by JavaScript.

### Common edits

**Add a job.** Copy an existing `<div class="job" role="listitem">` block inside `.timeline` in `#experience`, and put it first if it's your newest role. Bullets marked `class="more"` stay hidden until the visitor clicks "Show more".

```html
<div class="job" role="listitem">
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

**Add a project.** Copy a `<div class="card">` in `#projects`. `data-category` controls which filter buttons show the card. Use space-separated values from `android`, `compose` (Jetpack Compose) and `flutter`. To add a new filter, add a button with a matching `data-filter` next to the existing ones.

```html
<div class="card" data-category="android compose">
  <h3><a class="card-link" href="project.html?id=my-app">Project name</a></h3>
  <p>One or two sentences on what it is and what you did.</p>
  <ul class="stack"><li>Kotlin</li><li>Jetpack Compose</li></ul>
  <a href="https://github.com/…">View on GitHub →</a>
</div>
```

- **Whole card is a link:** the title link (`.card-link`) is stretched over the card, so clicking anywhere on it opens the project page. Other links inside the card, like GitHub, still open their own destinations.
- **Tech stack:** each `<li>` in `.stack` shows as one amber chip. Cards show only the **first three** technologies from the project's `stack` in `js/projects.js`, plus a dashed `<li class="more">+N</li>` chip for the rest. The full list is on the project page. When you change a stack, update the card's three chips and the count.
- **GitHub and Google Play links:** use round icon buttons (`<a class="icon-link" … aria-label="My App on GitHub" title="GitHub">` with the logo SVG). Copy an existing one from `index.html`. On project pages, links to github.com and play.google.com become icon buttons automatically. Other links stay as text buttons.
- **Featured project:** add `featured` to the card's class (`class="card featured"`) to make it span two columns on screens 700px and wider, as MEGA Android does. The desktop grid has three columns.

- **Several links:** wrap them in `<div class="links">…</div>`, as on the MEGA Android card.
- **No public link:** use `<span class="note">Client work, not public</span>` instead.

**Add or edit project details.** Each project page is built from its entry in `js/projects.js`, so you don't edit any HTML for it. The ID in the card's title link must match the entry's key:

```html
<h3><a class="card-link" href="project.html?id=my-app">My App</a></h3>
```

```js
'my-app': {
  title: 'My App',                                   // required
  kicker: 'Personal project',                        // small green line above the title
  award: 'Top Engineer of the Month · Feb 2026',     // optional badge
  summary: 'One or two sentences on what it is.',
  meta: [['Role', '…'], ['When', '…']],              // label/value pairs shown in a row
  impact: [['33%', 'faster auto-fill']],             // big-number tiles
  screenshots: [['assets/images/projects/my-app/home-screen.png', 'Describe what the screenshot shows']],
  sections: [['What I did', ['First point.', 'Second point.']]],
  stack: ['Kotlin', 'Jetpack Compose'],
  links: [['View on GitHub', 'https://github.com/…']],
  note: 'Client work, not public',
},
```

Every field except `title` is optional. The Previous and Next links at the bottom of each project page follow the order of the entries in `js/projects.js`, so keep it the same as the cards. Keep the content factual: it's taken from the résumé and, for FlagMaster, the repo README.

**Add an award badge.** It appears on the Synechron job and the banking project card:

```html
<span class="award"><svg …trophy…></svg>Top Engineer of the Month · Feb 2026</span>
```

**Add a recommendation.** Copy a `<figure class="quote">` in `#recommendations`. Put each paragraph of the recommendation in its own `<p>` inside the `<blockquote>`, and quote it exactly as written on LinkedIn. The caption holds the initials, name, current role and how you worked together.

**Change the headline.** Edit the `<h1>` in the hero. Wrap the words you want highlighted in amber in `<span class="name">…</span>`.

**Update the résumé.**
1. Replace `assets/resume/sougandh-manikkoth-paremmal-resume.pdf`, keeping the same name. If you rename it, update the five references in `index.html`.
2. Re-export `assets/resume/resume-page-1.png` and `resume-page-2.png` from the new PDF, one image per page (the current ones are 1224×1584).

**Update page titles and link previews.** The `<title>`, `description`, `og:*` and `twitter:*` tags are at the top of `index.html`.

---

## Contact form

The **Send me a message** form (`#message` in `index.html`, logic in `js/contact.js`) delivers messages to your inbox through [Web3Forms](https://web3forms.com). A static GitHub Pages site can't send email by itself.

**Setup:** done. The form's hidden `access_key` input in `index.html` holds the Web3Forms key for `sougandhmp@gmail.com`.
- **Replacing the key:** to change the key, or to send messages to another address, create a new key at https://web3forms.com and replace that value.
- **Placeholder fallback:** if the value is ever set back to a `YOUR_…` placeholder, the form falls back to opening the visitor's email app.

**Is the key safe to publish?** Yes. The access key only lets people send messages *to* you, so it's meant to live in public HTML. Anyone who sends you a message through the form has their name, email and message passed through Web3Forms on the way to you.

**How the form behaves:**
- **Fields:** Name, Email and Message are required (marked *). Phone is optional, but if it's filled in it must look like a phone number (digits, spaces, `+ ( ) - .`, 6–30 characters).
- **Send button:** it stays disabled until the name and message aren't blank, the email is valid (it must include a dot in the domain, so `a@b` isn't accepted) and any phone number is valid. The hint under the button lists exactly what's still missing (e.g. "Still needed: a valid email address and a message.") and disappears once the form is ready. Email and phone errors appear once the visitor leaves the field.
- **Phone in your email:** when a visitor gives a phone number, it's included in the message you receive.
- **How it sends:** the form posts to Web3Forms as `FormData` with no custom headers. JSON would make the browser send a CORS preflight request first, and Web3Forms rejects those, so the form would fail.
- **Success:** the form clears and thanks the visitor by name.
- **Failure:** the typed message stays in the form, and a direct email link is offered instead.
- **Spam:** a hidden `botcheck` field catches simple spam bots. Web3Forms also filters spam on its side.
- **Subject line:** messages arrive as "New message from <name> via sougandh.dev", and replying goes straight to the visitor's email.

## Styling (`css/styles.css`)

### Theme colours

Both themes are defined as CSS custom properties at the top of the file. Visitors get the one matching their device until they choose with the switch:

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
| `--danger` | Form error text and invalid field borders |
| `--dots` | The dotted grid across the page background, matching the cover |
| `--highlight` | 1px top sheen on cards, tiles and the About panel, for depth |
| `--glow-a`, `--glow-b` | Very soft green and amber ambient light fixed behind the page (`body::before`) |

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

- **Breakpoints:** the nav collapses to a menu at `max-width: 960px`. At `max-width: 700px` the phone bottom bar takes over, and the rule that hides the top menu is last in the file so it wins. Most other phone rules sit in one `@media (max-width: 700px)` block.
- **Touch screens:** hover effects in the nav only apply on devices with a real pointer (`@media (hover: hover)`), so a tap doesn't leave a button looking stuck.
- **Floating icons:** they get smaller and fainter below 1300px, and half of them are hidden below 700px.
- **Reduced motion:** a `prefers-reduced-motion` block turns off every animation for visitors who ask for less motion.

---

## JavaScript

### `js/main.js`

| Feature | How it works |
|---|---|
| Cover scaling | A `ResizeObserver` scales the 1500×500 cover iframe to fill the banner without cropping |
| Nav name | An `IntersectionObserver` on the cover toggles `nav.hide-brand`. The name fades in once less than 35% of the cover is visible. This is the fallback when the fly-in animation is off |
| Name fly-in | In `js/name-morph.js`. The cover is an iframe, so its text can't leave it. Instead, the cover reports the position and style of both name parts (`postMessage`), and the page lays identical copies (`.name-flyer`) exactly over them. While scrolling, the cover hides its originals, and the copies move and scale to the nav's `.bn-first` and `.bn-rest`. The surname's weight (500 to 800) and colour (grey to full) blend on the way, because Sora is loaded as a variable font. It's also nudged right as the two lines converge, so they never overlap. When they land, `nav.name-landed` shows the real nav name. It's driven directly by scroll position, not a timer |
| Theme | In `js/theme.js`, shared with `project.html`. Until a visitor uses the switch, the site follows their device's light/dark setting, including live changes. The switch saves their choice in `localStorage`. It also sets the mobile browser toolbar colour (`theme-color`), keeps the cover in sync, and cross-fades the page with the View Transitions API where supported (not with reduced motion) |
| Mobile menu | `setMenu()` opens and closes the menu at 960px and below, and keeps `aria-expanded` and the button label in sync. It closes on a link tap, Escape (focus returns to the button), a tap outside the nav, or when the window widens past the breakpoint |
| Job "Show more" | Toggles `.expanded` on a `.job` to reveal its `li.more` bullets |
| Project filters | Hides cards whose `data-category` tags don't include the selected filter, and marks the selected button with `aria-pressed` |
| Active nav link | Highlights the section in view in both the top menu and the phone bottom bar, and sets `aria-current`. Scrolling back to the hero clears it |
| Scroll reveal | Fades in elements with `data-reveal` as they enter the screen |
| Résumé viewer | Opens a dialog with the browser's PDF viewer, or with `assets/resume/resume-page-1/2.png` on phones and browsers without one |
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

A self-contained 1500×500 banner: name, skill chips, caricature, a code card that types itself out, a "BUILD SUCCESSFUL" chip, a robot and drifting tech tiles. It has its own inline CSS.

**Theme:** the cover follows the site's light/dark theme.
- **Colours:** its colours are CSS variables at the top of `cover.html`, with a `[data-theme="light"]` set, matching the Graphite values in `css/styles.css`. If you change the site theme, change these too.
- **Name position:** the cover also reports where its name is and hides it on request, for the name fly-in (see [JavaScript](#javascript)).
- **Syncing:** on load, the cover reads the saved theme. When the switch is flipped, `js/theme.js` sends the new theme to every `<iframe data-theme-sync>` with `postMessage`. That also works when previewing from the file system.
- **Fixed in both themes:** Android green and the Kotlin/Flutter logos.
- **Greeting.kt code card:** it switches too, from a dark editor window to a light one, with its own `--code-*` colours at the top of `cover.html`. The light-theme syntax colours pass AA contrast on white.

### Regenerating `cover.png` and `og-image.png` (in `assets/images/`)

These two are static pictures of the cover in its default dark theme. Regenerate them whenever `cover.html` changes: link previews use `og-image.png`, and it's built from `cover.png`.

From the repo root on macOS, with Google Chrome installed:

```sh
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

# 1. assets/images/cover.png: 3000×1000 (2× scale), after the typing animation finishes
"$CHROME" --headless=new --hide-scrollbars --force-device-scale-factor=2 \
  --window-size=1500,500 --virtual-time-budget=8000 \
  --screenshot="$PWD/assets/images/cover.png" "file://$PWD/cover.html"

# 2. assets/images/og-image.png: 1200×630 card built from cover.png (tools/og-card.html)
"$CHROME" --headless=new --hide-scrollbars --force-device-scale-factor=1 \
  --window-size=1200,630 --virtual-time-budget=6000 \
  --screenshot="$PWD/assets/images/og-image.png" "file://$PWD/tools/og-card.html"
```

Always run step 1 before step 2. The tagline, domain and keywords at the bottom of the card are in `tools/og-card.html`.

After pushing a new card, paste https://sougandh.dev into [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/). This refreshes LinkedIn's cached preview.

---

### Regenerating the icons

The tab and home-screen icons are the SMP monogram, drawn by `tools/icon.html` at any size. The `?s=` parameter sets the size in pixels. `&bleed=1` makes a full square for iOS, which rounds the corners itself.

```sh
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
render() { "$CHROME" --headless=new --hide-scrollbars --force-device-scale-factor=1 --default-background-color=00000000 \
  --window-size=$1,$1 --virtual-time-budget=5000 --screenshot="$PWD/$2" "file://$PWD/tools/icon.html?s=$1$3"; }
render 32 assets/icons/favicon-32.png
render 192 assets/icons/favicon-192.png
render 180 assets/icons/apple-touch-icon.png '&bleed=1'
```

Browsers cache icons hard. After changing them, bump the `?v=` number on the three icon links in both `index.html` and `project.html`.

## Accessibility notes

- **Decorative elements:** the cover iframe and floating logos are `aria-hidden` and can't receive keyboard focus.
- **Monogram link:** it has `aria-label="Sougandh Manikkoth Paremmal, back to top"`.
- **Nav:** the top bar has `aria-label="Main"` and the phone bottom bar has `aria-label="Sections"`. The current section's link gets `aria-current="location"`.
- **Mobile menu button:** it reports its state with `aria-expanded` and `aria-controls`. Escape closes the menu.
- **Skip link:** "Skip to content" appears on the first Tab press.
- **Reduced motion:** animations stop for visitors who've asked for less motion.
- **Contrast:** check it in both themes when changing a colour token.
