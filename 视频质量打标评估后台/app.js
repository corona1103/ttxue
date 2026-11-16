const metricLabels = ['累计播放量', '近7日播放量', '3s跳出率', '完播率', '点赞率', '评论率', '关注率'];

const videos = [
  { id: 'v_20261112_008432', title: '为什么鸟儿站在电线上不会触电？', duration: '01:18', authorName: '小小科学家', authorId: 'u_1048236', knowledge: ['科学探索', '物理世界', '电与电路'], metrics: ['1,284,902', '86,421', '18.6%', '64.8%', '8.9%', '1.6%', '0.9%'], behaviorScore: '4.6', qualityScore: '4.4', aux: ['低', '中', '知识讲解', '轻松活泼'], rating: '', reason: '', palette: ['#0f5d72', '#49b4a7', '#f2cb8d'] },
  { id: 'v_20261112_008417', title: '3分钟看懂：月亮为什么每天都在变？', duration: '03:06', authorName: '星空放映室', authorId: 'u_1086331', knowledge: ['科学探索', '地球与宇宙', '太空探索'], metrics: ['928,304', '74,192', '21.3%', '58.2%', '7.6%', '1.1%', '0.7%'], behaviorScore: '4.2', qualityScore: '4.8', aux: ['中', '高', '知识讲解', '沉浸叙事'], rating: 'S', reason: '', palette: ['#1b285a', '#5969d5', '#e78da4'] },
  { id: 'v_20261112_008390', title: '古人没有计算器，怎么快速算乘法？', duration: '02:14', authorName: '数学小队长', authorId: 'u_1021178', knowledge: ['数学思维', '数与运算', '计算技巧'], metrics: ['654,288', '52,370', '24.8%', '49.7%', '6.2%', '0.8%', '0.4%'], behaviorScore: '3.8', qualityScore: '4.1', aux: ['中', '高', '方法技巧', '清晰严谨'], rating: 'A', reason: '', palette: ['#493978', '#9879cf', '#edc071'] },
  { id: 'v_20261112_008351', title: '“因为所以”用错了？孩子常见的表达误区', duration: '01:42', authorName: '小鹿语文课', authorId: 'u_1069280', knowledge: ['语言表达', '表达沟通', '口语表达'], metrics: ['492,073', '31,805', '29.4%', '42.1%', '4.2%', '0.5%', '0.2%'], behaviorScore: '2.7', qualityScore: '2.2', aux: ['低', '中', '语言训练', '轻松活泼'], rating: 'D', reason: '知识错误', palette: ['#a65c55', '#e59b73', '#f3d598'] },
  { id: 'v_20261112_008319', title: '一粒米的旅行：从稻田到餐桌', duration: '02:38', authorName: '田野观察员', authorId: 'u_1094205', knowledge: ['科学探索', '生命科学', '植物生长'], metrics: ['381,220', '27,412', '17.5%', '70.4%', '9.8%', '2.3%', '1.4%'], behaviorScore: '4.8', qualityScore: '4.5', aux: ['低', '中', '自然观察', '纪实温暖'], rating: '', reason: '', palette: ['#2f6552', '#79b38c', '#ead18e'] },
  { id: 'v_20261112_008277', title: '为什么古代人把春节叫作“年”？', duration: '01:56', authorName: '故事里的历史', authorId: 'org_203986', knowledge: ['人文历史', '传统文化', '节气民俗'], metrics: ['275,098', '18,640', '31.7%', '38.5%', '3.9%', '0.4%', '0.2%'], behaviorScore: '2.9', qualityScore: '2.8', aux: ['中', '低', '历史故事', '故事叙述'], rating: 'D', reason: '', palette: ['#6b3b42', '#c17b69', '#e8bd75'] }
];

