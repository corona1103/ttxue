const clone = (value) => JSON.parse(JSON.stringify(value));

const works = [
  { id: 1, title: '为什么鸟能飞起来？', reviewStatus: '审核通过', status: '已上架', color: 'orange', vip: false },
  { id: 2, title: '为什么月亮有时候圆有时候不圆？', reviewStatus: '审核中', status: '已上架', color: 'blue', vip: true },
  { id: 3, title: '为什么天空是蓝色的？', reviewStatus: '审核失败', status: '已下架', color: 'green', vip: true }
];

const knowledgeTree = [
  { name: '科学', children: [
    { name: '自然科学', children: [
      { name: '物理', children: [{ name: '力与运动' }, { name: '光与声' }] },
      { name: '天文学', children: [{ name: '月相' }, { name: '宇宙探索' }] }
    ] },
    { name: '生命科学', children: [
      { name: '动物学', children: [{ name: '动物行为' }, { name: '生物适应' }] },
      { name: '植物学', children: [{ name: '植物生长' }, { name: '生态系统' }] }
    ] }
  ] },
  { name: '数学', children: [
    { name: '数与运算', children: [{ name: '数的认识', children: [{ name: '整数与小数' }] }, { name: '四则运算', children: [{ name: '运算规律' }] }] },
    { name: '图形与空间', children: [{ name: '平面图形', children: [{ name: '图形测量' }] }] }
  ] }
];

const visualTagCandidates = ['2D游美', '扁平插画', '3D', '电影调色', '手绘', 'Q版卡通', '国风'];
const topicTagCandidates = ['热血励志', '趣味', '动画剧情', '温馨家庭', '故事演绎', '知识讲解'];

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
  creator: { name: '小王的科学大厅', appName: '小王的科学大厅', phone: '13812345678', contractPhone: '13812345678', verified: false, idStatus: 'unverified', isMinor: false, employee: false, workId: '', identity: null, bank: null, enterprise: null, platformRegistered: false, contractStatus: 'unsigned', payee: '微信 · 小王' },
  managedWorks: [
    { id: 'video-1', title: '为什么鸟能飞起来？', cover: 'orange', coverFileName: 'bird-flight-cover.jpg', videoFileName: 'bird-flight.mp4', createdAt: '2026-11-11T15:19:00', reviewStatus: '审核通过', status: '已上架', knowledgePath: ['科学', '自然科学', '物理', '力与运动'], knowledgeTags: ['空气动力学', '动物科学'], topicTags: ['鸟类', '飞行'], visualTags: ['动画讲解', '实验演示'], stats: { plays: 223, likes: 18, comments: 2, danmaku: 5 }, comments: [{ id: 'comment-1', user: '小小观察员', text: '讲得很清楚，终于理解鸟为什么能飞了！', reply: '' }, { id: 'comment-2', user: '科学小博士', text: '可以再讲讲翅膀的形状吗？', reply: '' }], pinned: false },
    { id: 'video-2', title: '为什么月亮有时候圆有时候不圆？', cover: 'blue', coverFileName: 'moon-cover.jpg', videoFileName: 'moon-phase.mp4', createdAt: '2026-11-10T19:15:00', reviewStatus: '审核中', status: '审核中', knowledgePath: ['科学', '自然科学', '天文学', '月相'], knowledgeTags: ['天文', '月相'], topicTags: ['月亮', '自然观察'], visualTags: ['实拍', '图文讲解'], stats: { plays: 274, likes: 8, comments: 1, danmaku: 3 }, comments: [{ id: 'comment-3', user: '月亮观察员', text: '月相变化的周期是多少？', reply: '' }], pinned: false },
    { id: 'video-3', title: '为什么天空是蓝色的？', cover: 'green', coverFileName: 'sky-cover.jpg', videoFileName: 'blue-sky.mp4', createdAt: '2026-11-09T10:20:00', reviewStatus: '审核失败', status: '审核失败', statusReason: '视频内容需要补充来源说明，请修改后重新提交。', knowledgePath: ['科学', '自然科学', '物理', '光与声'], knowledgeTags: ['光学'], topicTags: ['天空', '颜色'], visualTags: ['实验演示'], stats: { plays: 120, likes: 3, comments: 0, danmaku: 1 }, comments: [], pinned: false },
    { id: 'video-4', title: '为什么鱼能在水里呼吸？', cover: 'blue', coverFileName: 'fish-breath-cover.jpg', videoFileName: 'fish-breath.mp4', createdAt: '2026-11-08T16:40:00', reviewStatus: '审核通过', editReviewStatus: '修改驳回', editReviewReason: '本次修改未通过安全审核，原内容保持不变，可重新编辑。', status: '已上架', knowledgePath: ['科学', '生命科学', '动物学', '动物行为'], knowledgeTags: ['动物呼吸'], topicTags: ['知识讲解', '趣味'], visualTags: ['手绘', '动画讲解'], stats: { plays: 186, likes: 12, comments: 3, danmaku: 4 }, comments: [], pinned: false },
    { id: 'video-5', title: '彩虹是怎样形成的？', cover: 'orange', coverFileName: 'rainbow-cover.jpg', videoFileName: 'rainbow.mp4', createdAt: '2026-11-07T11:25:00', reviewStatus: '审核通过', status: '已上架', knowledgePath: ['科学', '自然科学', '物理', '光与声'], knowledgeTags: ['光的折射'], topicTags: ['趣味', '知识讲解'], visualTags: ['扁平插画', '国风'], stats: { plays: 342, likes: 24, comments: 5, danmaku: 7 }, comments: [], pinned: false },
    { id: 'video-6', title: '植物为什么向着阳光生长？', cover: 'green', coverFileName: 'plant-light-cover.jpg', videoFileName: 'plant-light.mp4', createdAt: '2026-11-06T09:50:00', reviewStatus: '审核通过', status: '已上架', knowledgePath: ['科学', '生命科学', '植物学', '植物生长'], knowledgeTags: ['向光性'], topicTags: ['自然观察', '知识讲解'], visualTags: ['实拍', '实验演示'], stats: { plays: 258, likes: 16, comments: 4, danmaku: 6 }, comments: [], pinned: false },
    { id: 'video-7', title: '月亮为什么会发光？', cover: 'blue', coverFileName: 'moonlight-cover.jpg', videoFileName: 'moonlight.mp4', createdAt: '2026-11-05T14:15:00', reviewStatus: '审核通过', status: '已上架', knowledgePath: ['科学', '自然科学', '天文学', '宇宙探索'], knowledgeTags: ['月光'], topicTags: ['趣味', '自然观察'], visualTags: ['3D', '电影调色'], stats: { plays: 194, likes: 11, comments: 2, danmaku: 3 }, comments: [], pinned: false }
  ],
  collections: [
    { id: 'collection-1', title: '小小科学家·自然探索', cover: 'orange', coverFileName: 'nature-collection.jpg', description: '从身边的自然现象出发，探索科学原理。', videoIds: ['video-1'], paidVideoIds: [] }
  ],
  worksTab: 'videos',
  worksFilter: 'all',
  videoSort: 'latest',
  worksSort: 'latest',
  worksSearch: '',
  collectionDetailId: null,
  commentContentId: null,
  replyCommentId: null,
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

// 从赛事官网“个人中心”入口进入时，默认打开创作者中心的个人账户页并保留 Demo 登录态。
if (window.location.hash === '#settings' || new URLSearchParams(window.location.search).get('view') === 'settings') {
  initialState.authenticated = true;
  initialState.activeView = 'settings';
}

