const clone = (value) => JSON.parse(JSON.stringify(value));

const works = [
  { id: 1, title: '为什么鸟能飞起来？', reviewStatus: '审核通过', status: '已上架', color: 'orange', vip: false },
  { id: 2, title: '为什么月亮有时候圆有时候不圆？', reviewStatus: '审核中', status: '已上架', color: 'blue', vip: true },
  { id: 3, title: '为什么天空是蓝色的？', reviewStatus: '审核失败', status: '已下架', color: 'green', vip: true }
];

const metricData = {
  yesterday: { label: '昨日', overall: { plays: 9980, likes: 660, comments: 108, shares: 160, complete: 90.2, income: 150 }, works: { 1: { plays: 4200, likes: 286, shares: 64, comments: 38, complete: 93.2, income: 0 }, 2: { plays: 3100, likes: 198, shares: 52, comments: 41, complete: 87.4, income: 86 }, 3: { plays: 2680, likes: 176, shares: 44, comments: 29, complete: 90.1, income: 64 } } },
  '7d': { label: '近 7 日', overall: { plays: 66800, likes: 4186, comments: 630, shares: 992, complete: 89.4, income: 848 }, works: { 1: { plays: 28600, likes: 1920, shares: 418, comments: 246, complete: 92.1, income: 0 }, 2: { plays: 21400, likes: 1286, shares: 326, comments: 218, complete: 86.8, income: 486 }, 3: { plays: 16800, likes: 980, shares: 248, comments: 166, complete: 89.4, income: 362 } } },
  '30d': { label: '近 30 日', overall: { plays: 177600, likes: 13470, comments: 2020, shares: 3196, complete: 89, income: 2248 }, works: { 1: { plays: 86000, likes: 6820, shares: 1486, comments: 892, complete: 92, income: 0 }, 2: { plays: 52000, likes: 3740, shares: 968, comments: 642, complete: 86, income: 1286 }, 3: { plays: 39600, likes: 2910, shares: 742, comments: 486, complete: 89, income: 962 } } }
};

const trendData = {
  '7d': [{ day: '8/25', plays: 10680, income: 142 }, { day: '8/26', plays: 10340, income: 136 }, { day: '8/27', plays: 10960, income: 148 }, { day: '8/28', plays: 11420, income: 156 }, { day: '8/29', plays: 11180, income: 150 }, { day: '8/30', plays: 9980, income: 150 }, { day: '8/31', plays: 9980, income: 150 }],
  '30d': [{ day: '8/02', plays: 4200, income: 42 }, { day: '8/06', plays: 5580, income: 62 }, { day: '8/10', plays: 6820, income: 78 }, { day: '8/14', plays: 7020, income: 80 }, { day: '8/18', plays: 8460, income: 102 }, { day: '8/22', plays: 9740, income: 126 }, { day: '8/26', plays: 10340, income: 136 }, { day: '8/31', plays: 9980, income: 150 }],
  yesterday: [{ day: '8/31', plays: 9980, income: 150 }]
};

metricData.today = { label: '今日', overall: { plays: 3260, likes: 198, comments: 31, shares: 46, complete: 89.8, income: 0 }, works: { 1: { plays: 1420, likes: 92, shares: 18, comments: 14, complete: 91.2, income: 0 }, 2: { plays: 1060, likes: 64, shares: 17, comments: 10, complete: 87.1, income: 0 }, 3: { plays: 780, likes: 42, shares: 11, comments: 7, complete: 89.4, income: 0 } } };
trendData.today = [{ day: '今日', plays: 3260, income: 0 }];

const initialState = {
  authenticated: false,
  authForm: { phone: '', code: '', agreed: false },
  codeSent: false,
  creator: { name: '小王的科学大厅', appName: '小王的科学大厅', phone: '13812345678', verified: false, idStatus: 'unverified', isMinor: false, identity: null, bank: null, platformRegistered: false, contractStatus: 'unsigned', payee: '微信 · 小王' },
  activeView: 'works',
  sheet: null,
  form: {},
  range: '7d',
  customStart: '2026-08-01',
  customEnd: '2026-08-31',
  trend: 'plays',
  historyRange: '6m',
  historyStart: '2026-04-19',
  historyEnd: '2026-10-19',
  postLoginPendingIdentity: false,
  onboardingQueue: [],
  onboardingActive: false,
  onboardingReturnView: 'data',
  earnings: { total: 12840.5, gross: 3000, estimatedAfterTax: 2800.66, available: 2846.5, frozen: 0, settling: 1234.99, withdrawn: 6780 },
  withdrawal: { id: 'WD202610120018', amount: 0, net: 0, status: 'draft', reason: '', timeline: [] },
  toast: null
};

