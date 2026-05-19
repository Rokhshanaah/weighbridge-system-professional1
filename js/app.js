'use strict';

const STORAGE_KEY = 'professional_weighbridge_system_v2';
const $ = (id) => document.getElementById(id);
const qs = (selector) => document.querySelector(selector);
const qsa = (selector) => Array.from(document.querySelectorAll(selector));
const nowISO = () => new Date().toISOString();
const today = (value = new Date()) => new Date(value).toISOString().slice(0, 10);
const uid = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

const ROLE_LABELS = {
  Admin: 'مدیر سیستم',
  Operator: 'اپراتور باسکول',
  Accountant: 'حسابدار'
};


function svgIcon(name, className = 'svg-icon') {
  const attrs = `class="${className}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"`;
  const icons = {
    dashboard: `<svg ${attrs}><rect x="3" y="3" width="7" height="9" rx="2"></rect><rect x="14" y="3" width="7" height="5" rx="2"></rect><rect x="14" y="12" width="7" height="9" rx="2"></rect><rect x="3" y="16" width="7" height="5" rx="2"></rect></svg>`,
    scale: `<svg ${attrs}><path d="M12 3v18"></path><path d="M5 7h14"></path><path d="M6 7l-3 6h6L6 7z"></path><path d="M18 7l-3 6h6l-3-6z"></path><path d="M8 21h8"></path></svg>`,
    truck: `<svg ${attrs}><path d="M3 7h11v9H3z"></path><path d="M14 10h4l3 3v3h-7z"></path><circle cx="7" cy="18" r="2"></circle><circle cx="17" cy="18" r="2"></circle></svg>`,
    id: `<svg ${attrs}><rect x="3" y="4" width="18" height="16" rx="2"></rect><circle cx="9" cy="10" r="2"></circle><path d="M6 16c1.2-2 4.8-2 6 0"></path><path d="M14 9h4"></path><path d="M14 13h4"></path></svg>`,
    box: `<svg ${attrs}><path d="M21 8l-9-5-9 5 9 5 9-5z"></path><path d="M3 8v8l9 5 9-5V8"></path><path d="M12 13v8"></path></svg>`,
    card: `<svg ${attrs}><rect x="3" y="5" width="18" height="14" rx="2"></rect><path d="M3 10h18"></path><path d="M7 15h3"></path></svg>`,
    report: `<svg ${attrs}><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><path d="M14 3v6h6"></path><path d="M8 13h8"></path><path d="M8 17h5"></path></svg>`,
    users: `<svg ${attrs}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`,
    audit: `<svg ${attrs}><path d="M9 11l2 2 4-4"></path><path d="M20 6L9 17l-5-5"></path><path d="M4 4h16v16H4z"></path></svg>`,
    archive: `<svg ${attrs}><rect x="3" y="4" width="18" height="4" rx="1"></rect><path d="M5 8v11a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8"></path><path d="M10 12h4"></path></svg>`,
    settings: `<svg ${attrs}><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06A1.65 1.65 0 0 0 15 19.4a1.65 1.65 0 0 0-1 .6 1.65 1.65 0 0 0-.38 1.05V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-.6-1 1.65 1.65 0 0 0-1.05-.38H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-.6A1.65 1.65 0 0 0 10.38 3V3a2 2 0 1 1 4 0v.09A1.65 1.65 0 0 0 15 4.6a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9c.14.35.14.73 0 1.08.37.05.73.2 1 .43.34.3.54.73.54 1.19s-.2.9-.54 1.19c-.27.24-.63.39-1 .44z"></path></svg>`,
    money: `<svg ${attrs}><rect x="3" y="6" width="18" height="12" rx="2"></rect><circle cx="12" cy="12" r="3"></circle><path d="M6 9v.01"></path><path d="M18 15v.01"></path></svg>`,
    clock: `<svg ${attrs}><circle cx="12" cy="12" r="9"></circle><path d="M12 7v5l3 2"></path></svg>`,
    weight: `<svg ${attrs}><path d="M7 8h10l2 13H5L7 8z"></path><path d="M9 8a3 3 0 0 1 6 0"></path><path d="M12 12v3"></path></svg>`,
    plus: `<svg ${attrs}><path d="M12 5v14"></path><path d="M5 12h14"></path></svg>`,
    user: `<svg ${attrs}><circle cx="12" cy="8" r="4"></circle><path d="M4 21a8 8 0 0 1 16 0"></path></svg>`
  };
  return icons[name] || icons.dashboard;
}

function normalizeDigits(value) {
  return String(value ?? '')
    .replace(/[۰-۹]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d))
    .replace(/[٠-٩]/g, (d) => '٠١٢٣٤٥٦٧٨٩'.indexOf(d))
    .replace(/,/g, '.')
    .replace(/\s/g, '');
}

function parseNumber(value) {
  const normalized = normalizeDigits(value);
  const num = Number(normalized);
  return Number.isFinite(num) ? num : 0;
}

const MODULES = [
  { id: 'dashboard', title: 'داشبورد', description: 'نمای کلی سیستم، آمار امروز و آخرین فعالیت‌ها', icon: 'dashboard', roles: ['Admin', 'Operator', 'Accountant'] },
  { id: 'weighing', title: 'وزن‌گیری', description: 'ثبت وزن اول، وزن دوم، محاسبه وزن خالص و چاپ رسید', icon: 'scale', roles: ['Admin', 'Operator'] },
  { id: 'trucks', title: 'موترها', description: 'ثبت و مدیریت موترهای باربری', icon: 'truck', roles: ['Admin', 'Operator'] },
  { id: 'drivers', title: 'راننده‌ها', description: 'مدیریت معلومات راننده‌ها', icon: 'id', roles: ['Admin', 'Operator'] },
  { id: 'products', title: 'کالاها', description: 'تعریف نوع بار، قیمت هر تن و حد مجاز وزن', icon: 'box', roles: ['Admin', 'Operator', 'Accountant'] },
  { id: 'payments', title: 'پرداخت‌ها', description: 'ثبت و بررسی پرداخت‌ها و وضعیت مالی', icon: 'card', roles: ['Admin', 'Accountant'] },
  { id: 'reports', title: 'گزارش‌ها', description: 'گزارش روزانه، هفتگی، ماهانه و مالی', icon: 'report', roles: ['Admin', 'Accountant'] },
  { id: 'users', title: 'کاربران و رمزها', description: 'مدیریت کاربران، نقش‌ها، صلاحیت‌ها و مشاهده رمزها برای مدیر', icon: 'users', roles: ['Admin'] },
  { id: 'audit', title: 'ثبت وقایع', description: 'تمام ورودها، ویرایش‌ها، حذف‌ها و پرداخت‌ها در این بخش ذخیره می‌شود', icon: 'audit', roles: ['Admin'] },
  { id: 'trash', title: 'آرشیف حذف‌شده‌ها', description: 'اطلاعات حذف‌شده از سیستم پاک نمی‌شود و قابل برگشت است', icon: 'archive', roles: ['Admin'] },
  { id: 'settings', title: 'تنظیمات', description: 'تنظیم واحد پول، حد وزن، رسید و نام سیستم', icon: 'settings', roles: ['Admin'] }
];

const PERMISSIONS = {
  Admin: {
    create: true, update: true, delete: true, restore: true, viewPasswords: true, manageSettings: true, viewAudit: true, export: true, payments: true
  },
  Operator: {
    create: true, update: true, delete: false, restore: false, viewPasswords: false, manageSettings: false, viewAudit: false, export: false, payments: false
  },
  Accountant: {
    create: false, update: false, delete: false, restore: false, viewPasswords: false, manageSettings: false, viewAudit: false, export: true, payments: true
  }
};

