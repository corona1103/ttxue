const videos = [
  { id: '333993-238826-1790784113163886105', title: '西瓜博士的原型真狗给大家见个面吧', business: '短视频大赛', producer: '个人创作者', author: { name: '龚明宣', id: 'u_102938' }, reviewer: '张审核', submittedAt: '2026-10-30 14:42', status: 'pending', duration: '00:28', scene: '宠物日常', ai: { risk: '低风险', reason: '未提供 AI 机器审核标签', tags: ['画面清晰', '无敏感内容'], safety: '通过', rules: 0 }, reviewTags: ['集团机审:通过', '安全风控:通过', '人工驳回说明:无'], specialTags: ['待关注'], authorTags: ['待关注'], workTags: [], finalResult: '待人工确认', finalBy: '—', finalAt: '—', reasons: [] },
  { id: '19cfb5da6c11439589d31602e980157d', title: '一個被芽坑带走的国君', business: '创作者中心', producer: '机构账号', author: { name: '历史小课堂', id: 'org_403592' }, reviewer: '李安全', submittedAt: '2026-10-30 13:26', status: 'approved', duration: '00:42', scene: '历史故事', ai: { risk: '低风险', reason: '模型检测未发现违规内容', tags: ['知识科普', '音画同步'], safety: '通过', rules: 0 }, reviewTags: ['集团机审:通过', '安全风控:通过', '人工驳回说明:无'], specialTags: ['优质'], authorTags: ['优质'], workTags: [], finalResult: '已通过', finalBy: '李安全', finalAt: '2026-10-30 14:11', reasons: [] },
  { id: 'a37e2cd11b7f4d14b45c9e14c60d7b8a', title: '你那里的秋天是什么样', business: '短视频大赛', producer: '个人创作者', author: { name: '秋日来信', id: 'u_778812' }, reviewer: '张审核', submittedAt: '2026-10-30 12:08', status: 'rejected', duration: '01:05', scene: '生活记录', ai: { risk: '中风险', reason: '检测到疑似外部平台水印', tags: ['外部水印', '需人工复核'], safety: '需关注', rules: 1 }, reviewTags: ['集团机审:风险', '安全风控:需关注', '人工驳回说明:有', 'P1:版权风险'], specialTags: ['存疑', '提醒'], authorTags: ['提醒-不通过率高'], workTags: ['存疑'], finalResult: '已驳回', finalBy: '张审核', finalAt: '2026-10-30 13:02', reasons: ['存在其他平台水印', '请补充原创声明'] },
  { id: 'b7d09f31e78b4a8e9050c8f152b1c2d3', title: '把春天装进一杯茶里', business: '创作者中心', producer: '官方账号', author: { name: '茶里春风', id: 'official_0088' }, reviewer: '李安全', submittedAt: '2026-10-29 18:54', status: 'approved', duration: '00:36', scene: '美食生活', ai: { risk: '低风险', reason: '画面与音频内容均通过模型检测', tags: ['食品安全', '画面合规'], safety: '通过', rules: 0 }, reviewTags: ['集团机审:通过', '安全风控:通过', '人工驳回说明:无'], specialTags: ['优质'], authorTags: ['优质'], workTags: [], finalResult: '已通过', finalBy: '李安全', finalAt: '2026-10-30 09:16', reasons: [] }
];

