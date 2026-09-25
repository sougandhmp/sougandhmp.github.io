// "Send me a message" form. Messages are delivered to Sougandh's inbox by Web3Forms (https://web3forms.com).
// Name, a valid email and a message are required, and Send stays disabled until all three are filled in. Phone is optional.
// If the access_key field is ever set back to a YOUR_… placeholder, the form falls back to the visitor's email app.

// About card: copy-email button and the live local time (city and time zone from js/site-config.js)
(() => {
  document.querySelectorAll('.copy-email').forEach((button) => {
    const label = button.querySelector('.copy-label');
    let timer;
    button.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(button.dataset.copy);
        label.textContent = 'Copied!';
        button.classList.add('copied');
      } catch {
        location.href = `mailto:${button.dataset.copy}`; // clipboard blocked (e.g. file://): open the email app instead
        return;
      }
      clearTimeout(timer);
      timer = setTimeout(() => { label.textContent = 'Copy'; button.classList.remove('copied'); }, 2000);
    });
  });

  const clock = document.querySelector('.local-time');
  if (!clock) return;
  const { timeZone = 'Australia/Sydney', homeCity = 'Sydney' } = typeof SITE !== 'undefined' ? SITE : {};
  const format = new Intl.DateTimeFormat('en-AU', { timeZone, hour: 'numeric', minute: '2-digit' });
  const tick = () => { clock.textContent = `${format.format(new Date())} in ${homeCity}`; };
  tick();
  clock.hidden = false;
  setInterval(tick, 30000);
})();

(() => {
  const form = document.querySelector('.contact-form');
  if (!form) return;
  const EMAIL = 'sougandhmp@gmail.com';
  const button = form.querySelector('button[type="submit"]');
  const status = form.querySelector('.form-status');
  const hint = form.querySelector('.form-hint');
  const { name, email, phone, message, topic } = form.elements;
  const counter = document.getElementById('cf-count');
  const topics = [...form.querySelectorAll('.topic')];
  const defaultPlaceholder = message.placeholder;
  const emailHint = document.getElementById('cf-email-hint');
  const phoneHint = document.getElementById('cf-phone-hint');

  // type="email" alone accepts addresses like "a@b", so also require a dot in the domain
  const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const PHONE_PATTERN = /^\+?[0-9 ()\-.]{6,30}$/;
  const emailValid = () => EMAIL_PATTERN.test(email.value.trim());
  const phoneValid = () => !phone.value.trim() || PHONE_PATTERN.test(phone.value.trim());
  const ready = () => name.value.trim() !== '' && emailValid() && message.value.trim() !== '' && phoneValid();

  // the hint under Send says exactly what's still missing, e.g. "Still needed: a valid email address."
  const joinList = (items) => (items.length < 2 ? items.join('') : `${items.slice(0, -1).join(', ')} and ${items.at(-1)}`);
  const hintText = () => {
    const empty = !name.value.trim() && !email.value.trim() && !message.value.trim();
    if (empty) return 'Add your name, email and a message to send.';
    const missing = [];
    if (!name.value.trim()) missing.push('your name');
    if (!email.value.trim()) missing.push('your email');
    else if (!emailValid()) missing.push('a valid email address');
    if (!message.value.trim()) missing.push('a message');
    if (!phoneValid()) missing.push('a valid phone number (or leave it blank)');
    return `Still needed: ${joinList(missing)}.`;
  };

  let sending = false;
  const refresh = () => {
    button.disabled = sending || !ready();
    hint.hidden = ready();
    if (!ready()) hint.textContent = hintText();
    // only complain about a field once the visitor has typed something and moved on
    const showEmail = email.dataset.touched && email.value.trim() && !emailValid();
    const showPhone = phone.dataset.touched && !phoneValid();
    emailHint.hidden = !showEmail;
    phoneHint.hidden = !showPhone;
    email.setAttribute('aria-invalid', showEmail ? 'true' : 'false');
    phone.setAttribute('aria-invalid', showPhone ? 'true' : 'false');
    // a green border once a field is filled in correctly
    name.classList.toggle('valid', name.value.trim() !== '');
    email.classList.toggle('valid', emailValid());
    phone.classList.toggle('valid', phone.value.trim() !== '' && phoneValid());
    message.classList.toggle('valid', message.value.trim() !== '');
    counter.textContent = `${message.value.length} / ${message.maxLength}`;
    counter.classList.toggle('near', message.value.length > message.maxLength * 0.9);
  };

  // topic chips: optional, one at a time; the chosen topic goes into the email subject and changes the message prompt
  const setTopic = (chosen) => {
    topics.forEach((chip) => chip.setAttribute('aria-pressed', chip === chosen));
    topic.value = chosen ? chosen.dataset.topic : '';
    message.placeholder = chosen ? chosen.dataset.placeholder : defaultPlaceholder;
  };
  topics.forEach((chip) => chip.addEventListener('click', () => {
    setTopic(chip.getAttribute('aria-pressed') === 'true' ? null : chip);
    message.focus();
  }));
  form.addEventListener('input', refresh);
  [email, phone].forEach((field) => field.addEventListener('blur', () => { field.dataset.touched = '1'; refresh(); }));
  refresh();

  const setStatus = (html, kind) => { status.innerHTML = html; status.dataset.kind = kind || ''; };
  const esc = (text) => String(text).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
  const mailto = (d) => {
    const body = [d.message, '', d.name, d.email, d.phone].filter((line, i) => i < 2 || line).join('\n');
    const subject = d.topic ? `${d.topic}: message from ${d.name}` : `Message from ${d.name}`;
    return `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!ready()) return;
    const data = Object.fromEntries(new FormData(form));
    if (data.botcheck) return; // hidden field only bots fill in
    ['name', 'email', 'phone', 'message'].forEach((key) => { data[key] = (data[key] || '').trim(); });
    if (!data.phone) delete data.phone;
    if (!data.topic) delete data.topic;

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
      Object.entries({ ...data, subject: `New message${data.topic ? ` (${data.topic})` : ''} from ${data.name} via sougandh.dev`, from_name: 'sougandh.dev' })
        .forEach(([key, value]) => body.append(key, value));
      const response = await fetch('https://api.web3forms.com/submit', { method: 'POST', body });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.message || response.statusText);
      form.reset();
      setTopic(null);
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
