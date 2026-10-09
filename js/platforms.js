// Platform badges (Android, Kotlin Multiplatform, Flutter) for the project cards and project pages.
// Cards take them from data-category in index.html; project pages from `platforms` in js/projects.js.
// Kotlin and Flutter marks are from Simple Icons; the Android head is drawn here.
const PLATFORMS = {
  android: ['Android', '<path fill-rule="evenodd" d="M1.5 17.7a10.5 9 0 0 1 21 0ZM7.5 12.5a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 1 0 0-2.4ZM16.5 12.5a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 1 0 0-2.4Z"/><path d="M6.4 10.2 4.2 6.4M17.6 10.2l2.2-3.8" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>'],
  kmp: ['Kotlin Multiplatform', '<path d="M24 24H0V0h24L12 12Z"/>'],
  flutter: ['Flutter', '<path d="M14.314 0 2.3 12 6 15.7 21.684.013h-7.357L14.314 0zm.014 11.072L7.857 17.53l6.47 6.47H21.7l-6.46-6.468 6.46-6.46h-7.37z"/>'],
};

const platformBadges = (keys) => {
  const known = keys.filter((key) => PLATFORMS[key]);
  if (!known.length) return '';
  return `<ul class="platforms" aria-label="Platforms">${known.map((key) =>
    `<li class="platform-${key}"><svg viewBox="0 0 24 24" aria-hidden="true">${PLATFORMS[key][1]}</svg>${PLATFORMS[key][0]}</li>`).join('')}</ul>`;
};