let state = clone(initialState);
const $ = (selector) => document.querySelector(selector);
const esc = (value) => String(value ?? '').replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
const money = (value) => `¥${Number(value || 0).toLocaleString('zh-CN', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
const rmbFixed = (value) => `￥${Number(value || 0).toFixed(2)}`;
const numberText = (value) => Number(value || 0).toLocaleString('zh-CN');
const formatPhone = (value) => value ? `${value.slice(0, 3)} **** ${value.slice(-4)}` : '未绑定';
const idStatusLabel = () => {
  if (state.creator.isMinor || state.creator.idStatus === 'minor') return '未成年';
  if (state.creator.idStatus === 'invalid') return '认证错误';
  return state.creator.idStatus === 'pass' ? '已认证' : '未认证';
};
const idStatusTone = () => state.creator.idStatus === 'pass' ? 'success' : (state.creator.isMinor || state.creator.idStatus === 'minor' || state.creator.idStatus === 'invalid' ? 'danger' : 'warning');
const maskIdentityName = (value) => value ? `${value.slice(0, 1)}${'*'.repeat(Math.max(1, value.length - 1))}` : '未填写';
const maskIdentityNumber = (value) => value ? `${value.slice(0, 2)}******${value.slice(-2)}` : '未填写';
const bankDisplay = () => state.creator.bank ? `${state.creator.bank.bankName} · 尾号 ${state.creator.bank.last4}` : state.creator.enterprise ? '企业主体统一结算' : '未绑定';
const enterpriseDisplay = () => state.creator.enterprise ? `已关联 · ${state.creator.enterprise.name}` : '未关联';

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
  state.collectionDetailId = null;
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
  if (!state.creator.enterprise && (!state.creator.bank || !state.creator.platformRegistered)) state.onboardingQueue.push('bank');
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
    ? { name: state.creator.identity?.name || '', idNumber: '', contractPhone: state.creator.contractPhone || state.creator.phone || '', contractCode: '', contractCodeSent: false, identityEditing: !state.creator.identity, identityConsent: false }
    : { accountType: state.creator.bank?.accountType || 'personal', bankName: state.creator.bank?.bankName || '', branchName: state.creator.bank?.branchName || '', cardNumber: '', platformError: '' };
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

function sendContractCode() {
  const phone = String(state.form.contractPhone || '').replace(/\s/g, '');
  if (!/^1\d{10}$/.test(phone)) return setToast('error', '手机号格式不正确', '请输入 11 位合同手机号后再获取验证码');
  state.form.contractCodeSent = true;
  render();
  setToast('success', '验证码已发送', 'Demo 验证码为 123456，请完成签约手机号校验');
}

function submitAuth() {
  const form = state.authForm;
  if (!form.agreed) return setToast('error', '请先勾选协议', '请阅读并同意《创作者版权协议》和《用户隐私声明xxx》');
  // Demo 登录可跳过真实手机号和验证码输入；真实产品接入手机号验证码服务后再启用接口校验。
  state.creator.phone = form.phone || state.creator.phone || '13812345678';
  if (!state.creator.identity) state.creator.contractPhone = state.creator.phone;
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
  if (result === 'pass' || result === 'employee') {
    state.creator.verified = true;
    state.creator.isMinor = false;
    state.creator.idStatus = 'pass';
    state.creator.employee = result === 'employee';
    if (!state.creator.employee) state.creator.workId = '';
    state.creator.identity = state.creator.identity || {
      name: state.creator.employee ? '内部演示员工' : '外部演示作者',
      idNumber: state.creator.employee ? '110101199001010011' : '110101199001010022'
    };
    state.creator.contractPhone = state.form.contractPhone || state.creator.contractPhone || state.creator.phone;
    const shouldEnterData = state.postLoginPendingIdentity;
    state.postLoginPendingIdentity = false;
    state.sheet = null;
    state.activeView = shouldEnterData ? 'data' : state.activeView;
    setToast('success', '实名认证通过', shouldEnterData ? '认证完成，正在进入数据中心' : '已确认境内居民身份证有效且已满 18 周岁');
  } else if (result === 'minor') {
    state.creator.verified = false;
    state.creator.isMinor = true;
    state.creator.employee = false;
    state.creator.idStatus = 'minor';
    setToast('error', '暂不支持自主提现', '识别为未成年人，请联系客服了解监护人处理方式');
  } else {
    state.creator.verified = false;
    state.creator.isMinor = false;
    state.creator.employee = false;
    state.creator.idStatus = result === 'invalid' ? 'invalid' : 'unverified';
    setToast('error', result === 'invalid' ? '证件校验失败' : '核验服务异常', result === 'invalid' ? '请确认身份证信息和有效期后重新提交' : '当前未完成认证，请稍后重试');
  }
  render();
}

function submitIdentity() {
  const name = String(state.form.name || '').trim();
  const idNumber = String(state.form.idNumber || '').replace(/\s/g, '').toUpperCase();
  const contractPhone = String(state.form.contractPhone || '').replace(/\s/g, '');
  const contractCode = String(state.form.contractCode || '').replace(/\s/g, '');
  if (!state.form.identityConsent) return setToast('error', '请先勾选协议', '请阅读并同意《身份信息核验服务个人信息处理授权协议》');
  if (!/^[^\d\s]+$/.test(name)) return setToast('error', '姓名格式不正确', '姓名不能包含数字或空格');
  if (!/^[0-9A-Z]{18}$/.test(idNumber)) return setToast('error', '身份证号格式不正确', '请输入 18 位数字或字母');
  if (!/^1\d{10}$/.test(contractPhone)) return setToast('error', '合同手机号格式不正确', '请输入 11 位中国大陆手机号');
  if (!state.form.contractCodeSent) return setToast('error', '请先获取验证码', '请向合同手机号发送短信验证码');
  if (!/^\d{6}$/.test(contractCode)) return setToast('error', '验证码格式不正确', '请输入 6 位短信验证码，Demo 验证码为 123456');
  if (contractCode !== '123456') return setToast('error', '验证码错误', 'Demo 验证码为 123456，请重新输入');
  state.form = { name, idNumber, contractPhone, contractCode, contractCodeSent: true, identityResult: 'pending', identityConsent: true };
  state.sheet = 'identityCheck';
  render();
}

function finishIdentityCheck(result) {
  const name = state.form.name;
  const idNumber = state.form.idNumber;
  if (result === 'pass' || result === 'employee') {
    state.creator.identity = { name, idNumber };
    state.creator.contractPhone = state.form.contractPhone || state.creator.phone;
    state.creator.verified = true;
    state.creator.isMinor = false;
    state.creator.idStatus = 'pass';
    state.creator.employee = result === 'employee';
    if (!state.creator.employee) state.creator.workId = '';
    setToast('success', '实名认证通过', '实名认证信息已保存，自动进入银行卡绑定');
    if (state.onboardingActive) nextOnboardingStep();
    else openSheet('bank', { accountType: 'personal', bankName: '', branchName: '', cardNumber: '', platformError: '' });
    return;
  }
  state.creator.verified = false;
  state.creator.isMinor = result === 'minor';
  state.creator.employee = false;
  state.creator.idStatus = result === 'minor' ? 'minor' : 'invalid';
  state.form.identityResult = result;
  render();
}

function backToIdentityEdit() {
  state.sheet = 'identity';
  state.form = { name: state.form.name || '', idNumber: state.form.idNumber || '', contractPhone: state.form.contractPhone || state.creator.contractPhone || state.creator.phone || '', contractCode: state.form.contractCode || '', contractCodeSent: Boolean(state.form.contractCodeSent), identityEditing: true, identityConsent: Boolean(state.form.identityConsent) };
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
  // Demo 交互不做真实银行卡校验：直接点击“确认绑定”即可完成演示。
  const bankName = String(state.form.bankName || '').trim() || '中国工商银行';
  const branchName = String(state.form.branchName || '').trim() || '好未来演示支行';
  const cardNumber = String(state.form.cardNumber || '').replace(/\s/g, '') || '6217000000000000';
  const accountType = state.form.accountType === 'corporate' ? 'corporate' : 'personal';
  state.creator.bank = { accountType, bankName, branchName, last4: cardNumber.slice(-4) };
  state.creator.platformRegistered = true;
  state.creator.contractStatus = 'pending';
  state.form.platformError = '';
  setToast('success', accountType === 'corporate' ? '对公账户绑定成功' : '个人账户绑定成功', '已向您的登录手机号发送创作者签约短信，请及时查看并在30日内完成电子签约，未及时签约将影响收入分成');
  if (state.onboardingActive) nextOnboardingStep();
  else closeSheet();
}

function linkEnterprise() {
  const account = String(state.form.enterpriseAccount || '').trim();
  const name = String(state.form.enterpriseName || '').trim() || '好未来教育科技有限公司';
  if (!account) return setToast('error', '请输入企业账号', '请输入企业账号或统一社会信用代码');
  state.creator.enterprise = { account, name };
  state.creator.platformRegistered = true;
  state.creator.contractStatus = 'signed';
  closeSheet();
  setToast('success', '企业认证关联成功', '个人收益将汇总到企业主体统一打款');
}

function demoLinkEnterprise() {
  state.creator.enterprise = { account: 'DEMO-ENTERPRISE-001', name: '好未来教育科技有限公司' };
  state.creator.platformRegistered = true;
  state.creator.contractStatus = 'signed';
  closeSheet();
  setToast('success', '企业认证关联成功', '个人收益将汇总到企业主体统一打款');
}

function setBankError(code) {
  state.form.platformError = code;
  render();
}

function resetIdentityFromBank() {
  state.onboardingActive = true;
  state.onboardingQueue = ['bank'];
  state.sheet = 'identity';
  state.form = { name: '', idNumber: '', contractPhone: state.creator.contractPhone || state.creator.phone || '', contractCode: '', contractCodeSent: false, identityEditing: true, identityConsent: false };
  render();
}

function validateWithdraw(amount) {
  if (!state.creator.verified || state.creator.isMinor) return '请先完成实名认证且确认非未成年人';
  if (!Number.isFinite(amount) || amount <= 0) return '请输入提现金额';
  if (amount < 10) return '最低提现金额为 ¥10';
  if (amount > state.earnings.available) return '提现金额不能超过可提现余额';
  if (!state.creator.enterprise && !state.creator.bank) return '请先绑定银行卡';
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

function renderDemoToolbar() {
  const mode = !state.authenticated ? '未登录' : state.creator.employee ? '内部员工已登录' : state.creator.verified ? '外部人员已登录' : '未实名认证';
  return `<aside class="demo-toolbar" aria-label="产品演示状态"><span class="demo-toolbar-label">Demo 状态（仅供演示）：${mode}</span><div class="demo-toolbar-actions"><button data-action="demo-logout">退出登录</button><button data-action="demo-internal-login">内部员工已登录</button><button data-action="demo-external-login">外部人员已登录</button><button data-action="demo-unverified-login">未认证</button></div></aside>`;
}

function renderAuth() {
  // 产品交互注释：登录成功后自动关联天天学 App 账号并读取 App 名称，无需填写创作者昵称；该规则不在真实登录页展示。
  return `<div class="h5-app is-auth">${renderDemoToolbar()}<main class="h5-auth"><div class="auth-brand"><span class="brand-mark">T</span><div><strong>天天学</strong><small>CREATOR CENTER</small></div></div><div class="auth-intro"><h1>登录创作者中心</h1><p>手机号验证码登录，新用户登录后将自动注册创建账号。</p></div><form class="auth-form" onsubmit="return false"><div class="field"><label class="field-label">手机号</label><input class="field-control" inputmode="numeric" maxlength="11" placeholder="请输入手机号" value="${esc(state.authForm.phone)}" data-auth-field="phone" /></div><div class="field"><label class="field-label">验证码</label><div class="code-row"><input class="field-control" inputmode="numeric" maxlength="6" placeholder="请输入验证码" value="${esc(state.authForm.code)}" data-auth-field="code" /><button class="code-button" data-action="auth-code" ${state.codeSent ? 'disabled' : ''}>${state.codeSent ? '已发送' : '获取验证码'}</button></div></div><label class="auth-agree"><input type="checkbox" ${state.authForm.agreed ? 'checked' : ''} data-auth-field="agreed" /><span>我已阅读并同意 <a href="#" data-action="open-agreement">《创作者版权协议》</a>、<a href="#" data-action="open-privacy">《用户隐私声明xxx》</a></span></label><button class="primary-btn" data-action="auth-submit">登录并继续</button></form><div class="auth-note">天天学创作者中心 · 本地 Demo<br />不会提交真实身份、银行卡或验证码信息</div></main>${state.sheet === 'agreement' || state.sheet === 'privacy' ? renderSheet() : ''}</div>`;
}

function topbar(title, right = '') {
  return `<header class="h5-topbar"><h1>${title}</h1><div>${right}</div></header>`;
}

function bottomNav() {
  return `<nav class="h5-bottom-nav"><button class="bottom-item ${state.activeView === 'works' ? 'active' : ''}" data-view="works"><span>▤</span>作品管理</button><button class="bottom-item ${state.activeView === 'data' ? 'active' : ''}" data-view="data"><span>⌁</span>数据中心</button><button class="bottom-item ${state.activeView === 'settings' ? 'active' : ''}" data-view="settings"><span>◎</span>账号设置</button></nav>`;
}

function renderWorksLegacy() {
  return `${topbar('作品管理', '<button class="topbar-action" data-action="logout">退出</button>')}<main class="h5-main"><div class="page-intro"><h2>作品管理</h2><p>上传和管理作品，请前往天天学 App 完成。</p></div><section class="works-hint"><div class="works-hint-icon">▤</div><h2>请前往天天学 App</h2><p>打开「我的 · 个人中心」，即可进行作品上传、编辑、下架和审核管理。</p><button class="secondary-btn" data-action="app-hint">查看操作说明</button></section><section class="h5-panel"><div class="h5-panel-head"><b>创作提醒</b><span>同步说明</span></div><div class="notice-card"><strong>作品管理暂不在 H5 端开放</strong>为了保障上传体验，请使用天天学 App 的「我的 · 个人中心」进行操作。</div></section></main>${bottomNav()}`;
}

function renderTagList(tags) {
  return tags?.length ? `<div class="tag-list">${tags.map((tag) => `<span>${esc(tag)}</span>`).join('')}</div>` : '<span class="muted">未配置</span>';
}

function collectionForVideo(videoId) {
  return state.collections.find((collection) => collection.videoIds.includes(videoId));
}

function renderCommentsSheet() {
  const video = state.managedWorks.find((item) => item.id === state.form.commentContentId);
  if (!video) return `${sheetHead('评论详情')}<div class="empty-card">暂无评论</div>`;
  const comments = video.comments || [];
  const list = comments.length ? comments.map((comment) => {
    const replying = state.form.replyCommentId === comment.id;
    return `<article class="comment-item"><div class="comment-head"><b>${esc(comment.user || '用户')}</b><span>作者作品评论</span></div><p>${esc(comment.text)}</p>${comment.reply ? `<div class="comment-reply"><strong>作者回复</strong>${esc(comment.reply)}</div>` : ''}${replying ? `<div class="comment-reply-editor"><input class="field-control" placeholder="回复这条评论" value="${esc(state.form.replyText || '')}" data-sheet-field="replyText" /><button class="primary-btn blue" data-action="save-comment-reply" data-comment-id="${esc(comment.id)}">发送回复</button></div>` : `<button class="link-btn" data-action="reply-comment" data-comment-id="${esc(comment.id)}">${comment.reply ? '修改回复' : '回复'}</button>`}</article>`;
  }).join('') : '<div class="empty-card">暂无评论</div>';
  return `${sheetHead('评论详情', `${esc(video.title)} · ${comments.length} 条评论`)}<div class="comment-list">${list}</div>`;
}

function renderDanmakuSheet() {
  const video = state.managedWorks.find((item) => item.id === state.form.danmakuContentId);
  if (!video) return `${sheetHead('弹幕详情')}<div class="empty-card">暂无弹幕</div>`;
  const danmaku = video.danmakuList || ['这个实验太有意思了！', '原来是这样', '我也观察到过这个现象'];
  const list = danmaku.length ? danmaku.map((text, index) => `<article class="comment-item"><div class="comment-head"><b>弹幕 ${index + 1}</b><span>仅查看</span></div><p>${esc(text)}</p></article>`).join('') : '<div class="empty-card">暂无弹幕</div>';
  return `${sheetHead('弹幕详情', `${esc(video.title)} · ${danmaku.length} 条弹幕`)}<div class="comment-list">${list}</div><div class="sheet-note">弹幕内容仅支持查看，不支持作者操作。</div>`;
}

function saveCommentReply(commentId) {
  const video = state.managedWorks.find((item) => item.id === state.form.commentContentId);
  const comment = video?.comments?.find((item) => item.id === commentId);
  const reply = String(state.form.replyText || '').trim();
  if (!comment || !reply) return setToast('error', '回复不能为空', '请输入回复内容后再发送');
  comment.reply = reply;
  state.form.replyCommentId = null;
  state.form.replyText = '';
  render();
  setToast('success', '回复已发送', '作者回复已展示在评论详情中');
}

function renderCollectionDetail(collectionId) {
  const collection = state.collections.find((item) => item.id === collectionId);
  if (!collection) {
    state.collectionDetailId = null;
    return renderWorksContent();
  }
  const included = collection.videoIds.map((id) => state.managedWorks.find((video) => video.id === id)).filter(Boolean);
  const available = state.managedWorks.filter((video) => video.reviewStatus === '审核通过' && video.status === '已上架' && !collection.videoIds.includes(video.id) && !collectionForVideo(video.id));
  const paid = new Set(collection.paidVideoIds || []);
  const includedHtml = included.length ? included.map((video, index) => `<article class="collection-detail-video"><div class="collection-detail-thumb ${esc(video.cover || 'orange')}">${video.cover === 'blue' ? '◐' : video.cover === 'green' ? '☼' : '✦'}</div><div class="collection-detail-info"><b>${video.pinned ? '📌 ' : ''}${esc(video.title)}</b><span>${esc(video.videoFileName || '未选择视频')}</span><div class="collection-detail-actions"><span class="inline-status ${paid.has(video.id) ? 'warning' : 'success'}">${paid.has(video.id) ? '付费视频' : '免费'}</span><button class="link-btn danger-link" data-action="remove-collection-video" data-content-id="${esc(video.id)}">移出合集</button></div></div><div class="collection-detail-order"><button class="icon-btn" data-action="move-collection-video" data-content-id="${esc(video.id)}" data-direction="up" ${index === 0 ? 'disabled' : ''}>↑</button><button class="icon-btn" data-action="move-collection-video" data-content-id="${esc(video.id)}" data-direction="down" ${index === included.length - 1 ? 'disabled' : ''}>↓</button></div></article>`).join('') : '<div class="empty-card">合集还没有视频，请点击“添加作品”。</div>';
  return `${topbar('合集详情', '<button class="topbar-action" data-action="close-collection-detail">返回作品管理</button>')}<main class="h5-main"><div class="collection-detail-header"><div class="collection-cover large ${esc(collection.cover || 'orange')}">▤</div><div><h2>${esc(collection.title)}</h2><p>${esc(collection.description || '暂无简介')}</p><span class="inline-status success">${included.length} 个视频 · 排他合集</span></div><button class="secondary-btn" data-action="edit-collection" data-content-id="${esc(collection.id)}">编辑合集信息</button></div><section class="h5-panel collection-detail-section"><div class="h5-panel-head collection-detail-section-head"><div><b>合集内作品</b><span>可排序、移出和设置付费</span></div><button class="primary-btn blue collection-add-button" data-action="open-collection-picker" data-content-id="${esc(collection.id)}">＋ 添加作品</button></div><div class="collection-detail-list">${includedHtml}</div></section></main>${bottomNav()}`;
}

function renderCollectionVideoPickerSheet() {
  const collectionId = state.form.collectionPickerCollectionId || state.collectionDetailId;
  const collection = state.collections.find((item) => item.id === collectionId);
  const videos = collection ? state.managedWorks : [];
  const selected = new Set(state.form.collectionPickerSelectedVideoIds || []);
  const selectable = videos.filter((video) => video.reviewStatus === '审核通过' && video.status === '已上架' && !collection.videoIds.includes(video.id) && !collectionForVideo(video.id));
  const options = videos.length ? videos.map((video) => {
    const owner = collectionForVideo(video.id);
    const inCurrent = collection.videoIds.includes(video.id);
    const disabled = inCurrent || video.status === '已下架' || video.reviewStatus !== '审核通过' || video.status !== '已上架' || Boolean(owner && owner.id !== collection.id);
    const reason = inCurrent ? '已在当前合集' : owner && owner.id !== collection.id ? `已加入：${owner.title}` : video.status === '已下架' ? '已下架' : video.reviewStatus !== '审核通过' ? video.reviewStatus : '已上架';
    return `<label class="collection-option ${disabled ? 'is-disabled' : ''}"><input type="checkbox" data-collection-picker-video="${esc(video.id)}" ${selected.has(video.id) || inCurrent ? 'checked' : ''} ${disabled ? 'disabled' : ''} /><div class="collection-option-thumb ${esc(video.cover || 'orange')}">${video.cover === 'blue' ? '◐' : video.cover === 'green' ? '☼' : '✦'}</div><span><b>${esc(video.title)}</b><small>${esc(reason)}</small></span></label>`;
  }).join('') : '<div class="empty-card">暂无作品</div>';
  return `${sheetHead('添加作品到合集', '展示全部视频，已下架或已加入其他合集的作品不可选择')}<div class="collection-options">${options}</div><div class="sheet-actions"><button class="secondary-btn" data-action="close-sheet">取消</button><button class="primary-btn blue" data-action="save-collection-picker" ${selectable.length ? '' : 'disabled'}>确认添加</button></div>`;
}

function renderCollectionPaidPickerSheet() {
  const collectionId = state.form.collectionPaidPickerCollectionId || state.collectionDetailId;
  const collection = state.collections.find((item) => item.id === collectionId);
  const paid = new Set(collection?.paidVideoIds || []);
  const videos = collection?.videoIds.map((id) => state.managedWorks.find((video) => video.id === id)).filter(Boolean) || [];
  const selected = new Set(state.form.collectionPaidSelectedVideoIds || collection?.paidVideoIds || []);
  const options = videos.length ? videos.map((video) => `<label class="collection-option paid-picker-option"><input type="checkbox" data-collection-paid-video="${esc(video.id)}" ${selected.has(video.id) ? 'checked' : ''} /><span><b>${esc(video.title)}</b><small>${selected.has(video.id) ? '已设置为付费视频，可取消勾选恢复免费' : '当前为免费，可设置为付费'}</small></span></label>`).join('') : '<div class="empty-card">合集暂无视频</div>';
  return `${sheetHead('设置付费视频', '可多选合集内的免费作品，确认后批量设置为付费')}<div class="collection-options">${options}</div><div class="sheet-actions"><button class="secondary-btn" data-action="close-sheet">取消</button><button class="primary-btn blue" data-action="save-collection-paid-picker" ${videos.length ? '' : 'disabled'}>确认设置</button></div>`;
}

function renderCollectionDetailActions(html, collectionId) {
  const addButton = `<button class="primary-btn blue collection-add-button" data-action="open-collection-picker" data-content-id="${esc(collectionId)}">＋ 添加作品</button>`;
  const target = `${addButton}</div><div class="collection-detail-list">`;
  const actions = `<div class="collection-detail-header-actions"><button class="secondary-btn collection-add-button" data-action="open-collection-picker" data-content-id="${esc(collectionId)}">＋ 添加作品</button><button class="primary-btn blue collection-add-button" data-action="open-collection-paid-picker" data-content-id="${esc(collectionId)}">设置付费视频</button></div></div><div class="collection-detail-list">`;
  return html.replace(target, actions);
}

function renderManagedVideoCard(video, index) {
  const collection = collectionForVideo(video.id);
  const stats = video.stats || { plays: 0, likes: 0, comments: 0, danmaku: 0 };
  const reviewed = video.reviewStatus === '审核通过';
  const editPending = video.editReviewStatus === '修改审核中';
  const editRejected = video.editReviewStatus === '修改驳回';
  const reviewLabel = editPending ? '修改审核中' : editRejected ? '修改驳回' : video.reviewStatus;
  const reviewTone = editPending || editRejected || video.reviewStatus === '审核失败' ? 'danger' : reviewed ? 'success' : 'warning';
  const statusTone = video.status === '已上架' ? 'success' : video.status === '已下架' ? 'danger' : 'warning';
  const statusBadge = reviewed ? `<span class="inline-status ${statusTone}">${esc(video.status)}</span>` : '';
  const editReviewActions = editRejected ? `<div class="management-review-note danger">修改驳回：${esc(video.editReviewReason || '本次修改未通过安全审核，原内容保持不变，可重新编辑。')}</div>` : '';
  const canManage = video.status !== '已下架' && (reviewed || video.reviewStatus === '审核失败' || editRejected);
  const takedownAction = canManage && video.status === '已上架' ? `<button class="secondary-btn" data-action="simulate-takedown" data-content-id="${esc(video.id)}">模拟下架</button>` : '';
  const deleteAction = `<button class="secondary-btn" data-action="delete-content" data-content-type="video" data-content-id="${esc(video.id)}">删除</button>`;
  const managementActions = canManage ? `<button class="secondary-btn" data-action="edit-video" data-content-id="${esc(video.id)}">编辑属性</button>${takedownAction}<button class="secondary-btn" data-action="toggle-pin" data-content-id="${esc(video.id)}">${video.pinned ? '取消置顶' : '设为置顶'}</button>${deleteAction}` : deleteAction;
  const reasonLabel = video.reviewStatus === '审核失败' ? '驳回理由' : '下架原因';
  const reviewBadge = video.status === '已下架' ? '' : `<span class="inline-status ${reviewTone}">${esc(reviewLabel)}</span>`;
  return `<article class="management-card"><div class="management-card-head"><div class="h5-work-cover ${esc(video.cover || 'orange')}">${video.cover === 'blue' ? '◐' : video.cover === 'green' ? '☼' : '✦'}</div><div class="management-card-title"><b>${video.pinned ? '📌 ' : ''}${esc(video.title)}</b><div class="management-status">${reviewBadge}${statusBadge}</div></div></div><div class="management-file">更新时间：${esc(video.updatedAt || video.createdAt || '刚刚')}</div><div class="management-tags"><div><small>知识点</small>${renderTagList(video.knowledgeTags)}</div><div><small>话题</small>${renderTagList(video.topicTags)}</div><div><small>视觉</small>${renderTagList(video.visualTags)}</div></div><div class="management-metrics"><span>播放 ${numberText(stats.plays)}</span><span>点赞 ${numberText(stats.likes)}</span><button data-action="open-comments" data-content-id="${esc(video.id)}">评论 ${numberText(stats.comments)}</button><button data-action="open-danmaku" data-content-id="${esc(video.id)}">弹幕 ${numberText(stats.danmaku)}</button></div>${collection ? `<div class="management-belong">已加入合集：${esc(collection.title)}</div>` : ''}${video.statusReason ? `<div class="management-review-note">${reasonLabel}：${esc(video.statusReason)}</div>` : ''}${editReviewActions}<div class="management-actions">${managementActions}</div></article>`;
}

function renderManagedCollectionCard(collection, index) {
  const titles = collection.videoIds.map((id) => state.managedWorks.find((video) => video.id === id)?.title).filter(Boolean);
  return `<article class="management-card collection-card"><div class="management-card-head"><div class="collection-cover ${esc(collection.cover || 'orange')}">▤</div><div class="management-card-title"><b>${esc(collection.title)}</b><div class="management-status"><button class="collection-count-link" data-action="open-collection-detail" data-content-id="${esc(collection.id)}">${titles.length} 个视频</button><span>排他合集</span></div></div></div><p class="collection-description">${esc(collection.description || '暂无简介')}</p><div class="management-actions"><button class="secondary-btn" data-action="open-collection-detail" data-content-id="${esc(collection.id)}">查看合集详情</button><button class="secondary-btn" data-action="edit-collection" data-content-id="${esc(collection.id)}">编辑合集</button><button class="secondary-btn" data-action="delete-content" data-content-type="collection" data-content-id="${esc(collection.id)}">解散</button><button class="icon-btn" data-action="move-content" data-content-type="collection" data-content-id="${esc(collection.id)}" data-direction="up" ${index === 0 ? 'disabled' : ''}>↑</button><button class="icon-btn" data-action="move-content" data-content-type="collection" data-content-id="${esc(collection.id)}" data-direction="down" ${index === state.collections.length - 1 ? 'disabled' : ''}>↓</button></div></article>`;
}

function renderWorksContent() {
  const canManageWorks = state.creator.verified && !state.creator.isMinor && state.creator.idStatus === 'pass' && state.creator.identity;
  if (!canManageWorks) {
    return `${topbar('作品管理', '<button class="topbar-action" data-action="logout">退出</button>')}<main class="h5-main"><section class="h5-panel works-auth-guard"><div class="works-auth-guard-icon">🔒</div><h2>暂不能管理作品</h2><p>请去账号设置，先完成实名认证</p><button class="primary-btn blue" data-view="settings">去账号设置</button></section></main>${bottomNav()}`;
  }
  if (state.collectionDetailId) return renderCollectionDetailActions(renderCollectionDetail(state.collectionDetailId), state.collectionDetailId);
  const allVideos = [...(state.managedWorks || [])].sort((a, b) => {
    const pinOrder = Number(Boolean(b.pinned)) - Number(Boolean(a.pinned));
    if (pinOrder) return pinOrder;
    if (state.videoSort === 'plays') return Number(b.stats?.plays || 0) - Number(a.stats?.plays || 0);
    if (state.videoSort === 'likes') return Number(b.stats?.likes || 0) - Number(a.stats?.likes || 0);
    return String(b.createdAt || '').localeCompare(String(a.createdAt || ''));
  });
  const collections = state.collections || [];
  const keyword = String(state.worksSearch || '').trim().toLowerCase();
  const filteredVideos = allVideos.filter((video) => {
    const matchesFilter = state.worksFilter === 'all' || (state.worksFilter === 'published' && video.status === '已上架') || (state.worksFilter === 'pending' && video.reviewStatus === '审核中') || (state.worksFilter === 'rejected' && video.reviewStatus === '审核失败');
    return matchesFilter && (!keyword || `${video.title} ${(video.knowledgeTags || []).join(' ')} ${(video.topicTags || []).join(' ')}`.toLowerCase().includes(keyword));
  });
  const videos = filteredVideos;
  const tabs = `<div class="management-tabs"><button class="${state.worksTab === 'videos' ? 'active' : ''}" data-action="set-works-tab" data-works-tab="videos">作品（${allVideos.length}）</button><button class="${state.worksTab === 'collections' ? 'active' : ''}" data-action="set-works-tab" data-works-tab="collections">作品合集（${collections.length}）</button></div>`;
  const videoFilters = `<div class="management-filters"><select class="filter-control" data-action="set-works-filter"><option value="all" ${state.worksFilter === 'all' ? 'selected' : ''}>全部状态</option><option value="published" ${state.worksFilter === 'published' ? 'selected' : ''}>已发布</option><option value="pending" ${state.worksFilter === 'pending' ? 'selected' : ''}>审核中</option><option value="rejected" ${state.worksFilter === 'rejected' ? 'selected' : ''}>未通过</option></select><select class="filter-control" data-action="set-video-sort"><option value="latest" ${state.videoSort === 'latest' ? 'selected' : ''}>最新发布</option><option value="plays" ${state.videoSort === 'plays' ? 'selected' : ''}>最多播放</option><option value="likes" ${state.videoSort === 'likes' ? 'selected' : ''}>最多点赞</option></select><input class="filter-search" placeholder="搜索作品标题、标签" value="${esc(state.worksSearch || '')}" data-works-search /></div>`;
  const collectionFilters = '';
  const collectionList = collections;
  return `${topbar('作品管理', '<button class="topbar-action" data-action="logout">退出</button>')}<main class="h5-main"><div class="page-intro"><h2>作品管理</h2><p>管理视频作品和合集，配置内容属性并调整展示顺序。</p></div><div class="management-header">${tabs}<div class="management-header-actions"><button class="primary-btn blue" data-action="open-upload-video">＋ 上传视频</button><button class="secondary-btn" data-action="open-new-collection">＋ 新建合集</button></div></div><section class="h5-panel management-section">${state.worksTab === 'videos' ? `${videoFilters}<div class="h5-panel-head"><b>视频作品</b><span>${videos.length} / ${allVideos.length} 个</span></div><div class="management-list">${videos.length ? videos.map(renderManagedVideoCard).join('') : '<div class="empty-card">没有符合条件的视频作品。</div>'}</div>` : `${collectionFilters}<div class="h5-panel-head"><b>作品合集</b><span>${collections.length} 个</span></div><div class="management-list">${collectionList.length ? collectionList.map(renderManagedCollectionCard).join('') : '<div class="empty-card">还没有合集，点击“新建合集”开始创建。</div>'}</div>`}</section></main>${bottomNav()}`;
}

function renderWapShell(content) {
  return content;
}

function renderWorks() {
  return renderWapShell(renderWorksContent());
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
  return renderWapShell(renderDataWithContest().replace(/<section class="h5-contest">[\s\S]*?<\/section><section class="h5-panel">/, '<section class="h5-panel">').replace('<main class="h5-main">', `<main class="h5-main">${notice}`).replace(/<div><span>付费观看时长<\/span><em>.*?<\/em><\/div>/, ''));
}

function renderSettingsBase() {
  const bankValue = bankDisplay();
  const identityValue = state.creator.verified && state.creator.identity ? `${maskIdentityName(state.creator.identity.name)} ${maskIdentityNumber(state.creator.identity.idNumber)}` : idStatusLabel();
  return `${topbar('账号设置', '<button class="topbar-action" data-action="logout">退出</button>')}<main class="h5-main"><section class="profile-card"><div class="profile-avatar">${esc(state.creator.name.slice(0, 1))}</div><div><strong>${esc(state.creator.name)}</strong><small>${formatPhone(state.creator.phone)} · 创作者账号</small></div></section><section class="earnings-card"><div class="earnings-top"><span>分成收益</span><button class="earnings-link" data-action="open-earnings-rules">创作者激励　›</button></div><div class="earnings-value">${rmbFixed(state.earnings.gross)}</div><div class="earnings-estimate">预估税后+${rmbFixed(state.earnings.estimatedAfterTax)}</div><div class="earnings-foot"><span>结算中${rmbFixed(state.earnings.settling)}</span><button data-action="open-earnings-history">历史收益</button></div></section><section class="settings-group"><div class="settings-label">账号资料</div><div class="h5-list"><button class="setting-row" data-action="edit-nickname"><span class="row-left"><span class="row-icon">✎</span><span class="row-title">昵称</span></span><span class="row-value">${esc(state.creator.name)} <span class="chevron">›</span></span></button><button class="setting-row" data-action="edit-phone"><span class="row-left"><span class="row-icon">☎</span><span class="row-title">绑定手机号</span></span><span class="row-value">${formatPhone(state.creator.phone)} <span class="chevron">›</span></span></button></div></section><section class="settings-group"><div class="settings-label">身份与收款</div><div class="h5-list"><button class="setting-row" data-action="open-identity"><span class="row-left"><span class="row-icon">✓</span><span class="row-title">实名认证</span></span><span class="row-value"><span class="inline-status ${state.creator.verified ? 'success' : state.creator.isMinor ? 'danger' : 'warning'}">${idStatusLabel()}</span><span class="chevron">›</span></span></button><button class="setting-row" data-action="edit-bank"><span class="row-left"><span class="row-icon">¥</span><span class="row-title">绑定银行卡</span></span><span class="row-value">${esc(bankValue)} <span class="chevron">›</span></span></button></div></section><section class="settings-group"><div class="settings-label">安全与协议</div><div class="h5-list"><button class="setting-row" data-action="open-agreement"><span class="row-left"><span class="row-icon">§</span><span class="row-title">创作者版权协议</span></span><span class="row-value">已同意 <span class="chevron">›</span></span></button><button class="setting-row" data-action="logout"><span class="row-left"><span class="row-icon">↪</span><span class="row-title">退出登录</span></span><span class="chevron">›</span></button></div></section></main>${bottomNav()}`;
}

function renderSettings() {
  return renderSettingsBase().replace(/历史收益/g, '结算明细');
}

function renderSettingsV2Base() {
  const bankValue = bankDisplay();
  const identityValue = state.creator.verified && state.creator.identity ? `${maskIdentityName(state.creator.identity.name)} ${maskIdentityNumber(state.creator.identity.idNumber)} · 点击查看` : idStatusLabel();
  const contractNotice = state.creator.platformRegistered && state.creator.contractStatus === 'pending' ? '<div class="notice-card contract-notice"><strong>重要提醒！</strong>已向登录手机号发送创作者签约短信，请及时查看并在30日内完成电子签约，未及时签约将影响收入分成。</div>' : '';
  const employeeRow = '';
  return `${topbar('账号设置', '<button class="topbar-action" data-action="logout">退出</button>')}<main class="h5-main"><section class="profile-card"><div class="profile-avatar">${esc(state.creator.name.slice(0, 1))}</div><div><strong>${esc(state.creator.name)}</strong><small>${formatPhone(state.creator.phone)} · 已关联天天学 App</small></div></section>${contractNotice}<section class="earnings-card"><div class="earnings-top"><span>分成收益</span><button class="earnings-link" data-action="open-earnings-rules">创作者激励　›</button></div><div class="earnings-value">${rmbFixed(state.earnings.gross)}</div><div class="earnings-estimate">预估税后+${rmbFixed(state.earnings.estimatedAfterTax)}</div><div class="earnings-foot"><span>结算中${rmbFixed(state.earnings.settling)}</span><button data-action="open-earnings-history">历史收益</button></div></section><section class="settings-group"><div class="settings-label">账号资料</div><div class="h5-list"><button class="setting-row" data-action="edit-nickname"><span class="row-left"><span class="row-icon">✎</span><span class="row-title">昵称</span></span><span class="row-value">${esc(state.creator.name)} <span class="chevron">›</span></span></button><button class="setting-row" data-action="edit-phone"><span class="row-left"><span class="row-icon">☎</span><span class="row-title">绑定手机号</span></span><span class="row-value">${formatPhone(state.creator.phone)} <span class="chevron">›</span></span></button></div></section><section class="settings-group"><div class="settings-label">身份与收款</div><div class="h5-list"><button class="setting-row" data-action="open-identity"><span class="row-left"><span class="row-icon">✓</span><span class="row-title">实名认证</span></span><span class="row-value"><span class="inline-status ${idStatusTone()}">${esc(identityValue)}</span><span class="chevron">›</span></span></button>${employeeRow}<button class="setting-row" data-action="edit-bank"><span class="row-left"><span class="row-icon">¥</span><span class="row-title">绑定银行卡</span></span><span class="row-value">${esc(bankValue)} <span class="chevron">›</span></span></button></div></section><section class="settings-group"><div class="settings-label">安全与协议</div><div class="h5-list"><button class="setting-row" data-action="open-agreement"><span class="row-left"><span class="row-icon">§</span><span class="row-title">创作者版权协议</span></span><span class="row-value">已同意 <span class="chevron">›</span></span></button><button class="setting-row" data-action="open-privacy"><span class="row-left"><span class="row-icon">i</span><span class="row-title">用户隐私声明xxx</span></span><span class="chevron">›</span></button><button class="setting-row" data-action="logout"><span class="row-left"><span class="row-icon">↪</span><span class="row-title">退出登录</span></span><span class="chevron">›</span></button></div></section></main>${bottomNav()}`;
}

function renderSettingsV2() {
  const html = renderSettingsV2Base();
  const enterpriseRow = `<button class="setting-row" data-action="open-enterprise"><span class="row-left"><span class="row-icon">▦</span><span class="row-title">企业认证</span></span><span class="row-value">${esc(enterpriseDisplay())} <span class="chevron">›</span></span></button>`;
  const canEnterprise = state.creator.verified && !state.creator.employee && !state.creator.isMinor;
  const withEnterprise = html.replace(/历史收益/g, '结算明细').replace('</button><button class="setting-row" data-action="edit-bank"', canEnterprise ? `</button>${enterpriseRow}<button class="setting-row" data-action="edit-bank"` : '</button><button class="setting-row" data-action="edit-bank"');
  return state.creator.enterprise ? withEnterprise.replace(/<button class="setting-row" data-action="edit-bank">[\s\S]*?<\/button>/, '') : withEnterprise;
}

function renderSettingsEarningsCard() {
  const locked = !state.creator.verified || state.creator.isMinor || (!state.creator.enterprise && (!state.creator.bank || !state.creator.platformRegistered));
  if (locked) return `<section class="earnings-card earnings-locked" data-action="open-onboarding"><div class="earnings-top"><span>分成收益</span><span class="earnings-lock-icon">🔒</span></div><div class="earnings-locked-title">完成认证解锁收益分成</div><div class="earnings-foot"><span>当前无法结算打款</span><span class="earnings-locked-link">点击继续 ›</span></div></section>`;
  return `<section class="earnings-card"><div class="earnings-top"><span>分成收益</span><button class="earnings-link" data-action="open-earnings-rules">创作者激励　›</button></div><div class="earnings-value">${rmbFixed(state.earnings.gross)}</div><div class="earnings-estimate">预估税后+${rmbFixed(state.earnings.estimatedAfterTax)}</div><div class="earnings-foot"><span>结算中${rmbFixed(state.earnings.settling)}</span><button data-action="open-earnings-history">结算明细</button></div></section>`;
}

function renderSettingsV3() {
  return renderWapShell(renderSettingsV2().replace(/<section class="earnings-card">[\s\S]*?<\/section>/, renderSettingsEarningsCard()));
}

function renderWithdrawalBase() {
  const withdraw = state.withdrawal;
  const notice = state.creator.isMinor
    ? '<div class="notice-card"><strong>未成年人暂不支持自主提现</strong>请联系客服了解监护人处理方式。<br/><button class="link-btn" data-action="open-identity">去查看实名认证 ›</button></div>'
    : !state.creator.verified
      ? '<div class="notice-card"><strong>请先完成实名认证</strong>完成境内身份证有效性和年龄校验后才可提现。<br/><button class="link-btn" data-action="open-identity">去查看实名认证 ›</button></div>'
      : !state.creator.enterprise && !state.creator.bank
        ? '<div class="notice-card"><strong>请先绑定银行卡</strong>提现到账需要使用已完成实名校验的银行卡。<br/><button class="link-btn" data-action="edit-bank">去绑定银行卡 ›</button></div>'
        : '';
  const timeline = withdraw.timeline.map((item) => `<div class="timeline-item"><div class="timeline-dot ${item.tone === 'done' ? 'done' : ''}">✓</div><div class="timeline-text"><b>${esc(item.title)}</b><span>${esc(item.detail)}</span></div></div>`).join('');
  const statusContent = withdraw.status === 'draft'
    ? '<div class="empty-card">尚未提交提现申请<br/><span class="muted">完成实名认证和银行卡绑定后即可提交。</span></div>'
    : `<div class="detail-lines"><div class="detail-line"><span>申请金额</span><span class="price">${money(withdraw.amount)}</span></div><div class="detail-line"><span>收款银行卡</span><span>${state.creator.bank ? esc(state.creator.bank.bankName) + ' · 尾号 ' + state.creator.bank.last4 : '未绑定'}</span></div></div><div class="timeline">${timeline}</div>${withdraw.status === 'pending_review' ? '<button class="primary-btn blue" data-action="simulate-approve">模拟审核通过</button>' : ''}${withdraw.status === 'processing' ? '<button class="primary-btn blue" data-action="simulate-paid">模拟支付成功并对账</button>' : ''}`;
  return `${topbar('提现结算', '<button class="topbar-action" data-action="back-settings">返回</button>')}<main class="h5-main"><div class="page-intro"><h2>提现结算</h2><p>查看收益并追踪提现到账状态。</p></div><section class="earnings-card"><div class="earnings-top"><span>可提现收益</span><span>实时余额</span></div><div class="earnings-value">${money(state.earnings.available)}</div><div class="earnings-foot"><span>累计收益 ${money(state.earnings.total)}</span><button data-action="open-withdraw-form">提交提现</button></div></section>${notice}<section class="h5-panel"><div class="h5-panel-head"><b>提现状态</b>${statusTag(withdraw.status)}</div>${statusContent}</section></main>`;
}

function renderWithdrawal() {
  const html = renderWithdrawalBase();
  return renderWapShell(state.creator.enterprise ? html.replace('完成实名认证和银行卡绑定后即可提交。', '完成实名认证和企业关联后即可提交。') : html);
}

function renderApp() {
  const views = { works: renderWorks, data: renderData, settings: renderSettingsV3, withdrawal: renderWithdrawal };
  return `<div class="h5-app">${renderDemoToolbar()}${views[state.activeView] ? views[state.activeView]() : renderWorks()}${renderSheet()}</div>`;
}

function splitTags(value) {
  return [...new Set(String(value || '').split(/[#;,，、\n\s]+/).map((tag) => tag.trim().replace(/^#+/, '')).filter(Boolean))];
}

function selectedFormTags(field) {
  return [...new Set([...(state.form[field] || []), ...splitTags(state.form[`${field}Text`])])];
}

function toggleFormTag(field, tag) {
  const tags = new Set(selectedFormTags(field));
  if (tags.has(tag)) tags.delete(tag);
  else tags.add(tag);
  state.form[field] = [...tags];
  state.form[`${field}Text`] = state.form[field].join('、');
  render();
}

function renderTagPicker(label, field, candidates) {
  const selected = new Set(selectedFormTags(field));
  const options = candidates.map((tag) => `<button type="button" class="tag-candidate ${selected.has(tag) ? 'active' : ''}" data-action="toggle-form-tag" data-tag-field="${field}" data-tag="${esc(tag)}">${esc(tag)}</button>`).join('');
  return `<div class="tag-picker"><div class="tag-candidates">${options}</div><input class="field-control" placeholder="可输入多个标签，使用 # 分隔" value="${esc(state.form[`${field}Text`] || '')}" data-sheet-field="${field}Text" /><small class="field-tip">也可以直接输入，例如：#热血励志#趣味</small></div>`;
}

