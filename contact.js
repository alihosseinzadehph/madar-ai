(() => {
  'use strict';

  const form = document.getElementById('brief-form');
  const status = document.getElementById('form-status');
  if (!form || !status) return;

  const config = window.SITE_CONFIG || {};
  const fields = Object.fromEntries(['name', 'contact', 'goal', 'consent'].map(key => [key, form.elements.namedItem(key)]));
  const submit = form.querySelector('button[type="submit"]');
  const directSubmit = document.getElementById('form-direct-submit');
  if (Object.values(fields).some(field => !field) || !submit) return;

  form.noValidate = true;
  status.setAttribute('aria-live', 'polite');
  status.setAttribute('aria-atomic', 'true');
  let busy = false;
  const originalButtonNodes = Array.from(submit.childNodes, node => node.cloneNode(true));
  const buttonSize = { minHeight: submit.style.minHeight, minWidth: submit.style.minWidth };
  if (directSubmit) directSubmit.textContent = 'ارسال از مسیر جایگزین';

  function normalizeDigits(value) {
    return value.replace(/[۰-۹٠-٩]/g, char => String(char.charCodeAt(0) - (char >= '۰' ? 1776 : 1632)));
  }

  function readContact() {
    const value = normalizeDigits(fields.contact.value.trim());
    if (value.length <= 160 && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) return { value, email: value };
    const phone = value.replace(/[\s().\-\u200c\u200e\u200f]/g, '').replace(/^00/, '+');
    if (/^(?:0[1-9]\d{9}|\+[1-9]\d{7,14}|[1-9]\d{9,14})$/.test(phone)) return { value: phone };
    return null;
  }

  function validationMessage(key) {
    const value = fields[key].value.trim();
    if (key === 'name') {
      if (!value) return 'لطفاً نام خود را بنویسید.';
      if (value.length > 100) return 'نام را در حداکثر ۱۰۰ نویسه بنویسید.';
    }
    if (key === 'contact') {
      if (!value) return 'لطفاً ایمیل یا شمارهٔ تماس خود را بنویسید.';
      if (!readContact()) return 'یک ایمیل معتبر یا شمارهٔ تماس همراه با پیش‌شماره بنویسید؛ مانند ۰۹۱۲۱۲۳۴۵۶۷.';
    }
    if (key === 'goal') {
      if (!value) return 'لطفاً چند خط دربارهٔ درخواست خود بنویسید.';
      if (value.length < 8) return 'درخواست را کمی روشن‌تر بنویسید؛ حداقل ۸ نویسه.';
      if (value.length > 2000) return 'درخواست را در حداکثر ۲۰۰۰ نویسه بنویسید.';
    }
    if (key === 'consent' && !fields.consent.checked) return 'برای ارسال درخواست، رضایت به استفاده از اطلاعات تماس را تأیید کنید.';
    return '';
  }

  function setError(key, message) {
    const error = document.getElementById(`${key}-error`);
    if (message) fields[key].setAttribute('aria-invalid', 'true');
    else fields[key].removeAttribute('aria-invalid');
    if (error) {
      error.textContent = message;
      error.hidden = !message;
    }
  }

  function showStatus(message, state) {
    status.textContent = message;
    status.dataset.state = state;
  }

  function clearStatus() {
    if (busy) return;
    status.textContent = '';
    delete status.dataset.state;
  }

  function growGoal() {
    fields.goal.style.resize = 'none';
    fields.goal.style.height = 'auto';
    fields.goal.style.height = `${Math.min(fields.goal.scrollHeight, 300)}px`;
    fields.goal.style.overflowY = fields.goal.scrollHeight > 300 ? 'auto' : 'hidden';
  }

  function validate() {
    let firstInvalid = null;
    Object.keys(fields).forEach(key => {
      const message = validationMessage(key);
      setError(key, message);
      if (message && !firstInvalid) firstInvalid = fields[key];
    });
    if (firstInvalid) {
      showStatus('لطفاً موارد مشخص‌شده را اصلاح کنید و دوباره بفرستید.', 'error');
      firstInvalid.focus();
      return false;
    }
    return true;
  }

  function endpointURL() {
    try {
      const endpoint = new URL(config.formEndpoint);
      if (endpoint.origin === 'https://formsubmit.co' && !endpoint.username && !endpoint.password && !endpoint.search && !endpoint.hash && /^\/ajax\/[^/]+\/?$/.test(endpoint.pathname)) return endpoint.href;
    } catch (_) { /* An invalid configuration must not send visitor data elsewhere. */ }
    return null;
  }

  function interestLabel() {
    const selected = form.querySelector('input[name="interest"]:checked');
    if (!selected) return 'درخواست آشنایی';
    const label = selected.closest('label');
    return (label ? label.textContent : selected.value).trim().slice(0, 160);
  }

  function setBusy(value) {
    busy = value;
    if (directSubmit) directSubmit.disabled = value;
    if (value) {
      const size = submit.getBoundingClientRect();
      submit.style.minHeight = `${Math.ceil(size.height)}px`;
      submit.style.minWidth = `${Math.ceil(size.width)}px`;
      submit.textContent = 'در حال ارسال…';
      submit.disabled = true;
      form.setAttribute('aria-busy', 'true');
    } else {
      submit.replaceChildren(...originalButtonNodes.map(node => node.cloneNode(true)));
      submit.disabled = false;
      submit.style.minHeight = buttonSize.minHeight;
      submit.style.minWidth = buttonSize.minWidth;
      form.removeAttribute('aria-busy');
    }
  }

  function offerDirectSubmission() {
    if (directSubmit) directSubmit.hidden = false;
  }

  function nativeSubmission(endpoint, payload) {
    const NativeForm = window.HTMLFormElement;
    if (!NativeForm || typeof NativeForm.prototype.submit !== 'function') {
      showStatus('مرورگر امکان ارسال از مسیر جایگزین را ندارد. لطفاً از شمارهٔ تماس سایت استفاده کنید.', 'error');
      return;
    }
    ['_subject', '_template', 'message', 'email'].forEach(name => {
      let input = form.querySelector(`input[data-contact-extra="${name}"]`);
      if (payload[name] === undefined) {
        if (input) input.remove();
        return;
      }
      if (!input) {
        input = document.createElement('input');
        input.type = 'hidden';
        input.name = name;
        input.dataset.contactExtra = name;
        form.append(input);
      }
      input.value = payload[name];
    });
    form.action = endpoint.replace('/ajax/', '/');
    form.method = 'POST';
    form.enctype = 'application/x-www-form-urlencoded';
    setBusy(true);
    showStatus('در حال باز کردن مسیر جایگزین ارسال؛ ممکن است سرویس تأیید امنیتی یا فعال‌سازی ایمیل بخواهد.', 'pending');
    try {
      NativeForm.prototype.submit.call(form);
    } catch (_) {
      setBusy(false);
      showStatus('باز کردن مسیر جایگزین انجام نشد. اطلاعات شما در فرم باقی مانده است؛ دوباره تلاش کنید یا با شمارهٔ سایت تماس بگیرید.', 'error');
    }
  }

  form.addEventListener('input', event => {
    clearStatus();
    const key = event.target.name;
    if (Object.hasOwn(fields, key) && fields[key].getAttribute('aria-invalid') === 'true' && !validationMessage(key)) setError(key, '');
    if (key === 'goal') growGoal();
  });
  form.addEventListener('change', event => {
    clearStatus();
    if (event.target.name === 'consent' && fields.consent.checked) setError('consent', '');
  });

  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (busy || !validate()) return;
    const endpoint = endpointURL();
    if (!endpoint) {
      showStatus('اتصال فرم هنوز تنظیم نشده است. لطفاً از شمارهٔ تماس درج‌شده در سایت استفاده کنید.', 'error');
      return;
    }
    const honey = form.elements.namedItem('_honey');
    if (honey && honey.value) {
      showStatus('ارسال این درخواست تأیید نشد. صفحه را تازه کنید و دوباره امتحان کنید.', 'error');
      return;
    }

    const contact = readContact();
    const interest = interestLabel();
    const payload = {
      name: fields.name.value.trim(),
      contact: contact.value,
      message: fields.goal.value.trim(),
      interest,
      _subject: `درخواست آشنایی با ${config.brandName || 'مَدار'} — ${interest}`,
      _template: 'table',
      _honey: honey ? honey.value : ''
    };
    if (contact.email) payload.email = contact.email;

    if (event.submitter && event.submitter.id === 'form-direct-submit') {
      nativeSubmission(endpoint, payload);
      return;
    }
    if (typeof window.fetch !== 'function' || typeof window.AbortController !== 'function') {
      showStatus('مرورگر شما ارسال در همین صفحه را پشتیبانی نمی‌کند. از دکمهٔ مسیر جایگزین استفاده کنید یا با شمارهٔ سایت تماس بگیرید.', 'error');
      offerDirectSubmission();
      return;
    }

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 20000);
    setBusy(true);
    showStatus('در حال ارسال درخواست…', 'pending');
    try {
      const response = await window.fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
        credentials: 'omit',
        signal: controller.signal
      });
      let result;
      try { result = await response.json(); }
      catch (_) { throw new Error('invalid-response'); }
      const message = typeof result?.message === 'string' ? result.message : '';
      const activationPending = /activat|confirm.{0,30}email|email.{0,30}confirm|verify.{0,30}email/i.test(message);
      if (!response.ok || !(result?.success === true || result?.success === 'true')) {
        if (activationPending) {
          showStatus('فعال‌سازی دریافت ایمیل فرم هنوز باید تأیید شود. اطلاعات شما در فرم باقی مانده است؛ پس از فعال‌سازی دوباره ارسال کنید.', 'pending');
          offerDirectSubmission();
          return;
        }
        throw new Error('submission-rejected');
      }
      if (config.contactActivated !== true || activationPending) {
        showStatus('درخواست اتصال فرم ارسال شد؛ فعال‌سازی دریافت ایمیل هنوز باید تأیید شود.', 'pending');
      } else {
        showStatus('درخواست شما با موفقیت به سرویس ارسال ایمیل تحویل شد. تیم مَدار از راه تماس درج‌شده پیگیری می‌کند.', 'success');
      }
    } catch (error) {
      const message = error.name === 'AbortError'
        ? 'پاسخ سرویس در زمان مقرر دریافت نشد و تحویل درخواست تأیید نشده است. اطلاعات شما در فرم باقی مانده؛ لطفاً دوباره تلاش کنید.'
        : 'ارسال درخواست تأیید نشد. اتصال اینترنت را بررسی کنید و دوباره تلاش کنید؛ اطلاعات شما در فرم باقی مانده است.';
      showStatus(message, 'error');
      offerDirectSubmission();
    } finally {
      window.clearTimeout(timeout);
      setBusy(false);
    }
  });

  window.MadarContact = {
    selectInterest(value, request) {
      const choice = Array.from(form.querySelectorAll('input[name="interest"]')).find(input => input.value === value);
      if (choice) choice.checked = true;
      const text = typeof request === 'string' ? request : request?.goal || request?.prompt;
      if (text && !fields.goal.value.trim()) {
        fields.goal.value = String(text).slice(0, 2000);
        growGoal();
        if (!validationMessage('goal')) setError('goal', '');
      }
      clearStatus();
    }
  };
  window.addEventListener('pageshow', () => { if (busy) setBusy(false); });
  growGoal();
})();