const seed = {
  currentUserId: null,
  settings: {
    systemName: 'Weighbridge Management System',
    companyName: 'باسکول مرکزی بین‌شهری',
    currency: 'افغانی',
    receiptPrefix: 'WB',
    generalOverloadLimitTon: 40,
    scaleMode: 'Manual'
  },
  users: [
    { id: 'u-admin', name: 'مدیر سیستم', username: 'admin', password: 'admin123', role: 'Admin', active: true, createdAt: nowISO(), updatedAt: nowISO(), isDeleted: false },
    { id: 'u-operator', name: 'اپراتور باسکول', username: 'operator', password: 'op123', role: 'Operator', active: true, createdAt: nowISO(), updatedAt: nowISO(), isDeleted: false },
    { id: 'u-accountant', name: 'حسابدار', username: 'accountant', password: 'acc123', role: 'Accountant', active: true, createdAt: nowISO(), updatedAt: nowISO(), isDeleted: false }
  ],
  trucks: [
    { id: 't-1', plate: 'HER-12345', company: 'شرکت آریانا ترانسپورت', type: 'تریلر', note: 'موتر فعال', createdAt: nowISO(), updatedAt: nowISO(), isDeleted: false },
    { id: 't-2', plate: 'KBL-88771', company: 'شرکت پامیر لوجستیک', type: 'لاری', note: 'مسیر کابل - هرات', createdAt: nowISO(), updatedAt: nowISO(), isDeleted: false },
    { id: 't-3', plate: 'KDR-55221', company: 'شرکت روشن بار', type: 'کانتینر', note: '', createdAt: nowISO(), updatedAt: nowISO(), isDeleted: false }
  ],
  drivers: [
    { id: 'd-1', name: 'احمد ولی', phone: '0799123456', nationalId: 'A-1022', address: 'هرات', createdAt: nowISO(), updatedAt: nowISO(), isDeleted: false },
    { id: 'd-2', name: 'محمد صابر', phone: '0788001122', nationalId: 'B-7788', address: 'کابل', createdAt: nowISO(), updatedAt: nowISO(), isDeleted: false },
    { id: 'd-3', name: 'عبدالحق نوری', phone: '0777441188', nationalId: 'C-9911', address: 'قندهار', createdAt: nowISO(), updatedAt: nowISO(), isDeleted: false }
  ],
  products: [
    { id: 'p-1', name: 'گندم', pricePerTon: 5000, maxAllowedTon: 30, description: 'مواد غذایی', createdAt: nowISO(), updatedAt: nowISO(), isDeleted: false },
    { id: 'p-2', name: 'سمنت', pricePerTon: 4200, maxAllowedTon: 35, description: 'مواد ساختمانی', createdAt: nowISO(), updatedAt: nowISO(), isDeleted: false },
    { id: 'p-3', name: 'مواد ساختمانی', pricePerTon: 6500, maxAllowedTon: 40, description: 'بار عمومی', createdAt: nowISO(), updatedAt: nowISO(), isDeleted: false }
  ],
  weighings: [
    {
      id: 'w-1', receiptNo: 'WB-1001', truckId: 't-1', truckPlate: 'HER-12345', driverId: 'd-1', productId: 'p-1', company: 'شرکت آریانا ترانسپورت',
      firstWeight: 8, firstWeightType: 'خالی', secondWeight: 20, netWeight: 12, pricePerTon: 5000, totalAmount: 60000,
      paymentStatus: 'Paid', weighingStatus: 'Completed', timeIn: nowISO(), timeOut: nowISO(), operatorId: 'u-operator', note: 'نمونه سیستم',
      createdAt: nowISO(), updatedAt: nowISO(), isDeleted: false
    },
    {
      id: 'w-2', receiptNo: 'WB-1002', truckId: 't-2', truckPlate: 'KBL-88771', driverId: 'd-2', productId: 'p-2', company: 'شرکت پامیر لوجستیک',
      firstWeight: 11, firstWeightType: 'خالی', secondWeight: 0, netWeight: 0, pricePerTon: 4200, totalAmount: 0,
      paymentStatus: 'Unpaid', weighingStatus: 'InProgress', timeIn: nowISO(), timeOut: null, operatorId: 'u-operator', note: '',
      createdAt: nowISO(), updatedAt: nowISO(), isDeleted: false
    }
  ],
  payments: [
    { id: 'pay-1', weighingId: 'w-1', receiptNo: 'WB-1001', amount: 60000, method: 'Cash', paidAt: nowISO(), accountantId: 'u-accountant', note: 'پرداخت نقدی', createdAt: nowISO(), updatedAt: nowISO(), isDeleted: false }
  ],
  auditLogs: []
};