function validateVideoMeta(file) {
  const name = String(file?.name || '').toLowerCase();
  const extension = name.split('.').pop();
  if (!['mp4', 'm0v'].includes(extension)) return { type: 'error', message: '视频格式不支持，请选择 MP4 或 M0V 文件。' };
  if (file.size > 2 * 1024 * 1024 * 1024) return { type: 'error', message: '视频大小不能超过 2GB。' };
  return { type: 'success', message: '格式和文件大小校验通过，正在读取视频时长…' };
}

function assignVideoFile(file) {
  const validation = validateVideoMeta(file);
  state.form.videoFileName = file.name;
  state.form.videoValidation = validation;
  state.form.videoFileMeta = { name: file.name, size: file.size, type: file.type || '', duration: 0 };
  if (validation.type === 'error') return render();
  if (typeof document !== 'undefined' && document.createElement && typeof URL !== 'undefined' && URL.createObjectURL) {
    const video = document.createElement('video');
    const objectUrl = URL.createObjectURL(file);
    video.preload = 'metadata';
    video.onloadedmetadata = () => {
      URL.revokeObjectURL(objectUrl);
      state.form.videoFileMeta.duration = video.duration;
      state.form.videoValidation = video.duration > 20 && video.duration < 600 ? { type: 'success', message: `视频校验通过：${Math.round(video.duration)} 秒` } : { type: 'error', message: '视频时长需大于 20 秒且小于 10 分钟。' };
      render();
    };
    video.onerror = () => { URL.revokeObjectURL(objectUrl); state.form.videoValidation = { type: 'error', message: '无法读取视频时长，请更换文件后重试。' }; render(); };
    video.src = objectUrl;
  } else render();
}