const extraVideos = [
  ['v_20261112_008201', '为什么水滴是圆的？', '01:36', '好奇研究所', 'u_1057021', ['科学探索', '物理世界', '力与运动'], ['264,801', '21,942', '22.1%', '57.4%', '7.2%', '1.0%', '0.6%'], '4.1', '4.0', ['低', '中', '科学解释', '实验观察'], '', '', ['#28536e', '#6aa5b0', '#e2c384']],
  ['v_20261112_008175', '认识汉字里的象形秘密', '02:05', '字里有故事', 'u_1038177', ['语言表达', '语言积累', '汉字认知'], ['198,302', '16,520', '26.2%', '51.3%', '5.6%', '0.7%', '0.3%'], '3.5', '3.9', ['低', '中', '语言积累', '图文讲解'], '', '', ['#704b70', '#b484bc', '#e6c6a0']],
  ['v_20261112_008109', '一张地图看懂丝绸之路', '02:48', '历史放大镜', 'org_201377', ['人文历史', '历史故事', '世界历史'], ['173,905', '12,906', '19.8%', '61.2%', '6.9%', '1.3%', '0.7%'], '4.3', '4.6', ['中', '高', '历史故事', '地图叙事'], '', '', ['#4e4b60', '#9e8d94', '#dbbd7a']],
  ['v_20261112_008064', '小实验：纸飞机怎样飞得更远？', '01:27', '动手实验室', 'u_1077610', ['科学探索', '物理世界', '力与运动'], ['149,728', '10,440', '23.4%', '54.8%', '6.1%', '0.9%', '0.4%'], '3.9', '3.7', ['低', '中', '动手实验', '轻松活泼'], '', '', ['#3d6e62', '#80b49d', '#edc888']],
  ['v_20261112_008011', '认识分数：披萨怎么公平分？', '01:54', '数学小队长', 'u_1021178', ['数学思维', '数与运算', '数字启蒙'], ['116,492', '9,312', '27.6%', '48.7%', '5.2%', '0.6%', '0.3%'], '3.2', '3.5', ['低', '中', '数学启蒙', '场景教学'], '', '', ['#59658e', '#9fa9da', '#e7c485']],
  ['v_20261112_007982', '四季为什么会轮换？', '02:22', '自然课代表', 'u_1087102', ['科学探索', '地球与宇宙', '天气变化'], ['94,520', '7,641', '30.2%', '44.1%', '4.8%', '0.5%', '0.2%'], '2.8', '3.1', ['中', '低', '自然科普', '故事叙述'], '', '', ['#4b6379', '#8fb4b3', '#e7bf83']],
  ['v_20261112_007954', '古诗里的春风到底是什么风？', '01:40', '小鹿语文课', 'u_1069280', ['语言表达', '阅读理解', '古诗词'], ['83,114', '6,410', '28.3%', '46.9%', '4.6%', '0.5%', '0.2%'], '2.9', '2.7', ['中', '低', '古诗词', '诗意讲解'], '', '', ['#785a73', '#b9949c', '#e8c889']],
  ['v_20261112_007901', '博物馆里的一件青铜器', '02:31', '故事里的历史', 'org_203986', ['人文历史', '传统文化', '艺术审美'], ['64,902', '5,318', '33.1%', '36.8%', '3.1%', '0.3%', '0.1%'], '2.4', '2.5', ['中', '低', '文化故事', '展品导览'], '', '', ['#5d4351', '#b27774', '#d6b77e']],
  ['v_20261112_007866', '风从哪里来？', '01:29', '自然课代表', 'u_1087102', ['科学探索', '地球与宇宙', '天气变化'], ['51,203', '4,201', '29.9%', '47.2%', '4.9%', '0.4%', '0.2%'], '3.1', '3.3', ['低', '中', '自然科普', '问答讲解'], '', '', ['#31556a', '#70aeb0', '#e8c78b']],
  ['v_20261112_007841', '数字 0 是怎么被发明的？', '02:16', '数学小队长', 'u_1021178', ['数学思维', '数与运算', '数字启蒙'], ['47,890', '3,875', '25.7%', '52.6%', '5.7%', '0.6%', '0.3%'], '3.4', '3.8', ['低', '中', '数学故事', '历史叙述'], '', '', ['#4e557f', '#8799ce', '#e7c785']],
  ['v_20261112_007818', '一封家书里的古代生活', '02:42', '故事里的历史', 'org_203986', ['人文历史', '历史故事', '中国古代史'], ['38,542', '3,210', '34.8%', '35.5%', '2.8%', '0.2%', '0.1%'], '2.2', '2.6', ['中', '低', '历史故事', '情景演绎'], '', '', ['#63454e', '#a97878', '#dfbd7f']],
  ['v_20261112_007790', '彩虹为什么有七种颜色？', '01:38', '好奇研究所', 'u_1057021', ['科学探索', '物理世界', '光与声音'], ['29,804', '2,508', '22.4%', '58.9%', '6.4%', '0.8%', '0.4%'], '3.8', '4.2', ['低', '中', '科学解释', '动画演示'], '', '', ['#28506c', '#7e9ed0', '#e8b475']],
  ['v_20261112_007742', '云为什么不会掉下来？', '01:46', '自然课代表', 'u_1087102', ['科学探索', '地球与宇宙', '天气变化'], ['21,408', '1,902', '24.8%', '55.7%', '5.9%', '0.7%', '0.3%'], '3.6', '3.9', ['低', '中', '自然科普', '动画讲解'], '', '', ['#3d5a71', '#79a8ba', '#e4bf80']]
].map(([id, title, duration, authorName, authorId, knowledge, metrics, behaviorScore, qualityScore, aux, rating, reason, palette]) => ({ id, title, duration, authorName, authorId, knowledge, metrics, behaviorScore, qualityScore, aux, rating, reason, palette }));

