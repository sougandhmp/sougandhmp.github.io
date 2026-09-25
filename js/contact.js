// "Send me a message" form. Messages are delivered to Sougandh's inbox by Web3Forms (https://web3forms.com).
// Name, a valid email and a message are required, and Send stays disabled until all three are filled in. Phone is optional.
// If the access_key field is ever set back to a YOUR_… placeholder, the form falls back to the visitor's email app.
(() => {
  const form = document.querySelector('.contact-form');
  if (!form) return;
  const EMAIL = 'sougandhmp@gmail.com';
  const button = form.querySelector('button[type="submit"]');
  const status = form.querySelector('.form-status');
  const hint = form.querySelector('.form-hint');
  const { name, email, phone, message } = form.elements;
  const emailHint = document.getElementById('cf-email-hint');
  const phoneHint = document.getElementById('cf-phone-hint');

  // type="email" alone accepts addresses like "a@b", so also require a dot in the domain
  const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const PHONE_PATTERN = /^\+?[0-9 ()\-.]{6,30}$/;
  const emailValid = () => EMAIL_PATTERN.test(email.value.trim());
  const phoneValid = () => !phone.value.trim() || PHONE_PATTERN.test(phone.value.trim());
  const ready = () => name.value.trim() !== '' && emailValid() && message.value.trim() !== '' && phoneValid();

  let sending = false;
  const refresh = () => {
    button.disabled = sending || !ready();
    hint.hidden = ready();
    // only complain about a field once the visitor has typed something and moved on
    const showEmail = email.dataset.touched && email.value.trim() && !emailValid();
    const showPhone = phone.dataset.touched && !phoneValid();
    emailHint.hidden = !showEmail;
    phoneHint.hidden = !showPhone;
    email.setAttribute('aria-invalid', showEmail ? 'true' : 'false');
    phone.setAttribute('aria-invalid', showPhone ? 'true' : 'false');
  };
  form.addEventListener('input', refresh);
  [email, phone].forEach((field) => field.addEventListener('blur', () => { field.dataset.touched = '1'; refresh(); }));
  refresh();

  const setStatus = (html, kind) => { status.innerHTML = html; status.dataset.kind = kind || ''; };
  const esc = (text) => String(text).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
  const mailto = (d) => {
    const body = [d.message, '', d.name, d.email, d.phone].filter((line, i) => i < 2 || line).join('\n');
    return `mailto:${EMAIL}?subject=${encodeURIComponent(`Message from ${d.name}`)}&body=${encodeURIComponent(body)}`;
  };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!ready()) return;
    const data = Object.fromEntries(new FormData(form));
    if (data.botcheck) return; // hidden field only bots fill in
    ['name', 'email', 'phone', 'message'].forEach((key) => { data[key] = (data[key] || '').trim(); });
    if (!data.phone) delete data.phone;

    if (!data.access_key || data.access_key.startsWith('YOUR_')) {
      location.href = mailto(data);
      setStatus('Opening your email app with your message…', 'info');
      return;
    }

    sending = true;
    button.textContent = 'Sending…';
    refresh();
    setStatus('', '');
    try {
      // send as FormData with no custom headers: a "simple" cross-site request, so the browser skips the
      // CORS preflight (OPTIONS) request, which Web3Forms rejects
      const body = new FormData();
      Object.entries({ ...data, subject: `New message from ${data.name} via sougandh.dev`, from_name: 'sougandh.dev' })
        .forEach(([key, value]) => body.append(key, value));
      const response = await fetch('https://api.web3forms.com/submit', { method: 'POST', body });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.message || response.statusText);
      form.reset();
      delete email.dataset.touched;
      delete phone.dataset.touched;
      setStatus(`Thanks, ${esc(data.name)}! Your message is on its way. I'll reply to ${esc(data.email)}.`, 'success');
    } catch (error) {
      setStatus(`Sorry, the message couldn't be sent. Please <a href="${esc(mailto(data))}">email me directly</a> instead.`, 'error');
    } finally {
      sending = false;
      button.textContent = 'Send message';
      refresh();
    }
  });
})();