let logs = [
  { time: '2026-10-30 14:45', operator: '373834', operatorName: '张审核', type: '登录', target: '373834', result: '登录成功', status: 'approved', evidence: '—' },
  { time: '2026-10-30 14:34', operator: '403592', operatorName: '李安全', type: '登录', target: '403592', result: '登录成功', status: 'approved', evidence: '—' },
  { time: '2026-10-30 14:11', operator: '402797', operatorName: '李安全', type: '视频审核', target: '视频 #19cfb5da6c11439589d31602e980157d', result: '已通过', status: 'approved', evidence: '审核记录 · 提交时快照' },
  { time: '2026-10-30 13:18', operator: '402797', operatorName: '李安全', type: '视频审核', target: '视频 #a37e2cd11b7f4d14b45c9e14c60d7b8a', result: '待审核 → 已通过', status: 'approved', evidence: '首次审核 · AI 结果通过' },
  { time: '2026-10-30 13:02', operator: '402797', operatorName: '张审核', type: '改判', target: '视频 #a37e2cd11b7f4d14b45c9e14c60d7b8a', result: '已通过 → 已驳回', status: 'rejected', evidence: '外部平台水印 · 人工备注' },
  { time: '2026-10-30 11:42', operator: '401108', operatorName: '王复核', type: '改判', target: '视频 #a37e2cd11b7f4d14b45c9e14c60d7b8a', result: '已驳回 → 已通过', status: 'approved', evidence: '补充版权证明 · 二次复核' },
  { time: '2026-10-30 10:26', operator: '402797', operatorName: '张审核', type: '改判', target: '视频 #b7d09f31e78b4a8e9050c8f152b1c2d3', result: '通过 → 已通过', status: 'approved', evidence: '补充原创声明' }
];

let selectedId = videos[0].id;
let filteredVideos = [...videos];
let currentView = 'queue';
let selectedIds = new Set();
let batchAction = 'approve';
let currentLogGroups = new Map();
let activeLogGroupId = '';
let activeLogPage = 1;
const LOG_PAGE_SIZE = 10;
const authorTagOptions = ['高危-恶意投稿', '提醒-不通过率高', '待关注', '优质'];
const workTagOptions = ['存疑'];

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

const statusLabel = { pending: '待审核', approved: '已通过', rejected: '已驳回' };
const statusClass = (status) => status === 'pending' ? 'pending' : status === 'rejected' ? 'rejected' : 'approved';
const escapeHtml = (value) => String(value ?? '').replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));

function renderVideoList() {
  const list = $('#videoList');
  $('#resultCount').textContent = `${filteredVideos.length} 条`;
  $('#queueCount').textContent = videos.filter((video) => video.status === 'pending').length;
  if (!filteredVideos.length) {
    list.innerHTML = '<div class="empty-state">没有匹配的视频<br>请调整筛选条件后重试</div>';
    return;
  }
  list.innerHTML = filteredVideos.map((video) => `
    <article class="video-item ${video.id === selectedId ? 'is-selected' : ''}" data-video-id="${video.id}" tabindex="0" role="button" aria-label="查看 ${escapeHtml(video.title)}">
      <div class="video-item-top"><div class="video-item-heading"><input class="video-select" type="checkbox" data-select-video="${video.id}" ${selectedIds.has(video.id) ? 'checked' : ''} aria-label="选择 ${escapeHtml(video.title)}" /><div class="video-item-title">${escapeHtml(video.title)}</div></div><div class="video-item-statuses">${video.workTags.includes('存疑') ? '<span class="work-status-pill change-highlight-inline">存疑</span>' : ''}<span class="status-pill ${statusClass(video.status)}">${statusLabel[video.status]}</span></div></div>
      <div class="video-item-meta">${escapeHtml(video.submittedAt)} · ${escapeHtml(video.producer)}</div>
      <div class="video-item-author change-highlight-inline">作者：${escapeHtml(video.author.name)} <span>${escapeHtml(video.author.id)}</span>${video.authorTags.length ? `<span class="author-tag-inline">${video.authorTags.map((tag) => escapeHtml(tag)).join(' · ')}</span>` : ''}</div>
      <div class="video-item-id">视频 #${escapeHtml(video.id)}</div>
    </article>`).join('');
  $$('.video-item').forEach((item) => {
    item.addEventListener('click', (event) => { if (!event.target.closest('.video-select')) selectVideo(item.dataset.videoId); });
    item.addEventListener('keydown', (event) => { if (event.key === 'Enter' || event.key === ' ') selectVideo(item.dataset.videoId); });
  });
  $$('.video-select').forEach((checkbox) => checkbox.addEventListener('click', (event) => event.stopPropagation()));
  $$('.video-select').forEach((checkbox) => checkbox.addEventListener('change', () => { toggleSelection(checkbox.dataset.selectVideo, checkbox.checked); }));
  updateBatchToolbar();
}