let state = clone(initialState);
const $ = (selector) => document.querySelector(selector);
const esc = (value) => String(value ?? '').replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
const money = (value) => `¥${Number(value || 0).toLocaleString('zh-CN', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
const rmbFixed = (value) => `￥${Number(value || 0).toFixed(2)}`;
const numberText = (value) => Number(value || 0).toLocaleString('zh-CN');
const formatPhone = (value) => value ? `${value.slice(0, 3)} **** ${value.slice(-4)}` : '未绑定';
const idStatusLabel = () => state.creator.idStatus === 'pass' ? '已认证' : '未认证';
const maskIdentityName = (value) => value ? `${value.slice(0, 1)}${'*'.repeat(Math.max(1, value.length - 1))}` : '未填写';
const maskIdentityNumber = (value) => value ? `${value.slice(0, 2)}******${value.slice(-2)}` : '未填写';

const statusText = {
  draft: ['待提交', 'warning'], pending_review: ['审核中', 'warning'], processing: ['支付处理中', 'blue'], paid: ['支付成功', 'success'], settled: ['已到账', 'success'], failed: ['提现失败', 'danger']
};

function statusTag(status) {
  const [label, tone] = statusText[status] || ['待处理', 'warning'];
  return `<span class="inline-status ${tone}">${label}</span>`;
}

function formatCount(value) {
  if (value >= 10000) return `${(value / 10000).toFixed(2)}万`;
  return numberText(value);
}

function watchHours(value) {
  return `${Number(value || 0).toFixed(2)}h`;
}

function estimatedIncome(value) {
  return state.range === 'today' ? '--' : money(value);
}

function setToast(type, title, message) {
  state.toast = { type, title, message };
  renderToast();
  clearTimeout(setToast.timer);
  setToast.timer = setTimeout(() => { state.toast = null; renderToast(); }, 2800);
}

function renderToast() {
  const root = $('#toast-root');
  root.innerHTML = state.toast ? `<div class="toast ${state.toast.type}"><strong>${esc(state.toast.title)}</strong><span>${esc(state.toast.message)}</span></div>` : '';
}

function setView(view) {
  state.activeView = view;
  state.sheet = null;
  render();
}

function openSheet(name, payload = {}) {
  state.sheet = name;
  state.form = clone(payload);
  state.onboardingActive = false;
  render();
}

function closeSheet() {
  state.sheet = null;
  state.form = {};
  render();
}

function startOnboarding() {
  state.onboardingQueue = [];
  if (!state.creator.verified || state.creator.isMinor || state.creator.idStatus !== 'pass' || !state.creator.identity) state.onboardingQueue.push('identity');
  if (!state.creator.bank || !state.creator.platformRegistered) state.onboardingQueue.push('bank');
  state.onboardingReturnView = state.onboardingQueue.length ? 'settings' : 'data';
  state.onboardingActive = true;
  nextOnboardingStep();
}

function nextOnboardingStep() {
  const next = state.onboardingQueue.shift();
  if (!next) {
    state.onboardingActive = false;
    state.sheet = null;
    state.form = {};
    state.activeView = state.onboardingReturnView;
    render();
    return;
  }
  state.sheet = next;
  state.form = next === 'identity'
    ? { name: state.creator.identity?.name || '', idNumber: '', identityEditing: !state.creator.identity, identityConsent: false }
    : { bankName: state.creator.bank?.bankName || '', branchName: state.creator.bank?.branchName || '', cardNumber: '', platformError: '' };
  render();
}

function skipOnboardingStep() {
  if (!state.onboardingActive) return closeSheet();

  // 实名认证被跳过或关闭时，本次登录不再继续触发银行卡绑定。
  // 实名完成后再次登录，startOnboarding 会根据当前状态单独补弹银行卡。
  if (state.sheet === 'identity' || state.sheet === 'identityCheck') {
    state.onboardingQueue = [];
    state.onboardingActive = false;
    state.sheet = null;
    state.form = {};
    state.activeView = state.onboardingReturnView;
    render();
    return;
  }

  state.sheet = null;
  state.form = {};
  nextOnboardingStep();
}

function sendCode() {
  const phone = state.authenticated ? state.form.newPhone : state.authForm.phone;
  if (!/^1\d{10}$/.test(phone)) return setToast('error', '手机号格式不正确', '请输入 11 位中国大陆手机号');
  state.codeSent = true;
  setToast('success', '验证码已发送', 'Demo 中可直接输入 123456');
  render();
}

function submitAuth() {
  const form = state.authForm;
  if (!form.agreed) return setToast('error', '请先勾选协议', '请阅读并同意《创作者版权协议》和《用户隐私声明xxx》');
  // Demo 登录可跳过真实手机号和验证码输入；真实产品接入手机号验证码服务后再启用接口校验。
  state.creator.phone = form.phone || state.creator.phone || '13812345678';
  state.authenticated = true;
  state.activeView = 'data';
  state.authForm = { phone: '', code: '', agreed: false };
  render();
  setToast('success', '登录成功', '已自动关联天天学 App 账号，并读取 App 名称');
  startOnboarding();
}

function updateAuthField(field, value) {
  state.authForm[field] = value;
}

function verifyIdentity(result) {
  if (result === 'pass') {
    state.creator.verified = true;
    state.creator.isMinor = false;
    state.creator.idStatus = 'pass';
    const shouldEnterData = state.postLoginPendingIdentity;
    state.postLoginPendingIdentity = false;
    state.sheet = null;
    state.activeView = shouldEnterData ? 'data' : state.activeView;
    setToast('success', '实名认证通过', shouldEnterData ? '认证完成，正在进入数据中心' : '已确认境内居民身份证有效且已满 18 周岁');
  } else if (result === 'minor') {
    state.creator.verified = false;
    state.creator.isMinor = false;
    state.creator.idStatus = 'unverified';
    setToast('error', '暂不支持自主提现', '识别为未成年人，请联系客服了解监护人处理方式');
  } else {
    state.creator.verified = false;
    state.creator.isMinor = false;
    state.creator.idStatus = 'unverified';
    setToast('error', result === 'invalid' ? '证件校验失败' : '核验服务异常', result === 'invalid' ? '请确认身份证信息和有效期后重新提交' : '当前未完成认证，请稍后重试');
  }
  render();
}

function submitIdentity() {
  const name = String(state.form.name || '').trim();
  const idNumber = String(state.form.idNumber || '').replace(/\s/g, '').toUpperCase();
  if (!state.form.identityConsent) return setToast('error', '请先勾选说明', '请阅读并同意《个人信息收集说明》');
  if (!/^[^\d\s]+$/.test(name)) return setToast('error', '姓名格式不正确', '姓名不能包含数字或空格');
  if (!/^[0-9A-Z]{18}$/.test(idNumber)) return setToast('error', '身份证号格式不正确', '请输入 18 位数字或字母');
  state.form = { name, idNumber, identityResult: 'pending', identityConsent: true };
  state.sheet = 'identityCheck';
  render();
}

function finishIdentityCheck(result) {
  const name = state.form.name;
  const idNumber = state.form.idNumber;
  if (result === 'pass') {
    state.creator.identity = { name, idNumber };
    state.creator.verified = true;
    state.creator.isMinor = false;
    state.creator.idStatus = 'pass';
    setToast('success', '实名认证通过', '实名认证信息已保存，自动进入银行卡绑定');
    if (state.onboardingActive) nextOnboardingStep();
    else openSheet('bank', { bankName: '', branchName: '', cardNumber: '', platformError: '' });
    return;
  }
  state.creator.verified = false;
  state.creator.isMinor = false;
  state.creator.idStatus = 'unverified';
  state.form.identityResult = result;
  render();
}

function backToIdentityEdit() {
  state.sheet = 'identity';
  state.form = { name: state.form.name || '', idNumber: state.form.idNumber || '', identityEditing: true, identityConsent: Boolean(state.form.identityConsent) };
  render();
}

function saveNickname() {
  const name = String(state.form.nickname || '').trim();
  if (name.length < 2) return setToast('error', '昵称太短', '昵称至少需要 2 个字符');
  state.creator.name = name;
  closeSheet();
  setToast('success', '昵称已更新', '新的昵称已保存');
}

function savePhone() {
  const phone = String(state.form.newPhone || '');
  if (!/^1\d{10}$/.test(phone)) return setToast('error', '手机号格式不正确', '请输入 11 位中国大陆手机号');
  if (!state.form.code) return setToast('error', '请输入验证码', 'Demo 验证码为 123456');
  state.creator.phone = phone;
  closeSheet();
  setToast('success', '绑定手机号已更新', `当前绑定 ${formatPhone(phone)}`);
}

function saveBank() {
  const bankName = String(state.form.bankName || '').trim();
  const branchName = String(state.form.branchName || '').trim();
  const cardNumber = String(state.form.cardNumber || '').replace(/\s/g, '');
  if (!state.creator.verified || !state.creator.identity) return setBankError('identity_invalid');
  if (!bankName) return setToast('error', '请选择银行', '请选择银行卡开户行');
  if (!branchName) return setToast('error', '请填写支行', '请输入开户支行名称');
  if (!/^\d{16,19}$/.test(cardNumber)) return setToast('error', '银行卡号格式不正确', '请输入 16-19 位银行卡号');
  state.creator.bank = { bankName, branchName, last4: cardNumber.slice(-4) };
  state.creator.platformRegistered = true;
  state.creator.contractStatus = 'pending';
  state.form.platformError = '';
  setToast('success', '注册成功', '已向您的登录手机号发送创作者签约短信，请及时查看并在30日内完成电子签约，未及时签约将影响收入分成');
  if (state.onboardingActive) nextOnboardingStep();
  else closeSheet();
}

function setBankError(code) {
  state.form.platformError = code;
  render();
}

function resetIdentityFromBank() {
  state.onboardingActive = true;
  state.onboardingQueue = ['bank'];
  state.sheet = 'identity';
  state.form = { name: '', idNumber: '', identityEditing: true, identityConsent: false };
  render();
}

function validateWithdraw(amount) {
  if (!state.creator.verified || state.creator.isMinor) return '请先完成实名认证且确认非未成年人';
  if (!Number.isFinite(amount) || amount <= 0) return '请输入提现金额';
  if (amount < 10) return '最低提现金额为 ¥10';
  if (amount > state.earnings.available) return '提现金额不能超过可提现余额';
  if (!state.creator.bank) return '请先绑定银行卡';
  if (!state.creator.platformRegistered) return '请先完成兼职平台注册';
  return '';
}

function submitWithdraw() {
  const amount = Number(state.form.amount);
  const error = validateWithdraw(amount);
  if (error) return setToast('error', '无法提交提现', error);
  state.withdrawal.amount = amount;
  state.withdrawal.net = amount;
  state.withdrawal.status = 'pending_review';
  state.earnings.available = Number((state.earnings.available - amount).toFixed(2));
  state.earnings.frozen = Number((state.earnings.frozen + amount).toFixed(2));
  state.withdrawal.timeline = [
    { title: '提现申请已提交', detail: `申请金额 ${money(amount)}`, tone: 'done' },
    { title: '等待平台审核', detail: '实名认证和银行卡主体校验已通过', tone: 'blue' }
  ];
  closeSheet();
  setToast('success', '提现申请已提交', '订单已进入审核队列');
}

function approveWithdraw() {
  if (state.withdrawal.status !== 'pending_review') return setToast('info', '当前无需审核', '请先提交一笔新的提现申请');
  state.withdrawal.status = 'processing';
  state.withdrawal.timeline.push({ title: '平台审核通过', detail: '实名、金额和收款主体校验通过', tone: 'done' });
  setToast('success', '审核通过', '订单已进入支付处理');
  render();
}

function completeWithdraw() {
  if (state.withdrawal.status !== 'processing') return setToast('info', '当前不可处理', '请先通过审核');
  state.withdrawal.status = 'settled';
  state.earnings.frozen = Number(Math.max(0, state.earnings.frozen - state.withdrawal.amount).toFixed(2));
  state.earnings.withdrawn = Number((state.earnings.withdrawn + state.withdrawal.amount).toFixed(2));
  state.withdrawal.timeline.push({ title: '已支付并完成对账', detail: `实付金额 ${money(state.withdrawal.net)}`, tone: 'done' });
  setToast('success', '提现已到账', '支付成功且财务对账一致');
  render();
}

function metricForRange() {
  if (state.range === 'custom') {
    const start = new Date(`${state.customStart}T00:00:00`);
    const end = new Date(`${state.customEnd}T00:00:00`);
    const days = Math.max(1, Math.min(30, Math.round((end - start) / 86400000) + 1));
    const base = metricData['7d'];
    const factor = days / 7;
    const scale = (item) => ({ plays: Math.round(item.plays * factor), likes: Math.round(item.likes * factor), comments: Math.round(item.comments * factor), shares: Math.round(item.shares * factor), complete: item.complete, income: Math.round(item.income * factor) });
    return { label: `${state.customStart} 至 ${state.customEnd}`, overall: scale(base.overall), works: Object.fromEntries(Object.entries(base.works).map(([id, item]) => [id, scale(item)])) };
  }
  return metricData[state.range] || metricData['7d'];
}

function chartSvg() {
  const data = trendData[state.range === 'custom' ? '7d' : state.range] || trendData['7d'];
  const values = data.map((item) => state.trend === 'plays' ? item.plays : item.income);
  const max = Math.max(...values, 1);
  const width = 360;
  const height = 148;
  const points = values.map((value, index) => `${(index / Math.max(1, values.length - 1)) * width},${height - (value / max) * 125 - 6}`).join(' ');
  const areaPoints = `0,${height} ${points} ${width},${height}`;
  const color = state.trend === 'plays' ? '#161823' : '#fe2c55';
  return `<svg class="h5-chart" viewBox="0 0 ${width} ${height}" preserveAspectRatio="none"><defs><linearGradient id="h5-area" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="${color}" stop-opacity=".15"/><stop offset="1" stop-color="${color}" stop-opacity="0"/></linearGradient></defs><line x1="0" y1="25" x2="360" y2="25" stroke="#f0f0f0" stroke-dasharray="3 3"/><line x1="0" y1="75" x2="360" y2="75" stroke="#f0f0f0" stroke-dasharray="3 3"/><line x1="0" y1="125" x2="360" y2="125" stroke="#f0f0f0" stroke-dasharray="3 3"/><polygon points="${areaPoints}" fill="url(#h5-area)"/><polyline points="${points}" fill="none" stroke="${color}" stroke-width="2.3" stroke-linejoin="round" stroke-linecap="round"/>${values.map((value, index) => `<circle cx="${(index / Math.max(1, values.length - 1)) * width}" cy="${height - (value / max) * 125 - 6}" r="2.6" fill="white" stroke="${color}" stroke-width="1.7"/>`).join('')}</svg>`;
}

function renderAuth() {
  // 产品交互注释：登录成功后自动关联天天学 App 账号并读取 App 名称，无需填写创作者昵称；该规则不在真实登录页展示。
  return `<div class="h5-app is-auth"><main class="h5-auth"><div class="auth-brand"><span class="brand-mark">T</span><div><strong>天天学</strong><small>CREATOR CENTER</small></div></div><div class="auth-intro"><h1>登录创作者中心</h1><p>手机号验证码登录，新用户登录后将自动注册创建账号。</p></div><form class="auth-form" onsubmit="return false"><div class="field"><label class="field-label">手机号</label><input class="field-control" inputmode="numeric" maxlength="11" placeholder="请输入手机号" value="${esc(state.authForm.phone)}" data-auth-field="phone" /></div><div class="field"><label class="field-label">验证码</label><div class="code-row"><input class="field-control" inputmode="numeric" maxlength="6" placeholder="请输入验证码" value="${esc(state.authForm.code)}" data-auth-field="code" /><button class="code-button" data-action="auth-code" ${state.codeSent ? 'disabled' : ''}>${state.codeSent ? '已发送' : '获取验证码'}</button></div></div><label class="auth-agree"><input type="checkbox" ${state.authForm.agreed ? 'checked' : ''} data-auth-field="agreed" /><span>我已阅读并同意 <a href="#" data-action="open-agreement">《创作者版权协议》</a>、<a href="#" data-action="open-privacy">《用户隐私声明xxx》</a></span></label><button class="primary-btn" data-action="auth-submit">登录并继续</button></form><div class="auth-note">天天学创作者中心 · 本地 Demo<br />不会提交真实身份、银行卡或验证码信息</div></main>${state.sheet === 'agreement' || state.sheet === 'privacy' ? renderSheet() : ''}</div>`;
}

function topbar(title, right = '') {
  return `<header class="h5-topbar"><h1>${title}</h1><div>${right}</div></header>`;
}

function bottomNav() {
  return `<nav class="h5-bottom-nav"><button class="bottom-item ${state.activeView === 'works' ? 'active' : ''}" data-view="works"><span>▤</span>作品管理</button><button class="bottom-item ${state.activeView === 'data' ? 'active' : ''}" data-view="data"><span>⌁</span>数据中心</button><button class="bottom-item ${state.activeView === 'settings' ? 'active' : ''}" data-view="settings"><span>◎</span>账号设置</button></nav>`;
}

function renderWorks() {
  return `${topbar('作品管理', '<button class="topbar-action" data-action="logout">退出</button>')}<main class="h5-main"><div class="page-intro"><h2>作品管理</h2><p>上传和管理作品，请前往天天学 App 完成。</p></div><section class="works-hint"><div class="works-hint-icon">▤</div><h2>请前往天天学 App</h2><p>打开「我的 · 个人中心」，即可进行作品上传、编辑、下架和审核管理。</p><button class="secondary-btn" data-action="app-hint">查看操作说明</button></section><section class="h5-panel"><div class="h5-panel-head"><b>创作提醒</b><span>同步说明</span></div><div class="notice-card"><strong>作品管理暂不在 H5 端开放</strong>为了保障上传体验，请使用天天学 App 的「我的 · 个人中心」进行操作。</div></section></main>${bottomNav()}`;
}

function renderDataWithContest() {
  const metrics = metricForRange();
  const overall = metrics.overall;
  const workCards = works.map((work) => {
    const item = metrics.works[work.id] || { plays: 0, likes: 0, shares: 0, comments: 0, complete: 0, income: 0 };
    const interaction = item.plays ? ((item.likes + item.shares + item.comments) / item.plays * 100).toFixed(1) : '0.0';
    const incomeAction = state.range === 'today' ? ' data-action="today-income"' : '';
    return `<article class="h5-work-card"><header class="h5-work-head"><div class="h5-work-cover ${work.color}">${work.id === 1 ? '✦' : work.id === 2 ? '◐' : '☼'}</div><div class="h5-work-title"><b>${work.title}</b>${work.vip ? '<span class="vip-tag">付费VIP</span>' : ''}</div></header><div class="h5-primary-metrics"><div><strong>${formatCount(item.plays)}</strong><span>播放</span></div><div><strong>${formatCount(item.likes)}</strong><span>点赞</span></div><div><strong>${formatCount(item.comments)}</strong><span>评论</span></div><div><strong>${formatCount(item.shares)}</strong><span>分享</span></div></div><div class="h5-secondary-metrics"><div><span>完播率</span><em>${item.complete}%</em></div><div><span>互动率</span><em>${interaction}%</em></div><div><span>付费观看时长</span><em>${watchHours(item.watchHours || item.plays / 50)}</em></div><div${incomeAction}><span>预估收益</span><em>${estimatedIncome(item.income)}</em></div></div></article>`;
  }).join('');
  const incomeAction = state.range === 'today' ? ' data-action="today-income"' : '';
  return `${topbar('数据中心', '<small>更新于 8/31 17:30</small>')}<main class="h5-main"><section class="h5-contest"><div class="h5-contest-top"><div class="h5-contest-identity"><b>${esc(state.creator.name)}</b><span>小学组 · 科学</span></div><a class="h5-contest-link" href="#" data-action="ranking">大赛排名　›</a></div><div class="h5-contest-ranks"><div><small>赛道排名</small><strong>第 18 <em>名</em></strong></div><div><small>全局排名</small><strong>第 126 <em>名</em></strong></div></div></section><section class="h5-panel"><div class="h5-panel-head h5-panel-head-stack"><div class="h5-panel-title-row"><b>作品数据</b><span>${metrics.label}</span></div><div class="h5-presets h5-presets-scroll">${[['today','今日'],['yesterday','昨日'],['7d','7天'],['30d','30天'],['custom','自定义']].map(([key,label]) => `<button class="${state.range === key ? 'active' : ''}" data-action="set-range" data-range="${key}">${label}</button>`).join('')}</div>${state.range === 'custom' ? `<div class="h5-custom-range"><label>开始日期<input type="date" value="${state.customStart}" data-date-field="customStart" max="${state.customEnd}" /></label><label>结束日期<input type="date" value="${state.customEnd}" data-date-field="customEnd" min="${state.customStart}" max="2026-08-31" /></label></div>` : ''}</div><div class="h5-primary-metrics"><div><strong>${formatCount(overall.plays)}</strong><span>播放</span></div><div><strong>${formatCount(overall.likes)}</strong><span>点赞</span></div><div><strong>${formatCount(overall.comments)}</strong><span>评论</span></div><div><strong>${formatCount(overall.shares)}</strong><span>分享</span></div></div><div class="h5-secondary-metrics"><div><span>完播率</span><em>${overall.complete}%</em></div><div><span>互动率</span><em>${((overall.likes + overall.shares + overall.comments) / overall.plays * 100).toFixed(1)}%</em></div><div><span>付费观看时长</span><em>${watchHours(overall.watchHours || overall.plays / 50)}</em></div><div${incomeAction}><span>预估收益</span><em>${estimatedIncome(overall.income)}</em></div></div></section><section class="h5-panel"><div class="h5-panel-head"><b>数据趋势</b><div class="h5-presets"><button class="${state.trend === 'plays' ? 'active' : ''}" data-action="set-trend" data-trend="plays">播放</button><button class="${state.trend === 'income' ? 'active' : ''}" data-action="set-trend" data-trend="income">收益</button></div></div><p class="h5-trend-meta">${metrics.label} · ${state.trend === 'plays' ? '每日播放量' : '每日收益'}</p><div class="h5-chart-wrap">${chartSvg()}</div></section><section class="h5-panel"><div class="h5-panel-head"><b>单作品数据</b><span>${works.length} 个作品 · ${metrics.label}</span></div><div class="h5-work-list">${workCards}</div></section></main>${bottomNav()}`;
}

function renderData() {
  const notice = state.creator.contractStatus === 'pending' ? '<div class="notice-card contract-notice"><strong>创作者签约待完成</strong>已向您的登录手机号发送创作者签约短信，请及时查看并在30日内完成电子签约，未及时签约将影响收入分成。</div>' : '';
  return renderDataWithContest().replace(/<section class="h5-contest">[\s\S]*?<\/section><section class="h5-panel">/, '<section class="h5-panel">').replace('<main class="h5-main">', `<main class="h5-main">${notice}`).replace(/<div><span>付费观看时长<\/span><em>.*?<\/em><\/div>/, '');
}

function renderSettings() {
  const bankValue = state.creator.bank ? '已绑定' : '未绑定';
  const identityValue = state.creator.verified && state.creator.identity ? `${maskIdentityName(state.creator.identity.name)} ${maskIdentityNumber(state.creator.identity.idNumber)}` : idStatusLabel();
  return `${topbar('账号设置', '<button class="topbar-action" data-action="logout">退出</button>')}<main class="h5-main"><section class="profile-card"><div class="profile-avatar">${esc(state.creator.name.slice(0, 1))}</div><div><strong>${esc(state.creator.name)}</strong><small>${formatPhone(state.creator.phone)} · 创作者账号</small></div></section><section class="earnings-card"><div class="earnings-top"><span>分成收益</span><button class="earnings-link" data-action="open-earnings-rules">创作者激励　›</button></div><div class="earnings-value">${rmbFixed(state.earnings.gross)}</div><div class="earnings-estimate">预估税后+${rmbFixed(state.earnings.estimatedAfterTax)}</div><div class="earnings-foot"><span>结算中${rmbFixed(state.earnings.settling)}</span><button data-action="open-earnings-history">历史收益</button></div></section><section class="settings-group"><div class="settings-label">账号资料</div><div class="h5-list"><button class="setting-row" data-action="edit-nickname"><span class="row-left"><span class="row-icon">✎</span><span class="row-title">昵称</span></span><span class="row-value">${esc(state.creator.name)} <span class="chevron">›</span></span></button><button class="setting-row" data-action="edit-phone"><span class="row-left"><span class="row-icon">☎</span><span class="row-title">绑定手机号</span></span><span class="row-value">${formatPhone(state.creator.phone)} <span class="chevron">›</span></span></button></div></section><section class="settings-group"><div class="settings-label">身份与收款</div><div class="h5-list"><button class="setting-row" data-action="open-identity"><span class="row-left"><span class="row-icon">✓</span><span class="row-title">实名认证</span></span><span class="row-value"><span class="inline-status ${state.creator.verified ? 'success' : state.creator.isMinor ? 'danger' : 'warning'}">${idStatusLabel()}</span><span class="chevron">›</span></span></button><button class="setting-row" data-action="edit-bank"><span class="row-left"><span class="row-icon">¥</span><span class="row-title">绑定银行卡</span></span><span class="row-value">${esc(bankValue)} <span class="chevron">›</span></span></button></div></section><section class="settings-group"><div class="settings-label">安全与协议</div><div class="h5-list"><button class="setting-row" data-action="open-agreement"><span class="row-left"><span class="row-icon">§</span><span class="row-title">创作者版权协议</span></span><span class="row-value">已同意 <span class="chevron">›</span></span></button><button class="setting-row" data-action="logout"><span class="row-left"><span class="row-icon">↪</span><span class="row-title">退出登录</span></span><span class="chevron">›</span></button></div></section></main>${bottomNav()}`;
}

function renderSettingsV2() {
  const bankValue = state.creator.bank ? '已绑定' : '未绑定';
  const identityValue = state.creator.verified && state.creator.identity ? `${maskIdentityName(state.creator.identity.name)} ${maskIdentityNumber(state.creator.identity.idNumber)} · 点击查看` : idStatusLabel();
  const contractNotice = state.creator.platformRegistered ? '<div class="notice-card contract-notice"><strong>重要提醒！</strong>已向登录手机号发送创作者签约短信，请及时查看并在30日内完成电子签约，未及时签约将影响收入分成。</div>' : '';
  return `${topbar('账号设置', '<button class="topbar-action" data-action="logout">退出</button>')}<main class="h5-main"><section class="profile-card"><div class="profile-avatar">${esc(state.creator.name.slice(0, 1))}</div><div><strong>${esc(state.creator.name)}</strong><small>${formatPhone(state.creator.phone)} · 已关联天天学 App</small></div></section>${contractNotice}<section class="earnings-card"><div class="earnings-top"><span>分成收益</span><button class="earnings-link" data-action="open-earnings-rules">创作者激励　›</button></div><div class="earnings-value">${rmbFixed(state.earnings.gross)}</div><div class="earnings-estimate">预估税后+${rmbFixed(state.earnings.estimatedAfterTax)}</div><div class="earnings-foot"><span>结算中${rmbFixed(state.earnings.settling)}</span><button data-action="open-earnings-history">历史收益</button></div></section><section class="settings-group"><div class="settings-label">账号资料</div><div class="h5-list"><button class="setting-row" data-action="edit-nickname"><span class="row-left"><span class="row-icon">✎</span><span class="row-title">昵称</span></span><span class="row-value">${esc(state.creator.name)} <span class="chevron">›</span></span></button><button class="setting-row" data-action="edit-phone"><span class="row-left"><span class="row-icon">☎</span><span class="row-title">绑定手机号</span></span><span class="row-value">${formatPhone(state.creator.phone)} <span class="chevron">›</span></span></button></div></section><section class="settings-group"><div class="settings-label">身份与收款</div><div class="h5-list"><button class="setting-row" data-action="open-identity"><span class="row-left"><span class="row-icon">✓</span><span class="row-title">实名认证</span></span><span class="row-value"><span class="inline-status ${state.creator.verified ? 'success' : state.creator.isMinor ? 'danger' : 'warning'}">${esc(identityValue)}</span><span class="chevron">›</span></span></button><button class="setting-row" data-action="edit-bank"><span class="row-left"><span class="row-icon">¥</span><span class="row-title">绑定银行卡</span></span><span class="row-value">${esc(bankValue)} <span class="chevron">›</span></span></button></div></section><section class="settings-group"><div class="settings-label">安全与协议</div><div class="h5-list"><button class="setting-row" data-action="open-agreement"><span class="row-left"><span class="row-icon">§</span><span class="row-title">创作者版权协议</span></span><span class="row-value">已同意 <span class="chevron">›</span></span></button><button class="setting-row" data-action="open-privacy"><span class="row-left"><span class="row-icon">i</span><span class="row-title">用户隐私声明xxx</span></span><span class="chevron">›</span></button><button class="setting-row" data-action="logout"><span class="row-left"><span class="row-icon">↪</span><span class="row-title">退出登录</span></span><span class="chevron">›</span></button></div></section></main>${bottomNav()}`;
}

function renderSettingsEarningsCard() {
  const locked = !state.creator.verified || state.creator.isMinor || !state.creator.bank || !state.creator.platformRegistered;
  if (locked) return `<section class="earnings-card earnings-locked" data-action="open-onboarding"><div class="earnings-top"><span>分成收益</span><span class="earnings-lock-icon">🔒</span></div><div class="earnings-locked-title">完成认证解锁收益分成</div><div class="earnings-foot"><span>当前无法结算打款</span><span class="earnings-locked-link">点击继续 ›</span></div></section>`;
  return `<section class="earnings-card"><div class="earnings-top"><span>分成收益</span><button class="earnings-link" data-action="open-earnings-rules">创作者激励　›</button></div><div class="earnings-value">${rmbFixed(state.earnings.gross)}</div><div class="earnings-estimate">预估税后+${rmbFixed(state.earnings.estimatedAfterTax)}</div><div class="earnings-foot"><span>结算中${rmbFixed(state.earnings.settling)}</span><button data-action="open-earnings-history">历史收益</button></div></section>`;
}

function renderSettingsV3() {
  return renderSettingsV2().replace(/<section class="earnings-card">[\s\S]*?<\/section>/, renderSettingsEarningsCard());
}

function renderWithdrawal() {
  const withdraw = state.withdrawal;
  const notice = state.creator.isMinor
    ? '<div class="notice-card"><strong>未成年人暂不支持自主提现</strong>请联系客服了解监护人处理方式。<br/><button class="link-btn" data-action="open-identity">去查看实名认证 ›</button></div>'
    : !state.creator.verified
      ? '<div class="notice-card"><strong>请先完成实名认证</strong>完成境内身份证有效性和年龄校验后才可提现。<br/><button class="link-btn" data-action="open-identity">去查看实名认证 ›</button></div>'
      : !state.creator.bank
        ? '<div class="notice-card"><strong>请先绑定银行卡</strong>提现到账需要使用已完成实名校验的银行卡。<br/><button class="link-btn" data-action="edit-bank">去绑定银行卡 ›</button></div>'
        : '';
  const timeline = withdraw.timeline.map((item) => `<div class="timeline-item"><div class="timeline-dot ${item.tone === 'done' ? 'done' : ''}">✓</div><div class="timeline-text"><b>${esc(item.title)}</b><span>${esc(item.detail)}</span></div></div>`).join('');
  const statusContent = withdraw.status === 'draft'
    ? '<div class="empty-card">尚未提交提现申请<br/><span class="muted">完成实名认证和银行卡绑定后即可提交。</span></div>'
    : `<div class="detail-lines"><div class="detail-line"><span>申请金额</span><span class="price">${money(withdraw.amount)}</span></div><div class="detail-line"><span>收款银行卡</span><span>${state.creator.bank ? esc(state.creator.bank.bankName) + ' · 尾号 ' + state.creator.bank.last4 : '未绑定'}</span></div></div><div class="timeline">${timeline}</div>${withdraw.status === 'pending_review' ? '<button class="primary-btn blue" data-action="simulate-approve">模拟审核通过</button>' : ''}${withdraw.status === 'processing' ? '<button class="primary-btn blue" data-action="simulate-paid">模拟支付成功并对账</button>' : ''}`;
  return `${topbar('提现结算', '<button class="topbar-action" data-action="back-settings">返回</button>')}<main class="h5-main"><div class="page-intro"><h2>提现结算</h2><p>查看收益并追踪提现到账状态。</p></div><section class="earnings-card"><div class="earnings-top"><span>可提现收益</span><span>实时余额</span></div><div class="earnings-value">${money(state.earnings.available)}</div><div class="earnings-foot"><span>累计收益 ${money(state.earnings.total)}</span><button data-action="open-withdraw-form">提交提现</button></div></section>${notice}<section class="h5-panel"><div class="h5-panel-head"><b>提现状态</b>${statusTag(withdraw.status)}</div>${statusContent}</section></main>`;
}

function renderApp() {
  const views = { works: renderWorks, data: renderData, settings: renderSettingsV3, withdrawal: renderWithdrawal };
  return `<div class="h5-app">${views[state.activeView] ? views[state.activeView]() : renderWorks()}${renderSheet()}</div>`;
}

function renderSheet() {
  if (!state.sheet) return '';
  const sheetBody = {
    agreement: renderAgreementSheet,
    privacy: renderPrivacySheet,
    earningsRules: renderEarningsRulesSheet,
    earningsHistory: renderEarningsHistorySheet,
    nickname: renderNicknameSheet,
    phone: renderPhoneSheet,
    identity: renderIdentitySheet,
    identityCheck: renderIdentityCheckSheet,
    bank: renderBankSheet,
    withdrawal: renderWithdrawSheet
  }[state.sheet];
  return `<div class="drawer-mask" data-action="close-sheet"><section class="h5-sheet">${sheetBody ? sheetBody() : ''}</section></div>`;
}

function sheetHead(title, subtitle = '') { return `<div class="sheet-head"><div><h3>${title}</h3>${subtitle ? `<p>${subtitle}</p>` : ''}</div><button class="sheet-close" data-action="close-sheet">×</button></div>`; }
function renderAgreementSheet() { return `${sheetHead('创作者版权协议')}<div class="sheet-note" style="background:#fff">一、创作者保证上传、发布及参与激励的内容拥有合法、完整、有效的著作权或已取得必要授权。<br/><br/>二、创作者不得上传侵犯他人知识产权、肖像权、隐私权或其他合法权益的内容。<br/><br/>三、平台有权对内容进行审核，并对违规内容采取下架、限流、取消激励或终止合作等措施。<br/><br/>四、创作者应配合平台进行实名、未成年人保护和收益结算相关的合规核验。</div><div class="sheet-actions"><button class="primary-btn" data-action="close-sheet">返回登录</button></div>`; }
function renderPrivacySheet() { return `${sheetHead('用户隐私声明xxx')}<div class="sheet-note" style="background:#fff">平台将基于手机号验证码关联天天学 App 账号，并在获得授权后读取 App 名称。实名认证、银行卡和收益结算信息仅用于作品分发、收益结算及合规校验。</div><div class="sheet-actions"><button class="primary-btn" data-action="close-sheet">返回登录</button></div>`; }
function renderEarningsRulesSheet() { return `${sheetHead('收益核算规则', '创作者激励收益的计算与结算说明')}<div class="detail-lines"><div class="detail-line"><span>收益来源</span><span>会员拉新分成、付费视频播放分成等</span></div><div class="detail-line"><span>统计周期</span><span>上月 25 日至本月 24 日</span></div><div class="detail-line"><span>数据更新时间</span><span>次日 10:00 更新前一日收益</span></div><div class="detail-line"><span>收益回退</span><span>订单退费、视频下架等情况，收益自动回退</span></div><div class="detail-line"><span>结算打款</span><span>公民需合法纳税，系统将在次月 15 日前将税后收入打款至绑定银行卡。</span></div></div><div class="sheet-note" style="margin-top:15px">分成收益以平台最终结算账单为准，税前收益和税后实际打款金额会在历史收益中分别展示。</div><div class="sheet-actions"><button class="primary-btn blue" data-action="close-sheet">我知道了</button></div>`; }
function renderEarningsHistorySheet() {
  const records = [
    { date: '2026-08-31', updatedAt: '2026-09-01', title: '2026 年 08 月内容分成', status: 'settling', statusText: '结算中', beforeTax: 962.00 },
    { date: '2026-07-31', updatedAt: '2026-08-01', title: '2026 年 07 月内容分成', status: 'paid', statusText: '已打款', beforeTax: 738.00 },
    { date: '2026-06-30', updatedAt: '2026-07-01', title: '2026 年 06 月内容分成', status: 'exception', statusText: '打款异常', beforeTax: 816.50 },
    { date: '2026-05-31', updatedAt: '2026-06-01', title: '2026 年 05 月内容分成', status: 'paid', statusText: '已打款', beforeTax: 684.00 },
    { date: '2026-03-31', updatedAt: '2026-04-01', title: '2026 年 03 月内容分成', status: 'paid', statusText: '已打款', beforeTax: 612.00 }
  ];
  const rmb = (value) => `￥${Number(value).toFixed(2)}`;
  const today = new Date('2026-10-19T00:00:00');
  const rangeStart = state.historyRange === '6m' ? new Date('2026-04-19T00:00:00') : state.historyRange === '1y' ? new Date('2025-10-19T00:00:00') : new Date(`${state.historyStart}T00:00:00`);
  const rangeEnd = state.historyRange === 'custom' ? new Date(`${state.historyEnd}T23:59:59`) : today;
  const visibleRecords = records.filter((record) => { const date = new Date(`${record.date}T12:00:00`); return date >= rangeStart && date <= rangeEnd; });
  const filters = [['6m', '近半年'], ['1y', '近一年'], ['custom', '自定义']].map(([key, label]) => `<button class="${state.historyRange === key ? 'active' : ''}" data-action="set-history-range" data-history-range="${key}">${label}</button>`).join('');
  const rangePicker = state.historyRange === 'custom' ? `<div class="h5-custom-range"><label>开始日期<input type="date" value="${state.historyStart}" data-history-date="historyStart" max="${state.historyEnd}" /></label><label>结束日期<input type="date" value="${state.historyEnd}" data-history-date="historyEnd" min="${state.historyStart}" max="2026-10-19" /></label></div>` : '';
  const list = visibleRecords.length ? visibleRecords.map((record) => `<div class="settlement-row"><div class="settlement-head"><span class="row-left"><span class="row-icon">¥</span><span><span class="row-title">${record.title}</span><small class="row-sub">更新时间 ${record.updatedAt}</small></span></span><span class="settlement-status ${record.status}">${record.statusText}</span></div><div class="settlement-amounts"><span>税前收益 ${rmb(record.beforeTax)}</span></div></div>`).join('') : '<div class="empty-card">当前时间范围内暂无月分成结算记录</div>';
  return `${sheetHead('历史收益', '结算周期为上月20日至本月19日产生的收益。当前页面仅展示结算的税前收益，实际收入以到账金额为准')}<div class="history-filter"><div class="h5-presets">${filters}</div>${rangePicker}</div><div class="settlement-list">${list}</div>`;
}
function renderNicknameSheet() { return `${sheetHead('修改昵称', '昵称会展示在创作者数据中心和个人主页')}<div class="field"><label class="field-label">新昵称</label><input class="field-control" maxlength="20" value="${esc(state.form.nickname || state.creator.name)}" data-sheet-field="nickname" /></div><div class="sheet-actions"><button class="primary-btn blue" data-action="save-nickname">保存昵称</button></div>`; }
function renderPhoneSheet() { return `${sheetHead('修改绑定手机号', '更换手机号需要完成验证码校验')}<div class="field"><label class="field-label">新手机号</label><input class="field-control" inputmode="numeric" maxlength="11" placeholder="请输入新手机号" value="${esc(state.form.newPhone || '')}" data-sheet-field="newPhone" /></div><div class="field"><label class="field-label">验证码</label><div class="code-row"><input class="field-control" inputmode="numeric" maxlength="6" placeholder="请输入验证码" value="${esc(state.form.code || '')}" data-sheet-field="code" /><button class="code-button" data-action="sheet-code">获取验证码</button></div></div><div class="sheet-actions"><button class="primary-btn blue" data-action="save-phone">确认更换</button></div>`; }
function renderIdentitySheet() {
  const saved = state.creator.identity;
  const editing = state.form.identityEditing || !saved;
  const savedSummary = saved && !editing ? `<div class="identity-mask"><span><b>${maskIdentityName(saved.name)}</b><small>${maskIdentityNumber(saved.idNumber)}</small></span></div>` : `<div class="field"><label class="field-label">姓名</label><input class="field-control" maxlength="20" placeholder="请输入真实姓名" value="${esc(state.form.name || '')}" data-sheet-field="name" /></div><div class="field"><label class="field-label">身份证号</label><input class="field-control" maxlength="18" placeholder="请输入 18 位身份证号" value="${esc(state.form.idNumber || '')}" data-sheet-field="idNumber" /></div>`;
  const consent = editing ? `<label class="identity-consent"><input type="checkbox" ${state.form.identityConsent ? 'checked' : ''} data-sheet-field="identityConsent" /><span>我已阅读并同意《个人信息收集说明》</span></label>` : '';
  const actions = editing ? `<button class="secondary-btn" data-action="skip-onboarding">暂时跳过</button><button class="primary-btn blue" data-action="submit-identity" ${state.form.identityConsent ? '' : 'disabled'}>确认绑定</button>` : '<button class="primary-btn blue" data-action="close-sheet">完成</button>';
  return `${sheetHead('实名认证', '请完成身份认证，认证信息将用于作品分发、收益提现等')}<div class="sheet-note identity-guide">请完成身份认证，认证信息将用于作品分发、收益提现等。<br/><strong>未成年人需请监护人进行实名认证。</strong><br/><strong class="identity-lock-note">实名认证完成后不可修改，实名信息仅可绑定到一个创作者账号中！</strong></div><div class="detail-lines identity-status"><div class="detail-line"><span>证件类型</span><span>境内居民身份证</span></div></div>${savedSummary}${consent}<div class="sheet-actions">${actions}</div>`;
}
function renderIdentityCheckSheet() {
  const result = state.form.identityResult;
  const messages = { invalid: '身份证错误，请检查身份证信息后重新提交。', minor: '识别为未成年人，请由监护人完成实名认证。', employee: '公司规定暂不支持在职员工签约创作者并获取收入，请检查或更换实名信息。' };
  const resultBlock = result && result !== 'pending' ? `<div class="identity-check-result error"><strong>身份校验未通过</strong><span>${messages[result]}</span></div><div class="sheet-actions"><button class="primary-btn blue" data-action="back-to-identity">返回修改身份证信息</button></div>` : `<div class="identity-check-result checking"><strong>正在进行身份信息校验</strong><span>Demo 可选择平台返回结果，模拟真实实名接口校验。</span></div><div class="identity-check-options"><button class="check-option invalid" data-action="identity-check-result" data-identity-result="invalid"><b>身份证错误</b><small>证件信息无法通过校验</small></button><button class="check-option minor" data-action="identity-check-result" data-identity-result="minor"><b>未成年人</b><small>需由监护人进行实名认证</small></button><button class="check-option employee" data-action="identity-check-result" data-identity-result="employee"><b>已在职员工</b><small>暂不支持签约创作者</small></button><button class="check-option pass" data-action="identity-check-result" data-identity-result="pass"><b>校验通过</b><small>自动进入银行卡绑定</small></button></div>`;
  return `${sheetHead('身份信息校验', '正在校验实名信息')}<div class="sheet-note">姓名：${esc(maskIdentityName(state.form.name))}<br/>身份证号：${esc(maskIdentityNumber(state.form.idNumber))}</div>${resultBlock}`;
}
function renderBankSheet() {
  const bankEditing = Boolean(state.creator.bank);
  const platformError = { identity_invalid: '身份证错误，请检查或更换实名信息', bank_mismatch: '银行卡与实名认证信息不匹配，请更换本人银行卡', employee: '公司规定暂不支持在职员工签约创作者并获取收入，请检查或更换实名信息' }[state.form.platformError] || '';
  const bankOptions = ['中国工商银行', '中国建设银行', '中国银行', '招商银行'].map((bank) => `<option value="${bank}" ${state.form.bankName === bank ? 'selected' : ''}>${bank}</option>`).join('');
  const errorBlock = platformError ? `<div class="sheet-error"><strong>创作者注册失败</strong><span>${platformError}</span>${state.form.platformError === 'employee' ? '<button class="link-btn" data-action="reset-identity-from-bank">返回第一步修改身份证信息</button>' : '<button class="link-btn" data-action="retry-bank">重新绑定银行卡</button>'}</div>` : '';
  return `${sheetHead(bankEditing ? '修改银行卡' : '绑定银行卡')}<div class="sheet-note">请绑定本人银行卡。注意：默认每月10日发起打款，如打款过程中修改银行卡可能影响实际到账情况</div>${errorBlock}<div class="field"><label class="field-label">银行</label><select class="field-control" data-sheet-field="bankName"><option value="">请选择银行</option>${bankOptions}</select></div><div class="field"><label class="field-label">支行</label><input class="field-control" placeholder="请输入开户支行名称" value="${esc(state.form.branchName || '')}" data-sheet-field="branchName" /></div><div class="field"><label class="field-label">银行卡号</label><input class="field-control" inputmode="numeric" maxlength="23" placeholder="请输入银行卡号" value="${esc(state.form.cardNumber || '')}" data-sheet-field="cardNumber" /></div><div class="sheet-actions"><button class="secondary-btn" data-action="skip-onboarding">${bankEditing ? '取消修改' : '暂时跳过'}</button><button class="primary-btn blue" data-action="save-bank">确认绑定</button></div><div class="demo-actions"><span>Demo 模拟平台返回：</span><button data-action="simulate-bank-error" data-bank-error="bank_mismatch">不匹配</button></div>`;
}
function renderWithdrawSheet() { const amount = Number(state.form.amount || 0); const error = state.form.amount ? validateWithdraw(amount) : ''; return `${sheetHead('提交提现', '提现前请确认实名认证和收款银行卡')}<div class="earnings-card"><div class="earnings-top"><span>可提现余额</span><span>${money(state.earnings.available)}</span></div><div class="earnings-value" data-withdraw-preview="amount">${money(amount)}</div><div class="earnings-foot"><span>预计到账</span><span data-withdraw-preview="net">${money(amount)}</span></div></div><div class="field" style="margin-top:16px"><label class="field-label">提现金额</label><input class="field-control" inputmode="decimal" placeholder="最低 ¥10" value="${esc(state.form.amount || '')}" data-sheet-field="amount" /><div class="error-text">${error}</div></div><div class="detail-lines"><div class="detail-line"><span>收款银行卡</span><span>${state.creator.bank ? `${esc(state.creator.bank.bankName)} · 尾号 ${state.creator.bank.last4}` : '未绑定'}</span></div><div class="detail-line"><span>平台服务费</span><span style="color:var(--green)">暂不收取</span></div><div class="detail-line"><span>预计到账时间</span><span>1 个工作日</span></div></div><div class="sheet-actions"><button class="primary-btn blue" data-action="submit-withdraw" ${error || !state.form.amount ? 'disabled' : ''}>确认提现</button></div>`; }

function render() {
  $('#app').innerHTML = state.authenticated ? renderApp() : renderAuth();
  renderToast();
}

function handleAction(action, target) {
  switch (action) {
    case 'auth-code': sendCode(); break;
    case 'auth-submit': submitAuth(); break;
    case 'open-agreement': if (state.authenticated) openSheet('agreement'); else { state.sheet = 'agreement'; render(); } break;
    case 'open-privacy': if (state.authenticated) openSheet('privacy'); else { state.sheet = 'privacy'; render(); } break;
    case 'open-identity': openSheet('identity', { name: state.creator.identity?.name || '', idNumber: '', identityEditing: !state.creator.identity }); break;
    case 'open-onboarding': startOnboarding(); break;
    case 'edit-identity': state.form = { name: state.creator.identity?.name || '', idNumber: '', identityEditing: true }; render(); break;
    case 'submit-identity': submitIdentity(); break;
    case 'identity-check-result': finishIdentityCheck(target.dataset.identityResult); break;
    case 'back-to-identity': backToIdentityEdit(); break;
    case 'skip-onboarding': skipOnboardingStep(); break;
    case 'identity-pass': state.sheet = null; verifyIdentity('pass'); break;
    case 'identity-minor': state.sheet = null; verifyIdentity('minor'); break;
    case 'identity-invalid': state.sheet = null; verifyIdentity('invalid'); break;
    case 'edit-nickname': openSheet('nickname', { nickname: state.creator.name }); break;
    case 'edit-phone': break;
    case 'sheet-code': sendCode(); break;
    case 'save-nickname': saveNickname(); break;
    case 'save-phone': savePhone(); break;
    case 'edit-bank': if (!state.creator.verified || state.creator.isMinor || !state.creator.identity) return startOnboarding(); openSheet('bank', state.creator.bank ? { bankName: state.creator.bank.bankName, branchName: state.creator.bank.branchName, cardNumber: '', platformError: '' } : { bankName: '', branchName: '', cardNumber: '', platformError: '' }); break;
    case 'save-bank': saveBank(); break;
    case 'retry-bank': state.form.platformError = ''; render(); break;
    case 'simulate-bank-error': setBankError(target.dataset.bankError); break;
    case 'reset-identity-from-bank': resetIdentityFromBank(); break;
    case 'open-withdrawal': state.activeView = 'withdrawal'; render(); break;
    case 'open-earnings-rules': openSheet('earningsRules'); break;
    case 'open-earnings-history': openSheet('earningsHistory'); break;
    case 'open-withdraw-form': if (!state.creator.verified || state.creator.isMinor) return openSheet('identity'); if (!state.creator.bank) return openSheet('bank'); openSheet('withdrawal'); break;
    case 'submit-withdraw': submitWithdraw(); break;
    case 'simulate-approve': approveWithdraw(); break;
    case 'simulate-paid': completeWithdraw(); break;
    case 'back-settings': setView('settings'); break;
    case 'set-range': state.range = target.dataset.range; render(); break;
    case 'set-trend': state.trend = target.dataset.trend; render(); break;
    case 'today-income': setToast('info', '预估收益暂不可用', '预估收益将在次日更新'); break;
    case 'set-history-range': state.historyRange = target.dataset.historyRange; render(); break;
    case 'app-hint': setToast('info', '请打开天天学 App', '进入「我的 · 个人中心」即可上传和管理作品'); break;
    case 'ranking': setToast('info', '大赛排名', 'Demo 中展示当前赛道第 18 名、全局第 126 名'); break;
    case 'logout': state.authenticated = false; state.authForm = { phone: '', code: '', agreed: false }; state.codeSent = false; state.sheet = null; state.form = {}; state.postLoginPendingIdentity = false; state.onboardingQueue = []; state.onboardingActive = false; render(); setToast('info', '已退出登录', '再次登录会根据当前实名和银行卡状态继续校验'); break;
    case 'close-sheet': state.onboardingActive ? skipOnboardingStep() : closeSheet(); break;
    default: break;
  }
}

document.addEventListener('click', (event) => {
  const viewTarget = event.target.closest('[data-view]');
  if (viewTarget) return setView(viewTarget.dataset.view);
  const actionTarget = event.target.closest('[data-action]');
  if (actionTarget?.classList.contains('drawer-mask') && event.target !== actionTarget) return;
  if (actionTarget) handleAction(actionTarget.dataset.action, actionTarget);
});

document.addEventListener('input', (event) => {
  if (event.target.dataset.authField) updateAuthField(event.target.dataset.authField, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
  if (event.target.dataset.sheetField) { const field = event.target.dataset.sheetField; const value = event.target.type === 'checkbox' ? event.target.checked : field === 'cardNumber' ? event.target.value.replace(/\s/g, '') : field === 'idNumber' ? event.target.value.replace(/\s/g, '').toUpperCase() : event.target.value; if (event.target.type !== 'checkbox') event.target.value = value; state.form[field] = value; if (state.sheet === 'withdrawal') { const amount = Number(state.form.amount || 0); const error = state.form.amount ? validateWithdraw(amount) : ''; const errorNode = document.querySelector('.error-text'); const submit = document.querySelector('[data-action="submit-withdraw"]'); const amountPreview = document.querySelector('[data-withdraw-preview="amount"]'); const netPreview = document.querySelector('[data-withdraw-preview="net"]'); if (errorNode) errorNode.textContent = error; if (amountPreview) amountPreview.textContent = money(amount); if (netPreview) netPreview.textContent = money(amount); if (submit) submit.disabled = Boolean(error || !state.form.amount); } if (state.sheet === 'identity' && field === 'identityConsent') render(); }
});

document.addEventListener('change', (event) => {
  if (event.target.dataset.sheetField) state.form[event.target.dataset.sheetField] = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
  if (event.target.dataset.dateField) { state[event.target.dataset.dateField] = event.target.value; render(); }
  if (event.target.dataset.historyDate) { state[event.target.dataset.historyDate] = event.target.value; render(); }
});

render();
