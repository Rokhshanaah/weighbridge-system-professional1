<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Weighbridge Management System</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            app: ['Tahoma', 'Arial', 'sans-serif']
          },
          colors: {
            primary: '#1e40af',
            primarySoft: '#dbeafe',
            darkPanel: '#0f172a'
          }
        }
      }
    };
  </script>
  <link rel="stylesheet" href="css/styles.css" />
</head>
<body class="font-app bg-slate-100 text-slate-900">
  <div id="toast" class="toast hidden"></div>

  <section id="loginPage" class="min-h-screen relative overflow-hidden flex items-center justify-center p-4">
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#bfdbfe,transparent_35%),radial-gradient(circle_at_bottom_left,#e0f2fe,transparent_35%)]"></div>

    <!-- <div class="relative w-full max-w-6xl grid lg:grid-cols-2 gap-6"> -->
      <div class="relative w-full max-w-3xl mx-auto">
      <div class="hidden lg:flex min-h-[620px] rounded-[34px] bg-gradient-to-br from-blue-800 via-blue-900 to-slate-950 text-white p-10 shadow-2xl flex-col justify-between overflow-hidden">
        <div class="absolute -top-16 -right-16 h-52 w-52 bg-white/10 rounded-full"></div>
        <div class="absolute bottom-12 left-16 h-28 w-28 bg-white/10 rounded-full"></div>
        <div class="relative">
          <div class="w-16 h-16 rounded-3xl bg-white/15 flex items-center justify-center mb-7"><svg class="svg-icon-xl" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v18"></path><path d="M5 7h14"></path><path d="M6 7l-3 6h6L6 7z"></path><path d="M18 7l-3 6h6l-3-6z"></path><path d="M8 21h8"></path></svg></div>
          <h1 class="text-4xl font-black leading-tight">سیستم حرفه‌ای<br />مدیریت باسکول</h1>
          <p class="mt-5 text-blue-100 leading-8 max-w-md">ثبت ورود و خروج موترها، وزن‌گیری، محاسبه هزینه، مدیریت پرداخت‌ها، گزارش مالی، ثبت وقایع و کنترل صلاحیت کاربران.</p>
        </div>
        <div class="relative grid grid-cols-3 gap-3 text-center">
          <div class="rounded-3xl bg-white/10 p-4"><div class="text-2xl font-black">Role</div><div class="text-sm text-blue-100">صلاحیت‌ها</div></div>
          <div class="rounded-3xl bg-white/10 p-4"><div class="text-2xl font-black">Audit</div><div class="text-sm text-blue-100">ثبت وقایع</div></div>
          <div class="rounded-3xl bg-white/10 p-4"><div class="text-2xl font-black">Soft</div><div class="text-sm text-blue-100">حذف امن</div></div>
        </div>
      </div>

      <div class="glass-card rounded-[34px] p-6 sm:p-10 shadow-2xl border border-white/70">
        <div class="mb-7">
          <div class="lg:hidden w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-700 mb-4"><svg class="svg-icon-xl" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v18"></path><path d="M5 7h14"></path><path d="M6 7l-3 6h6L6 7z"></path><path d="M18 7l-3 6h6l-3-6z"></path><path d="M8 21h8"></path></svg></div>
          <h2 class="text-3xl font-black text-slate-950">ورود به سیستم</h2>
          <p class="mt-2 text-slate-500">با نقش خود وارد شوید. سیستم مطابق صلاحیت شما نمایش داده می‌شود.</p>
        </div>

        <form id="loginForm" class="space-y-4">
          <div>
            <label class="form-label">نام کاربری</label>
            <input id="loginUsername" class="form-input ltr" value="admin" autocomplete="username" />
          </div>
          <div>
            <label class="form-label">رمز عبور</label>
            <input id="loginPassword" type="password" class="form-input ltr" value="admin123" autocomplete="current-password" />
          </div>
          <button class="btn-primary w-full">ورود</button>
        </form>

        <div class="mt-6 rounded-3xl bg-white/80 border border-slate-200 p-4">
          <div class="flex items-center justify-between gap-3 mb-3">
            <h3 class="font-black">حساب‌های نمونه</h3>
            <span class="text-xs text-slate-500">برای تست پروژه</span>
          </div>
          <div class="grid sm:grid-cols-3 gap-3 text-sm">
            <button class="demo-login-card" data-user="admin" data-pass="admin123"><b>مدیر سیستم</b><span>admin / admin123</span></button>
            <button class="demo-login-card" data-user="operator" data-pass="op123"><b>اپراتور</b><span>operator / op123</span></button>
            <button class="demo-login-card" data-user="accountant" data-pass="acc123"><b>حسابدار</b><span>accountant / acc123</span></button>
          </div>
        </div>

        <!-- <div class="mt-5 rounded-3xl bg-amber-50 border border-amber-200 p-4 text-sm text-amber-800 leading-7">
          این نسخه برای تمرین Frontend است. در پروژه واقعی، رمزها باید در Backend هش شوند و در دیتابیس امن ذخیره گردند.
        </div> -->
      </div>
    </div>
  </section>

  <section id="appPage" class="hidden min-h-screen">
    <aside class="sidebar no-print">
      <div class="brand-box">
        <div class="brand-icon"><svg class="svg-icon-xl" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v18"></path><path d="M5 7h14"></path><path d="M6 7l-3 6h6L6 7z"></path><path d="M18 7l-3 6h6l-3-6z"></path><path d="M8 21h8"></path></svg></div>
        <div>
          <h1 class="font-black text-slate-950">باسکول بین‌شهری</h1>
          <p class="text-xs text-slate-500">Weighbridge System</p>
        </div>
      </div>

      <nav id="sideMenu" class="flex-1 space-y-2 overflow-y-auto pr-1"></nav>

      <div class="user-box">
        <div class="flex items-center gap-3">
          <div class="w-11 h-11 rounded-2xl bg-slate-200 flex items-center justify-center text-slate-700"><svg class="svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="8" r="4"></circle><path d="M4 21a8 8 0 0 1 16 0"></path></svg></div>
          <div class="min-w-0">
            <div id="currentUserName" class="font-black truncate"></div>
            <div id="currentUserRole" class="text-xs text-slate-500"></div>
          </div>
        </div>
        <button id="logoutBtn" class="btn-danger-light w-full mt-4">خروج از سیستم</button>
      </div>
    </aside>

    <main class="lg:mr-72 min-h-screen">
      <header class="topbar no-print">
        <div>
          <h2 id="pageTitle" class="text-xl sm:text-2xl font-black text-slate-950"></h2>
          <p id="pageDescription" class="hidden sm:block text-sm text-slate-500 mt-1"></p>
        </div>
        <div class="flex items-center gap-2">
          <button id="quickWeighBtn" class="btn-primary hidden sm:inline-flex">+ وزن‌گیری جدید</button>
          <button id="mobileMenuBtn" class="lg:hidden rounded-2xl border border-slate-200 bg-white px-4 py-2 font-black">☰</button>
        </div>
      </header>

      <div id="mobileMenu" class="hidden no-print lg:hidden bg-white border-b border-slate-200 p-4"></div>
      <div id="content" class="p-4 sm:p-6"></div>
    </main>
  </section>

  <div id="modal" class="modal hidden no-print">
    <div class="modal-card">
      <div class="flex items-start justify-between gap-4 mb-5">
        <div>
          <h3 id="modalTitle" class="text-2xl font-black"></h3>
          <p id="modalSubtitle" class="text-sm text-slate-500 mt-1"></p>
        </div>
        <button id="closeModalBtn" class="modal-close">×</button>
      </div>
      <div id="modalBody"></div>
    </div>
  </div>

  <script src="js/app.js"></script>
</body>
</html>
