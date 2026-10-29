(() => {
  'use strict';
  const config = window.SITE_CONFIG || {};
  document.querySelectorAll('[data-brand]').forEach(el => { el.textContent = config.brandName || 'مَدار'; });
  document.getElementById('current-year').textContent = new Intl.NumberFormat('fa-IR',{useGrouping:false}).format(new Date().getFullYear());
  const menuButton = document.querySelector('.menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  function closeMenu() { mobileMenu.hidden = true; menuButton.setAttribute('aria-expanded','false'); menuButton.setAttribute('aria-label','باز کردن فهرست'); }
  menuButton.addEventListener('click', () => { const expanded=menuButton.getAttribute('aria-expanded')==='true'; mobileMenu.hidden=expanded; menuButton.setAttribute('aria-expanded',String(!expanded)); menuButton.setAttribute('aria-label',expanded?'باز کردن فهرست':'بستن فهرست'); });
  mobileMenu.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
  document.addEventListener('keydown', e=>{if(e.key==='Escape')closeMenu();});
  window.matchMedia('(min-width:821px)').addEventListener('change',e=>{if(e.matches)closeMenu();});
  document.querySelectorAll('[data-interest]').forEach(link=>link.addEventListener('click',()=>window.MadarContact?.selectInterest(link.dataset.interest,link.dataset.request)));
  const dialog = document.getElementById('course-dialog');
  let opener = null;
  let focusAfterClose = null;
  document.querySelectorAll('[data-course]').forEach(button=>button.addEventListener('click',()=>{opener=button;focusAfterClose=null;dialog.showModal();document.body.style.overflow='hidden';dialog.scrollTop=0;}));
  document.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
  dialog.addEventListener('close',()=>{document.body.style.overflow='';(focusAfterClose||opener)?.focus({preventScroll:true});});
  document.getElementById('course-interest').addEventListener('click',()=>{
    window.MadarContact?.selectInterest('education','برای دورهٔ «مهندسی عامل‌های هوشمند» در ۱۱ و ۱۲ آذر علاقه‌مندم. لطفاً شرایط حضور و ثبت‌نام را بفرستید.');
    focusAfterClose=document.querySelector('input[name="name"]');dialog.close();document.getElementById('contact').scrollIntoView({behavior:reducedMotion.matches?'auto':'smooth'});focusAfterClose.focus({preventScroll:true});
  });
  const products = {
    wealth: {
      title:'دارایی‌ها را کنار هدف‌ها ببینید.',
      description:'تصویری یکپارچه از دارایی‌ها، درآمد، تعهدات و هدف‌های مالی؛ برای خانواده‌ها، افراد و کسب‌وکارهایی که می‌خواهند اثر تغییر شرایط را بر تصمیم‌هایشان بررسی کنند.',
      features:['داشبورد دارایی و جریان نقدی','مقایسهٔ سناریوها با توجه به اهداف','بررسی رویدادهای اقتصادی و سیاسی','بازبینی پیشنهادها با اطلاعات تازه'],
      method:'ارتباط درآمد، نقدینگی و ریسک را با سناریوهای طلا، مسکن و تغییر شرایط اقتصادی و سیاسی در کنار هم بررسی می‌کنیم.',
      brand:'مَدار دارایی',kicker:'نمای دارایی',previewTitle:'یک تصویر، چند ارتباط.',ringTitle:'دارایی‌ها',ringSub:'نمای یکپارچه',
      legend:[['نقدشونده','۳۰٪'],['بلندمدت','۵۰٪'],['سایر','۲۰٪']],chartLabel:'مثال ساختگی ترکیب دارایی: ۳۰ درصد نقدشونده، ۵۰ درصد بلندمدت و ۲۰ درصد سایر',
      insightLabel:'پرسش بعدی',insight:'اگر هزینه‌های زندگی تغییر کند، نقدینگی من برای هدف‌های پیش رو چه تغییری می‌کند؟',input:'داده و هدف',note:'نمونه‌ای از رابط پیشنهادی؛ دادهٔ واقعی دریافت نمی‌کند و توصیهٔ خرید یا فروش ارائه نمی‌دهد.'
    },
    growth: {
      title:'محتوا را با بازخورد زنده نگه دارید.',
      description:'دستیاری برای مدیریت محتوا و سئو؛ از شناخت وضعیت سایت یا صفحه تا پیشنهاد اقدام، برنامهٔ انتشار و پیگیری نتیجهٔ تغییرات.',
      features:['تحلیل محتوا و داده‌های عملکرد','شناسایی موضوع‌ها و اولویت‌های تازه','پیشنهاد برنامهٔ تولید و انتشار','بازبینی پیشنهادها بر اساس بازخورد مخاطب'],
      method:'رشد، حاصل یک اقدام جداگانه نیست. ارتباط محتوا، جست‌وجو، مخاطب و زمان را دنبال می‌کنیم تا اقدام بعدی با دادهٔ تازه بازبینی شود.',
      brand:'مَدار رشد',kicker:'چرخهٔ محتوا',previewTitle:'هر انتشار، یک بازخورد.',ringTitle:'محتوا',ringSub:'تحلیل تا بازبینی',legend:[['ایده در صف','۵'],['نیازمند بازبینی','۳'],['گزارش بازخورد','۱']],
      chartLabel:'نمای مفهومی چرخه محتوا؛ فهرست نمونه شامل پنج ایده، سه مورد بازبینی و یک گزارش است. حلقه نمودار آماری نیست.',
      insightLabel:'اقدام بعدی',insight:'کدام موضوع‌ها ارزش بازنویسی دارند و برنامهٔ انتشار با بازخورد تازه چگونه تغییر کند؟',input:'محتوا و مخاطب',note:'نمونه‌ای از رابط پیشنهادی؛ به حساب یا سایت شما وصل نیست و عملکرد یا رتبه‌ای را تضمین نمی‌کند.'
    }
  };
  document.querySelectorAll('[data-product]').forEach(button=>button.addEventListener('click',()=>{
    const key=button.dataset.product;const data=products[key];if(!data)return;
    document.querySelectorAll('[data-product]').forEach(other=>{const selected=other===button;other.classList.toggle('selected',selected);other.setAttribute('aria-pressed',String(selected));});
    const map={'product-title':data.title,'product-description':data.description,'product-method':data.method,'preview-brand':data.brand,'preview-kicker':data.kicker,'preview-title':data.previewTitle,'preview-insight-label':data.insightLabel,'preview-insight':data.insight,'loop-input':data.input,'preview-note':data.note};
    Object.entries(map).forEach(([id,value])=>{document.getElementById(id).textContent=value;});
    const features=document.getElementById('product-features');features.replaceChildren();data.features.forEach(text=>{const li=document.createElement('li');li.textContent=text;features.append(li);});
    const legend=document.getElementById('viz-legend');legend.replaceChildren();data.legend.forEach(([name,value])=>{const row=document.createElement('span');const dot=document.createElement('i');const val=document.createElement('b');val.textContent=value;row.append(dot,document.createTextNode(name+' '),val);legend.append(row);});
    const ring=document.getElementById('allocation-ring');ring.classList.toggle('growth-ring',key==='growth');ring.setAttribute('aria-label',data.chartLabel);
    const ringLabel=document.getElementById('ring-label');ringLabel.replaceChildren(document.createTextNode(data.ringTitle));const small=document.createElement('small');small.textContent=data.ringSub;ringLabel.append(small);
    document.getElementById('product-request').dataset.request=`برای آشنایی با «${data.brand}» و شرایط استفاده از آن راهنمایی می‌خواهم.`;
  }));
})();