function renderVideoStage(video) {
  if (!video) {
    $('#videoStage').innerHTML = '<div class="empty-state">暂无视频预览</div>';
    return;
  }
  $('#videoStage').innerHTML = `
    <div class="video-art"><div class="video-art-lines"></div></div>
    <div class="video-overlay"><h2>${escapeHtml(video.title)}</h2><p>${escapeHtml(video.business)} · ${escapeHtml(video.id)}</p><p class="video-author-line change-highlight-inline">作者：${escapeHtml(video.author.name)} · ${escapeHtml(video.author.id)}</p></div>
    <div class="video-center-copy"><div class="play-circle">▶</div><strong>${escapeHtml(video.scene)} · 固定占位画面</strong><small>此处模拟视频播放区域</small></div>
    <div class="video-controls"><div class="progress"><span></span></div><div class="controls-row"><div class="controls-left"><span class="control-play">▶</span><span>0:00 / ${escapeHtml(video.duration)}</span></div><span>◉　⛶　⋮</span></div></div>`;
}

function renderInsight(video) {
  if (!video) { $('#insightColumn').innerHTML = ''; return; }
  const reasons = video.reasons.length ? video.reasons.map((reason) => `<div class="reason-item">${escapeHtml(reason)}</div>`).join('') : '<div class="ai-message">请选择预置原因，或补充自定义说明</div>';
  const actionArea = video.status === 'pending' ? `
    <form class="reject-form" id="rejectForm">
      <label class="reason-label" for="rejectPreset">驳回理由</label>
      <select id="rejectPreset"><option value="">选择常用理由</option><option value="存在外部平台水印">存在外部平台水印</option><option value="内容与标题不符">内容与标题不符</option><option value="疑似重复投稿">疑似重复投稿</option><option value="素材版权信息不完整">素材版权信息不完整</option></select>
      <input id="rejectReason" type="text" placeholder="补充具体说明（可选）" />
      <div class="review-actions"><button class="approve-button" id="approveVideo" type="button">✓ 通过</button><button class="confirm-reject" type="submit">× 驳回</button></div>
    </form>` : `<div class="review-actions"><button class="ghost-button" type="button" disabled>本轮已完成审核</button></div>`;
  const authorTags = authorTagOptions.map((tag) => `<button class="tag-toggle ${video.authorTags.includes(tag) ? 'is-active' : ''}" data-tag-type="author" data-tag-value="${escapeHtml(tag)}" type="button">${video.authorTags.includes(tag) ? '✓ ' : '+ '}${escapeHtml(tag)}</button>`).join('');
  const workTags = workTagOptions.map((tag) => `<button class="tag-toggle ${video.workTags.includes(tag) ? 'is-active' : ''}" data-tag-type="work" data-tag-value="${escapeHtml(tag)}" type="button">${video.workTags.includes(tag) ? '✓ ' : '+ '}${escapeHtml(tag)}</button>`).join('');
  $('#insightColumn').innerHTML = `
    <section class="insight-card"><h3>当前最终结果 <span>${statusLabel[video.status]}</span></h3><div class="card-rule"></div><div class="result-detail"><strong>${escapeHtml(video.finalResult)}</strong><br>${escapeHtml(video.finalBy)} · ${escapeHtml(video.finalAt)}<br><span>${video.status === 'rejected' ? '可重新提交，需补充整改说明' : video.status === 'approved' ? '审核结论已生效' : '等待人工审核结论'}</span></div></section>
    <section class="insight-card tag-card change-highlight-panel"><h3>作者 / 作品标签 <span>可编辑</span></h3><div class="card-rule"></div><div class="tag-section-title">作者标签</div><div class="tag-toggle-list">${authorTags}</div><div class="tag-section-title">作品标签</div><div class="tag-toggle-list">${workTags}</div></section>
    <section class="insight-card"><h3>判罚理由 <span>${video.ai.rules}</span></h3><div class="card-rule"></div><div class="ai-message">${escapeHtml(video.ai.reason)}</div><div class="ai-tag-row">${video.ai.tags.map((tag) => `<span class="ai-tag">${escapeHtml(tag)}</span>`).join('')}</div></section>
    <section class="insight-card"><h3>安全风控 <span>AI 机器审核</span></h3><div class="card-rule"></div><div class="risk-state"><strong>${escapeHtml(video.ai.safety)}</strong><small>命中 ${video.ai.rules} 条规则</small></div></section>
    <section class="insight-card"><h3>驳回原因 <span>${video.reasons.length}</span></h3><div class="card-rule"></div><div class="reason-list">${reasons}</div>${actionArea}</section>`;
  bindReviewActions(video);
  bindTagActions(video);
}