let state = loadState();
let view = 'dashboard';

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return structuredClone(seed);
    const parsed = JSON.parse(raw);
    return { ...structuredClone(seed), ...parsed };
  } catch (error) {
    return structuredClone(seed);
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function currentUser() {
  return activeItems('users').find((u) => u.id === state.currentUserId) || null;
}

function can(action) {
  const user = currentUser();
  if (!user) return false;
  return Boolean(PERMISSIONS[user.role]?.[action]);
}

function activeItems(collection) {
  return (state[collection] || []).filter((item) => !item.isDeleted);
}

function deletedItems(collection) {
  return (state[collection] || []).filter((item) => item.isDeleted);
}

function findById(collection, id, includeDeleted = false) {
  const list = includeDeleted ? (state[collection] || []) : activeItems(collection);
  return list.find((item) => item.id === id) || null;
}

function formatMoney(value) {
  return `${formatNumber(value)} ${state.settings.currency}`;
}

function formatNumber(value) {
  return Number(value || 0).toLocaleString('en-US', { maximumFractionDigits: 2 });
}

function formatDate(value) {
  if (!value) return '-';
  return new Date(value).toLocaleString('fa-AF', { dateStyle: 'medium', timeStyle: 'short' });
}

function showToast(message) {
  const toast = $('toast');
  toast.textContent = message;
  toast.classList.remove('hidden');
  setTimeout(() => toast.classList.add('hidden'), 2600);
}

function logAction(action, entity, entityId, summary) {
  const user = currentUser();
  state.auditLogs.unshift({
    id: uid(),
    action,
    entity,
    entityId,
    summary,
    userId: user?.id || null,
    userName: user?.name || 'سیستم',
    role: user?.role || '-',
    createdAt: nowISO()
  });
  saveState();
}

function init() {
  $('loginForm').addEventListener('submit', handleLogin);
  $('logoutBtn').addEventListener('click', logout);
  $('mobileMenuBtn').addEventListener('click', () => $('mobileMenu').classList.toggle('hidden'));
  $('closeModalBtn').addEventListener('click', closeModal);
  $('quickWeighBtn').addEventListener('click', () => setView('weighing'));
  qsa('.demo-login-card').forEach((btn) => {
    btn.addEventListener('click', () => {
      $('loginUsername').value = btn.dataset.user;
      $('loginPassword').value = btn.dataset.pass;
    });
  });

  if (currentUser()) showApp();
  else showLogin();
}

function handleLogin(event) {
  event.preventDefault();
  const username = $('loginUsername').value.trim();
  const password = $('loginPassword').value.trim();
  const user = activeItems('users').find((item) => item.username === username && item.password === password && item.active);
  if (!user) {
    showToast('نام کاربری یا رمز عبور درست نیست، یا حساب غیرفعال است.');
    return;
  }
  state.currentUserId = user.id;
  saveState();
  logAction('LOGIN', 'users', user.id, `${user.name} وارد سیستم شد`);
  view = 'dashboard';
  showApp();
}

function logout() {
  const user = currentUser();
  logAction('LOGOUT', 'users', user?.id || '-', `${user?.name || 'کاربر'} از سیستم خارج شد`);
  state.currentUserId = null;
  saveState();
  showLogin();
}

function showLogin() {
  $('loginPage').classList.remove('hidden');
  $('appPage').classList.add('hidden');
}

function showApp() {
  const user = currentUser();
  if (!user) return showLogin();
  $('loginPage').classList.add('hidden');
  $('appPage').classList.remove('hidden');
  $('currentUserName').textContent = user.name;
  $('currentUserRole').textContent = ROLE_LABELS[user.role] || user.role;
  renderMenus();
  if (!allowedModules().some((item) => item.id === view)) view = 'dashboard';
  renderView();
}

function allowedModules() {
  const user = currentUser();
  return MODULES.filter((item) => item.roles.includes(user?.role));
}

function renderMenus() {
  const html = allowedModules().map((item) => `
    <button class="menu-item ${view === item.id ? 'active' : ''}" data-view="${item.id}">
      <span class="menu-icon">${svgIcon(item.icon)}</span><span>${item.title}</span>
    </button>
  `).join('');
  $('sideMenu').innerHTML = html;
  $('mobileMenu').innerHTML = `<div class="grid grid-cols-2 gap-2">${html}</div>`;
  qsa('[data-view]').forEach((btn) => btn.addEventListener('click', () => setView(btn.dataset.view)));
}

function setView(nextView) {
  const allowed = allowedModules().some((item) => item.id === nextView);
  if (!allowed) {
    showToast('شما به این بخش دسترسی ندارید.');
    return;
  }
  view = nextView;
  $('mobileMenu').classList.add('hidden');
  renderMenus();
  renderView();
}

function renderView() {
  const module = MODULES.find((item) => item.id === view) || MODULES[0];
  $('pageTitle').textContent = module.title;
  $('pageDescription').textContent = module.description;
  $('quickWeighBtn').classList.toggle('hidden', !allowedModules().some((item) => item.id === 'weighing'));

  const renderers = {
    dashboard: renderDashboard,
    weighing: renderWeighing,
    trucks: renderTrucks,
    drivers: renderDrivers,
    products: renderProducts,
    payments: renderPayments,
    reports: renderReports,
    users: renderUsers,
    audit: renderAudit,
    trash: renderTrash,
    settings: renderSettings
  };
  $('content').innerHTML = (renderers[view] || renderDashboard)();
  bindAfterRender();
}

function bindAfterRender() {
  const weighingForm = $('weighingForm');
  if (weighingForm) weighingForm.addEventListener('submit', createWeighing);

  const reportBtn = $('filterReportsBtn');
  if (reportBtn) reportBtn.addEventListener('click', renderFilteredReports);

  const exportBtn = $('exportReportsBtn');
  if (exportBtn) exportBtn.addEventListener('click', exportCSV);

  const scaleBtn = $('readScaleBtn');
  if (scaleBtn) {
    scaleBtn.addEventListener('click', () => {
      const value = (Math.random() * 38 + 4).toFixed(2);
      $('firstWeight').value = value;
      showToast(`وزن نمونه از باسکول خوانده شد: ${value} تن`);
    });
  }
}

function renderDashboard() {
  const user = currentUser();
  const todayWeighings = activeItems('weighings').filter((w) => today(w.timeIn) === today());
  const completedToday = todayWeighings.filter((w) => w.weighingStatus === 'Completed');
  const todayPayments = activeItems('payments').filter((p) => today(p.paidAt) === today());
  const activeQueue = activeItems('weighings').filter((w) => w.weighingStatus === 'InProgress');
  const totalNet = completedToday.reduce((sum, item) => sum + Number(item.netWeight || 0), 0);
  const totalIncome = todayPayments.reduce((sum, item) => sum + Number(item.amount || 0), 0);

  const roleNotice = {
    Admin: 'شما به تمام بخش‌ها، کاربران، رمزها، گزارش‌ها، ثبت وقایع و آرشیف حذف‌شده‌ها دسترسی دارید.',
    Operator: 'شما می‌توانید وزن‌گیری، موترها، راننده‌ها و کالاها را مدیریت کنید؛ اما حذف، پرداخت و مدیریت کاربران برای شما محدود است.',
    Accountant: 'شما فقط به پرداخت‌ها، گزارش‌ها و بخش‌های مالی دسترسی دارید.'
  };

  const last = activeItems('weighings').slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 7);

  return `
    <div class="mb-6 rounded-[28px] bg-gradient-to-l from-blue-900 to-slate-950 text-white p-6 shadow-xl">
      <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 class="text-2xl font-black">خوش آمدید، ${user.name}</h2>
          <p class="mt-2 text-blue-100 leading-7">${roleNotice[user.role]}</p>
        </div>
        <div class="rounded-3xl bg-white/10 p-4 min-w-[220px]">
          <div class="text-sm text-blue-100">نقش فعلی</div>
          <div class="text-xl font-black mt-1">${ROLE_LABELS[user.role]}</div>
        </div>
      </div>
    </div>

    <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      ${statCard('موترهای امروز', formatNumber(todayWeighings.length), 'truck', 'blue')}
      ${statCard('وزن خالص امروز', `${formatNumber(totalNet)} تن`, 'scale', 'green')}
      ${statCard('درآمد امروز', formatMoney(totalIncome), 'money', 'amber')}
      ${statCard('در انتظار وزن دوم', formatNumber(activeQueue.length), 'clock', 'violet')}
    </div>

    <div class="mt-6 grid gap-6 xl:grid-cols-3">
      <div class="card p-5 xl:col-span-2">
        <div class="flex items-center justify-between gap-3 mb-4">
          <h3 class="text-xl font-black">آخرین وزن‌گیری‌ها</h3>
          ${allowedModules().some((item) => item.id === 'weighing') ? '<button class="btn-secondary" onclick="setView(\'weighing\')">رفتن به وزن‌گیری</button>' : ''}
        </div>
        ${table(['رسید', 'موتر', 'راننده', 'کالا', 'وزن خالص', 'مبلغ', 'وضعیت'], last.map((w) => [
          w.receiptNo,
          w.truckPlate,
          driverName(w.driverId),
          productName(w.productId),
          `${formatNumber(w.netWeight)} تن`,
          formatMoney(w.totalAmount),
          statusBadge(w.weighingStatus)
        ]))}
      </div>
      <div class="card p-5">
        <h3 class="text-xl font-black">خلاصه صلاحیت شما</h3>
        <div class="mt-4 space-y-3">
          ${permissionLine('ایجاد معلومات', can('create'))}
          ${permissionLine('ویرایش معلومات', can('update'))}
          ${permissionLine('حذف امن معلومات', can('delete'))}
          ${permissionLine('پرداخت‌ها', can('payments'))}
          ${permissionLine('مشاهده رمزها', can('viewPasswords'))}
        </div>
      </div>
    </div>
  `;
}

function permissionLine(label, yes) {
  return `<div class="flex items-center justify-between rounded-2xl bg-slate-50 p-3"><span>${label}</span><b class="${yes ? 'text-emerald-600' : 'text-red-500'}">${yes ? 'مجاز' : 'محدود'}</b></div>`;
}

function statCard(title, value, icon, color) {
  const colors = {
    blue: 'bg-blue-50 text-blue-700',
    green: 'bg-emerald-50 text-emerald-700',
    amber: 'bg-amber-50 text-amber-700',
    violet: 'bg-violet-50 text-violet-700'
  };
  return `
    <div class="stat-card">
      <div class="flex items-center justify-between gap-4">
        <div>
          <p class="text-sm text-slate-500 font-bold">${title}</p>
          <h3 class="text-3xl font-black mt-2">${value}</h3>
        </div>
        <div class="w-14 h-14 rounded-2xl flex items-center justify-center ${colors[color] || colors.blue}">${svgIcon(icon, 'svg-icon-lg')}</div>
      </div>
    </div>
  `;
}

function renderWeighing() {
  const inProgress = activeItems('weighings').filter((w) => w.weighingStatus === 'InProgress');
  const completed = activeItems('weighings').filter((w) => w.weighingStatus === 'Completed').slice().sort((a, b) => new Date(b.timeOut) - new Date(a.timeOut)).slice(0, 10);

  return `
    <div class="grid gap-6 xl:grid-cols-5">
      <div class="card p-5 xl:col-span-2">
        <h3 class="text-xl font-black">ثبت ورود و وزن اول</h3>
        <p class="text-sm text-slate-500 mt-1">اپراتور معلومات موتر را ثبت کرده و وزن اول را ذخیره می‌کند.</p>

        <form id="weighingForm" class="mt-5 grid gap-4">
          ${selectInput('truckId', 'نمبر پلیت موتر', activeItems('trucks').map((t) => [t.id, `${t.plate} - ${t.company}`]))}
          ${selectInput('driverId', 'نام راننده', activeItems('drivers').map((d) => [d.id, `${d.name} - ${d.phone}`]))}
          ${selectInput('productId', 'نوع بار', activeItems('products').map((p) => [p.id, `${p.name} - ${formatMoney(p.pricePerTon)}/تن`]))}
          ${textInput('company', 'شرکت مربوطه', 'text', 'مثلاً شرکت آریانا ترانسپورت')}
          <div class="grid sm:grid-cols-2 gap-3">
            ${textInput('firstWeight', 'وزن اول / تن', 'number', 'مثلاً 8')}
            ${selectInput('firstWeightType', 'نوع وزن اول', [['خالی', 'خالی'], ['پر', 'پر']])}
          </div>
          <div class="grid sm:grid-cols-2 gap-3">
            <button type="button" id="readScaleBtn" class="btn-secondary">خواندن نمونه از باسکول</button>
            <button class="btn-primary">ثبت وزن اول و چاپ رسید</button>
          </div>
        </form>
      </div>

      <div class="card p-5 xl:col-span-3">
        <div class="flex items-center justify-between gap-3 mb-4">
          <div>
            <h3 class="text-xl font-black">موترهای در جریان</h3>
            <p class="text-sm text-slate-500 mt-1">برای خروج موتر، وزن دوم را ثبت کنید.</p>
          </div>
          <span class="badge bg-amber-50 text-amber-700">${formatNumber(inProgress.length)} مورد</span>
        </div>
        ${inProgress.length ? inProgress.map(renderInProgressCard).join('') : empty('فعلاً موتری در انتظار وزن دوم نیست.')}
      </div>
    </div>

    <div class="card p-5 mt-6">
      <div class="flex items-center justify-between gap-3 mb-4">
        <h3 class="text-xl font-black">آخرین رسیدهای نهایی</h3>
        <button class="btn-secondary" onclick="exportCSV()">خروجی CSV</button>
      </div>
      ${table(['رسید', 'موتر', 'راننده', 'کالا', 'وزن اول', 'وزن دوم', 'خالص', 'مبلغ', 'رسید'], completed.map((w) => [
        w.receiptNo,
        w.truckPlate,
        driverName(w.driverId),
        productName(w.productId),
        `${formatNumber(w.firstWeight)} تن`,
        `${formatNumber(w.secondWeight)} تن`,
        `${formatNumber(w.netWeight)} تن`,
        formatMoney(w.totalAmount),
        `<button class="btn-secondary !py-2 !px-3" onclick="printReceipt('${w.id}', 'final')">چاپ</button>`
      ]))}
    </div>
  `;
}

