// Project page (project.html?id=<id>): builds the page from PROJECTS in js/projects.js.
(() => {
  const esc = (text) => String(text).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
  const trophy = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M7 2h10v2h4v3a5 5 0 0 1-4.6 5A6 6 0 0 1 13 15.9V18h4v4H7v-4h4v-2.1A6 6 0 0 1 7.6 12 5 5 0 0 1 3 7V4h4Zm10 4v3.9A3 3 0 0 0 19 7V6ZM5 6v1a3 3 0 0 0 2 2.9V6Z"/></svg>';
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
    ${p.links ? `<div class="pd-links">${p.links.map(([label, href]) => `<a class="btn" href="${esc(href)}" target="_blank" rel="noopener">${esc(label)} ↗</a>`).join('')}</div>` : ''}
    ${p.note ? `<p class="pd-note">${esc(p.note)}</p>` : ''}`;

  const link = (el, otherId) => {
    el.href = `project.html?id=${otherId}`;
    el.querySelector('span').textContent = PROJECTS[otherId].title;
  };
  const at = ids.indexOf(id);
  link(footer.querySelector('.pd-prev'), ids[(at - 1 + ids.length) % ids.length]);
  link(footer.querySelector('.pd-next'), ids[(at + 1) % ids.length]);
})();
