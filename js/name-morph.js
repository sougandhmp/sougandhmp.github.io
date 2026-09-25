// Scroll-linked name animation: as the page scrolls from the top, "Sougandh" on the cover flies up and
// shrinks into the nav, then "Manikkoth Paremmal" fades in beside it. Scrolling back up reverses it.
// The cover is an iframe, so its text can't move out of it: the page overlays an identical copy (.name-flyer)
// at the cover name's exact position, hides the original (postMessage), and moves the copy instead.
// Skipped for reduced motion, and wherever the nav hides the name; the simple fade in main.js applies there.
(() => {
  const nav = document.querySelector('nav');
  const frame = document.querySelector('.cover iframe');
  const target = document.querySelector('.brand-name .bn-first');
  if (!nav || !frame || !target || matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const flyer = document.createElement('span');
  flyer.className = 'name-flyer';
  flyer.setAttribute('aria-hidden', 'true');
  flyer.textContent = target.textContent;
  document.body.append(flyer);

  let start = null;          // cover name in page coordinates: { x, docY, fontSize }
  let coverHidden = false;
  const tell = (message) => frame.contentWindow?.postMessage(message, '*');
  const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);
  const lerp = (a, b, t) => a + (b - a) * t;

  addEventListener('message', (event) => {
    if (event.source !== frame.contentWindow || !event.data?.coverName) return;
    // the cover reports positions in its own (unscaled) pixels; the iframe is scaled to fit the band
    const { x, y, fontSize } = event.data.coverName;
    const box = frame.getBoundingClientRect();
    const k = box.width / frame.offsetWidth;
    start = { x: box.left + x * k, docY: box.top + y * k + scrollY, fontSize: fontSize * k };
    update();
  });
  frame.addEventListener('load', () => tell({ requestName: true }));
  tell({ requestName: true }); // in case the cover finished loading before this script ran

  const setCoverName = (hidden) => {
    if (hidden !== coverHidden) { coverHidden = hidden; tell({ hideName: hidden }); }
  };

  function update() {
    const enabled = start && getComputedStyle(target.parentElement).display !== 'none';
    nav.classList.toggle('morph', !!enabled);
    if (!enabled) { flyer.style.visibility = 'hidden'; setCoverName(false); return; }

    // finish once the cover name has scrolled up past the top of the screen
    const distance = Math.max(120, start.docY + start.fontSize);
    const p = Math.min(1, Math.max(0, scrollY / distance));
    const end = target.getBoundingClientRect();
    const endSize = parseFloat(getComputedStyle(target).fontSize);

    nav.classList.toggle('name-landed', p >= 1);
    if (p <= 0 || p >= 1) {
      flyer.style.visibility = 'hidden';
      setCoverName(p > 0);
      return;
    }
    const e = ease(p);
    const scale = lerp(start.fontSize / endSize, 1, e);
    const x = lerp(start.x, end.left, e);
    const y = lerp(start.docY - scrollY, end.top, e);
    flyer.style.fontSize = `${endSize}px`;
    flyer.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
    flyer.style.visibility = 'visible';
    setCoverName(true);
  }

  // browsers already fire scroll events at most once per frame, so update straight from them
  addEventListener('scroll', update, { passive: true });
  // the cover rescales with the window, so ask it to measure the name again
  addEventListener('resize', () => tell({ requestName: true }));
})();
