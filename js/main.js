const cover = document.querySelector('.cover');
if (cover) new ResizeObserver(([e]) => {
  const { width, height } = e.contentRect;
  // fit the 1500x500 design to the band's height so nothing is cropped; widen the frame to fill any extra width
  const scale = Math.min(width / 1500, height / 500);
  cover.style.setProperty('--cover-scale', scale);
  cover.style.setProperty('--cover-w', `${Math.ceil(width / scale)}px`);
}).observe(cover);
document.getElementById('y').textContent = new Date().getFullYear();

const nav = document.querySelector('nav');
// the cover already shows the name; only put it in the nav once the cover scrolls away
if (cover) new IntersectionObserver(([e]) => nav.classList.toggle('hide-brand', e.intersectionRatio > 0.35),
  { threshold: [0, 0.35, 1] }).observe(cover);
const menuToggle = document.querySelector('.menu-toggle');
// theme switching lives in js/theme.js

// Mobile menu: closes on link tap, Escape, a tap outside the nav, or when the window grows past the breakpoint
const setMenu = (open) => {
  nav.classList.toggle('menu-open', open);
  menuToggle.setAttribute('aria-expanded', open);
  menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
};
menuToggle.addEventListener('click', () => setMenu(!nav.classList.contains('menu-open')));
document.querySelectorAll('nav .menu a').forEach((link) => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && nav.classList.contains('menu-open')) {
    setMenu(false);
    menuToggle.focus();
  }
});
document.addEventListener('click', (event) => {
  if (nav.classList.contains('menu-open') && !nav.contains(event.target)) setMenu(false);
});
matchMedia('(min-width: 961px)').addEventListener('change', (event) => { if (event.matches) setMenu(false); });

document.querySelectorAll('.job-toggle').forEach((button) => {
  button.addEventListener('click', () => {
    const job = button.closest('.job');
    const expanded = job.classList.toggle('expanded');
    button.textContent = expanded ? 'Show less ↑' : 'Show more ↓';
  });
});

// Recommendations are compact cards by default; open the complete text in a focused dialog.
const recommendationDialog = document.querySelector('.recommendation-dialog');
if (recommendationDialog) {
  const recommendationTitle = recommendationDialog.querySelector('.recommendation-title');
  const recommendationContent = recommendationDialog.querySelector('.recommendation-content');
  const recommendationClose = recommendationDialog.querySelector('.recommendation-close');
  const recommendations = [...document.querySelectorAll('.quote-trigger')];
  const recommendationPrev = recommendationDialog.querySelector('.recommendation-prev');
  const recommendationNext = recommendationDialog.querySelector('.recommendation-next');
  let lastRecommendation = null;
  let recommendationIndex = 0;

  recommendations.forEach((quote) => {
    quote.dataset.truncated = quote.querySelectorAll('blockquote p').length > 1;
  });

  const openRecommendation = (quote, focusTarget = recommendationClose) => {
    lastRecommendation = quote;
    recommendationIndex = recommendations.indexOf(quote);
    recommendationTitle.textContent = quote.querySelector('figcaption b').textContent;
    recommendationPrev.querySelector('span').textContent = recommendations[(recommendationIndex - 1 + recommendations.length) % recommendations.length].querySelector('figcaption b').textContent;
    recommendationNext.querySelector('span').textContent = recommendations[(recommendationIndex + 1) % recommendations.length].querySelector('figcaption b').textContent;
    recommendationContent.replaceChildren(
      quote.querySelector('blockquote').cloneNode(true),
      quote.querySelector('figcaption').cloneNode(true)
    );
    if (!recommendationDialog.open) {
      if (typeof recommendationDialog.showModal === 'function') recommendationDialog.showModal();
      else recommendationDialog.setAttribute('open', '');
    }
    focusTarget.focus();
  };

  document.querySelectorAll('.quote-trigger').forEach((quote) => {
    quote.addEventListener('click', () => openRecommendation(quote));
    quote.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openRecommendation(quote);
      }
    });
  });
  recommendationClose.addEventListener('click', () => recommendationDialog.close());
  recommendationPrev.addEventListener('click', () => openRecommendation(
    recommendations[(recommendationIndex - 1 + recommendations.length) % recommendations.length], recommendationPrev
  ));
  recommendationNext.addEventListener('click', () => openRecommendation(
    recommendations[(recommendationIndex + 1) % recommendations.length], recommendationNext
  ));
  recommendationDialog.addEventListener('click', (event) => {
    if (event.target === recommendationDialog) recommendationDialog.close();
  });
  recommendationDialog.addEventListener('close', () => lastRecommendation?.focus());
}

// Project filters: a card shows when its space-separated data-category contains the chosen tag
document.querySelectorAll('.filter').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.filter').forEach((item) => {
      item.classList.toggle('active', item === button);
      item.setAttribute('aria-pressed', item === button);
    });
    const filter = button.dataset.filter;
    document.querySelectorAll('.card').forEach((card) => {
      card.hidden = filter !== 'all' && !card.dataset.category.split(' ').includes(filter);
    });
  });
});

// Highlight the nav link for the section in view; the hero has no link, so reaching it clears the highlight
const sections = document.querySelectorAll('.hero, main section');
const navLinks = document.querySelectorAll('nav .menu a[href^="#"], .tabbar a');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navLinks.forEach((link) => {
      const current = link.getAttribute('href') === `#${entry.target.id}`;
      link.classList.toggle('active', current);
      if (current) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
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
