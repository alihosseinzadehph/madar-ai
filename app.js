(() => {
  'use strict';
  const config = window.SITE_CONFIG || {};
  if (config.brandName) document.querySelectorAll('[data-brand]').forEach(el => { el.textContent = config.brandName; });
  document.getElementById('current-year').textContent = String(new Date().getFullYear());
  const menuButton = document.querySelector('.menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  function closeMenu() { mobileMenu.hidden = true; menuButton.setAttribute('aria-expanded', 'false'); menuButton.setAttribute('aria-label', 'باز کردن فهرست'); }
  menuButton.addEventListener('click', () => { const expanded = menuButton.getAttribute('aria-expanded') === 'true'; mobileMenu.hidden = expanded; menuButton.setAttribute('aria-expanded', String(!expanded)); menuButton.setAttribute('aria-label', expanded ? 'باز کردن فهرست' : 'بستن فهرست'); });
  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
  const desktopMedia = window.matchMedia('(min-width: 821px)');
  desktopMedia.addEventListener('change', e => { if (e.matches) closeMenu(); });

  const cards = [...document.querySelectorAll('.course-card')];
  document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    document.querySelectorAll('[data-filter]').forEach(other => { const selected = other === button; other.classList.toggle('active', selected); other.setAttribute('aria-pressed', String(selected)); });
    cards.forEach(card => { card.hidden = filter !== 'all' && card.dataset.audience !== filter; });
    document.querySelector('.course-grid').classList.toggle('filtered', filter !== 'all');
  }));

  const courseData = {
    starter: { title: 'از ایده تا اولین ایجنت', audience: 'مسیر آغاز · دانشجو و تازه‌کار', description: 'با یک مسئلهٔ مشخص شروع کنید و قدم به قدم یک دستیار مبتنی بر اسناد بسازید. آزمایش و گزارش خطا، بخشی از خود پروژه است.', prereq: 'آشنایی مقدماتی با کامپیوتر؛ مرور پایتون در ابتدای مسیر پیشنهاد شده است.', syllabus: ['صورت‌بندی مسئله، محدودیت‌ها و معیار موفقیت', 'مدل زبانی، پرامپت و خروجی ساختاریافته', 'اتصال ابزار و بازیابی از اسناد (RAG)', 'تک‌ایجنت، محدودیت حلقه و تأیید انسان', 'ارزیابی روی پرسش‌های ثابت، تحلیل خطا و مستندسازی'], outcome: 'دستیار پرسش‌وپاسخ روی اسناد نمونه، همراه با کد و گزارش ارزیابی.' },
    builder: { title: 'مهندسی سیستم‌های ایجنتی', audience: 'مسیر مهندسی · برنامه‌نویس و پژوهشگر', description: 'معماری را با آزمایش انتخاب کنید. یک مسئلهٔ ثابت را با گردش‌کار، تک‌ایجنت و چندایجنت حل کنید و عملکرد را از چند زاویه بسنجید.', prereq: 'تسلط عملی به پایتون و API؛ تجربهٔ ساخت یک برنامه با مدل زبانی.', syllabus: ['قرارداد ابزارها، وضعیت، حافظه و مدیریت خطا', 'انتخاب میان گردش‌کار، تک‌ایجنت و معماری چندایجنتی', 'تفکیک زیرمسئله‌ها، هماهنگی و بودجهٔ اجرا', 'حلقهٔ بازخورد، خطاهای آبشاری و آزمایش پایداری', 'ارزیابی تکرارپذیر، مشاهدهٔ اجرا و کنترل هزینه', 'استقرار، دسترسی حداقلی و پایش پس از انتشار'], outcome: 'سه معماری روی یک مجموعه مسئله، با مقایسهٔ کیفیت، هزینه و زمان پاسخ.' },
    manager: { title: 'هوش مصنوعی برای تصمیم‌گیران', audience: 'مسیر تصمیم · مدیر و صاحب کسب‌وکار', description: 'یاد بگیرید کدام مسئلهٔ سازمانی ارزش شروع دارد، چه چیزی را باید بسنجید و چگونه یک پایلوت محدود و قابل کنترل تعریف کنید.', prereq: 'بدون نیاز به برنامه‌نویسی؛ شناخت یک فرآیند واقعی در تیم یا سازمان.', syllabus: ['قابلیت‌ها و محدودیت‌های مدل‌ها و ایجنت‌ها', 'نقشهٔ فرصت‌ها: اثر، دسترسی به داده و پیچیدگی', 'برآورد ارزش، هزینه و ریسک عملیاتی', 'نوشتن بریف و تعریف معیار پذیرش پایلوت', 'کنترل دسترسی، محرمانگی و مسئول تأیید خروجی', 'تصمیم توسعه یا توقف بر اساس نتیجهٔ آزمایش'], outcome: 'نقشهٔ فرصت‌های سازمان و بریف اجرایی یک پایلوت با معیار پذیرش.' }
  };
  const dialog = document.getElementById('course-dialog');
  let activeCourse = null;
  let dialogOpener = null;
  let dialogFocusTarget = null;
  function openCourse(key, opener) {
    const course = courseData[key]; if (!course) return;
    activeCourse = course; dialogOpener = opener; dialogFocusTarget = null;
    document.getElementById('dialog-title').textContent = course.title;
    document.getElementById('dialog-audience').textContent = course.audience;
    document.getElementById('dialog-description').textContent = course.description;
    document.getElementById('dialog-prereq').textContent = course.prereq;
    document.getElementById('dialog-outcome').textContent = course.outcome;
    const syllabus = document.getElementById('dialog-syllabus'); syllabus.replaceChildren();
    course.syllabus.forEach(text => { const li = document.createElement('li'); li.textContent = text; syllabus.append(li); });
    dialog.showModal(); document.body.style.overflow = 'hidden'; dialog.scrollTop = 0;
  }
  document.querySelectorAll('[data-course]').forEach(button => button.addEventListener('click', () => openCourse(button.dataset.course, button)));
  document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', e => { if (e.target === dialog) { const r = dialog.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dialog.close(); } });
  dialog.addEventListener('close', () => { document.body.style.overflow = ''; const target = dialogFocusTarget || dialogOpener; if (target) target.focus({ preventScroll: true }); });
  function selectInterest(value) { const input = document.querySelector(`input[name="interest"][value="${value}"]`); if (input) input.checked = true; invalidateBrief(); }
  document.getElementById('course-interest').addEventListener('click', () => {
    selectInterest('education');
    const goal = document.querySelector('textarea[name="goal"]');
    if (!goal.value.trim()) goal.value = `به مسیر «${activeCourse.title}» علاقه‌مندم. هدف من: `;
    dialogFocusTarget = document.querySelector('input[name="name"]');
    dialog.close(); document.getElementById('contact').scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    dialogFocusTarget.focus({ preventScroll: true });
  });
  document.querySelectorAll('[data-interest]').forEach(link => link.addEventListener('click', () => selectInterest(link.dataset.interest)));

  const caseData = {
    knowledge: { input: '«شرایط مرخصی در آیین‌نامهٔ داخلی چیست؟»', step1: 'بازیابی از اسناد', sub1: 'منابع مجاز سازمان', step2: 'ساخت پاسخ', sub2: 'همراه با ارجاع', step3: 'کنترل کیفیت', sub3: 'بررسی شواهد پاسخ', result: 'درستی پاسخ، دقت ارجاع و نرخ «نمی‌دانم» در نبود شواهد.' },
    research: { input: '«منابع مرتبط با موضوع پژوهش من را مقایسه کن.»', step1: 'گردآوری منابع', sub1: 'مجموعه منابع مجاز', step2: 'تحلیل و مقایسه', sub2: 'ردیابی هر ادعا', step3: 'بررسی پژوهشگر', sub3: 'تأیید نتیجهٔ نهایی', result: 'پوشش منابع، صحت استنادها و زمان مورد نیاز برای بازبینی پژوهشگر.' },
    operations: { input: '«این درخواست پشتیبانی را دسته‌بندی و آمادهٔ ارجاع کن.»', step1: 'خواندن درخواست', sub1: 'دادهٔ ورودی محدود', step2: 'پیشنهاد اقدام', sub2: 'طبق قواعد تیم', step3: 'تأیید مسئول', sub3: 'پیش از هر تغییر', result: 'دقت دسته‌بندی، نرخ اصلاح انسان و زمان صرفه‌جویی‌شده در هر درخواست.' }
  };
  document.querySelectorAll('[data-case]').forEach(button => button.addEventListener('click', () => {
    const data = caseData[button.dataset.case];
    document.querySelectorAll('[data-case]').forEach(other => { const selected = other === button; other.classList.toggle('selected', selected); other.setAttribute('aria-pressed', String(selected)); });
    ['input', 'step1', 'sub1', 'step2', 'sub2', 'step3', 'sub3', 'result'].forEach(key => { document.getElementById(`demo-${key}`).textContent = data[key]; });
  }));

  const form = document.getElementById('brief-form');
  const status = document.getElementById('form-status');
  const emailLink = document.getElementById('email-brief');
  const publicEmail = typeof config.publicEmail === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(config.publicEmail) ? config.publicEmail : '';
  if (publicEmail) document.getElementById('contact-explanation').textContent = 'ابتدا فایل درخواست را دانلود کنید. سپس می‌توانید آن را در برنامهٔ ایمیل خود باز و برای تیم ارسال کنید. ارسال خودکار انجام نمی‌شود.';
  function invalidateBrief() { status.textContent = ''; emailLink.hidden = true; emailLink.removeAttribute('href'); }
  form.addEventListener('input', invalidateBrief);
  form.addEventListener('submit', e => {
    e.preventDefault(); if (!form.reportValidity()) return;
    const data = new FormData(form);
    const name = String(data.get('name')).trim(); const contact = String(data.get('contact')).trim(); const goal = String(data.get('goal')).trim();
    if (!name || !contact || !goal) { status.textContent = 'لطفاً نام، راه تماس و هدف را کامل کنید.'; return; }
    const interest = data.get('interest') === 'service' ? 'ساخت ایجنت برای تیم' : 'آموزش و یادگیری';
    const body = `درخواست آشنایی با ${config.brandName || 'مَدار'}\n\nنام: ${name}\nراه تماس: ${contact}\nمسیر: ${interest}\n\nهدف:\n${goal}\n\nساخته‌شده در نسخهٔ نمایشی وب‌سایت. این فایل به‌صورت خودکار برای تیم ارسال نشده است.\n`;
    const url = URL.createObjectURL(new Blob(['\uFEFF', body], { type: 'text/plain;charset=utf-8' }));
    const link = document.createElement('a'); link.href = url; link.download = 'madar-introduction-request.txt'; document.body.append(link); link.click(); link.remove(); setTimeout(() => URL.revokeObjectURL(url), 30000);
    status.textContent = 'فایل درخواست آماده شد و دانلود آن آغاز شد. این درخواست هنوز برای تیم ارسال نشده است.';
    if (publicEmail) { emailLink.href = `mailto:${encodeURIComponent(publicEmail)}?subject=${encodeURIComponent(`درخواست ${interest}`)}&body=${encodeURIComponent(body)}`; emailLink.hidden = false; }
  });
})();