function renderInProgressCard(w) {
  return `
    <div class="rounded-3xl border border-slate-200 bg-slate-50 p-4 mb-4">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <div class="font-black text-lg">${w.truckPlate} <span class="text-sm text-slate-400">${w.receiptNo}</span></div>
          <div class="text-sm text-slate-500 mt-1">راننده: ${driverName(w.driverId)} | کالا: ${productName(w.productId)} | وزن اول: ${formatNumber(w.firstWeight)} تن</div>
        </div>
        ${statusBadge(w.weighingStatus)}
      </div>
      <div class="mt-4 grid gap-3 sm:grid-cols-[1fr_auto_auto]">
        <input id="secondWeight-${w.id}" type="text" inputmode="decimal" data-number="true" step="0.01" class="form-input ltr" placeholder="وزن دوم / تن" />
        <button class="btn-success" onclick="completeWeighing('${w.id}')">ثبت وزن دوم</button>
        <button class="btn-secondary" onclick="printReceipt('${w.id}', 'initial')">رسید اولیه</button>
      </div>
    </div>
  `;
}

function createWeighing(event) {
  event.preventDefault();
  if (!can('create')) return showToast('شما صلاحیت ایجاد وزن‌گیری را ندارید.');

  const form = new FormData(event.target);
  const truck = findById('trucks', form.get('truckId'));
  const driver = findById('drivers', form.get('driverId'));
  const product = findById('products', form.get('productId'));
  const firstWeight = parseNumber(form.get('firstWeight'));

  if (!truck || !driver || !product || firstWeight <= 0) {
    showToast('لطفاً موتر، راننده، کالا و وزن اول را درست وارد کنید.');
    return;
  }

  const receiptNo = `${state.settings.receiptPrefix}-${1000 + activeItems('weighings').length + deletedItems('weighings').length + 1}`;
  const weighing = {
    id: uid(),
    receiptNo,
    truckId: truck.id,
    truckPlate: truck.plate,
    driverId: driver.id,
    productId: product.id,
    company: form.get('company') || truck.company,
    firstWeight,
    firstWeightType: form.get('firstWeightType'),
    secondWeight: 0,
    netWeight: 0,
    pricePerTon: parseNumber(product.pricePerTon),
    totalAmount: 0,
    paymentStatus: 'Unpaid',
    weighingStatus: 'InProgress',
    timeIn: nowISO(),
    timeOut: null,
    operatorId: currentUser().id,
    note: '',
    createdAt: nowISO(),
    updatedAt: nowISO(),
    isDeleted: false
  };

  state.weighings.unshift(weighing);
  saveState();
  logAction('CREATE', 'weighings', weighing.id, `وزن اول برای رسید ${receiptNo} ثبت شد`);
  showToast('وزن اول ثبت شد و رسید اولیه آماده چاپ است.');
  renderView();
  setTimeout(() => printReceipt(weighing.id, 'initial'), 100);
}

function completeWeighing(id) {
  if (!can('update')) return showToast('شما صلاحیت ثبت وزن دوم را ندارید.');

  const weighing = findById('weighings', id);
  const input = $(`secondWeight-${id}`);
  const secondWeight = parseNumber(input?.value || 0);
  if (!weighing || secondWeight <= 0) {
    showToast('وزن دوم را درست وارد کنید.');
    return;
  }

  const product = findById('products', weighing.productId);
  const netWeight = Math.abs(secondWeight - parseNumber(weighing.firstWeight));
  weighing.secondWeight = secondWeight;
  weighing.netWeight = Number(netWeight.toFixed(2));
  weighing.pricePerTon = parseNumber(product?.pricePerTon || weighing.pricePerTon || 0);
  weighing.totalAmount = Math.round(weighing.netWeight * weighing.pricePerTon);
  weighing.timeOut = nowISO();
  weighing.weighingStatus = 'Completed';
  weighing.updatedAt = nowISO();

  const productLimit = parseNumber(product?.maxAllowedTon || 0);
  if (productLimit && weighing.netWeight > productLimit) {
    showToast(`هشدار: وزن خالص از حد مجاز ${productLimit} تن بیشتر است.`);
  }

  saveState();
  logAction('UPDATE', 'weighings', weighing.id, `وزن دوم و مبلغ نهایی برای رسید ${weighing.receiptNo} ثبت شد`);
  renderView();
  setTimeout(() => printReceipt(weighing.id, 'final'), 100);
}

function renderTrucks() {
  return crudPage({
    title: 'لیست موترها',
    addText: '+ ثبت موتر',
    addAction: 'openTruckModal()',
    headers: ['نمبر پلیت', 'شرکت', 'نوع موتر', 'یادداشت', 'عملیات'],
    rows: activeItems('trucks').map((t) => [t.plate, t.company, t.type || '-', t.note || '-', rowActions('Truck', t.id)])
  });
}

function openTruckModal(id = '') {
  if (!id && !can('create')) return showToast('شما صلاحیت ثبت موتر را ندارید.');
  if (id && !can('update')) return showToast('شما صلاحیت ویرایش موتر را ندارید.');
  const t = findById('trucks', id) || { plate: '', company: '', type: '', note: '' };
  openModal(id ? 'ویرایش موتر' : 'ثبت موتر', 'معلومات موتر را وارد کنید.', `
    <form onsubmit="saveTruck(event, '${id}')" class="grid gap-4">
      ${textInput('plate', 'نمبر پلیت', 'text', 'HER-12345', t.plate)}
      ${textInput('company', 'شرکت مربوطه', 'text', 'نام شرکت', t.company)}
      ${textInput('type', 'نوع موتر', 'text', 'تریلر / لاری / کانتینر', t.type)}
      ${textareaInput('note', 'یادداشت', t.note)}
      ${modalButtons()}
    </form>
  `);
}

function saveTruck(event, id) {
  event.preventDefault();
  const form = new FormData(event.target);
  const data = { plate: form.get('plate').trim(), company: form.get('company').trim(), type: form.get('type').trim(), note: form.get('note').trim() };
  if (!data.plate) return showToast('نمبر پلیت ضروری است.');
  if (id) updateItem('trucks', id, data, `موتر ${data.plate} ویرایش شد`);
  else createItem('trucks', data, `موتر ${data.plate} ثبت شد`);
  closeModal(); renderView(); showToast('ذخیره شد.');
}

function deleteTruck(id) { softDelete('trucks', id, 'موتر'); }

function renderDrivers() {
  return crudPage({
    title: 'لیست راننده‌ها',
    addText: '+ ثبت راننده',
    addAction: 'openDriverModal()',
    headers: ['نام', 'شماره تماس', 'ID / تذکره', 'آدرس', 'عملیات'],
    rows: activeItems('drivers').map((d) => [d.name, d.phone, d.nationalId || '-', d.address || '-', rowActions('Driver', d.id)])
  });
}

