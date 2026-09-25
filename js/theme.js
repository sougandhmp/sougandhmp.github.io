// Theme: loaded in <head> on every page so the right theme applies before the first paint.
// Until the visitor picks a theme with the switch, the site follows their device's light/dark setting.
(() => {
  const root = document.documentElement;
  const prefersLight = matchMedia('(prefers-color-scheme: light)');
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const BAR_COLOURS = { dark: '#111214', light: '#f6f7f8' }; // mobile browser toolbar, matches --bg
  const normalizeTheme = (theme) => (theme === 'light' || theme === 'dark' ? theme : (prefersLight.matches ? 'light' : 'dark'));

  let saved = null;
  try { saved = normalizeTheme(localStorage.getItem('theme')); } catch (e) { /* storage blocked: follow the device */ }
  const current = () => normalizeTheme(saved || (prefersLight.matches ? 'light' : 'dark'));

  // embedded pages that follow the theme (the cover) get it by postMessage,
  // which also works when previewing from the file system, where the iframe can't read this page
  const syncFrames = () => document.querySelectorAll('iframe[data-theme-sync]').forEach((frame) =>
    frame.contentWindow?.postMessage({ theme: root.dataset.theme }, '*'));

  const apply = (theme) => {
    const nextTheme = normalizeTheme(theme);
    root.dataset.theme = nextTheme;
    root.style.colorScheme = nextTheme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', BAR_COLOURS[nextTheme]);
    const toggle = document.querySelector('.theme-toggle');
    toggle?.setAttribute('aria-label', nextTheme === 'light' ? 'Switch to dark theme' : 'Switch to light theme');
    syncFrames();
  };
  apply(current());

  // the device setting changed while the page is open: follow it, unless the visitor has chosen a theme
  prefersLight.addEventListener('change', () => { if (!saved) apply(current()); });

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('iframe[data-theme-sync]').forEach((frame) => frame.addEventListener('load', syncFrames));
    apply(current()); // again now that the switch and the cover exist
    const toggle = document.querySelector('.theme-toggle');
    if (!toggle) return;
    toggle.addEventListener('click', () => {
      saved = current() === 'light' ? 'dark' : 'light';
      try { localStorage.setItem('theme', saved); } catch (e) { /* ignore */ }
      // cross-fade the whole page in one step instead of each element changing at its own speed
      if (document.startViewTransition && !reduceMotion.matches) document.startViewTransition(() => apply(saved));
      else apply(saved);
    });
  });
})();
