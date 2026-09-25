// Cover banner (cover.html, shown in an iframe on the home page): follows the site's light/dark theme.
// Kept in its own file so the Content-Security-Policy can block all inline scripts.
const root = document.documentElement;
const setTheme = (theme) => {
  const isLight = theme === 'light';
  root.setAttribute('data-theme', theme);
  root.style.setProperty('--bg', isLight ? '#f2f3f1' : '#0d1411');
  root.style.setProperty('--bg-elevated', isLight ? '#ffffff' : '#121e18');
  root.style.setProperty('--bg-panel', isLight ? '#ffffff' : '#16231c');
  root.style.setProperty('--fg', isLight ? '#111214' : '#f2eee3');
  root.style.setProperty('--muted', isLight ? '#404b52' : '#c9d3cc');
  root.style.setProperty('--line', isLight ? '#d9dedd' : '#2e4a3b');
  root.style.setProperty('--soft', isLight ? 'rgba(35,122,75,.1)' : 'rgba(86,217,139,.18)');
  root.style.setProperty('--chip-text', isLight ? '#2d373e' : '#dde6e0');
  root.style.setProperty('--card-bg', isLight ? '#f7faf7' : '#111b16');
  root.style.setProperty('--card-muted', isLight ? '#4a6158' : '#3a5446');
  root.style.setProperty('--code-bg', isLight ? '#ffffff' : '#2b2b2b');
  root.style.setProperty('--code-header', isLight ? '#f3f3f3' : '#3c3f41');
  root.style.setProperty('--code-fg', isLight ? '#000000' : '#a9b7c6');
  root.style.setProperty('--code-keyword', isLight ? '#0033b3' : '#cc7832');
  root.style.setProperty('--code-string', isLight ? '#067d17' : '#6a8759');
  root.style.setProperty('--code-annotation', isLight ? '#9e880d' : '#bbb529');
  root.style.setProperty('--ring-dot', isLight ? '#237a4b' : '#56d98b');
  root.style.setProperty('--accent', isLight ? '#237a4b' : '#56d98b');
  document.body.style.background = `var(--bg) radial-gradient(var(--soft) 1.2px, transparent 1.4px) 0 0/22px 22px`;
};

const initTheme = () => {
  const preferred = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  const theme = localStorage.getItem('theme') || preferred;
  setTheme(theme === 'light' || theme === 'dark' ? theme : preferred);
};

window.addEventListener('message', (event) => {
  const incoming = event.data && typeof event.data === 'object' ? event.data.theme : null;
  if (incoming === 'light' || incoming === 'dark') setTheme(incoming);
});

initTheme();