function openDriverModal(id = '') {
  if (!id && !can('create')) return showToast('شما صلاحیت ثبت راننده را ندارید.');
  if (id && !can('update')) return showToast('شما صلاحیت ویرایش راننده را ندارید.');
  const d = findById('drivers', id) || { name: '', phone: '', nationalId: '', address: '' };
  openModal(id ? 'ویرایش راننده' : 'ثبت راننده', 'معلومات راننده را وارد کنید.', `
    <form onsubmit="saveDriver(event, '${id}')" class="grid gap-4">
      ${textInput('name', 'نام راننده', 'text', 'نام کامل', d.name)}
      ${textInput('phone', 'شماره تماس', 'text', '07xxxxxxxx', d.phone)}
      ${textInput('nationalId', 'ID / تذکره', 'text', 'A-1022', d.nationalId)}
      ${textInput('address', 'آدرس', 'text', 'هرات / کابل / ...', d.address)}
      ${modalButtons()}
    </form>
  `);
}

function saveDriver(event, id) {
  event.preventDefault();
  const form = new FormData(event.target);
  const data = { name: form.get('name').trim(), phone: form.get('phone').trim(), nationalId: form.get('nationalId').trim(), address: form.get('address').trim() };
  if (!data.name) return showToast('نام راننده ضروری است.');
  if (id) updateItem('drivers', id, data, `راننده ${data.name} ویرایش شد`);
  else createItem('drivers', data, `راننده ${data.name} ثبت شد`);
  closeModal(); renderView(); showToast('ذخیره شد.');
}

function deleteDriver(id) { softDelete('drivers', id, 'راننده'); }

function renderProducts() {
  const canEdit = currentUser().role !== 'Accountant';
  return `
    <div class="card p-5">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
        <div>
          <h3 class="text-xl font-black">لیست کالاها</h3>
          <p class="text-sm text-slate-500 mt-1">حسابدار می‌تواند کالاها را مشاهده کند؛ ویرایش فقط برای مدیر و اپراتور است.</p>
        </div>
        ${canEdit ? '<button class="btn-primary" onclick="openProductModal()">+ ثبت کالا</button>' : ''}
      </div>
      ${table(['نوع بار', 'قیمت هر تن', 'حد مجاز وزن', 'توضیحات', 'عملیات'], activeItems('products').map((p) => [
        p.name,
        formatMoney(p.pricePerTon),
        `${formatNumber(p.maxAllowedTon)} تن`,
        p.description || '-',
        canEdit ? rowActions('Product', p.id) : '<span class="text-slate-400">فقط مشاهده</span>'
      ]))}
    </div>
  `;
}

function openProductModal(id = '') {
  if (currentUser().role === 'Accountant') return showToast('حسابدار فقط می‌تواند کالاها را مشاهده کند.');
  if (!id && !can('create')) return showToast('شما صلاحیت ثبت کالا را ندارید.');
  if (id && !can('update')) return showToast('شما صلاحیت ویرایش کالا را ندارید.');
  const p = findById('products', id) || { name: '', pricePerTon: '', maxAllowedTon: '', description: '' };
  openModal(id ? 'ویرایش کالا' : 'ثبت کالا', 'نوع بار، قیمت هر تن و حد مجاز وزن را وارد کنید.', `
    <form onsubmit="saveProduct(event, '${id}')" class="grid gap-4">
      ${textInput('name', 'نوع بار', 'text', 'مثلاً گندم', p.name)}
      ${textInput('pricePerTon', 'قیمت هر تن', 'number', '5000', p.pricePerTon)}
      ${textInput('maxAllowedTon', 'حد مجاز وزن / تن', 'number', '40', p.maxAllowedTon)}
      ${textareaInput('description', 'توضیحات', p.description)}
      ${modalButtons()}
    </form>
  `);
}

function saveProduct(event, id) {
  event.preventDefault();
  const form = new FormData(event.target);
  const data = {
    name: form.get('name').trim(),
    pricePerTon: parseNumber(form.get('pricePerTon')),
    maxAllowedTon: parseNumber(form.get('maxAllowedTon')),
    description: form.get('description').trim()
  };
  if (!data.name || data.pricePerTon <= 0) return showToast('نام کالا و قیمت هر تن ضروری است.');
  if (id) updateItem('products', id, data, `کالا ${data.name} ویرایش شد`);
  else createItem('products', data, `کالا ${data.name} ثبت شد`);
  closeModal(); renderView(); showToast('ذخیره شد.');
}

function deleteProduct(id) { softDelete('products', id, 'کالا'); }

function renderPayments() {
  const unpaid = activeItems('weighings').filter((w) => w.weighingStatus === 'Completed' && w.paymentStatus !== 'Paid');
  const payments = activeItems('payments').slice().sort((a, b) => new Date(b.paidAt) - new Date(a.paidAt));
  const totalPaid = payments.reduce((sum, p) => sum + Number(p.amount || 0), 0);
  const totalUnpaid = unpaid.reduce((sum, w) => sum + Number(w.totalAmount || 0), 0);

  return `
    <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 mb-6">
      ${statCard('رسیدهای پرداخت‌نشده', formatNumber(unpaid.length), 'audit', 'amber')}
      ${statCard('مبلغ پرداخت‌نشده', formatMoney(totalUnpaid), 'clock', 'violet')}
      ${statCard('کل پرداخت‌شده', formatMoney(totalPaid), 'money', 'green')}
      ${statCard('تعداد پرداخت‌ها', formatNumber(payments.length), 'card', 'blue')}
    </div>

    <div class="grid gap-6 xl:grid-cols-3">
      <div class="card p-5">
        <h3 class="text-xl font-black mb-4">در انتظار پرداخت</h3>
        <div class="space-y-3">
          ${unpaid.length ? unpaid.map((w) => `
            <div class="rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <div class="font-black">${w.receiptNo} - ${w.truckPlate}</div>
              <div class="text-sm text-slate-500 mt-1">راننده: ${driverName(w.driverId)}</div>
              <div class="text-sm text-slate-500 mt-1">مبلغ: ${formatMoney(w.totalAmount)}</div>
              <button class="btn-success w-full mt-3" onclick="openPaymentModal('${w.id}')">ثبت پرداخت</button>
            </div>
          `).join('') : empty('پرداخت پرداخت‌نشده وجود ندارد.')}
        </div>
      </div>

      <div class="card p-5 xl:col-span-2">
        <h3 class="text-xl font-black mb-4">لیست پرداخت‌ها</h3>
        ${table(['رسید', 'موتر', 'مبلغ', 'روش', 'تاریخ', 'حسابدار'], payments.map((p) => {
          const w = findById('weighings', p.weighingId, true);
          return [p.receiptNo || w?.receiptNo || '-', w?.truckPlate || '-', formatMoney(p.amount), paymentMethodLabel(p.method), formatDate(p.paidAt), userName(p.accountantId)];
        }))}
      </div>
    </div>
  `;
}

function openPaymentModal(weighingId) {
  if (!can('payments')) return showToast('شما صلاحیت ثبت پرداخت را ندارید.');
  const w = findById('weighings', weighingId);
  if (!w) return;
  openModal('ثبت پرداخت', `رسید ${w.receiptNo}`, `
    <form onsubmit="savePayment(event, '${weighingId}')" class="grid gap-4">
      ${textInput('amount', 'مبلغ پرداخت', 'number', '0', w.totalAmount)}
      ${selectInput('method', 'روش پرداخت', [['Cash', 'نقدی'], ['Bank', 'بانک'], ['Card', 'کارت'], ['Other', 'دیگر']])}
      ${textareaInput('note', 'یادداشت پرداخت')}
      ${modalButtons('ثبت پرداخت')}
    </form>
  `);
}

function savePayment(event, weighingId) {
  event.preventDefault();
  const w = findById('weighings', weighingId);
  const form = new FormData(event.target);
  const amount = parseNumber(form.get('amount'));
  if (!w || amount <= 0) return showToast('مبلغ پرداخت درست نیست.');

  const payment = {
    id: uid(),
    weighingId: w.id,
    receiptNo: w.receiptNo,
    amount,
    method: form.get('method'),
    paidAt: nowISO(),
    accountantId: currentUser().id,
    note: form.get('note').trim(),
    createdAt: nowISO(),
    updatedAt: nowISO(),
    isDeleted: false
  };
  state.payments.unshift(payment);
  w.paymentStatus = 'Paid';
  w.updatedAt = nowISO();
  saveState();
  logAction('PAYMENT', 'payments', payment.id, `پرداخت ${formatMoney(amount)} برای رسید ${w.receiptNo} ثبت شد`);
  closeModal(); renderView(); showToast('پرداخت ثبت شد.');
}