function renderQueue() {
  renderVideoList();
  const selected = videos.find((video) => video.id === selectedId) || filteredVideos[0];
  if (selected && selected.id !== selectedId) selectedId = selected.id;
  renderVideoStage(selected);
  renderInsight(selected);
}

function selectVideo(id) { selectedId = id; renderQueue(); }

function getQueueFilters() {
  return { business: $('#businessFilter').value, producer: $('#producerFilter').value, authorName: $('#authorNameFilter').value.trim().toLowerCase(), authorId: $('#authorIdFilter').value.trim().toLowerCase(), keyword: $('#keywordFilter').value.trim().toLowerCase(), date: $('#dateFilter').value, status: $('#statusFilter').value, reviewer: $('#reviewerFilter').value, machineTags: $$('input[name="machineTagFilter"]:checked').map((input) => input.value), specialTags: $$('input[name="specialTagFilter"]:checked').map((input) => input.value), sort: $('#sortFilter').value };
}

function applyFilters() {
  const filter = getQueueFilters();
  filteredVideos = videos.filter((video) => {
    const keywordMatch = !filter.keyword || `${video.title} ${video.id}`.toLowerCase().includes(filter.keyword);
    const authorNameMatch = !filter.authorName || video.author.name.toLowerCase().includes(filter.authorName);
    const authorIdMatch = !filter.authorId || video.author.id.toLowerCase().includes(filter.authorId);
    const machineMatch = !filter.machineTags.length || filter.machineTags.some((tag) => video.reviewTags.includes(tag));
    const allSpecialTags = [...video.specialTags, ...video.authorTags.map((tag) => tag.split('-')[0]), ...video.workTags];
    const specialMatch = !filter.specialTags.length || filter.specialTags.some((tag) => allSpecialTags.includes(tag));
    return (!filter.business || video.business === filter.business) && (!filter.producer || video.producer === filter.producer) && authorNameMatch && authorIdMatch && keywordMatch && (!filter.date || video.submittedAt.startsWith(filter.date)) && (!filter.status || video.status === filter.status) && (!filter.reviewer || video.reviewer === filter.reviewer) && machineMatch && specialMatch;
  });
  filteredVideos.sort((a, b) => filter.sort === 'oldest' ? a.submittedAt.localeCompare(b.submittedAt) : b.submittedAt.localeCompare(a.submittedAt));
  if (!filteredVideos.some((video) => video.id === selectedId)) selectedId = filteredVideos[0]?.id || '';
  renderQueue();
}