function assignCoverFile(file) {
  state.form.coverFileName = file.name;
  if (typeof Image === 'undefined' || typeof URL === 'undefined' || !URL.createObjectURL) {
    state.form.coverValidation = { type: 'success', message: 'Demo 已记录封面文件，实际上传时将校验 16:9。' };
    return render();
  }
  const image = new Image();
  const objectUrl = URL.createObjectURL(file);
  image.onload = () => {
    URL.revokeObjectURL(objectUrl);
    const ratio = image.width / image.height;
    state.form.coverValidation = Math.abs(ratio - 16 / 9) < 0.02 ? { type: 'success', message: `尺寸校验通过：${image.width} × ${image.height}` } : { type: 'error', message: `封面需为 16:9，当前为 ${image.width} × ${image.height}。` };
    render();
  };
  image.onerror = () => { URL.revokeObjectURL(objectUrl); state.form.coverValidation = { type: 'error', message: '无法读取封面尺寸，请更换图片后重试。' }; render(); };
  image.src = objectUrl;
}

function startVideoUpload() {
  if (state.form.videoValidation?.type === 'error') return setToast('error', '视频校验失败', state.form.videoValidation.message);
  if (state.form.coverValidation?.type === 'error') return setToast('error', '封面校验失败', state.form.coverValidation.message);
  state.form.uploading = true;
  state.form.uploadProgress = 8;
  render();
  const tick = () => {
    if (state.sheet !== 'videoEditor') return;
    state.form.uploadProgress = Math.min(100, state.form.uploadProgress + 23);
    if (state.form.uploadProgress >= 100) {
      state.form.uploading = false;
      state.form.uploadComplete = true;
      commitNewVideo();
      return;
    }
    render();
    setTimeout(tick, 180);
  };
  setTimeout(tick, 180);
}