videos.push(...extraVideos);

const knowledgeTree = [
  { name: '科学探索', children: [{ name: '物理世界', children: ['电与电路', '力与运动', '光与声音'] }, { name: '生命科学', children: ['动物习性', '人体奥秘', '植物生长'] }, { name: '地球与宇宙', children: ['天气变化', '地理常识', '太空探索'] }] },
  { name: '数学思维', children: [{ name: '数与运算', children: ['数字启蒙', '计算技巧', '规律发现'] }, { name: '图形空间', children: ['图形认知', '空间想象', '测量基础'] }, { name: '逻辑推理', children: ['分类比较', '因果关系', '问题解决'] }] },
  { name: '语言表达', children: [{ name: '阅读理解', children: ['故事阅读', '信息提取', '古诗词'] }, { name: '表达沟通', children: ['口语表达', '写作入门', '演讲表达'] }, { name: '语言积累', children: ['词语积累', '汉字认知', '成语典故'] }] },
  { name: '人文历史', children: [{ name: '历史故事', children: ['中国古代史', '世界历史', '人物故事'] }, { name: '传统文化', children: ['节气民俗', '艺术审美', '经典国学'] }, { name: '社会认知', children: ['职业启蒙', '公共规则', '生活常识'] }] }
];

let filteredVideos = [...videos];
let currentVideoId = '';
let treeSelection = { level1: '', level2: '', level3: '' };
let evaluationStarted = false;
let activeBatch = [];
let batchPage = 0;
let sortState = { key: '', direction: 0 };
let pageMode = window.location.hash === '#all-videos' ? 'all' : 'quality';
if (!window.location.hash || window.location.hash === '#queue') window.history.replaceState(null, '', '#quality');

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const escapeHtml = (value) => String(value ?? '').replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));