function clearFilters() { ['businessFilter', 'producerFilter', 'dateFilter', 'statusFilter', 'reviewerFilter'].forEach((id) => { $(`#${id}`).value = ''; }); ['authorNameFilter', 'authorIdFilter', 'keywordFilter'].forEach((id) => { $(`#${id}`).value = ''; }); $$('input[name="machineTagFilter"],input[name="specialTagFilter"]').forEach((input) => { input.checked = false; }); $('#sortFilter').value = 'latest'; filteredVideos = [...videos]; selectedId = videos[0].id; selectedIds.clear(); updateMachineTagTrigger(); renderQueue(); }

function updateMachineTagTrigger() {
  const selected = $$('input[name="machineTagFilter"]:checked');
  const trigger = $('#machineTagTrigger');
  trigger.firstChild.textContent = selected.length ? `已选 ${selected.length} 项 ` : '选择机审、风控或驳回理由 ';
}

function toggleMachineTagMenu(force) {
  const menu = $('#machineTagMenu');
  const open = typeof force === 'boolean' ? force : menu.hidden;
  menu.hidden = !open;
  $('#machineTagTrigger').setAttribute('aria-expanded', String(open));
}

function addLog(video, result, type = '视频审核', evidence = '审核记录 · 提交时快照') {
  const now = new Date();
  const time = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  logs.unshift({ time, operator: '402797', operatorName: '张审核', type, target: `视频 #${video.id}`, result, status: video.status, evidence });
}

function bindReviewActions(video) {
  const approve = $('#approveVideo');
  if (approve) approve.addEventListener('click', () => { const previous = video.finalResult; video.status = 'approved'; video.finalResult = '已通过'; video.finalBy = '张审核'; video.finalAt = '刚刚'; video.reasons = []; addLog(video, `${previous || '待审核'} → 已通过`); filteredVideos = videos.filter((item) => filteredVideos.some((filtered) => filtered.id === item.id)); renderQueue(); showToast('审核通过，已写入操作记录'); });
  const rejectForm = $('#rejectForm');
  if (rejectForm) rejectForm.addEventListener('submit', (event) => { event.preventDefault(); const preset = $('#rejectPreset').value.trim(); const custom = $('#rejectReason').value.trim(); const reason = [preset, custom].filter(Boolean).join('：'); if (!reason) { showToast('请选择或填写驳回理由'); return; } const previous = video.finalResult; video.status = 'rejected'; video.finalResult = '已驳回'; video.finalBy = '张审核'; video.finalAt = '刚刚'; video.reasons = [reason]; addLog(video, `${previous || '待审核'} → 已驳回`, '改判', `人工驳回说明 · ${reason}`); filteredVideos = videos.filter((item) => filteredVideos.some((filtered) => filtered.id === item.id)); renderQueue(); showToast('已驳回，理由已写入操作记录'); });
}

function bindTagActions(video) {
  $$('.tag-toggle').forEach((button) => button.addEventListener('click', () => {
    const target = button.dataset.tagType === 'author' ? video.authorTags : video.workTags;
    const tag = button.dataset.tagValue;
    const index = target.indexOf(tag);
    if (index === -1) target.push(tag); else target.splice(index, 1);
    video.specialTags = [...new Set([...video.authorTags.flatMap((item) => item.split('-').slice(0, 1)), ...video.workTags])];
    renderQueue();
    showToast(`${button.dataset.tagType === 'author' ? '作者' : '作品'}标签已更新`);
  }));
}

function toggleSelection(id, checked) {
  if (checked) selectedIds.add(id); else selectedIds.delete(id);
  updateBatchToolbar();
}

function updateBatchToolbar() {
  const visibleIds = filteredVideos.map((video) => video.id);
  const visibleSelected = visibleIds.filter((id) => selectedIds.has(id));
  $('#selectedSummary').textContent = `已选 ${selectedIds.size} 条`;
  $('#openBatchAction').disabled = selectedIds.size === 0;
  const selectAll = $('#selectAllVideos');
  selectAll.checked = visibleIds.length > 0 && visibleSelected.length === visibleIds.length;
  selectAll.indeterminate = visibleSelected.length > 0 && visibleSelected.length < visibleIds.length;
}