function commitNewVideo() {
  const title = String(state.form.title || '').trim();
  if (!title) return setToast('error', '请填写视频标题', '视频标题不能为空');
  const video = {
    id: `video-${Date.now()}`,
    title,
    cover: state.form.cover || 'orange',
    coverFileName: state.form.coverFileName || 'demo-cover.jpg',
    videoFileName: state.form.videoFileName || 'demo-upload.mp4',
    createdAt: new Date().toISOString(),
    reviewStatus: '审核中',
    status: '审核中',
    knowledgePath: [...(state.form.knowledgePath || [])],
    knowledgeTags: state.form.knowledgePath?.length === 4 ? [state.form.knowledgePath[3]] : [],
    topicTags: selectedFormTags('topicTags'),
    visualTags: selectedFormTags('visualTags'),
    stats: { plays: 0, likes: 0, comments: 0, danmaku: 0 },
    comments: [],
    pinned: false
  };
  state.managedWorks.push(video);
  closeSheet();
  setToast('success', '视频上传成功', '作品已进入审核中，审核通过后会自动上架');
}

function saveManagedVideo() {
  let title = String(state.form.title || '').trim();
  if (!state.form.contentId && !title) {
    title = '演示科学视频';
    state.form.title = title;
  }
  if (!title) return setToast('error', '请填写视频标题', '视频标题不能为空');
  if (!state.form.contentId) {
    // 没有真实文件时视为 Demo 快捷上传，补齐演示数据后直接进入模拟上传进度。
    if (!(state.form.knowledgePath || []).length) state.form.knowledgePath = ['科学', '自然科学', '物理', '力与运动'];
    if (!state.form.videoFileName) state.form.videoFileName = 'demo-upload.mp4';
    if (!state.form.coverFileName) state.form.coverFileName = 'demo-cover.jpg';
    if (state.form.videoValidation?.type === 'error' || state.form.coverValidation?.type === 'error') return setToast('error', '上传校验失败', '真实文件存在校验问题，请修正后重试');
    if (!state.form.uploadComplete) return startVideoUpload();
    return;
  }
  const existing = state.managedWorks.find((video) => video.id === state.form.contentId);
  if (!existing) return;
  if ((state.form.knowledgePath || []).length !== 4) return setToast('error', '请选择四级知识点', '知识点必须从统一四级知识树中选择');
  existing.pendingChanges = { title, cover: state.form.cover || existing.cover, coverFileName: state.form.coverFileName || existing.coverFileName, knowledgePath: [...state.form.knowledgePath], knowledgeTags: [state.form.knowledgePath[3]], topicTags: selectedFormTags('topicTags'), visualTags: selectedFormTags('visualTags') };
  existing.editReviewStatus = '修改审核中';
  existing.editReviewReason = '修改内容正在安全审核和人工复审，审核通过前继续展示原内容。';
  closeSheet();
  setToast('success', '已提交复审', '安全审核和人工复审通过前，页面继续展示原内容');
}

function saveManagedCollection() {
  const existing = state.collections.find((collection) => collection.id === state.form.contentId);
  const title = String(state.form.title || '').trim() || (!existing ? `演示合集 ${state.collections.length + 1}` : '');
  if (!title) return setToast('error', '请填写合集标题', '合集标题不能为空');
  const collection = { id: existing?.id || `collection-${Date.now()}`, title, cover: state.form.cover || existing?.cover || 'orange', coverFileName: state.form.coverFileName || existing?.coverFileName || 'demo-collection-cover.jpg', description: String(state.form.description || '').trim() || '这是一个用于演示作品管理的模拟合集。', videoIds: [...(existing?.videoIds || [])], paidVideoIds: [...(existing?.paidVideoIds || [])] };
  if (existing) Object.assign(existing, collection);
  else state.collections.push(collection);
  state.collectionDetailId = collection.id;
  closeSheet();
  setToast('success', existing ? '合集属性已更新' : '合集创建成功', '请在合集详情页添加作品并配置付费');
}

function addVideosToCollection() {
  const collectionId = state.form.collectionPickerCollectionId || state.collectionDetailId;
  const collection = state.collections.find((item) => item.id === collectionId);
  if (!collection) return;
  const ids = state.form.collectionPickerSelectedVideoIds || state.form.collectionDetailSelectedVideoIds || [];
  if (!ids.length) return setToast('info', '请选择作品', '请选择至少一个已审核上架作品加入合集');
  const allowed = ids.filter((id) => {
    const video = state.managedWorks.find((item) => item.id === id);
    return video && video.reviewStatus === '审核通过' && video.status === '已上架' && !collectionForVideo(id);
  });
  collection.videoIds.push(...allowed.filter((id) => !collection.videoIds.includes(id)));
  closeSheet();
  setToast('success', '作品已加入合集', `已添加 ${allowed.length} 个作品`);
}

function saveCollectionPaidVideos() {
  const collectionId = state.form.collectionPaidPickerCollectionId || state.collectionDetailId;
  const collection = state.collections.find((item) => item.id === collectionId);
  if (!collection) return;
  const selected = (state.form.collectionPaidSelectedVideoIds || []).filter((id) => collection.videoIds.includes(id));
  collection.paidVideoIds = [...new Set(selected)];
  closeSheet();
  setToast('success', '付费视频设置成功', `当前有 ${selected.length} 个视频设置为付费`);
}

function removeVideoFromCollection(videoId) {
  const collection = state.collections.find((item) => item.id === state.collectionDetailId);
  if (!collection) return;
  collection.videoIds = collection.videoIds.filter((id) => id !== videoId);
  collection.paidVideoIds = (collection.paidVideoIds || []).filter((id) => id !== videoId);
  render();
  setToast('success', '已移出合集', '作品仍保留在作品管理中');
}

function toggleCollectionPaid(videoId) {
  const collection = state.collections.find((item) => item.id === state.collectionDetailId);
  if (!collection || !collection.videoIds.includes(videoId)) return;
  const paid = new Set(collection.paidVideoIds || []);
  if (paid.has(videoId)) paid.delete(videoId);
  else paid.add(videoId);
  collection.paidVideoIds = [...paid];
  render();
}

function moveCollectionVideo(videoId, direction) {
  const collection = state.collections.find((item) => item.id === state.collectionDetailId);
  if (!collection) return;
  const index = collection.videoIds.indexOf(videoId);
  const nextIndex = direction === 'up' ? index - 1 : index + 1;
  if (index < 0 || nextIndex < 0 || nextIndex >= collection.videoIds.length) return;
  [collection.videoIds[index], collection.videoIds[nextIndex]] = [collection.videoIds[nextIndex], collection.videoIds[index]];
  render();
}

function togglePinContent(id) {
  const video = state.managedWorks.find((item) => item.id === id);
  if (!video) return;
  state.managedWorks.forEach((item) => { item.pinned = false; });
  video.pinned = true;
  render();
  setToast('success', '已置顶作品', '该作品会优先展示在作品列表顶部');
}

function simulateReviewResult(id, result) {
  const video = state.managedWorks.find((item) => item.id === id);
  if (!video) return;
  if (result === 'pass') { video.reviewStatus = '审核通过'; video.status = '已上架'; video.statusReason = ''; setToast('success', '审核通过', '作品已自动变为上架状态'); }
  else { video.reviewStatus = '审核失败'; video.status = '未通过'; video.statusReason = '视频内容未通过审核，请检查内容规范后重新上传。'; setToast('error', '审核未通过', video.statusReason); }
  render();
}

function simulateEditReview(id, result) {
  const video = state.managedWorks.find((item) => item.id === id);
  if (!video || !video.pendingChanges) return;
  if (result === 'pass') { Object.assign(video, video.pendingChanges); delete video.pendingChanges; video.editReviewStatus = ''; video.editReviewReason = ''; setToast('success', '复审通过', '修改后的图文内容已正式生效'); }
  else { delete video.pendingChanges; video.editReviewStatus = '修改驳回'; video.editReviewReason = '本次修改未通过安全审核，原内容保持不变，可重新编辑。'; setToast('error', '修改驳回', '图文修改未通过安全审核，原内容保持不变'); }
  render();
}

function simulateTakedown(id) {
  const video = state.managedWorks.find((item) => item.id === id);
  if (!video) return;
  video.status = '已下架';
  video.statusReason = '后台手动下架：内容需要补充或调整后重新提交。';
  state.collections.forEach((collection) => {
    collection.videoIds = collection.videoIds.filter((videoId) => videoId !== id);
    collection.paidVideoIds = (collection.paidVideoIds || []).filter((videoId) => videoId !== id);
  });
  render();
  setToast('info', '作品已下架', '列表中仍会保留该作品及下架原因');
}