function renderReports() {
  const rows = activeItems('weighings').filter((w) => w.weighingStatus === 'Completed');
  return `
    <div class="card p-5 mb-6">
      <div class="grid gap-3 lg:grid-cols-5">
        <input id="reportSearch" class="form-input" placeholder="جستجو نمبر موتر، رسید، راننده" />
        <input id="reportFrom" type="date" class="form-input" />
        <input id="reportTo" type="date" class="form-input" />
        <button id="filterReportsBtn" class="btn-primary">فیلتر گزارش</button>
        <button id="exportReportsBtn" class="btn-secondary">خروجی CSV</button>
      </div>
    </div>

    <div class="grid gap-4 sm:grid-cols-3 mb-6">
      ${statCard('کل رسیدهای نهایی', formatNumber(rows.length), 'report', 'blue')}
      ${statCard('کل وزن خالص', `${formatNumber(rows.reduce((s, w) => s + Number(w.netWeight || 0), 0))} تن`, 'scale', 'green')}
      ${statCard('کل مبلغ', formatMoney(rows.reduce((s, w) => s + Number(w.totalAmount || 0), 0)), 'money', 'amber')}
    </div>

    <div class="card p-5">
      <h3 class="text-xl font-black mb-4">گزارش وزن‌گیری و مالی</h3>
      <div id="reportsTable">${reportsTable(rows)}</div>
    </div>
  `;
}

function renderFilteredReports() {
  const q = $('reportSearch').value.trim().toLowerCase();
  const from = $('reportFrom').value;
  const to = $('reportTo').value;
  const rows = activeItems('weighings').filter((w) => {
    if (w.weighingStatus !== 'Completed') return false;
    const dName = driverName(w.driverId).toLowerCase();
    const pName = productName(w.productId).toLowerCase();
    const date = today(w.timeIn);
    const matchesText = !q || w.receiptNo.toLowerCase().includes(q) || w.truckPlate.toLowerCase().includes(q) || dName.includes(q) || pName.includes(q);
    const matchesFrom = !from || date >= from;
    const matchesTo = !to || date <= to;
    return matchesText && matchesFrom && matchesTo;
  });
  $('reportsTable').innerHTML = reportsTable(rows);
}

function reportsTable(rows) {
  return table(['رسید', 'موتر', 'راننده', 'کالا', 'ورود', 'خروج', 'وزن خالص', 'مبلغ', 'پرداخت'], rows.map((w) => [
    w.receiptNo,
    w.truckPlate,
    driverName(w.driverId),
    productName(w.productId),
    formatDate(w.timeIn),
    formatDate(w.timeOut),
    `${formatNumber(w.netWeight)} تن`,
    formatMoney(w.totalAmount),
    paymentBadge(w.paymentStatus)
  ]));
}

function renderUsers() {
  const users = activeItems('users');
  return `
    <div class="grid gap-6 xl:grid-cols-3">
      <div class="card p-5 xl:col-span-2">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
          <div>
            <h3 class="text-xl font-black">کاربران سیستم</h3>
            <p class="text-sm text-slate-500 mt-1">مدیر می‌تواند همه کاربران، نقش‌ها و رمزهای سیستم را مدیریت کند.</p>
          </div>
          <button class="btn-primary" onclick="openUserModal()">+ ایجاد کاربر</button>
        </div>
        ${table(['نام', 'نام کاربری', 'رمز', 'نقش', 'وضعیت', 'عملیات'], users.map((u) => [
          u.name,
          `<span class="ltr inline-block">${u.username}</span>`,
          can('viewPasswords') ? `<span class="ltr font-black text-blue-700">${u.password}</span>` : '******',
          ROLE_LABELS[u.role] || u.role,
          u.active ? statusBadge('Active') : statusBadge('Inactive'),
          rowActions('User', u.id, u.id === 'u-admin')
        ]))}
      </div>

      <div class="card p-5">
        <h3 class="text-xl font-black">صلاحیت نقش‌ها</h3>
        <div class="mt-4 space-y-4">
          ${rolePermissionCard('Admin', 'دسترسی کامل به همه بخش‌ها، رمزها، حذف امن، برگشت اطلاعات و تنظیمات.')}
          ${rolePermissionCard('Operator', 'ثبت وزن، موتر، راننده و کالا؛ بدون دسترسی به پرداخت، کاربران و حذف.')}
          ${rolePermissionCard('Accountant', 'فقط پرداخت‌ها و گزارش‌های مالی؛ بدون ویرایش اطلاعات عملیاتی.')}
        </div>
      </div>
    </div>
  `;
}

function rolePermissionCard(role, text) {
  return `<div class="rounded-3xl bg-slate-50 border border-slate-200 p-4"><div class="font-black">${ROLE_LABELS[role]}</div><p class="text-sm text-slate-500 leading-7 mt-1">${text}</p></div>`;
}

function openUserModal(id = '') {
  const u = findById('users', id) || { name: '', username: '', password: '', role: 'Operator', active: true };
  openModal(id ? 'ویرایش کاربر' : 'ایجاد کاربر', 'مدیر می‌تواند حساب کاربران و رمزهای آنان را تنظیم کند.', `
    <form onsubmit="saveUser(event, '${id}')" class="grid gap-4">
      ${textInput('name', 'نام کامل', 'text', 'نام کاربر', u.name)}
      ${textInput('username', 'نام کاربری', 'text', 'username', u.username)}
      ${textInput('password', 'رمز عبور', 'text', 'password', u.password)}
      ${selectInput('role', 'نقش کاربر', [['Admin', 'مدیر سیستم'], ['Operator', 'اپراتور باسکول'], ['Accountant', 'حسابدار']], u.role)}
      ${selectInput('active', 'وضعیت حساب', [['true', 'فعال'], ['false', 'غیرفعال']], String(u.active))}
      ${modalButtons()}
    </form>
  `);
}

function saveUser(event, id) {
  event.preventDefault();
  const form = new FormData(event.target);
  const data = {
    name: form.get('name').trim(),
    username: form.get('username').trim(),
    password: form.get('password').trim(),
    role: form.get('role'),
    active: form.get('active') === 'true'
  };
  if (!data.name || !data.username || !data.password) return showToast('نام، نام کاربری و رمز ضروری است.');
  if (id) updateItem('users', id, data, `کاربر ${data.name} ویرایش شد`);
  else createItem('users', data, `کاربر ${data.name} ایجاد شد`);
  closeModal(); renderView(); showToast('ذخیره شد.');
}

function deleteUser(id) {
  if (id === 'u-admin') return showToast('مدیر اصلی سیستم حذف نمی‌شود.');
  softDelete('users', id, 'کاربر');
}

function renderAudit() {
  const logs = state.auditLogs.slice(0, 250);
  return `
    <div class="card p-5">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
        <div>
          <h3 class="text-xl font-black">ثبت وقایع سیستم</h3>
          <p class="text-sm text-slate-500 mt-1">هر ورود، ایجاد، ویرایش، حذف، برگشت، پرداخت و چاپ رسید اینجا ذخیره می‌شود.</p>
        </div>
        <button class="btn-secondary" onclick="clearAuditConfirm()">پاک‌سازی وقایع تستی</button>
      </div>
      ${table(['زمان', 'کاربر', 'نقش', 'عملیات', 'بخش', 'توضیحات'], logs.map((l) => [formatDate(l.createdAt), l.userName, ROLE_LABELS[l.role] || l.role, auditBadge(l.action), entityLabel(l.entity), l.summary]))}
    </div>
  `;
}

function clearAuditConfirm() {
  if (!confirm('آیا می‌خواهید ثبت وقایع تستی پاک شود؟')) return;
  state.auditLogs = [];
  saveState();
  showToast('ثبت وقایع پاک شد.');
  renderView();
}

function renderTrash() {
  const collections = ['trucks', 'drivers', 'products', 'weighings', 'payments', 'users'];
  const rows = collections.flatMap((collection) => deletedItems(collection).map((item) => ({ collection, item })));
  return `
    <div class="card p-5">
      <div class="mb-5">
        <h3 class="text-xl font-black">آرشیف حذف‌شده‌ها</h3>
        <p class="text-sm text-slate-500 mt-1">حذف در این سیستم Soft Delete است؛ یعنی اطلاعات از سیستم پاک نمی‌شود و مدیر می‌تواند آن را برگرداند.</p>
      </div>
      ${table(['بخش', 'شناسه/نام', 'حذف شده توسط', 'زمان حذف', 'عملیات'], rows.map(({ collection, item }) => [
        entityLabel(collection),
        deletedItemTitle(collection, item),
        item.deletedByName || '-',
        formatDate(item.deletedAt),
        `<button class="btn-success !py-2 !px-3" onclick="restoreItem('${collection}', '${item.id}')">برگرداندن</button>`
      ]))}
    </div>
  `;
}