function getSelectedVideos() { return videos.filter((video) => selectedIds.has(video.id)); }

function openBatchModal() {
  const selected = getSelectedVideos();
  if (!selected.length) { showToast('请先选择要批量处理的视频'); return; }
  $('#batchDescription').textContent = `当前已选择 ${selected.length} 条视频，批量操作会同步更新审核结论。`;
  $('#batchAction').value = 'approve';
  $('#batchReasonPreset').value = '';
  $('#batchReasonInput').value = '';
  $('#batchReasonFields').hidden = true;
  $('#batchStepForm').hidden = false;
  $('#batchStepConfirm').hidden = true;
  $('#batchModal').hidden = false;
}

function closeBatchModal() { $('#batchModal').hidden = true; }

function showBatchConfirm() {
  batchAction = $('#batchAction').value;
  if (batchAction === 'reject' && !$('#batchReasonPreset').value) { showToast('批量驳回需要选择理由标签'); return; }
  const selected = getSelectedVideos();
  const actionText = batchAction === 'approve' ? '批量通过' : '批量驳回';
  const reason = [$('#batchReasonPreset').value, $('#batchReasonInput').value.trim()].filter(Boolean).join('：');
  $('#batchConfirmText').textContent = `${actionText} ${selected.length} 条视频${reason ? `，理由：${reason}` : ''}。确认后将写入操作记录。`;
  $('#batchStepForm').hidden = true;
  $('#batchStepConfirm').hidden = false;
}

function executeBatchAction() {
  const selected = getSelectedVideos();
  const reason = [$('#batchReasonPreset').value, $('#batchReasonInput').value.trim()].filter(Boolean).join('：');
  selected.forEach((video) => {
    const previous = video.finalResult || '待审核';
    video.status = batchAction === 'approve' ? 'approved' : 'rejected';
    video.finalResult = batchAction === 'approve' ? '已通过' : '已驳回';
    video.finalBy = '张审核'; video.finalAt = '刚刚';
    if (batchAction === 'reject') { video.reasons = [reason]; video.reviewTags = video.reviewTags.filter((tag) => !tag.startsWith('人工驳回说明:')); video.reviewTags.push('人工驳回说明:有'); }
    else { video.reasons = []; video.reviewTags = video.reviewTags.filter((tag) => !tag.startsWith('人工驳回说明:')); video.reviewTags.push('人工驳回说明:无'); }
    addLog(video, `${previous} → ${video.finalResult}`, '改判', `批量操作 · ${reason || '审核结论更新'}`);
  });
  selectedIds.clear();
  closeBatchModal();
  filteredVideos = [...videos];
  renderQueue();
  showToast(`已完成${batchAction === 'approve' ? '批量通过' : '批量驳回'}，共 ${selected.length} 条`);
}

function groupLogsByVideo(list) {
  const grouped = new Map();
  list.forEach((log) => {
    if (!log.target.startsWith('视频 #')) return;
    const key = log.target;
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key).push(log);
  });
  return [...grouped.entries()];
}