function moveContent(type, id, direction) {
  const list = type === 'collection' ? state.collections : state.managedWorks;
  const index = list.findIndex((item) => item.id === id);
  const nextIndex = direction === 'up' ? index - 1 : index + 1;
  if (index < 0 || nextIndex < 0 || nextIndex >= list.length) return;
  [list[index], list[nextIndex]] = [list[nextIndex], list[index]];
  render();
}

function deleteContent(type, id) {
  if (type === 'collection') state.collections = state.collections.filter((collection) => collection.id !== id);
  else {
    state.managedWorks = state.managedWorks.filter((video) => video.id !== id);
    state.collections.forEach((collection) => { collection.videoIds = collection.videoIds.filter((videoId) => videoId !== id); collection.paidVideoIds = (collection.paidVideoIds || []).filter((videoId) => videoId !== id); });
  }
  closeSheet();
  setToast('success', type === 'collection' ? '合集已解散' : '已删除', type === 'collection' ? '合集已解散，其中的视频不会被删除' : '视频已删除，相关合集也已同步移除该视频');
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
    workId: renderWorkIdSheet,
    videoEditor: renderVideoEditorSheet,
    collectionEditor: renderCollectionEditorSheet,
    collectionVideoPicker: renderCollectionVideoPickerSheet,
    collectionPaidPicker: renderCollectionPaidPickerSheet,
    comments: renderCommentsSheet,
    danmaku: renderDanmakuSheet,
    deleteContent: renderDeleteContentSheet,
    identity: renderIdentitySheet,
    identityCheck: renderIdentityCheckSheet,
    bank: renderBankSheet,
    enterprise: renderEnterpriseSheet,
    withdrawal: renderWithdrawSheet
  }[state.sheet];
  return `<div class="drawer-mask" data-action="close-sheet"><section class="h5-sheet">${sheetBody ? sheetBody() : ''}</section></div>`;
}

function sheetHead(title, subtitle = '') { return `<div class="sheet-head"><div><h3>${title}</h3>${subtitle ? `<p>${subtitle}</p>` : ''}</div><button class="sheet-close" data-action="close-sheet">×</button></div>`; }
function renderFileField(label, field, fileName, accept) { return `<div class="field"><label class="field-label">${label}</label><input class="field-control file-control" type="file" accept="${accept}" data-file-field="${field}" /><small class="file-name">${esc(fileName || '未选择文件')}</small></div>`; }
function knowledgeOptions(nodes, selected) { return (nodes || []).map((node) => `<option value="${esc(node.name)}" ${node.name === selected ? 'selected' : ''}>${esc(node.name)}</option>`).join(''); }
function knowledgeChildren(path, level) {
  let nodes = knowledgeTree;
  for (let index = 0; index < level; index += 1) nodes = nodes.find((node) => node.name === path[index])?.children || [];
  return nodes;
}
function renderKnowledgeTree() {
  const path = state.form.knowledgePath || [];
  const levels = [0, 1, 2, 3].map((level) => {
    const options = knowledgeChildren(path, level);
    return `<select class="field-control knowledge-select" data-knowledge-level="${level}"><option value="">${['一级分类', '二级分类', '三级分类', '四级知识点'][level]}</option>${knowledgeOptions(options, path[level])}</select>`;
  }).join('');
  const complete = path.length === 4 ? `<span class="knowledge-complete">已选择：${esc(path.join(' / '))}</span>` : '<span class="knowledge-hint">请选择完整的四级知识点</span>';
  return `<div class="knowledge-tree">${levels}</div>${complete}`;
}
function renderCoverUploadField(fileName, validation) { return `<div class="field"><label class="field-label">封面图 <span class="field-tip">需为 16:9</span></label><input class="field-control file-control" type="file" accept="image/*" data-file-field="coverFile" /><small class="file-name">${esc(fileName || '未选择封面图')}</small>${validation ? `<div class="upload-validation ${validation.type}">${esc(validation.message)}</div>` : ''}</div>`; }
function renderVideoUploadField(fileName, validation, uploading, progress) { return `<div class="field"><label class="field-label">视频文件 <span class="field-tip">MP4 / M0V · ≤2GB · 20秒—10分钟</span></label><div class="upload-dropzone" data-drop-target="video"><div class="upload-cloud">↥</div><b>点击选择或将视频拖拽到此处</b><small>支持 .mp4、.m0v 文件，Web 端可直接拖拽上传</small><input class="upload-file-input" type="file" accept="video/mp4,.mp4,.m0v" data-file-field="videoFile" /></div><small class="file-name">${esc(fileName || '未选择视频')}</small>${validation ? `<div class="upload-validation ${validation.type}">${esc(validation.message)}</div>` : ''}${uploading ? `<div class="upload-progress"><div><span>正在上传</span><b>${progress}%</b></div><i><em style="width:${progress}%"></em></i></div>` : ''}</div>`; }
function renderVideoEditorSheet() {
  const editing = Boolean(state.form.contentId);
  const editNote = editing ? '<div class="sheet-note edit-limit-note">仅支持修改5次</div>' : '<div class="sheet-note">上传完成后进入审核中，审核通过会自动上架；审核失败会展示具体原因。</div>';
  const demoReview = editing ? `<div class="demo-actions"><span>Demo 复审：</span><button data-action="simulate-edit-review" data-content-id="${esc(state.form.contentId)}" data-review-result="pass">复审通过</button><button data-action="simulate-edit-review" data-content-id="${esc(state.form.contentId)}" data-review-result="fail">机审不通过</button></div>` : '';
  return `${sheetHead(editing ? '编辑视频属性' : '上传视频', editing ? '' : 'Web 支持拖拽上传，WAP 支持唤起本地文件夹')}${editNote}<div class="field"><label class="field-label">视频标题</label><input class="field-control" maxlength="50" placeholder="请输入视频标题（Demo 可直接上传）" value="${esc(state.form.title || '')}" data-sheet-field="title" /></div>${renderCoverUploadField(state.form.coverFileName, state.form.coverValidation)}<div class="field"><label class="field-label">封面样式</label><select class="field-control" data-sheet-field="cover"><option value="orange" ${state.form.cover === 'orange' ? 'selected' : ''}>橙色</option><option value="blue" ${state.form.cover === 'blue' ? 'selected' : ''}>蓝色</option><option value="green" ${state.form.cover === 'green' ? 'selected' : ''}>绿色</option></select></div>${editing ? `<div class="field"><label class="field-label">视频文件</label><div class="readonly-file">${esc(state.form.videoFileName || '原视频文件')}<span>不可修改</span></div></div>` : renderVideoUploadField(state.form.videoFileName, state.form.videoValidation, state.form.uploading, state.form.uploadProgress || 0)}<div class="field"><label class="field-label">知识点标签 <span class="field-tip">统一四级知识树</span></label>${renderKnowledgeTree()}</div><div class="field"><label class="field-label">话题标签</label>${renderTagPicker('话题标签', 'topicTags', topicTagCandidates)}</div><div class="field"><label class="field-label">视觉标签</label>${renderTagPicker('视觉标签', 'visualTags', visualTagCandidates)}</div>${demoReview}<div class="sheet-actions"><button class="secondary-btn" data-action="close-sheet">取消</button><button class="primary-btn blue" data-action="save-video" ${state.form.uploading ? 'disabled' : ''}>${editing ? '提交审核' : '开始上传'}</button></div>`;
}
function renderCollectionEditorSheet() {
  const editingId = state.form.contentId;
  return `${sheetHead(editingId ? '编辑合集' : '新建合集', '保存后进入合集详情页管理作品')}<div class="field"><label class="field-label">合集标题</label><input class="field-control" maxlength="40" placeholder="请输入合集标题" value="${esc(state.form.title || '')}" data-sheet-field="title" /></div>${renderFileField('合集封面', 'coverFileName', state.form.coverFileName, 'image/*')}<div class="field"><label class="field-label">合集简介</label><textarea class="field-control textarea-control" maxlength="120" placeholder="请输入合集简介" data-sheet-field="description">${esc(state.form.description || '')}</textarea></div><div class="sheet-actions"><button class="secondary-btn" data-action="close-sheet">取消</button><button class="primary-btn blue" data-action="save-collection">保存并进入详情</button></div>`;
}
function renderDeleteContentSheet() {
  const isCollection = state.form.contentType === 'collection';
  return `${sheetHead(isCollection ? '解散合集' : '删除视频')}<div class="sheet-note">确认${isCollection ? '解散' : '删除'}“${esc(state.form.contentTitle || '')}”吗？${isCollection ? '解散合集不会删除其中的视频。' : '删除视频后，它也会从所属合集中移除。'}</div><div class="sheet-actions"><button class="secondary-btn" data-action="close-sheet">取消</button><button class="danger-btn" data-action="confirm-delete-content">确认${isCollection ? '解散' : '删除'}</button></div>`;
}
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
  return `${sheetHead('结算明细', '结算周期为上月20日至本月19日产生的收益。当前页面仅展示结算的税前收益，实际收入以到账金额为准')}<div class="history-filter"><div class="h5-presets">${filters}</div>${rangePicker}</div><div class="settlement-list">${list}</div>`;
}
function renderNicknameSheet() { return `${sheetHead('修改昵称', '昵称会展示在创作者数据中心和个人主页')}<div class="field"><label class="field-label">新昵称</label><input class="field-control" maxlength="20" value="${esc(state.form.nickname || state.creator.name)}" data-sheet-field="nickname" /></div><div class="sheet-actions"><button class="primary-btn blue" data-action="save-nickname">保存昵称</button></div>`; }
function renderPhoneSheet() { return `${sheetHead('修改绑定手机号', '更换手机号需要完成验证码校验')}<div class="field"><label class="field-label">新手机号</label><input class="field-control" inputmode="numeric" maxlength="11" placeholder="请输入新手机号" value="${esc(state.form.newPhone || '')}" data-sheet-field="newPhone" /></div><div class="field"><label class="field-label">验证码</label><div class="code-row"><input class="field-control" inputmode="numeric" maxlength="6" placeholder="请输入验证码" value="${esc(state.form.code || '')}" data-sheet-field="code" /><button class="code-button" data-action="sheet-code">获取验证码</button></div></div><div class="sheet-actions"><button class="primary-btn blue" data-action="save-phone">确认更换</button></div>`; }
function renderWorkIdSheet() { return `${sheetHead('绑定好未来工号', '内部员工奖金收入将合并工资发放')}<div class="field"><label class="field-label">工号</label><input class="field-control" maxlength="30" placeholder="请输入工号" value="${esc(state.form.workId || state.creator.workId || '')}" data-sheet-field="workId" /></div><div class="sheet-actions"><button class="secondary-btn" data-action="close-sheet">取消</button><button class="primary-btn blue" data-action="save-work-id">确认绑定</button></div>`; }
function renderIdentitySheet() {
  const saved = state.creator.identity;
  const editing = state.form.identityEditing || !saved;
  const employeeBindingBlock = Boolean(state.form.employeeBindingBlock);
  const savedSummary = saved && !editing ? `<div class="identity-mask"><span><b>${maskIdentityName(saved.name)}</b><small>${maskIdentityNumber(saved.idNumber)}</small></span></div>` : `<div class="field"><label class="field-label">姓名</label><input class="field-control" maxlength="20" placeholder="请输入真实姓名" value="${esc(state.form.name || '')}" data-sheet-field="name" /></div><div class="field"><label class="field-label">身份证号</label><input class="field-control" maxlength="18" placeholder="请输入 18 位身份证号" value="${esc(state.form.idNumber || '')}" data-sheet-field="idNumber" /></div>`;
  const consent = editing && !employeeBindingBlock ? `<label class="identity-consent"><input type="checkbox" ${state.form.identityConsent ? 'checked' : ''} data-sheet-field="identityConsent" /><span>我已阅读并同意《身份信息核验服务个人信息处理授权协议》</span></label>` : '';
  const contractFields = editing && !employeeBindingBlock ? `<div class="field contract-phone-field"><label class="field-label">签约手机号</label><input class="field-control" inputmode="numeric" maxlength="11" placeholder="请输入接收合同的手机号" value="${esc(state.form.contractPhone || state.creator.phone || '')}" data-sheet-field="contractPhone" /><div class="field-tip contract-phone-tip">该手机号将收到创作者服务合同，请确保手机号与实名信息一致。</div></div><div class="field"><label class="field-label">短信验证码</label><div class="code-row"><input class="field-control" inputmode="numeric" maxlength="6" placeholder="请输入短信验证码" value="${esc(state.form.contractCode || '')}" data-sheet-field="contractCode" /><button class="code-button" data-action="contract-code">${state.form.contractCodeSent ? '重新获取' : '获取验证码'}</button></div><div class="field-tip">Demo 验证码为 123456</div></div>` : '';
  const actions = employeeBindingBlock ? '<button class="secondary-btn" data-action="close-sheet">取消</button><button class="primary-btn blue" data-action="demo-external-login">切换为外部人员</button>' : editing ? `<button class="secondary-btn" data-action="skip-onboarding">暂时跳过</button><button class="primary-btn blue" data-action="submit-identity" ${state.form.identityConsent ? '' : 'disabled'}>确认绑定</button>` : '<button class="primary-btn blue" data-action="close-sheet">完成</button>';
  const demoActions = employeeBindingBlock ? '' : `<div class="demo-actions identity-demo-actions"><span>演示快捷操作：</span><button data-action="demo-identity-pass">验证通过</button><button data-action="demo-identity-employee">内部员工</button><button data-action="demo-identity-minor">未成年</button><button data-action="demo-identity-invalid">认证错误</button>${state.creator.verified ? '<button data-action="clear-identity">清除认证</button>' : ''}</div>`;
  const employeePrompt = employeeBindingBlock ? '<div class="sheet-error identity-employee-guide"><strong>当前为内部员工实名</strong><span>公司规定暂不支持在职员工签约创作者并获取收入，请先切换为外部人员后再绑定银行卡。</span></div>' : '';
  return `${sheetHead('实名认证', '请完成身份认证，认证信息将用于作品分发、收益提现等')}${demoActions}${employeePrompt}<div class="sheet-note identity-guide">请填写身份信息，完成实名认证后可进行作品上传、收益提现等。<br/><strong class="identity-lock-note">请注意：实名认证完成后不可修改，实名信息仅可绑定到一个天天学账号中</strong></div><div class="detail-lines identity-status"><div class="detail-line"><span>证件类型</span><span>境内居民身份证</span></div></div>${savedSummary}${contractFields}${consent}<div class="sheet-actions">${actions}</div>`;
}
function renderIdentityCheckSheet() {
  const result = state.form.identityResult;
  const messages = { invalid: '身份证错误，请检查身份证信息后重新提交。', minor: '识别为未成年人，请由监护人完成实名认证。' };
  const resultBlock = result && result !== 'pending' ? `<div class="identity-check-result error"><strong>身份校验未通过</strong><span>${messages[result] || '当前未完成认证，请重新提交。'}</span></div><div class="sheet-actions"><button class="primary-btn blue" data-action="back-to-identity">返回修改身份证信息</button></div>` : `<div class="identity-check-result checking"><strong>正在进行身份信息校验</strong><span>Demo 可选择平台返回结果，模拟真实实名接口校验。</span></div><div class="identity-check-options"><button class="check-option invalid" data-action="identity-check-result" data-identity-result="invalid"><b>身份证错误</b><small>证件信息无法通过校验</small></button><button class="check-option minor" data-action="identity-check-result" data-identity-result="minor"><b>未成年人</b><small>需由监护人进行实名认证</small></button><button class="check-option employee" data-action="identity-check-result" data-identity-result="employee"><b>内部员工</b><small>认证通过后需绑定工号</small></button><button class="check-option pass" data-action="identity-check-result" data-identity-result="pass"><b>校验通过</b><small>自动进入银行卡绑定</small></button></div>`;
  return `${sheetHead('身份信息校验', '正在校验实名信息')}<div class="sheet-note">姓名：${esc(maskIdentityName(state.form.name))}<br/>身份证号：${esc(maskIdentityNumber(state.form.idNumber))}<br/>合同手机号：${esc(formatPhone(state.form.contractPhone || state.creator.phone))}</div>${resultBlock}`;
}
function renderBankSheet() {
  const bankEditing = Boolean(state.creator.bank);
  const accountType = state.form.accountType === 'corporate' ? 'corporate' : 'personal';
  const platformError = { identity_invalid: '身份证错误，请检查或更换实名信息', bank_mismatch: '银行卡与实名认证信息不匹配，请更换本人银行卡', employee: '公司规定暂不支持在职员工签约创作者并获取收入，请检查或更换实名信息' }[state.form.platformError] || '';
  const bankOptions = ['中国工商银行', '中国建设银行', '中国银行', '招商银行'].map((bank) => `<option value="${bank}" ${state.form.bankName === bank ? 'selected' : ''}>${bank}</option>`).join('');
  const errorBlock = platformError ? `<div class="sheet-error"><strong>创作者注册失败</strong><span>${platformError}</span>${state.form.platformError === 'employee' ? '<button class="link-btn" data-action="reset-identity-from-bank">返回第一步修改身份证信息</button>' : '<button class="link-btn" data-action="retry-bank">重新绑定银行卡</button>'}</div>` : '';
  const accountTypePicker = `<div class="field"><label class="field-label">账户类型</label><div class="account-type-picker"><button type="button" class="account-type-option ${accountType === 'personal' ? 'active' : ''}" data-action="set-bank-account-type" data-account-type="personal">个人账户</button><button type="button" class="account-type-option ${accountType === 'corporate' ? 'active' : ''}" data-action="set-bank-account-type" data-account-type="corporate">对公账户</button></div><p class="account-type-note">对公账户适用于工作室或机构主体收款，需由运营团队确认收款主体。</p></div>`;
  return `${sheetHead(bankEditing ? '修改银行卡' : '绑定银行卡')}<div class="sheet-note">请绑定收款银行卡。注意：默认每月10日发起打款，如打款过程中修改银行卡可能影响实际到账情况</div>${errorBlock}${accountTypePicker}<div class="field"><label class="field-label">银行</label><select class="field-control" data-sheet-field="bankName"><option value="">请选择银行</option>${bankOptions}</select></div><div class="field"><label class="field-label">支行</label><input class="field-control" placeholder="请输入开户支行名称" value="${esc(state.form.branchName || '')}" data-sheet-field="branchName" /></div><div class="field"><label class="field-label">银行卡号</label><input class="field-control" inputmode="numeric" maxlength="23" placeholder="请输入银行卡号" value="${esc(state.form.cardNumber || '')}" data-sheet-field="cardNumber" /></div><div class="sheet-actions"><button class="secondary-btn" data-action="skip-onboarding">${bankEditing ? '取消修改' : '暂时跳过'}</button><button class="primary-btn blue" data-action="save-bank">确认绑定</button></div><div class="demo-actions"><span>Demo 模拟平台返回：</span><button data-action="simulate-bank-error" data-bank-error="bank_mismatch">不匹配</button></div>`;
}
function renderEnterpriseSheet() {
  const linked = state.creator.enterprise;
  if (linked) return `${sheetHead('企业认证', '个人账号收益将汇总到企业主体统一打款')}<div class="sheet-note">当前账号已关联企业主体，后续收益无需绑定个人银行卡，将由企业统一完成结算和打款。</div><div class="detail-lines"><div class="detail-line"><span>企业名称</span><span>${esc(linked.name)}</span></div><div class="detail-line"><span>关联状态</span><span class="inline-status success">已关联</span></div></div><div class="sheet-actions"><button class="primary-btn blue" data-action="close-sheet">完成</button></div>`;
  return `${sheetHead('企业认证', '将个人账号关联到企业账号')}<div class="sheet-note">关联后，个人银行卡将无法绑定，个人账号产生的收益将直接汇总到企业主体进行结算和打款。</div><div class="field"><label class="field-label">企业账号</label><input class="field-control" placeholder="请输入企业账号或统一社会信用代码" value="${esc(state.form.enterpriseAccount || '')}" data-sheet-field="enterpriseAccount" /></div><div class="field"><label class="field-label">企业名称</label><input class="field-control" placeholder="请输入企业名称" value="${esc(state.form.enterpriseName || '')}" data-sheet-field="enterpriseName" /></div><div class="sheet-actions"><button class="secondary-btn" data-action="close-sheet">取消</button><button class="primary-btn blue" data-action="link-enterprise">确认关联</button></div><div class="demo-actions"><span>Demo 模拟：</span><button data-action="demo-link-enterprise">关联示例企业</button></div>`;
}
function renderWithdrawSheetBase() { const amount = Number(state.form.amount || 0); const error = state.form.amount ? validateWithdraw(amount) : ''; return `${sheetHead('提交提现', '提现前请确认实名认证和收款银行卡')}<div class="earnings-card"><div class="earnings-top"><span>可提现余额</span><span>${money(state.earnings.available)}</span></div><div class="earnings-value" data-withdraw-preview="amount">${money(amount)}</div><div class="earnings-foot"><span>预计到账</span><span data-withdraw-preview="net">${money(amount)}</span></div></div><div class="field" style="margin-top:16px"><label class="field-label">提现金额</label><input class="field-control" inputmode="decimal" placeholder="最低 ¥10" value="${esc(state.form.amount || '')}" data-sheet-field="amount" /><div class="error-text">${error}</div></div><div class="detail-lines"><div class="detail-line"><span>收款银行卡</span><span>${state.creator.bank ? `${esc(state.creator.bank.bankName)} · 尾号 ${state.creator.bank.last4}` : '未绑定'}</span></div><div class="detail-line"><span>平台服务费</span><span style="color:var(--green)">暂不收取</span></div><div class="detail-line"><span>预计到账时间</span><span>1 个工作日</span></div></div><div class="sheet-actions"><button class="primary-btn blue" data-action="submit-withdraw" ${error || !state.form.amount ? 'disabled' : ''}>确认提现</button></div>`; }
function renderWithdrawSheet() { return state.creator.enterprise ? renderWithdrawSheetBase().replace('>未绑定</span>', '>企业主体统一结算</span>') : renderWithdrawSheetBase(); }

