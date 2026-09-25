// Project page (project.html?id=<id>): builds the page from PROJECTS in js/projects.js.
(() => {
  const esc = (text) => String(text).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
  const trophy = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M7 2h10v2h4v3a5 5 0 0 1-4.6 5A6 6 0 0 1 13 15.9V18h4v4H7v-4h4v-2.1A6 6 0 0 1 7.6 12 5 5 0 0 1 3 7V4h4Zm10 4v3.9A3 3 0 0 0 19 7V6ZM5 6v1a3 3 0 0 0 2 2.9V6Z"/></svg>';
  // GitHub and Google Play links show as icon buttons (paths from Simple Icons); other links keep their text
  const ICONS = {
    'github.com': ['GitHub', 'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12'],
    'play.google.com': ['Google Play', 'M22.018 13.298l-3.919 2.218-3.515-3.493 3.543-3.521 3.891 2.202a1.49 1.49 0 0 1 0 2.594zM1.337.924a1.486 1.486 0 0 0-.112.568v21.017c0 .217.045.419.124.6l11.155-11.087L1.337.924zm12.207 10.065l3.258-3.238L3.45.195a1.466 1.466 0 0 0-.946-.179l11.04 10.973zm0 2.067l-11 10.933c.298.036.612-.016.906-.183l13.324-7.54-3.23-3.21z'],
  };
  const linkHtml = (title) => ([label, href]) => {
    const icon = ICONS[new URL(href).hostname];
    return icon
      ? `<a class="icon-link lg" href="${esc(href)}" target="_blank" rel="noopener" aria-label="${esc(title)} on ${icon[0]}" title="${icon[0]}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="${icon[1]}"/></svg></a>`
      : `<a class="btn" href="${esc(href)}" target="_blank" rel="noopener">${esc(label)} ↗</a>`;
  };
  const body = document.querySelector('.project-body');
  const footer = document.querySelector('.project-nav');
  document.getElementById('y').textContent = new Date().getFullYear();

  const ids = Object.keys(PROJECTS); // prev/next follow the order in js/projects.js (same as the cards)
  const id = new URLSearchParams(location.search).get('id');
  const p = PROJECTS[id];

  if (!p) {
    document.title = 'Project not found · Sougandh Manikkoth Paremmal';
    body.innerHTML = `<p class="pd-kicker">Not found</p><h1 class="pd-title">That project doesn’t exist</h1>
      <p class="pd-summary">The link may be out of date. All projects are listed on the portfolio.</p>
      <a class="btn primary" href="index.html#projects">See all projects</a>`;
    footer.hidden = true;
    return;
  }

  document.title = `${p.title} · Sougandh Manikkoth Paremmal`;
  if (p.summary) document.querySelector('meta[name="description"]').setAttribute('content', p.summary);

  body.innerHTML = `
    <p class="pd-kicker">${esc(p.kicker || '')}</p>
    <h1 class="pd-title">${esc(p.title)}</h1>
    ${p.award ? `<span class="award">${trophy}${esc(p.award)}</span>` : ''}
    ${p.summary ? `<p class="pd-summary">${esc(p.summary)}</p>` : ''}
    ${p.meta ? `<dl class="pd-meta">${p.meta.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>` : ''}
    ${p.impact ? `<div class="pd-impact">${p.impact.map(([v, l]) => `<div class="stat"><b>${esc(v)}</b><span>${esc(l)}</span></div>`).join('')}</div>` : ''}
    ${p.screenshots ? `<div class="pd-shots">${p.screenshots.map(([src, alt]) => `<img src="${esc(src)}" alt="${esc(alt)}" width="480" height="1071" loading="lazy">`).join('')}</div>` : ''}
    ${(p.sections || []).map(([heading, items]) => `<h2 class="pd-heading">${esc(heading)}</h2><ul class="pd-list">${items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>`).join('')}
    ${p.stack ? `<h2 class="pd-heading">Tech stack</h2><ul class="stack">${p.stack.map((s) => `<li>${esc(s)}</li>`).join('')}</ul>` : ''}
    ${p.links ? `<div class="pd-links">${p.links.map(linkHtml(p.title)).join('')}</div>` : ''}
    ${p.note ? `<p class="pd-note">${esc(p.note)}</p>` : ''}`;

  const link = (el, otherId) => {
    el.href = `project.html?id=${otherId}`;
    el.querySelector('span').textContent = PROJECTS[otherId].title;
  };
  const at = ids.indexOf(id);
  link(footer.querySelector('.pd-prev'), ids[(at - 1 + ids.length) % ids.length]);
  link(footer.querySelector('.pd-next'), ids[(at + 1) % ids.length]);
})();
