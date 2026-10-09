// Platform badges (Android, iOS, Kotlin Multiplatform, Flutter) for the project cards and project pages.
// Cards take them from data-category in index.html; project pages from `platforms` in js/projects.js.
// Apple, Kotlin and Flutter marks are from Simple Icons; the Android head is drawn here.
const PLATFORMS = {
  android: ['Android', '<path fill-rule="evenodd" d="M1.5 17.7a10.5 9 0 0 1 21 0ZM7.5 12.5a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 1 0 0-2.4ZM16.5 12.5a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 1 0 0-2.4Z"/><path d="M6.4 10.2 4.2 6.4M17.6 10.2l2.2-3.8" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>'],
  ios: ['iOS', '<path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"/>'],
  kmp: ['Kotlin Multiplatform', '<path d="M24 24H0V0h24L12 12Z"/>'],
  flutter: ['Flutter', '<path d="M14.314 0 2.3 12 6 15.7 21.684.013h-7.357L14.314 0zm.014 11.072L7.857 17.53l6.47 6.47H21.7l-6.46-6.468 6.46-6.46h-7.37z"/>'],
};

const platformBadges = (keys) => {
  const known = Object.keys(PLATFORMS).filter((key) => keys.includes(key)); // always in PLATFORMS order
  if (!known.length) return '';
  return `<ul class="platforms" aria-label="Platforms">${known.map((key) =>
    `<li class="platform-${key}"><svg viewBox="0 0 24 24" aria-hidden="true">${PLATFORMS[key][1]}</svg>${PLATFORMS[key][0]}</li>`).join('')}</ul>`;
};