function render() {
  $('#app').innerHTML = state.authenticated ? renderApp() : renderAuth();
  renderToast();
}

function demoIdentity(type) {
  if (type === 'pass' || type === 'employee') {
    state.creator.identity = { name: type === 'employee' ? '内部演示员工' : '外部演示作者', idNumber: type === 'employee' ? '110101199001010011' : '110101199001010022' };
    state.creator.contractPhone = state.form.contractPhone || state.creator.contractPhone || state.creator.phone;
    state.creator.verified = true;
    state.creator.isMinor = false;
    state.creator.idStatus = 'pass';
    state.creator.employee = type === 'employee';
    if (!state.creator.employee) state.creator.workId = '';
    if (state.creator.employee) {
      state.creator.bank = null;
      state.creator.enterprise = null;
      state.creator.platformRegistered = false;
      state.creator.contractStatus = 'unsigned';
    }
    state.sheet = null;
    render();
    setToast('success', type === 'employee' ? '内部员工认证完成' : '实名认证通过', type === 'employee' ? '请继续绑定好未来工号' : '演示身份已完成绑定');
    return;
  }
  state.creator.identity = null;
  state.creator.enterprise = null;
  state.creator.verified = false;
  state.creator.employee = false;
  state.creator.workId = '';
  state.creator.isMinor = type === 'minor';
  state.creator.idStatus = type === 'minor' ? 'minor' : 'invalid';
  state.sheet = null;
  render();
  setToast('error', type === 'minor' ? '未成年状态已生效' : '认证错误状态已生效', type === 'minor' ? '当前账号暂不支持自主提现' : '当前账号未完成实名认证');
}

function clearIdentity() {
  state.creator.identity = null;
  state.creator.enterprise = null;
  state.creator.verified = false;
  state.creator.employee = false;
  state.creator.workId = '';
  state.creator.isMinor = false;
  state.creator.idStatus = 'unverified';
  state.sheet = null;
  render();
  setToast('info', '已清除认证', '已恢复未实名演示状态');
}

function setDemoLogin(employee) {
  state.authenticated = true;
  state.creator.contractPhone = state.creator.phone || '13812345678';
  state.creator.employee = employee;
  state.creator.enterprise = null;
  state.creator.workId = '';
  state.creator.verified = true;
  state.creator.isMinor = false;
  state.creator.idStatus = 'pass';
  state.creator.identity = { name: employee ? '内部演示员工' : '外部演示作者', idNumber: employee ? '110101199001010011' : '110101199001010022' };
  state.creator.bank = employee ? null : { accountType: 'personal', bankName: '中国工商银行', branchName: '好未来演示支行', last4: '6789' };
  state.creator.platformRegistered = !employee;
  state.creator.contractStatus = employee ? 'unsigned' : 'pending';
  state.activeView = 'settings';
  state.sheet = null;
  render();
  setToast('success', employee ? '已切换为内部员工' : '已切换为外部人员', employee ? '内部员工不可绑定创作者银行卡' : '实名和银行卡已完成绑定');
}

function setDemoUnverified() {
  state.authenticated = true;
  state.creator.contractPhone = state.creator.phone || '13812345678';
  state.creator.employee = false;
  state.creator.workId = '';
  state.creator.verified = false;
  state.creator.isMinor = false;
  state.creator.idStatus = 'unverified';
  state.creator.identity = null;
  state.creator.enterprise = null;
  state.creator.bank = null;
  state.creator.platformRegistered = false;
  state.creator.contractStatus = 'unsigned';
  state.activeView = 'settings';
  state.sheet = null;
  state.form = {};
  render();
  setToast('info', '已切换为未认证账号', '当前账号未完成实名认证和银行卡绑定');
}

