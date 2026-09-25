// Scroll-linked name animation: as the page scrolls from the top, the whole name on the cover,
// "Sougandh" and "Manikkoth Paremmal", flies up and shrinks into the nav, where the two parts land side by side.
// Scrolling back up reverses it.
// The cover is an iframe, so its text can't move out of it: the page overlays identical copies (.name-flyer)
// at each part's exact position, hides the originals (postMessage), and moves the copies instead.
// The surname is lighter and grey on the cover but bold in the nav, so its weight and colour blend on the way
// (Sora is loaded as a variable font, weights 500 to 800, so the weight changes smoothly).
// Skipped for reduced motion, and wherever the nav hides the name; the simple fade in main.js applies there.
(() => {
  const nav = document.querySelector('nav');
  const frame = document.querySelector('.cover iframe');
  const brandName = document.querySelector('.brand-name');
  if (!nav || !frame || !brandName || matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // each part of the name: where it lands in the nav, and the copy that flies there
  const parts = ['first', 'rest'].map((key) => {
    const target = brandName.querySelector(key === 'first' ? '.bn-first' : '.bn-rest');
    const flyer = document.createElement('span');
    flyer.className = 'name-flyer';
    flyer.setAttribute('aria-hidden', 'true');
    flyer.textContent = target.textContent;
    document.body.append(flyer);
    return { key, target, flyer, start: null };
  });

  let coverHidden = false;
  const tell = (message) => frame.contentWindow?.postMessage(message, '*');
  const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);
  const lerp = (a, b, t) => a + (b - a) * t;

  addEventListener('message', (event) => {
    if (event.source !== frame.contentWindow || !event.data?.coverName) return;
    // the cover reports positions in its own (unscaled) pixels; the iframe is scaled to fit the band
    const box = frame.getBoundingClientRect();
    const k = box.width / frame.offsetWidth;
    parts.forEach((part) => {
      const c = event.data.coverName[part.key];
      if (!c) return;
      part.start = { x: box.left + c.x * k, docY: box.top + c.y * k + scrollY, fontSize: c.fontSize * k,
        weight: c.weight, letterSpacing: c.letterSpacing };
    });
    update();
  });
  frame.addEventListener('load', () => tell({ requestName: true }));
  tell({ requestName: true }); // in case the cover finished loading before this script ran

  const setCoverName = (hidden) => {
    if (hidden !== coverHidden) { coverHidden = hidden; tell({ hideName: hidden }); }
  };
  const hideFlyers = () => parts.forEach((part) => { part.flyer.style.visibility = 'hidden'; });

  function update() {
    const enabled = parts.every((part) => part.start) && getComputedStyle(brandName).display !== 'none';
    nav.classList.toggle('morph', enabled);
    if (!enabled) { hideFlyers(); setCoverName(false); return; }

    // finish once the whole name (the surname is the lower line) has scrolled up past the top of the screen
    const last = parts[1].start;
    const distance = Math.max(120, last.docY + last.fontSize);
    const p = Math.min(1, Math.max(0, scrollY / distance));

    nav.classList.toggle('name-landed', p >= 1);
    if (p <= 0 || p >= 1) { hideFlyers(); setCoverName(p > 0); return; }

    const e = ease(p);
    const endStyle = getComputedStyle(parts[0].target);
    const endSize = parseFloat(endStyle.fontSize);
    const endWeight = parseFloat(endStyle.fontWeight);
    const endSpacing = parseFloat(endStyle.letterSpacing) / endSize || 0;
    const placed = parts.map(({ target, start }) => {
      const end = target.getBoundingClientRect();
      const scale = lerp(start.fontSize / endSize, 1, e);
      return { end, scale, x: lerp(start.x, end.left, e), y: lerp(start.docY - scrollY, end.top, e) };
    });
    // The two lines start stacked and end on one row, and while they converge "Sougandh" is still larger than its
    // final size. Keep the surname to the right of it, easing the nudge in by how far the lines have closed up
    // vertically: zero at the start (the surname begins exactly on the cover's text), fully applied before the
    // lines share a row, and nothing at the end (the surname's nav spot is already just right of "Sougandh").
    const [first, rest] = placed;
    const firstRight = first.x + (first.end.width + (rest.end.left - first.end.right)) * first.scale;
    const startGap = parts[1].start.docY - parts[0].start.docY;
    const closed = Math.min(1, Math.max(0, 1 - (rest.y - first.y) / startGap));
    const t = Math.min(1, Math.max(0, (closed - 0.05) / 0.7));
    const nudge = t * t * (3 - 2 * t); // smoothstep
    rest.x = lerp(rest.x, Math.max(rest.x, firstRight), nudge);

    parts.forEach(({ flyer, start }, i) => {
      const { x, y, scale } = placed[i];
      flyer.style.fontSize = `${endSize}px`;
      flyer.style.fontWeight = Math.round(lerp(start.weight, endWeight, e));
      flyer.style.letterSpacing = `${lerp(start.letterSpacing, endSpacing, e)}em`;
      // grey (the cover's --muted) for a lighter start, blending to the nav's full text colour
      flyer.style.color = start.weight < endWeight ? `color-mix(in srgb, var(--fg) ${Math.round(e * 100)}%, var(--muted))` : '';
      flyer.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
      flyer.style.visibility = 'visible';
    });
    setCoverName(true);
  }

  // browsers already fire scroll events at most once per frame, so update straight from them
  addEventListener('scroll', update, { passive: true });
  // the cover rescales with the window, so ask it to measure the name again
  addEventListener('resize', () => tell({ requestName: true }));
})();