function renderSettings() {
  return `
    <div class="card p-5 max-w-3xl">
      <h3 class="text-xl font-black">تنظیمات سیستم</h3>
      <p class="text-sm text-slate-500 mt-1">فقط مدیر سیستم به این بخش دسترسی دارد.</p>
      <form onsubmit="saveSettings(event)" class="grid gap-4 mt-5">
        ${textInput('systemName', 'نام انگلیسی سیستم', 'text', '', state.settings.systemName)}
        ${textInput('companyName', 'نام شرکت / باسکول', 'text', '', state.settings.companyName)}
        ${textInput('currency', 'واحد پول', 'text', 'افغانی', state.settings.currency)}
        ${textInput('receiptPrefix', 'پیشوند رسید', 'text', 'WB', state.settings.receiptPrefix)}
        ${textInput('generalOverloadLimitTon', 'حد عمومی اضافه وزن / تن', 'number', '40', state.settings.generalOverloadLimitTon)}
        ${selectInput('scaleMode', 'حالت اتصال باسکول', [['Manual', 'دستی / نمایشی'], ['Auto', 'اتصال مستقیم در نسخه واقعی']], state.settings.scaleMode)}
        <div class="grid sm:grid-cols-2 gap-3">
          <button class="btn-primary">ذخیره تنظیمات</button>
          <button type="button" class="btn-danger-light" onclick="resetSystem()">بازنشانی اطلاعات نمونه</button>
        </div>
      </form>
    </div>
  `;
}

function saveSettings(event) {
  event.preventDefault();
  if (!can('manageSettings')) return showToast('شما صلاحیت تنظیمات را ندارید.');
  const form = new FormData(event.target);
  state.settings = {
    systemName: form.get('systemName').trim(),
    companyName: form.get('companyName').trim(),
    currency: form.get('currency').trim(),
    receiptPrefix: form.get('receiptPrefix').trim(),
    generalOverloadLimitTon: parseNumber(form.get('generalOverloadLimitTon')),
    scaleMode: form.get('scaleMode')
  };
  saveState();
  logAction('SETTINGS', 'settings', 'settings', 'تنظیمات سیستم تغییر کرد');
  showToast('تنظیمات ذخیره شد.');
  renderView();
}

function resetSystem() {
  if (!confirm('تمام اطلاعات فعلی حذف و اطلاعات نمونه از نو ساخته شود؟')) return;
  const current = state.currentUserId;
  state = structuredClone(seed);
  state.currentUserId = current;
  saveState();
  logAction('RESET', 'settings', 'system', 'اطلاعات نمونه سیستم بازنشانی شد');
  showToast('سیستم بازنشانی شد.');
  renderView();
}

function createItem(collection, data, summary) {
  if (!can('create')) return showToast('شما صلاحیت ایجاد معلومات را ندارید.');
  const item = { id: uid(), ...data, createdAt: nowISO(), updatedAt: nowISO(), isDeleted: false };
  state[collection].unshift(item);
  saveState();
  logAction('CREATE', collection, item.id, summary);
}

function updateItem(collection, id, data, summary) {
  if (!can('update')) return showToast('شما صلاحیت ویرایش معلومات را ندارید.');
  const item = findById(collection, id);
  if (!item) return showToast('اطلاعات پیدا نشد.');
  Object.assign(item, data, { updatedAt: nowISO() });
  saveState();
  logAction('UPDATE', collection, id, summary);
}

function softDelete(collection, id, label) {
  if (!can('delete')) return showToast('شما صلاحیت حذف را ندارید.');
  const item = findById(collection, id);
  if (!item) return showToast('اطلاعات پیدا نشد.');
  if (!confirm(`${label} حذف شود؟ اطلاعات پاک نمی‌شود و در آرشیف حذف‌شده‌ها باقی می‌ماند.`)) return;
  const user = currentUser();
  item.isDeleted = true;
  item.deletedAt = nowISO();
  item.deletedBy = user.id;
  item.deletedByName = user.name;
  item.updatedAt = nowISO();
  saveState();
  logAction('SOFT_DELETE', collection, id, `${label} حذف امن شد و به آرشیف رفت`);
  showToast('حذف شد، اما از سیستم پاک نشد و در آرشیف قابل برگشت است.');
  renderView();
}

function restoreItem(collection, id) {
  if (!can('restore')) return showToast('شما صلاحیت برگشت اطلاعات را ندارید.');
  const item = findById(collection, id, true);
  if (!item) return showToast('اطلاعات پیدا نشد.');
  item.isDeleted = false;
  item.deletedAt = null;
  item.deletedBy = null;
  item.deletedByName = null;
  item.updatedAt = nowISO();
  saveState();
  logAction('RESTORE', collection, id, `${entityLabel(collection)} از آرشیف برگشت داده شد`);
  showToast('اطلاعات برگشت داده شد.');
  renderView();
}

function printReceipt(id, type = 'final') {
  const w = findById('weighings', id, true);
  if (!w) return;
  const driver = findById('drivers', w.driverId, true);
  const product = findById('products', w.productId, true);
  const operator = findById('users', w.operatorId, true);
  const isFinal = type === 'final';

  logAction('PRINT', 'weighings', id, `${isFinal ? 'رسید نهایی' : 'رسید اولیه'} ${w.receiptNo} چاپ شد`);

  const html = `
    <!DOCTYPE html>
    <html lang="fa" dir="rtl">
    <head>
      <meta charset="UTF-8" />
      <title>${w.receiptNo}</title>
      <style>
        body{font-family:Tahoma,Arial,sans-serif;background:#f8fafc;color:#0f172a;padding:26px}.paper{max-width:760px;margin:auto;background:#fff;border:2px solid #0f172a;border-radius:24px;padding:24px}.top{text-align:center;border-bottom:1px dashed #94a3b8;padding-bottom:16px;margin-bottom:18px}.top h1{margin:0;font-size:26px}.top p{margin:6px 0;color:#64748b}.grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}.item{border:1px solid #e2e8f0;background:#f8fafc;border-radius:16px;padding:12px}.label{font-size:12px;color:#64748b}.value{font-weight:800;margin-top:5px}.total{margin-top:18px;background:#dbeafe;border:1px solid #bfdbfe;border-radius:18px;padding:16px;text-align:center;font-size:24px;font-weight:900;color:#1e40af}.foot{display:flex;justify-content:space-between;gap:12px;margin-top:26px;font-size:13px;color:#334155}.btn{margin-top:22px;width:100%;border:0;background:#1d4ed8;color:white;border-radius:16px;padding:13px;font-weight:900;font-size:15px}@media print{body{background:white}.btn{display:none}.paper{border:0}}
      </style>
    </head>
    <body>
      <div class="paper">
        <div class="top">
          <h1>${state.settings.companyName}</h1>
          <p>${state.settings.systemName}</p>
          <h2>${isFinal ? 'رسید نهایی باسکول' : 'رسید اولیه باسکول'} - ${w.receiptNo}</h2>
        </div>
        <div class="grid">
          ${receiptItem('نمبر موتر', w.truckPlate)}
          ${receiptItem('راننده', driver?.name || '-')}
          ${receiptItem('شماره تماس راننده', driver?.phone || '-')}
          ${receiptItem('شرکت', w.company || '-')}
          ${receiptItem('نوع بار', product?.name || '-')}
          ${receiptItem('زمان ورود', formatDate(w.timeIn))}
          ${receiptItem('وزن اول', `${formatNumber(w.firstWeight)} تن (${w.firstWeightType})`)}
          ${isFinal ? receiptItem('وزن دوم', `${formatNumber(w.secondWeight)} تن`) : receiptItem('وضعیت', 'در انتظار وزن دوم')}
          ${isFinal ? receiptItem('زمان خروج', formatDate(w.timeOut)) : ''}
          ${isFinal ? receiptItem('وزن خالص', `${formatNumber(w.netWeight)} تن`) : ''}
          ${isFinal ? receiptItem('قیمت هر تن', formatMoney(w.pricePerTon)) : ''}
          ${isFinal ? receiptItem('وضعیت پرداخت', w.paymentStatus === 'Paid' ? 'پرداخت شده' : 'پرداخت نشده') : ''}
        </div>
        ${isFinal ? `<div class="total">مبلغ کل: ${formatMoney(w.totalAmount)}</div>` : ''}
        <div class="foot"><span>اپراتور: ${operator?.name || '-'}</span><span>تاریخ چاپ: ${formatDate(nowISO())}</span></div>
        <button class="btn" onclick="window.print()">چاپ رسید</button>
      </div>
    </body>
    </html>
  `;
  const win = window.open('', '_blank');
  win.document.write(html);
  win.document.close();
}

