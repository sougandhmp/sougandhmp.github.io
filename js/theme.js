// Theme: loaded in <head> on every page so a saved light/dark choice applies before the first paint.
(() => {
  const root = document.documentElement;
  try {
    const saved = localStorage.getItem('theme');
    if (saved) root.dataset.theme = saved;
  } catch (e) { /* storage blocked: fall back to the default dark theme */ }

  // the sun/moon icon and knob swap in CSS; only the button label needs updating here
  document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.querySelector('.theme-toggle');
    if (!toggle) return;
    const updateLabel = () => toggle.setAttribute('aria-label', root.dataset.theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme');
    updateLabel();
    toggle.addEventListener('click', () => {
      root.dataset.theme = root.dataset.theme === 'light' ? 'dark' : 'light';
      try { localStorage.setItem('theme', root.dataset.theme); } catch (e) { /* ignore */ }
      updateLabel();
    });
  });
})();