function handleAction(action, target) {
  switch (action) {
    case 'demo-logout': state.authenticated = false; state.sheet = null; state.form = {}; render(); setToast('info', '已退出登录', '当前为未登录演示状态'); break;
    case 'demo-internal-login': setDemoLogin(true); break;
    case 'demo-external-login': setDemoLogin(false); break;
    case 'demo-unverified-login': setDemoUnverified(); break;
    case 'auth-code': sendCode(); break;
    case 'contract-code': sendContractCode(); break;
    case 'auth-submit': submitAuth(); break;
    case 'open-agreement': if (state.authenticated) openSheet('agreement'); else { state.sheet = 'agreement'; render(); } break;
    case 'open-privacy': if (state.authenticated) openSheet('privacy'); else { state.sheet = 'privacy'; render(); } break;
    case 'open-identity': openSheet('identity', { name: state.creator.identity?.name || '', idNumber: '', contractPhone: state.creator.contractPhone || state.creator.phone || '', contractCode: '', contractCodeSent: false, identityEditing: !state.creator.identity, identityConsent: false }); break;
    case 'open-onboarding': startOnboarding(); break;
    case 'edit-identity': state.form = { name: state.creator.identity?.name || '', idNumber: '', contractPhone: state.creator.contractPhone || state.creator.phone || '', contractCode: '', contractCodeSent: false, identityEditing: true, identityConsent: false }; render(); break;
    case 'submit-identity': submitIdentity(); break;
    case 'identity-check-result': finishIdentityCheck(target.dataset.identityResult); break;
    case 'back-to-identity': backToIdentityEdit(); break;
    case 'skip-onboarding': skipOnboardingStep(); break;
    case 'identity-pass': state.sheet = null; verifyIdentity('pass'); break;
    case 'identity-minor': state.sheet = null; verifyIdentity('minor'); break;
    case 'identity-invalid': state.sheet = null; verifyIdentity('invalid'); break;
    case 'demo-identity-pass': demoIdentity('pass'); break;
    case 'demo-identity-employee': demoIdentity('employee'); break;
    case 'demo-identity-minor': demoIdentity('minor'); break;
    case 'demo-identity-invalid': demoIdentity('invalid'); break;
    case 'clear-identity': clearIdentity(); break;
    case 'open-enterprise': openSheet('enterprise', state.creator.enterprise ? {} : { enterpriseAccount: '', enterpriseName: '' }); break;
    case 'link-enterprise': linkEnterprise(); break;
    case 'demo-link-enterprise': demoLinkEnterprise(); break;
    case 'set-works-tab': state.worksTab = target.dataset.worksTab === 'collections' ? 'collections' : 'videos'; render(); break;
    case 'open-upload-video': openSheet('videoEditor', { title: '', cover: 'orange', coverFileName: '', videoFileName: '', knowledgePath: [], topicTags: [], visualTags: [], topicTagsText: '', visualTagsText: '', coverValidation: null, videoValidation: null, uploadProgress: 0, uploadComplete: false }); break;
    case 'edit-video': {
      const video = state.managedWorks.find((item) => item.id === target.dataset.contentId);
      if (video) openSheet('videoEditor', { contentId: video.id, title: video.title, cover: video.cover, coverFileName: video.coverFileName, videoFileName: video.videoFileName, knowledgePath: [...(video.knowledgePath || [])], topicTags: [...(video.topicTags || [])], visualTags: [...(video.visualTags || [])], topicTagsText: (video.topicTags || []).join('、'), visualTagsText: (video.visualTags || []).join('、') });
      break;
    }
    case 'save-video': saveManagedVideo(); break;
    case 'toggle-pin': togglePinContent(target.dataset.contentId); break;
    case 'simulate-review-result': simulateReviewResult(target.dataset.contentId, target.dataset.reviewResult); break;
    case 'simulate-edit-review': simulateEditReview(target.dataset.contentId, target.dataset.reviewResult); break;
    case 'simulate-takedown': simulateTakedown(target.dataset.contentId); break;
    case 'open-new-collection': openSheet('collectionEditor', { title: '', cover: 'orange', coverFileName: '', description: '' }); break;
    case 'edit-collection': {
      const collection = state.collections.find((item) => item.id === target.dataset.contentId);
      if (collection) openSheet('collectionEditor', { contentId: collection.id, title: collection.title, cover: collection.cover, coverFileName: collection.coverFileName, description: collection.description });
      break;
    }
    case 'save-collection': saveManagedCollection(); break;
    case 'open-collection-detail': state.collectionDetailId = target.dataset.contentId; state.form = {}; render(); break;
    case 'open-collection-picker': openSheet('collectionVideoPicker', { collectionPickerCollectionId: target.dataset.contentId, collectionPickerSelectedVideoIds: [] }); break;
    case 'open-collection-paid-picker': {
      const collection = state.collections.find((item) => item.id === target.dataset.contentId);
      openSheet('collectionPaidPicker', {
        collectionPaidPickerCollectionId: target.dataset.contentId,
        collectionPaidSelectedVideoIds: [...(collection?.paidVideoIds || [])]
      });
      break;
    }
    case 'close-collection-detail': state.collectionDetailId = null; state.form = {}; render(); break;
    case 'save-collection-picker': addVideosToCollection(); break;
    case 'save-collection-paid-picker': saveCollectionPaidVideos(); break;
    case 'remove-collection-video': removeVideoFromCollection(target.dataset.contentId); break;
    case 'move-collection-video': moveCollectionVideo(target.dataset.contentId, target.dataset.direction); break;
    case 'open-comments': openSheet('comments', { commentContentId: target.dataset.contentId, replyCommentId: null, replyText: '' }); break;
    case 'open-danmaku': openSheet('danmaku', { danmakuContentId: target.dataset.contentId }); break;
    case 'reply-comment': state.form.replyCommentId = target.dataset.commentId; state.form.replyText = ''; render(); break;
    case 'save-comment-reply': saveCommentReply(target.dataset.commentId); break;
    case 'toggle-form-tag': toggleFormTag(target.dataset.tagField, target.dataset.tag); break;
    case 'delete-content': {
      const list = target.dataset.contentType === 'collection' ? state.collections : state.managedWorks;
      const item = list.find((entry) => entry.id === target.dataset.contentId);
      if (item) openSheet('deleteContent', { contentType: target.dataset.contentType, contentId: item.id, contentTitle: item.title });
      break;
    }
    case 'confirm-delete-content': deleteContent(state.form.contentType, state.form.contentId); break;
    case 'move-content': moveContent(target.dataset.contentType, target.dataset.contentId, target.dataset.direction); break;
    case 'edit-nickname': openSheet('nickname', { nickname: state.creator.name }); break;
    case 'edit-phone': break;
    case 'sheet-code': sendCode(); break;
    case 'save-nickname': saveNickname(); break;
    case 'save-phone': savePhone(); break;
    case 'open-work-id': if (state.creator.employee) openSheet('workId', { workId: state.creator.workId || '' }); break;
    case 'save-work-id': {
      const workId = String(state.form.workId || '').trim();
      if (!workId) return setToast('error', '请输入工号', '绑定工号后才能领取内部员工赛事奖金');
      state.creator.workId = workId;
      closeSheet();
      setToast('success', '工号绑定成功', '后续赛事奖金将合并工资发放');
      break;
    }
    case 'set-bank-account-type': state.form.accountType = target.dataset.accountType === 'corporate' ? 'corporate' : 'personal'; render(); break;
    case 'edit-bank': if (state.creator.employee) return openSheet('identity', { name: state.creator.identity?.name || '', idNumber: '', identityEditing: false, employeeBindingBlock: true }); if (!state.creator.verified || state.creator.isMinor || !state.creator.identity) return startOnboarding(); openSheet('bank', state.creator.bank ? { accountType: state.creator.bank.accountType || 'personal', bankName: state.creator.bank.bankName, branchName: state.creator.bank.branchName, cardNumber: '', platformError: '' } : { accountType: 'personal', bankName: '', branchName: '', cardNumber: '', platformError: '' }); break;
    case 'save-bank': saveBank(); break;
    case 'retry-bank': state.form.platformError = ''; render(); break;
    case 'simulate-bank-error': setBankError(target.dataset.bankError); break;
    case 'reset-identity-from-bank': resetIdentityFromBank(); break;
    case 'open-withdrawal': state.activeView = 'withdrawal'; render(); break;
    case 'open-earnings-rules': openSheet('earningsRules'); break;
    case 'open-earnings-history': openSheet('earningsHistory'); break;
    case 'open-withdraw-form': if (!state.creator.verified || state.creator.isMinor) return openSheet('identity'); if (!state.creator.enterprise && !state.creator.bank) return openSheet('bank'); openSheet('withdrawal'); break;
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
  if (actionTarget?.matches('select[data-action^="set-works-"]')) return;
  if (actionTarget) handleAction(actionTarget.dataset.action, actionTarget);
});

document.addEventListener('input', (event) => {
  if (event.target.dataset.authField) updateAuthField(event.target.dataset.authField, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
  if (event.target.dataset.worksSearch) state.worksSearch = event.target.value;
  if (event.target.dataset.sheetField) {
    const field = event.target.dataset.sheetField;
    const previousValue = state.form[field];
    const value = event.target.type === 'checkbox' ? event.target.checked : field === 'cardNumber' ? event.target.value.replace(/\s/g, '') : field === 'idNumber' ? event.target.value.replace(/\s/g, '').toUpperCase() : event.target.value;
    if (event.target.type !== 'checkbox') event.target.value = value;
    state.form[field] = value;
    if (state.sheet === 'identity' && field === 'contractPhone' && previousValue !== value) {
      state.form.contractCode = '';
      state.form.contractCodeSent = false;
      const codeInput = document.querySelector('[data-sheet-field="contractCode"]');
      const codeButton = document.querySelector('[data-action="contract-code"]');
      if (codeInput) codeInput.value = '';
      if (codeButton) codeButton.textContent = '获取验证码';
    }
    if (state.sheet === 'withdrawal') {
      const amount = Number(state.form.amount || 0);
      const error = state.form.amount ? validateWithdraw(amount) : '';
      const errorNode = document.querySelector('.error-text');
      const submit = document.querySelector('[data-action="submit-withdraw"]');
      const amountPreview = document.querySelector('[data-withdraw-preview="amount"]');
      const netPreview = document.querySelector('[data-withdraw-preview="net"]');
      if (errorNode) errorNode.textContent = error;
      if (amountPreview) amountPreview.textContent = money(amount);
      if (netPreview) netPreview.textContent = money(amount);
      if (submit) submit.disabled = Boolean(error || !state.form.amount);
    }
    if (state.sheet === 'identity' && field === 'identityConsent') render();
  }
});

document.addEventListener('change', (event) => {
  if (event.target.dataset.fileField) { const file = event.target.files?.[0]; if (event.target.dataset.fileField === 'videoFile' && file) assignVideoFile(file); else if (event.target.dataset.fileField === 'coverFile' && file) assignCoverFile(file); else { state.form[event.target.dataset.fileField] = file?.name || ''; render(); } }
  if (event.target.dataset.collectionVideo) { const ids = new Set(state.form.selectedVideoIds || []); if (event.target.checked) ids.add(event.target.dataset.collectionVideo); else ids.delete(event.target.dataset.collectionVideo); state.form.selectedVideoIds = [...ids]; }
  if (event.target.dataset.collectionDetailVideo) { const ids = new Set(state.form.collectionDetailSelectedVideoIds || []); if (event.target.checked) ids.add(event.target.dataset.collectionDetailVideo); else ids.delete(event.target.dataset.collectionDetailVideo); state.form.collectionDetailSelectedVideoIds = [...ids]; }
  if (event.target.dataset.collectionPickerVideo) { const ids = new Set(state.form.collectionPickerSelectedVideoIds || []); if (event.target.checked) ids.add(event.target.dataset.collectionPickerVideo); else ids.delete(event.target.dataset.collectionPickerVideo); state.form.collectionPickerSelectedVideoIds = [...ids]; }
  if (event.target.dataset.collectionPaidVideo) { const ids = new Set(state.form.collectionPaidSelectedVideoIds || []); if (event.target.checked) ids.add(event.target.dataset.collectionPaidVideo); else ids.delete(event.target.dataset.collectionPaidVideo); state.form.collectionPaidSelectedVideoIds = [...ids]; }
  if (event.target.dataset.knowledgeLevel !== undefined) { const level = Number(event.target.dataset.knowledgeLevel); const path = [...(state.form.knowledgePath || [])]; path[level] = event.target.value; state.form.knowledgePath = path.slice(0, level + 1); render(); }
  if (event.target.dataset.sheetField) state.form[event.target.dataset.sheetField] = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
  if (event.target.dataset.action === 'set-works-filter') { state.worksFilter = event.target.value; render(); }
  if (event.target.dataset.action === 'set-works-sort') { state.worksSort = event.target.value; render(); }
  if (event.target.dataset.action === 'set-video-sort') { state.videoSort = event.target.value; render(); }
  if (event.target.dataset.worksSearch) render();
  if (event.target.dataset.dateField) { state[event.target.dataset.dateField] = event.target.value; render(); }
  if (event.target.dataset.historyDate) { state[event.target.dataset.historyDate] = event.target.value; render(); }
});

document.addEventListener('dragover', (event) => { if (event.target.closest?.('[data-drop-target="video"]')) event.preventDefault(); });
document.addEventListener('drop', (event) => { const dropTarget = event.target.closest?.('[data-drop-target="video"]'); if (!dropTarget) return; event.preventDefault(); const file = event.dataTransfer?.files?.[0]; if (file) assignVideoFile(file); });

render();
