Weighbridge Management System
=============================

ساختار فایل‌ها:
- index.html
- css/styles.css
- js/app.js

روش اجرا:
1. فایل ZIP را Extract کنید.
2. فایل index.html را با مرورگر باز کنید.
3. سیستم بدون نصب Backend کار می‌کند و اطلاعات را در LocalStorage مرورگر ذخیره می‌کند.

حساب‌های نمونه:
Admin:
username: admin
password: admin123

Operator:
username: operator
password: op123

Accountant:
username: accountant
password: acc123

صلاحیت‌ها:
- Admin: دسترسی کامل، مدیریت کاربران، مشاهده رمزها، گزارش‌ها، ثبت وقایع، آرشیف حذف‌شده‌ها و تنظیمات.
- Operator: وزن‌گیری، ثبت موتر، راننده و کالا. بدون دسترسی به پرداخت، کاربران و حذف.
- Accountant: پرداخت‌ها و گزارش‌ها. بدون دسترسی به بخش‌های عملیاتی.

اصلاحات نسخه جدید:
- خروجی CSV برای Excel اصلاح شد و از UTF-8 BOM استفاده می‌کند تا متن فارسی/دری خراب نمایش داده نشود.
- فیلدهای عددی دیگر type="number" نیستند؛ به شکل text + inputmode="decimal" ساخته شده‌اند تا بتوانید اعداد را دستی، با اعداد انگلیسی، فارسی یا عربی وارد کنید.
- آیکون‌های ایموجی حذف شد و به‌جای آن از SVG icons مرتبط استفاده شده است.
- فایل‌ها جدا هستند: HTML جدا، CSS جدا، JavaScript جدا.

نکته مهم:
این نسخه Frontend و آموزشی است. در نسخه واقعی باید Backend، Database، Login امن، Hash Password و اتصال واقعی به دستگاه باسکول اضافه شود.