function receiptItem(label, value) {
  return `<div class="item"><div class="label">${label}</div><div class="value">${value}</div></div>`;
}

function exportCSV() {
  const rows = activeItems('weighings');
  const headers = ['Receipt', 'Truck', 'Driver', 'Product', 'First Weight', 'Second Weight', 'Net Weight', 'Amount', 'Payment', 'Time In', 'Time Out'];
  const excelDate = (value) => value ? new Date(value).toLocaleString('en-GB') : '-';
  const body = rows.map((w) => [
    w.receiptNo,
    w.truckPlate,
    driverName(w.driverId),
    productName(w.productId),
    w.firstWeight,
    w.secondWeight,
    w.netWeight,
    w.totalAmount,
    w.paymentStatus,
    excelDate(w.timeIn),
    excelDate(w.timeOut)
  ]);
  const csvRows = [headers, ...body]
    .map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(','))
    .join('\r\n');

  // UTF-8 BOM + sep=, fixes Persian/Arabic text corruption in Microsoft Excel.
  const csv = `\uFEFFsep=,\r\n${csvRows}`;
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `weighbridge-report-${today()}.csv`;
  a.click();
  URL.revokeObjectURL(url);
  logAction('EXPORT', 'reports', 'csv', 'گزارش CSV خروجی گرفته شد');
}

function crudPage({ title, addText, addAction, headers, rows }) {
  return `
    <div class="card p-5">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
        <h3 class="text-xl font-black">${title}</h3>
        ${can('create') ? `<button class="btn-primary" onclick="${addAction}">${addText}</button>` : ''}
      </div>
      ${table(headers, rows)}
    </div>
  `;
}

function table(headers, rows) {
  if (!rows || !rows.length) return empty('اطلاعاتی برای نمایش وجود ندارد.');
  return `
    <div class="table-wrap">
      <table class="app-table">
        <thead><tr>${headers.map((h) => `<th>${h}</th>`).join('')}</tr></thead>
        <tbody>${rows.map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join('')}</tr>`).join('')}</tbody>
      </table>
    </div>
  `;
}

function empty(text) {
  return `<div class="empty-state">${text}</div>`;
}

function rowActions(entity, id, disabledDelete = false) {
  const edit = can('update') ? `<button class="btn-secondary !py-2 !px-3" onclick="open${entity}Modal('${id}')">ویرایش</button>` : '';
  const del = can('delete') && !disabledDelete ? `<button class="btn-danger-light !py-2 !px-3" onclick="delete${entity}('${id}')">حذف</button>` : '';
  return `<div class="flex flex-wrap gap-2">${edit || '<span class="text-slate-400">بدون ویرایش</span>'}${del}</div>`;
}

function textInput(name, label, type = 'text', placeholder = '', value = '') {
  const isNumber = type === 'number';
  const actualType = isNumber ? 'text' : type;
  const inputMode = isNumber ? 'inputmode="decimal" data-number="true"' : '';
  const ltrClass = isNumber || ['username', 'password'].includes(name) ? 'ltr' : '';
  return `<div><label class="form-label">${label}</label><input id="${name}" name="${name}" type="${actualType}" ${inputMode} step="0.01" class="form-input ${ltrClass}" placeholder="${placeholder}" value="${escapeAttr(value)}" /></div>`;
}

function textareaInput(name, label, value = '') {
  return `<div><label class="form-label">${label}</label><textarea name="${name}" class="form-textarea">${escapeHtml(value || '')}</textarea></div>`;
}

function selectInput(name, label, options, selected = '') {
  return `<div><label class="form-label">${label}</label><select name="${name}" class="form-select">${options.map(([value, text]) => `<option value="${escapeAttr(value)}" ${String(value) === String(selected) ? 'selected' : ''}>${text}</option>`).join('')}</select></div>`;
}

function modalButtons(text = 'ذخیره') {
  return `<div class="grid sm:grid-cols-2 gap-3"><button class="btn-primary">${text}</button><button type="button" class="btn-secondary" onclick="closeModal()">لغو</button></div>`;
}

function openModal(title, subtitle, body) {
  $('modalTitle').textContent = title;
  $('modalSubtitle').textContent = subtitle;
  $('modalBody').innerHTML = body;
  $('modal').classList.remove('hidden');
}

function closeModal() {
  $('modal').classList.add('hidden');
  $('modalBody').innerHTML = '';
}

function driverName(id) { return findById('drivers', id, true)?.name || '-'; }
function productName(id) { return findById('products', id, true)?.name || '-'; }
function userName(id) { return findById('users', id, true)?.name || '-'; }

function paymentMethodLabel(method) {
  return { Cash: 'نقدی', Bank: 'بانک', Card: 'کارت', Other: 'دیگر' }[method] || method;
}

function entityLabel(entity) {
  return {
    trucks: 'موترها', drivers: 'راننده‌ها', products: 'کالاها', weighings: 'وزن‌گیری', payments: 'پرداخت‌ها', users: 'کاربران', reports: 'گزارش‌ها', settings: 'تنظیمات'
  }[entity] || entity;
}

function deletedItemTitle(collection, item) {
  if (collection === 'trucks') return item.plate;
  if (collection === 'drivers') return item.name;
  if (collection === 'products') return item.name;
  if (collection === 'weighings') return `${item.receiptNo} - ${item.truckPlate}`;
  if (collection === 'payments') return `${item.receiptNo} - ${formatMoney(item.amount)}`;
  if (collection === 'users') return item.name;
  return item.id;
}

function statusBadge(status) {
  const map = {
    InProgress: ['در جریان', 'bg-amber-50 text-amber-700'],
    Completed: ['تکمیل شده', 'bg-emerald-50 text-emerald-700'],
    Active: ['فعال', 'bg-emerald-50 text-emerald-700'],
    Inactive: ['غیرفعال', 'bg-red-50 text-red-700']
  };
  const [label, cls] = map[status] || [status, 'bg-slate-100 text-slate-700'];
  return `<span class="badge ${cls}">${label}</span>`;
}

function paymentBadge(status) {
  return status === 'Paid'
    ? '<span class="badge bg-emerald-50 text-emerald-700">پرداخت شده</span>'
    : '<span class="badge bg-red-50 text-red-700">پرداخت نشده</span>';
}

function auditBadge(action) {
  const map = {
    LOGIN: ['ورود', 'bg-blue-50 text-blue-700'],
    LOGOUT: ['خروج', 'bg-slate-100 text-slate-700'],
    CREATE: ['ایجاد', 'bg-emerald-50 text-emerald-700'],
    UPDATE: ['ویرایش', 'bg-amber-50 text-amber-700'],
    SOFT_DELETE: ['حذف امن', 'bg-red-50 text-red-700'],
    RESTORE: ['برگشت', 'bg-violet-50 text-violet-700'],
    PAYMENT: ['پرداخت', 'bg-emerald-50 text-emerald-700'],
    PRINT: ['چاپ', 'bg-blue-50 text-blue-700'],
    EXPORT: ['خروجی', 'bg-slate-100 text-slate-700'],
    SETTINGS: ['تنظیمات', 'bg-violet-50 text-violet-700'],
    RESET: ['بازنشانی', 'bg-red-50 text-red-700']
  };
  const [label, cls] = map[action] || [action, 'bg-slate-100 text-slate-700'];
  return `<span class="badge ${cls}">${label}</span>`;
}

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function escapeAttr(value) {
  return escapeHtml(value);
}

window.setView = setView;
window.openTruckModal = openTruckModal;
window.saveTruck = saveTruck;
window.deleteTruck = deleteTruck;
window.openDriverModal = openDriverModal;
window.saveDriver = saveDriver;
window.deleteDriver = deleteDriver;
window.openProductModal = openProductModal;
window.saveProduct = saveProduct;
window.deleteProduct = deleteProduct;
window.completeWeighing = completeWeighing;
window.printReceipt = printReceipt;
window.exportCSV = exportCSV;
window.openPaymentModal = openPaymentModal;
window.savePayment = savePayment;
window.openUserModal = openUserModal;
window.saveUser = saveUser;
window.deleteUser = deleteUser;
window.restoreItem = restoreItem;
window.clearAuditConfirm = clearAuditConfirm;
window.saveSettings = saveSettings;
window.resetSystem = resetSystem;
window.closeModal = closeModal;

init();