function coverDataUri(video) {
  const [one, two, three] = video.palette;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 260"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${one}"/><stop offset=".58" stop-color="${two}"/><stop offset="1" stop-color="${three}"/></linearGradient><radialGradient id="r"><stop stop-color="#fff" stop-opacity=".7"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient></defs><rect width="400" height="260" fill="url(#g)"/><circle cx="320" cy="66" r="130" fill="url(#r)"/><path d="M0 205c72-45 112 16 178-18 68-35 109-19 222 12v61H0z" fill="#10223b" fill-opacity=".4"/><path d="M54 120h112M54 138h76M245 158h85" stroke="#fff" stroke-opacity=".46" stroke-width="4" stroke-linecap="round"/><circle cx="100" cy="177" r="31" fill="none" stroke="#fff" stroke-opacity=".5" stroke-width="4"/><text x="24" y="39" fill="#fff" font-family="Arial" font-size="13" letter-spacing="3">TTXUE / REVIEW</text><text x="24" y="79" fill="#fff" font-family="Arial" font-size="23" font-weight="700">${escapeHtml(video.knowledge[2])}</text></svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function ratingLabel(rating) { return rating ? `已评 ${rating}` : '待评估'; }
function ratingClass(rating) { return rating === 'D' ? 'danger' : rating === 'S' ? 'excellent' : rating === 'A' ? 'approved' : 'pending'; }
function sourceVideos() {
  if (pageMode === 'all') return videos;
  return evaluationStarted ? activeBatch : videos.filter((item) => !item.rating);
}
function operatorName(item) { return item.operator || (item.rating ? '林审核' : '—'); }
function sortVideos(items) {
  if (!sortState.key || !sortState.direction) return [...items];
  return [...items].sort((left, right) => (Number(left[sortState.key]) - Number(right[sortState.key])) * sortState.direction);
}
function sortIndicator(key) {
  if (sortState.key !== key || !sortState.direction) return '↕';
  return sortState.direction === 1 ? '↑' : '↓';
}
function renderKnowledgeFilter() {
  const filter = $('#knowledgeFilter');
  const current = filter.value;
  const tags = [...new Set(videos.flatMap((item) => item.knowledge))].sort((left, right) => left.localeCompare(right, 'zh-CN'));
  filter.innerHTML = '<option value="all">全部知识点</option>' + tags.map((tag) => `<option value="${escapeHtml(tag)}">${escapeHtml(tag)}</option>`).join('');
  filter.value = tags.includes(current) ? current : 'all';
}

function updatePageChrome() {
  const isAllVideos = pageMode === 'all';
  document.title = isAllVideos ? '全部视频 · 天天学' : '视频质量评估 · 天天学';
  $('#qualityNav').classList.toggle('is-active', !isAllVideos);
  $('#allVideosNav').classList.toggle('is-active', isAllVideos);
  $('#pageRole').textContent = isAllVideos ? '超管 · 全部视频' : '基础运营 · 视频质量评估';
  $('#pageEyebrow').innerHTML = isAllVideos ? 'CONTENT CONTROL <span></span> ADMIN VIEW' : 'VIDEO QUALITY LAB <span></span> BATCH REVIEW';
  $('#pageTitle').textContent = isAllVideos ? '全部视频' : '视频质量评估';
  $('#pageDescription').textContent = isAllVideos ? '全量查看视频内容，支持直接打分、改判和修改知识点标签。' : '仅展示待评估内容，领取批次后完成知识点与质量评级。';
  $('#roleBadge').textContent = isAllVideos ? '超级管理员' : '基础运营';
  $('#reviewerAvatar').textContent = isAllVideos ? '管' : '林';
  $('#reviewerName').textContent = isAllVideos ? '超级管理员' : '林审核';
  $('#reviewerTeam').textContent = isAllVideos ? '内容治理 · 全量权限' : '基础运营 · 内容质量组';
  $('#startEvaluation').hidden = isAllVideos;
  $('#statusFilter').value = isAllVideos || evaluationStarted ? 'all' : 'pending';
}

function renderBatchControl() {
  const control = $('#batchControl');
  const notice = $('#queueNotice');
  const startButton = $('#startEvaluation');
  if (pageMode === 'all') {
    $('#listKicker').textContent = 'ALL CONTENT';
    $('#listTitle').textContent = '全部视频';
    startButton.hidden = true;
    control.innerHTML = '';
    notice.hidden = false;
    notice.className = 'queue-notice is-admin';
    notice.innerHTML = '<span class="notice-icon">管</span><div><strong>超管直改模式</strong><small>当前账号拥有全量视频权限，可直接修改知识点、打分或改判，无需领取评估批次。</small></div>';
    return;
  }
  if (!evaluationStarted) {
    $('#listKicker').textContent = 'PENDING REVIEW';
    $('#listTitle').textContent = '待评估视频';
    startButton.hidden = false;
    control.innerHTML = '';
    notice.hidden = false;
    notice.className = 'queue-notice is-locked';
    notice.innerHTML = '<span class="notice-icon">锁</span><div><strong>只读浏览模式</strong><small>点击右上角“开始评估”后，才可编辑标签、评级和改判。</small></div>';
    return;
  }
  $('#listKicker').textContent = 'REVIEW BATCH';
  $('#listTitle').textContent = `评估批次 ${batchPage}`;
  startButton.hidden = true;
  const completed = activeBatch.filter((item) => item.rating).length;
  const complete = activeBatch.length > 0 && completed === activeBatch.length;
  control.innerHTML = complete ? '<button class="next-batch-button" id="nextBatch" type="button">下一批 5 条 <span>→</span></button>' : `<span class="batch-progress">本批已完成 ${completed} / ${activeBatch.length}</span>`;
  notice.hidden = false;
  notice.className = `queue-notice ${complete ? 'is-complete' : ''}`;
  notice.innerHTML = complete ? '<span class="notice-icon">✓</span><div><strong>本批次已完成</strong><small>当前 10 条内容已提交，点击下一批继续领取 5 条新的待处理内容。</small></div>' : `<span class="notice-icon">⌁</span><div><strong>本批次已锁定给林审核</strong><small>已领取 ${activeBatch.length} 条内容 · 其他审核员不会重复拿到 · 锁定有效期 30 分钟 · 已完成 ${completed} 条</small></div>`;
}

function renderList() {
  renderBatchControl();
  $('#behaviorSortIndicator').textContent = sortIndicator('behaviorScore');
  $('#qualitySortIndicator').textContent = sortIndicator('qualityScore');
  $('#videoCount').textContent = `${filteredVideos.length} 条`;
  const list = $('#videoList');
  if (!filteredVideos.length) {
    list.innerHTML = '<div class="empty-state">没有匹配的视频，请调整搜索或筛选条件。</div>';
    return;
  }
  list.innerHTML = filteredVideos.map((item) => {
    const actionDisabled = pageMode === 'all' || evaluationStarted ? '' : 'disabled';
    return `
    <article class="video-row" data-video-id="${item.id}">
      <div class="video-main cell-content"><div class="row-cover"><img src="${coverDataUri(item)}" alt="${escapeHtml(item.title)}封面" /><span>${item.duration}</span></div><div class="row-title"><strong>${escapeHtml(item.title)}</strong><div class="row-id"><code>${item.id}</code><button class="icon-button" data-action="copy" title="复制视频 ID" ${actionDisabled}>⧉</button></div><div class="row-author"><span class="mini-avatar">${escapeHtml(item.authorName.slice(0, 1))}</span>${escapeHtml(item.authorName)} <i>${escapeHtml(item.authorId)}</i></div><a class="watch-link" href="../ugc平台/product-ops-demo/video-preview.mp4" target="_blank" rel="noreferrer">观看视频 ↗</a></div></div>
      <div class="knowledge-cell cell-content"><div class="tag-path">${item.knowledge.map((tag, index) => `<span class="path-tag ${index === 2 ? 'is-leaf' : ''}">${escapeHtml(tag)}</span>${index < 2 ? '<b>/</b>' : ''}`).join('')}</div><button class="edit-link" data-action="edit-knowledge" ${actionDisabled}>修改标签 <span>↗</span></button></div>
      <div class="behavior-cell cell-content"><div class="behavior-score"><span>AI 行为评分</span><strong>${item.behaviorScore}<small>/ 5</small></strong></div><div class="behavior-grid">${item.metrics.map((value, index) => `<div class="behavior-item"><small>${metricLabels[index]}</small><strong>${value}</strong></div>`).join('')}</div></div>
      <div class="aux-cell cell-content"><div class="quality-score"><span>AI 质量评分</span><strong>${item.qualityScore}<small>/ 5</small></strong></div><div class="aux-chip-list">${item.aux.map((tag, index) => `<span class="aux-chip tone-${index}"><b>${['门槛', '密度', '类型', '风格'][index]}</b>${escapeHtml(tag)}</span>`).join('')}</div></div>
      <div class="rating-cell cell-content"><div class="rating-status-row"><span class="status-pill ${ratingClass(item.rating)}">${ratingLabel(item.rating)}</span>${item.rating ? `<button class="rejudge-link" data-action="rejudge" ${actionDisabled}>改判</button>` : ''}</div><div class="row-rating-buttons"><button data-action="rating" data-rating="S" class="row-rating rating-s ${item.rating === 'S' ? 'is-selected' : ''}" ${actionDisabled}>S</button><button data-action="rating" data-rating="A" class="row-rating rating-a ${item.rating === 'A' ? 'is-selected' : ''}" ${actionDisabled}>A</button><button data-action="rating" data-rating="D" class="row-rating rating-d ${item.rating === 'D' ? 'is-selected' : ''}" ${actionDisabled}>D</button></div>${item.rating === 'D' ? `<div class="row-reason"><span>${item.reason ? `理由：${escapeHtml(item.reason)}` : '请选择备注理由'}</span><div>${['知识错误', '无知识', '画质太差'].map((reason) => `<button class="reason-chip ${item.reason === reason ? 'is-selected' : ''}" data-action="reason" data-reason="${reason}" ${actionDisabled}>${reason}</button>`).join('')}</div><input class="reason-input" data-action="manual-reason" value="${escapeHtml(item.manualReason || '')}" placeholder="补充人工备注" ${actionDisabled} />${item.reason ? '<small class="saved-note">已记录，可再次修改</small>' : ''}</div>` : ''}</div>
      <div class="operator-cell cell-content"><div class="operator-avatar">${operatorName(item) === '—' ? '—' : escapeHtml(operatorName(item).slice(0, 1))}</div><div><strong>${escapeHtml(operatorName(item))}</strong><small>${item.operator ? '最近打标' : item.rating ? '已有评估记录' : '待开始评估'}</small></div></div>
    </article>`;
  }).join('');
}

function applyFilters() {
  const keyword = $('#searchInput').value.trim().toLowerCase();
  const status = $('#statusFilter').value;
  const knowledge = $('#knowledgeFilter').value;
  filteredVideos = sourceVideos().filter((item) => {
    const matchKeyword = !keyword || [item.title, item.id, item.authorName, item.authorId].some((value) => value.toLowerCase().includes(keyword));
    const matchStatus = status === 'all' || (status === 'pending' ? !item.rating : item.rating === status);
    const matchKnowledge = knowledge === 'all' || item.knowledge.includes(knowledge);
    return matchKeyword && matchStatus && matchKnowledge;
  });
  filteredVideos = sortVideos(filteredVideos);
  renderList();
}

function renderTree() {
  const level1 = treeSelection.level1 ? knowledgeTree.find((item) => item.name === treeSelection.level1) : null;
  const level2 = level1?.children.find((item) => item.name === treeSelection.level2) || null;
  const columns = [{ title: '一级分类', values: knowledgeTree.map((item) => item.name), active: treeSelection.level1 }, { title: '二级分类', values: level1 ? level1.children.map((item) => item.name) : [], active: treeSelection.level2 }, { title: '三级知识点', values: level2 ? level2.children : [], active: treeSelection.level3 }];
  $('#treeColumns').innerHTML = columns.map((column, columnIndex) => `<div class="tree-column"><div class="tree-column-title">${column.title}<span>${column.values.length || '—'}</span></div><div class="tree-list">${column.values.length ? column.values.map((item) => `<button type="button" class="tree-item ${column.active === item ? 'is-active' : ''} ${columnIndex === 2 ? 'is-leaf' : ''}" data-level="${columnIndex + 1}" data-value="${item}">${columnIndex === 2 ? '<span class="leaf-dot">◇</span>' : '<span class="tree-caret">›</span>'}<span>${item}</span></button>`).join('') : '<div class="tree-empty">请先选择上一级</div>'}</div></div>`).join('');
  $('#confirmKnowledge').disabled = !(treeSelection.level1 && treeSelection.level2 && treeSelection.level3);
  $('#selectionHint').textContent = treeSelection.level3 ? `已选择：${treeSelection.level3}` : '请从左至右选择知识树';
  $$('.tree-item').forEach((button) => button.addEventListener('click', () => {
    const level = Number(button.dataset.level); const value = button.dataset.value;
    if (level === 1) treeSelection = { level1: value, level2: '', level3: '' };
    if (level === 2) treeSelection = { ...treeSelection, level2: value, level3: '' };
    if (level === 3) treeSelection = { ...treeSelection, level3: value };
    renderTree();
  }));
}

function openKnowledgeModal(item) {
  currentVideoId = item.id;
  treeSelection = { level1: item.knowledge[0], level2: item.knowledge[1], level3: item.knowledge[2] };
  $('#currentTreeLabel').textContent = item.knowledge.join(' / ');
  $('#knowledgeModal').hidden = false;
  document.body.classList.add('modal-open');
  renderTree();
}

function closeKnowledgeModal() { $('#knowledgeModal').hidden = true; document.body.classList.remove('modal-open'); }

function confirmKnowledge() {
  const item = videos.find((video) => video.id === currentVideoId);
  if (!item || !treeSelection.level3) return;
  item.knowledge = [treeSelection.level1, treeSelection.level2, treeSelection.level3];
  closeKnowledgeModal();
  renderKnowledgeFilter();
  applyFilters();
  showToast('知识点标签已更新');
}

function handleAction(event) {
  const button = event.target.closest('[data-action]');
  if (!button) return;
  const row = button.closest('[data-video-id]');
  const item = videos.find((video) => video.id === row.dataset.videoId);
  if (!item) return;
  if (button.dataset.action === 'edit-knowledge') return openKnowledgeModal(item);
  if (button.dataset.action === 'copy') {
    navigator.clipboard?.writeText(item.id).then(() => showToast('视频 ID 已复制')).catch(() => showToast(`视频 ID：${item.id}`));
    return;
  }
  if (button.dataset.action === 'rejudge') {
    showToast(`已进入改判模式：${item.title}`);
    row.querySelector('.row-rating-buttons')?.classList.add('is-rejudge');
    return;
  }
  if (button.dataset.action === 'rating') {
    item.rating = button.dataset.rating;
    if (item.rating !== 'D') item.reason = '';
    item.operator = '林审核';
    renderList();
    if (item.rating === 'D') showToast('请选择该视频的 D 类备注理由'); else showToast(`视频已标记为 ${item.rating} 类`);
    return;
  }
  if (button.dataset.action === 'reason') {
    item.rating = 'D'; item.reason = button.dataset.reason; item.operator = '林审核'; renderList(); showToast(`已记录理由：${item.reason}`);
  }
}

function showToast(message) { const toast = $('#toast'); toast.textContent = message; toast.classList.add('is-visible'); clearTimeout(showToast.timer); showToast.timer = setTimeout(() => toast.classList.remove('is-visible'), 2400); }

function startEvaluation() {
  if (pageMode === 'all') return showToast('全部视频页无需开始评估，可直接操作');
  const pending = videos.filter((item) => !item.rating);
  activeBatch = pending.slice(0, 10);
  if (!activeBatch.length) return showToast('当前没有新的待评估内容');
  evaluationStarted = true;
  batchPage = 1;
  $('#statusFilter').value = 'all';
  filteredVideos = sortVideos(activeBatch);
  renderList();
  showToast(`已请求并锁定 ${activeBatch.length} 条待评估内容`);
}

function nextBatch() {
  if (pageMode === 'all') return;
  const usedIds = new Set(activeBatch.map((item) => item.id));
  const pending = videos.filter((item) => !item.rating && !usedIds.has(item.id));
  activeBatch = pending.slice(0, 5);
  if (!activeBatch.length) return showToast('暂无更多新的待处理内容');
  batchPage += 1;
  $('#statusFilter').value = 'all';
  filteredVideos = sortVideos(activeBatch);
  renderList();
  showToast(`已请求下一批 ${activeBatch.length} 条新的待处理内容`);
}

function switchPage(mode, message = '') {
  pageMode = mode;
  $('#searchInput').value = '';
  $('#knowledgeFilter').value = 'all';
  $('#statusFilter').value = mode === 'all' || evaluationStarted ? 'all' : 'pending';
  sortState = { key: '', direction: 0 };
  updatePageChrome();
  renderKnowledgeFilter();
  applyFilters();
  if (message) showToast(message);
}

function refreshCurrentPage() {
  $('#searchInput').value = '';
  $('#knowledgeFilter').value = 'all';
  $('#statusFilter').value = pageMode === 'all' || evaluationStarted ? 'all' : 'pending';
  sortState = { key: '', direction: 0 };
  applyFilters();
  showToast(pageMode === 'all' ? '全部视频已刷新' : evaluationStarted ? '当前评估批次已刷新' : '待评估队列已刷新');
}

$('#batchControl').addEventListener('click', (event) => {
  if (event.target.closest('#nextBatch')) nextBatch();
});

$('#startEvaluation').addEventListener('click', startEvaluation);
$('#allVideosNav').addEventListener('click', (event) => {
  event.preventDefault();
  window.history.replaceState(null, '', '#all-videos');
  switchPage('all', '已进入全部视频管理页');
});
$('#qualityNav').addEventListener('click', (event) => {
  event.preventDefault();
  window.history.replaceState(null, '', '#quality');
  switchPage('quality', '已进入质量评估页');
});
window.addEventListener('hashchange', () => switchPage(window.location.hash === '#all-videos' ? 'all' : 'quality'));

$('#videoList').addEventListener('click', handleAction);
$('#videoList').addEventListener('input', (event) => {
  if (event.target.dataset.action !== 'manual-reason') return;
  const row = event.target.closest('[data-video-id]');
  const item = videos.find((video) => video.id === row?.dataset.videoId);
  if (item) item.manualReason = event.target.value;
});
$('#searchInput').addEventListener('input', applyFilters);
$('#filterButton').addEventListener('click', applyFilters);
$('#statusFilter').addEventListener('change', applyFilters);
$('#knowledgeFilter').addEventListener('change', applyFilters);
$$('.sort-trigger').forEach((button) => {
  button.addEventListener('click', () => {
    const key = button.dataset.sort;
    if (sortState.key === key) sortState.direction *= -1;
    else sortState = { key, direction: 1 };
    applyFilters();
  });
});
$('#refreshButton').addEventListener('click', refreshCurrentPage);
$('#closeKnowledge').addEventListener('click', closeKnowledgeModal);
$('#cancelKnowledge').addEventListener('click', closeKnowledgeModal);
$('#confirmKnowledge').addEventListener('click', confirmKnowledge);
$('#knowledgeModal').addEventListener('click', (event) => { if (event.target === $('#knowledgeModal')) closeKnowledgeModal(); });

updatePageChrome();
renderKnowledgeFilter();
applyFilters();