function renderLogs(list = logs) {
  const groups = groupLogsByVideo(list);
  currentLogGroups = new Map(groups.map(([target, entries], index) => [`log-group-${index}`, { target, entries }]));
  $('#logCount').textContent = groups.length;
  if (!groups.length) {
    $('#logsBody').innerHTML = '<tr><td colspan="6"><div class="empty-state">暂无符合条件的操作记录</div></td></tr>';
    return;
  }
  $('#logsBody').innerHTML = groups.map(([target, entries], index) => {
    const groupId = `log-group-${index}`;
    const videoId = target.replace('视频 #', '');
    const video = videos.find((item) => videoId === item.id);
    const title = video ? video.title : '未匹配视频';
    const latest = entries[0];
    const finalStatus = video ? video.status : latest.status;
    const finalResult = video ? normalizeResult(video.finalResult) : normalizeResult(latest.result);
    const changes = entries.filter((log) => log.type === '改判' || log.result.includes('→')).length;
    const recent = entries.slice(0, 2).map((log) => `<span class="operation-summary-item"><b>${escapeHtml(formatShortDate(log.time))}</b> ${escapeHtml(log.operatorName)} <em>${escapeHtml(normalizeResult(log.result))}</em></span>`).join('');
    const notes = entries.slice(0, 2).map((log) => `<span class="operation-note-item">${escapeHtml(log.evidence || '暂无审核说明')}</span>`).join('');
    const moreButton = entries.length > 2 ? '<button class="more-log-button change-highlight-button" type="button">展开更多</button>' : '';
    return `<tr class="log-list-row"><td><div class="log-video-cell"><strong>${escapeHtml(title)}</strong><small>${escapeHtml(target)}</small></div></td><td class="change-highlight-cell"><span class="status-pill ${statusClass(finalStatus)}">${escapeHtml(finalResult)}</span></td><td class="change-highlight-cell"><div class="operation-summary clickable-operation" data-open-log="${groupId}" role="button" tabindex="0" title="查看详细操作记录">${recent}</div>${moreButton}</td><td class="change-highlight-cell"><div class="operation-notes">${notes}</div></td><td><span class="change-count">${changes} 次改判</span></td><td><span class="latest-log-time">${escapeHtml(latest.time)}</span></td></tr>`;
  }).join('');
  $$('[data-open-log]').forEach((button) => {
    button.addEventListener('click', (event) => { event.stopPropagation(); openLogDetail(button.dataset.openLog); });
    button.addEventListener('keydown', (event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openLogDetail(button.dataset.openLog); } });
    const moreButton = button.parentElement.querySelector('.more-log-button');
    if (moreButton) moreButton.addEventListener('click', (event) => { event.stopPropagation(); openLogDetail(button.dataset.openLog); });
  });
}

function formatShortDate(value) { const match = String(value).match(/\d{4}-(\d{2})-(\d{2})/); return match ? `${match[1]}${match[2]}` : value; }
function normalizeResult(value) { return String(value).replace(/已/g, '').replace(/待审核/g, '待审').replace(/\s*→\s*/g, '→'); }

function openLogDetail(groupId) {
  const group = currentLogGroups.get(groupId);
  if (!group) return;
  activeLogGroupId = groupId;
  activeLogPage = 1;
  const videoId = group.target.replace('视频 #', '');
  const video = videos.find((item) => item.id === videoId);
  $('#logDetailTitle').textContent = video ? video.title : '完整操作记录';
  $('#logDetailTarget').textContent = group.target;
  renderLogDetailPage();
  $('#logDetailModal').hidden = false;
}

function renderLogDetailPage() {
  const group = currentLogGroups.get(activeLogGroupId);
  if (!group) return;
  const totalPages = Math.max(1, Math.ceil(group.entries.length / LOG_PAGE_SIZE));
  activeLogPage = Math.min(Math.max(activeLogPage, 1), totalPages);
  const start = (activeLogPage - 1) * LOG_PAGE_SIZE;
  const pageItems = group.entries.slice(start, start + LOG_PAGE_SIZE);
  $('#logDetailList').innerHTML = pageItems.map((log) => `<div class="detail-log-row"><div class="detail-log-time"><small>操作时间</small>${escapeHtml(log.time)}</div><div class="detail-log-operator"><small>操作人</small><strong>${escapeHtml(log.operatorName)}</strong><em>${escapeHtml(log.operator)}</em></div><div class="detail-log-type"><small>操作类型</small>${escapeHtml(log.type)}</div><div class="detail-log-result"><small>审核结果变更</small><span class="status-pill ${statusClass(log.status)}">${escapeHtml(log.result)}</span></div><div class="detail-log-evidence"><small>审核说明</small>${escapeHtml(log.evidence || '暂无审核说明')}</div></div>`).join('');
  $('#logPageSummary').textContent = `第 ${activeLogPage} / ${totalPages} 页 · 共 ${group.entries.length} 条`;
  $('#logPrevPage').disabled = activeLogPage === 1;
  $('#logNextPage').disabled = activeLogPage === totalPages;
}

