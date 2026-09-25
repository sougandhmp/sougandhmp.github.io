// "Send me a message" form. Messages are delivered to Sougandh's inbox by Web3Forms (https://web3forms.com).
// Until a real access key is set in the form's access_key field, it falls back to the visitor's email app.
(() => {
  const form = document.querySelector('.contact-form');
  if (!form) return;
  const EMAIL = 'sougandhmp@gmail.com';
  const button = form.querySelector('button[type="submit"]');
  const status = form.querySelector('.form-status');
  const setStatus = (html, kind) => { status.innerHTML = html; status.dataset.kind = kind || ''; };
  const esc = (text) => String(text).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
  const mailto = (d) => `mailto:${EMAIL}?subject=${encodeURIComponent(`Message from ${d.name}`)}&body=${encodeURIComponent(`${d.message}\n\n${d.name}\n${d.email}`)}`;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }
    const data = Object.fromEntries(new FormData(form));
    if (data.botcheck) return; // hidden field only bots fill in

    if (!data.access_key || data.access_key.startsWith('YOUR_')) {
      location.href = mailto(data);
      setStatus('Opening your email app with your message…', 'info');
      return;
    }

    button.disabled = true;
    button.textContent = 'Sending…';
    setStatus('', '');
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...data, subject: `New message from ${data.name} via sougandh.dev`, from_name: 'sougandh.dev' }),
      });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.message || response.statusText);
      form.reset();
      setStatus(`Thanks, ${esc(data.name)}! Your message is on its way. I'll reply to ${esc(data.email)}.`, 'success');
    } catch (error) {
      setStatus(`Sorry, the message couldn't be sent. Please <a href="${esc(mailto(data))}">email me directly</a> instead.`, 'error');
    } finally {
      button.disabled = false;
      button.textContent = 'Send message';
    }
  });
})();
