const cover = document.querySelector('.cover');
if (cover) new ResizeObserver(([e]) => {
  const { width, height } = e.contentRect;
  // fit the 1500x500 design to the band's height so nothing is cropped; widen the frame to fill any extra width
  const scale = Math.min(width / 1500, height / 500);
  cover.style.setProperty('--cover-scale', scale);
  cover.style.setProperty('--cover-w', `${Math.ceil(width / scale)}px`);
}).observe(cover);
document.getElementById('y').textContent = new Date().getFullYear();

const root = document.documentElement;
const nav = document.querySelector('nav');
// the cover already shows the name; only put it in the nav once the cover scrolls away
if (cover) new IntersectionObserver(([e]) => nav.classList.toggle('hide-brand', e.intersectionRatio > 0.35),
  { threshold: [0, 0.35, 1] }).observe(cover);
const menuToggle = document.querySelector('.menu-toggle');
const themeToggle = document.querySelector('.theme-toggle');
const savedTheme = localStorage.getItem('theme');
if (savedTheme) root.dataset.theme = savedTheme;
const updateThemeButton = () => {
  const dark = root.dataset.theme !== 'light';
  themeToggle.textContent = dark ? '☀' : '☾';
  themeToggle.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
};
updateThemeButton();
themeToggle.addEventListener('click', () => {
  root.dataset.theme = root.dataset.theme === 'light' ? 'dark' : 'light';
  localStorage.setItem('theme', root.dataset.theme);
  updateThemeButton();
});

menuToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('menu-open');
  menuToggle.setAttribute('aria-expanded', open);
  menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  menuToggle.textContent = open ? '×' : '☰';
});

document.querySelectorAll('nav .menu a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('menu-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation');
    menuToggle.textContent = '☰';
  });
});

document.querySelectorAll('.job-toggle').forEach((button) => {
  button.addEventListener('click', () => {
    const job = button.closest('.job');
    const expanded = job.classList.toggle('expanded');
    button.textContent = expanded ? 'Show less ↑' : 'Show more ↓';
  });
});

document.querySelectorAll('.filter').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.filter').forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    const filter = button.dataset.filter;
    document.querySelectorAll('.card').forEach((card) => {
      card.hidden = filter !== 'all' && !card.dataset.category.includes(filter);
    });
  });
});

const sections = document.querySelectorAll('main section');
const navLinks = document.querySelectorAll('nav .menu a');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      navLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
    }
  });
}, { rootMargin: '-35% 0px -55% 0px' });
sections.forEach((section) => observer.observe(section));

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: .12 });
document.querySelectorAll('[data-reveal]').forEach((element) => revealObserver.observe(element));

// Résumé viewer: the browser's own PDF viewer where it has one, pre-rendered pages otherwise (most phones)
const resumeDialog = document.querySelector('.resume-dialog');
const resumeFrame = resumeDialog.querySelector('.resume-pdf');
const showPages = !navigator.pdfViewerEnabled || matchMedia('(max-width: 700px)').matches;
resumeDialog.classList.toggle('pages', showPages);
document.querySelectorAll('[data-resume]').forEach((link) => {
  link.addEventListener('click', (event) => {
    if (typeof resumeDialog.showModal !== 'function') return;
    event.preventDefault();
    if (!showPages && !resumeFrame.getAttribute('src')) resumeFrame.src = resumeFrame.dataset.src;
    resumeDialog.showModal();
  });
});
resumeDialog.querySelector('.resume-close').addEventListener('click', () => resumeDialog.close());
resumeDialog.addEventListener('click', (event) => { if (event.target === resumeDialog) resumeDialog.close(); });