function closeLogDetail() { $('#logDetailModal').hidden = true; }

function applyLogFilters() {
  const type = $('#logTypeFilter').value; const operator = $('#operatorFilter').value.trim().toLowerCase(); const target = $('#targetFilter').value.trim().toLowerCase();
  renderLogs(logs.filter((log) => (!type || log.type === type) && (!operator || `${log.operator} ${log.operatorName}`.toLowerCase().includes(operator)) && (!target || log.target.toLowerCase().includes(target))));
}

function resetLogFilters() { $('#logTypeFilter').value = ''; $('#operatorFilter').value = ''; $('#targetFilter').value = ''; renderLogs(); }

function showToast(message) { const toast = $('#toast'); toast.textContent = message; toast.classList.add('is-visible'); window.clearTimeout(showToast.timer); showToast.timer = window.setTimeout(() => toast.classList.remove('is-visible'), 2400); }

function switchView(view) { currentView = view; $$('.nav-item').forEach((item) => item.classList.toggle('is-active', item.dataset.view === view)); $('#queueView').classList.toggle('is-visible', view === 'queue'); $('#logsView').classList.toggle('is-visible', view === 'logs'); if (view === 'logs') renderLogs(); }

$$('.nav-item').forEach((item) => item.addEventListener('click', () => switchView(item.dataset.view)));
$('#applyFilters').addEventListener('click', applyFilters);
$('#clearFilters').addEventListener('click', clearFilters);
$('#machineTagTrigger').addEventListener('click', () => toggleMachineTagMenu());
$$('input[name="machineTagFilter"]').forEach((input) => input.addEventListener('change', updateMachineTagTrigger));
document.addEventListener('click', (event) => { if (!event.target.closest('#machineTagSelect')) toggleMachineTagMenu(false); });
$('#applyLogFilters').addEventListener('click', applyLogFilters);
$('#resetLogFilters').addEventListener('click', resetLogFilters);
$('#keywordFilter').addEventListener('keydown', (event) => { if (event.key === 'Enter') applyFilters(); });
$('#selectAllVideos').addEventListener('change', (event) => { filteredVideos.forEach((video) => event.target.checked ? selectedIds.add(video.id) : selectedIds.delete(video.id)); renderVideoList(); });
$('#openBatchAction').addEventListener('click', openBatchModal);
$('#closeBatchModal').addEventListener('click', closeBatchModal);
$('#batchAction').addEventListener('change', () => { $('#batchReasonFields').hidden = $('#batchAction').value !== 'reject'; });
$('#batchNext').addEventListener('click', showBatchConfirm);
$('#batchBack').addEventListener('click', () => { $('#batchStepConfirm').hidden = true; $('#batchStepForm').hidden = false; });
$('#batchConfirm').addEventListener('click', executeBatchAction);
$('#batchModal').addEventListener('click', (event) => { if (event.target.id === 'batchModal') closeBatchModal(); });
$('#closeLogDetail').addEventListener('click', closeLogDetail);
$('#logPrevPage').addEventListener('click', () => { activeLogPage -= 1; renderLogDetailPage(); });
$('#logNextPage').addEventListener('click', () => { activeLogPage += 1; renderLogDetailPage(); });
$('#logDetailModal').addEventListener('click', (event) => { if (event.target.id === 'logDetailModal') closeLogDetail(); });

renderQueue();
renderLogs();
