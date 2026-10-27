# راهنمای سادهٔ معرفی مَدار به گوگل

این تنظیمات پس از بارگذاری نسخهٔ تازه در گیت‌هاب فعال می‌شوند. عنوان و توضیح صفحات، آدرس اصلی HTTPS، اطلاعات اشتراک‌گذاری و دادهٔ ساختاریافته آماده شده‌اند. این کارها به شناخت سایت کمک می‌کنند؛ نمایش در نتایج، زمان ایندکس و رتبهٔ مشخص تضمین نمی‌شوند. [راهنمای رسمی سئو گوگل](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)

## پس از انتشار

۱. بازشدن صفحهٔ اصلی، پوستر، [robots.txt](https://madaraiagent.com/robots.txt) و [sitemap.xml](https://madaraiagent.com/sitemap.xml) را با HTTPS بررسی کنید. نقشهٔ سایت فقط شامل دو صفحهٔ عمومی واقعی است؛ فایل‌های کد، راهنماها، تصاویر و نسخه‌های محلی داخل آن نیستند. فایل robots مسیر خواندن صفحه و منابع لازم آن را باز می‌گذارد. [نقشهٔ سایت](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)، [کاربرد robots.txt](https://developers.google.com/search/docs/crawling-indexing/robots/intro)

۲. با حساب گوگل خود وارد [Google Search Console](https://search.google.com/search-console/) شوید. گزینهٔ Add property و سپس Domain را انتخاب و فقط madaraiagent.com را وارد کنید؛ بدون https و بدون مسیر. این نوع ثبت، دامنه و زیر‌دامنه‌ها را پوشش می‌دهد. [انواع property](https://support.google.com/webmasters/answer/34592)

۳. گوگل یک مقدار اختصاصی برای تأیید مالکیت می‌دهد. همان رکورد TXT را در مدیریت DNS دامنه در پارس‌پک اضافه و سپس در گوگل Verify را بزنید. مقدار واقعی باید از حساب خودتان گرفته شود؛ هیچ توکن نمونه‌ای در سورس قرار داده نشده است. رکوردهای A، CNAME و MX فعلی را تغییر ندهید و TXT تأیید را پس از موفقیت هم نگه دارید. اگر تأیید فوری نبود، وضعیت انتشار DNS را بررسی کنید. [راهنمای رسمی تأیید مالکیت](https://support.google.com/webmasters/answer/9008080)

۴. پس از تأیید، در بخش Sitemaps آدرس کامل https://madaraiagent.com/sitemap.xml را ثبت کنید. در URL Inspection ابتدا https://madaraiagent.com/ و سپس https://madaraiagent.com/assets/course/poster.html را بررسی کنید؛ در صورت دسترس‌پذیری صفحه می‌توانید Request indexing را انتخاب کنید. تکرار پیاپی درخواست، نمایش سریع‌تر را تضمین نمی‌کند. [درخواست بازخوانی صفحه](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl)

## نگهداری

متن واقعی و به‌روز دوره، خدمات و اعضا مهم است. پس از تغییر نام، تاریخ یا مدرسان دوره، متن نمایان، پوستر و JSON-LD داخل index.html را هماهنگ کنید. مقصد canonical باید HTTPS همین دامنه بماند. برای یک صفحهٔ جدید واقعی، آدرس اصلی آن را به sitemap.xml اضافه کنید؛ URLهای تکراری و نسخه‌های آزمایشی را اضافه نکنید.

دادهٔ Organization، WebSite، Course و Person فقط اطلاعات واقعی همین صفحه را توصیف می‌کند. ارائه‌دهندهٔ دوره مَدار است؛ دانشگاه‌های محل فعالیت مدرسان ارائه‌دهندهٔ دوره معرفی نشده‌اند. نشانی دفتر، محل برگزاری دوره محسوب نشده و قیمت، امتیاز، گواهینامه یا پیشنهاد فروش ساختگی اضافه نشده است. [Organization در گوگل](https://developers.google.com/search/docs/appearance/structured-data/organization)، [Course در Schema.org](https://schema.org/Course)

این Course نشانه‌گذاری عمومی برای شناخت محتواست. قابلیت ویژهٔ فهرست دورهٔ گوگل شرایط جداگانه دارد، از جمله دست‌کم سه دوره و نمایش انگلیسی؛ برای این تک‌دورهٔ فارسی ادعای چنین قابلیتی نداریم. [شرایط فهرست دوره در گوگل](https://developers.google.com/search/docs/appearance/structured-data/course)

برای بررسی عمومی ساختار می‌توانید از [Schema Markup Validator](https://validator.schema.org/) استفاده کنید. این راهنما ثبت حساب، تأیید مالکیت یا ارسال sitemap را به‌جای شما انجام نداده است.
