const collections = [
  { id: "COL-202610-018", title: "小小发明家：科学实验课", author: "周老师的奇妙课", authorId: "AUTH-10018", source: "PGC", paid: true, episodes: 18, plays: 128430, completion: 72, revenue: 28460, status: "on", updated: "2026-10-28 09:18", cover: "发", coverClass: "cover-1", summary: "从生活现象出发，带孩子做 18 个有趣实验。", episodesData: ["会跳舞的葡萄干", "纸桥承重挑战", "自制彩虹雨", "空气炮小实验"] },
  { id: "COL-202610-021", title: "给孩子的情绪小课", author: "林间心理屋", authorId: "AUTH-10021", source: "UGC", paid: true, episodes: 12, plays: 96420, completion: 68, revenue: 17690, status: "on", updated: "2026-10-27 16:42", cover: "情", coverClass: "cover-2", summary: "用故事和练习，帮助孩子识别并表达情绪。", episodesData: ["我为什么会生气", "和紧张相处", "今天我很开心", "给情绪起个名字"] },
  { id: "COL-202610-024", title: "绘本里的中国故事", author: "朵朵讲故事", authorId: "AUTH-10024", source: "UGC", paid: false, episodes: 24, plays: 205670, completion: 81, revenue: 12540, status: "on", updated: "2026-10-27 14:08", cover: "绘", coverClass: "cover-3", summary: "从经典绘本认识中国节气、风物和人物。", episodesData: ["夸父追日", "年兽的传说", "神农尝百草", "愚公移山"] },
  { id: "COL-202610-031", title: "AI 时代的创意写作", author: "墨水工作室", authorId: "AUTH-10031", source: "PGC", paid: true, episodes: 9, plays: 73880, completion: 59, revenue: 21320, status: "on", updated: "2026-10-26 11:36", cover: "写", coverClass: "cover-4", summary: "把灵感变成故事，掌握 AI 辅助创作的方法。", episodesData: ["灵感从哪里来", "人物弧光练习", "AI 不是代笔", "完成你的第一篇小说"] },
  { id: "COL-202610-035", title: "小小建筑师", author: "大象叔叔", authorId: "AUTH-10035", source: "UGC", paid: false, episodes: 15, plays: 112090, completion: 74, revenue: 8420, status: "on", updated: "2026-10-25 18:12", cover: "筑", coverClass: "cover-5", summary: "观察身边的建筑，动手搭建自己的城市。", episodesData: ["房子为什么站得住", "桥梁的秘密", "我的未来城市", "城市里的光"] },
  { id: "COL-202610-041", title: "小小音乐家：节奏启蒙", author: "橙子老师", authorId: "AUTH-10041", source: "PGC", paid: true, episodes: 16, plays: 88760, completion: 63, revenue: 16280, status: "off", updated: "2026-10-22 10:21", cover: "乐", coverClass: "cover-3", summary: "从拍手和身体律动开始，认识节奏与旋律。", episodesData: ["身体是乐器", "认识四分音符", "一起做节拍器", "给故事配音乐"] }
];

const microCourseItems = [
  { collectionId: "COL-202610-018", subject: "科学", category: "科学启蒙", order: 1, effective: "2026-10-01", exposure: 248600, clicks: 17240, status: "on" },
  { collectionId: "COL-202610-021", subject: "心理", category: "成长心理", order: 2, effective: "2026-10-06", exposure: 201450, clicks: 12870, status: "on" },
  { collectionId: "COL-202610-024", subject: "语文", category: "人文故事", order: 3, effective: "2026-10-13", exposure: 185390, clicks: 11940, status: "on" },
  { collectionId: "COL-202610-031", subject: "艺术", category: "创意表达", order: 4, effective: "2026-10-20", exposure: 130220, clicks: 7480, status: "on" }
];

const incomeRows = [
  { date: "10-28", author: "周老师的奇妙课", collection: "小小发明家：科学实验课", orders: 86, gross: 5160, share: 2846, fee: 2314, status: "待结算" },
  { date: "10-27", author: "林间心理屋", collection: "给孩子的情绪小课", orders: 61, gross: 3660, share: 2013, fee: 1647, status: "待结算" },
  { date: "10-27", author: "朵朵讲故事", collection: "绘本里的中国故事", orders: 48, gross: 2880, share: 1584, fee: 1296, status: "已结算" },
  { date: "10-26", author: "墨水工作室", collection: "AI 时代的创意写作", orders: 41, gross: 2460, share: 1353, fee: 1107, status: "已结算" },
  { date: "10-25", author: "大象叔叔", collection: "小小建筑师", orders: 33, gross: 1980, share: 1089, fee: 891, status: "已结算" },
  { date: "10-24", author: "橙子老师", collection: "小小音乐家：节奏启蒙", orders: 28, gross: 1680, share: 924, fee: 756, status: "已结算" },
  { date: "10-23", author: "周老师的奇妙课", collection: "小小发明家：科学实验课", orders: 72, gross: 4320, share: 2376, fee: 1944, status: "已结算" },
  { date: "10-22", author: "林间心理屋", collection: "给孩子的情绪小课", orders: 36, gross: 2160, share: 1188, fee: 972, status: "已结算" },
  { date: "09-28", author: "周老师的奇妙课", collection: "小小发明家：科学实验课", orders: 64, gross: 3840, share: 2112, fee: 1728, status: "已结算" },
  { date: "09-23", author: "林间心理屋", collection: "给孩子的情绪小课", orders: 42, gross: 2520, share: 1386, fee: 1134, status: "已结算" },
  { date: "09-18", author: "朵朵讲故事", collection: "绘本里的中国故事", orders: 35, gross: 2100, share: 1155, fee: 945, status: "已结算" }
];

incomeRows.forEach((row, index) => {
  const collection = collections.find((item) => item.title === row.collection);
  row.month = `2026-${row.date.slice(0, 2)}`;
  row.authorId = collection?.authorId || `AUTH-${10000 + index}`;
  row.refund = [120, 80, 0, 60, 0, 40, 100, 30][index] || 0;
});

const creatorAccounts = [
  { author: "周老师的奇妙课", authorId: "AUTH-10018", phone: "13800001018", verified: "done", contract: "done", bank: "done", enterprise: "天天学教研工作室", risk: "normal", riskText: "正常", riskDetail: "未发现异常" },
  { author: "林间心理屋", authorId: "AUTH-10021", phone: "13800001021", verified: "done", contract: "done", bank: "done", enterprise: "林间心理屋工作室", risk: "watch", riskText: "需关注", riskDetail: "疑似恶意洗稿 · 相似度命中 2 次" },
  { author: "朵朵讲故事", authorId: "AUTH-10024", phone: "13800001024", verified: "done", contract: "pending", bank: "pending", enterprise: "个人主体", risk: "normal", riskText: "正常", riskDetail: "未发现异常" },
  { author: "墨水工作室", authorId: "AUTH-10031", phone: "13800001031", verified: "done", contract: "done", bank: "done", enterprise: "墨水内容工作室", risk: "review", riskText: "需复核", riskDetail: "疑似刷单作弊 · 订单行为异常" },
  { author: "大象叔叔", authorId: "AUTH-10035", phone: "13800001035", verified: "done", contract: "done", bank: "done", enterprise: "个人主体", risk: "normal", riskText: "正常", riskDetail: "未发现异常" },
  { author: "橙子老师", authorId: "AUTH-10041", phone: "13800001041", verified: "pending", contract: "pending", bank: "pending", enterprise: "个人主体", risk: "profile", riskText: "需补资料", riskDetail: "实名认证资料未齐全" }
];

const bdOwners = [
  { employeeId: "BD-1024", name: "陈思远" },
  { employeeId: "BD-1038", name: "许安然" },
  { employeeId: "BD-1066", name: "沈知行" }
];
creatorAccounts.forEach((account) => { account.bdOwnerId = ""; account.bdOwnerName = ""; });

const creatorObservationRows = [
  { author: "周老师的奇妙课", authorId: "AUTH-10018", level: "重点作者", works: 18, episodeStructure: "2个18集结构", cadence: "4.5 集 / 月", views: 286400, completion: 58.2, conversion: 6.8, income: 12600, platform: 31800, cost: 4200, retention: 91, potential: "高潜作者", status: "on" },
  { author: "林间心理屋", authorId: "AUTH-10021", level: "稳定作者", works: 12, cadence: "3.8 集 / 月", views: 174600, completion: 46.7, conversion: 4.2, income: 6800, platform: 18200, cost: 3100, retention: 78, potential: "成长作者", status: "processing" },
  { author: "朵朵讲故事", authorId: "AUTH-10024", level: "成长作者", works: 8, cadence: "3.0 集 / 月", views: 121800, completion: 42.1, conversion: 3.5, income: 4200, platform: 11500, cost: 2700, retention: 71, potential: "成长作者", status: "processing" },
  { author: "墨水工作室", authorId: "AUTH-10031", level: "稳定作者", works: 15, cadence: "2.6 集 / 月", views: 98400, completion: 51.3, conversion: 2.8, income: 3900, platform: 9600, cost: 4500, retention: 69, potential: "稳定作者", status: "pending" },
  { author: "大象叔叔", authorId: "AUTH-10035", level: "稳定作者", works: 11, cadence: "2.4 集 / 月", views: 88400, completion: 48.9, conversion: 2.4, income: 3100, platform: 7900, cost: 3200, retention: 66, potential: "稳定作者", status: "pending" },
  { author: "橙子老师", authorId: "AUTH-10041", level: "新芽作者", works: 3, cadence: "1.4 集 / 月", views: 46200, completion: 31.5, conversion: 1.1, income: 800, platform: 2100, cost: 1900, retention: 42, potential: "观察对象", status: "rejected" }
];

const workObservationRows = [
  { title: "小小发明家：科学实验课", author: "周老师的奇妙课", type: "科学启蒙", episodes: 18, views: 486200, completion: 64.8, interaction: 9.6, conversion: 8.2, income: 18600, refund: 1.4, growth: 42, cost: 2100, potential: "高潜作品", status: "on" },
  { title: "给孩子的情绪小课", author: "林间心理屋", type: "成长心理", episodes: 12, views: 352700, completion: 56.2, interaction: 7.8, conversion: 6.1, income: 13400, refund: 1.8, growth: 31, cost: 3200, potential: "高潜作品", status: "on" },
  { title: "绘本里的中国故事", author: "朵朵讲故事", type: "人文故事", episodes: 24, views: 228400, completion: 49.6, interaction: 8.1, conversion: 4.8, income: 8200, refund: 2.1, growth: 24, cost: 2800, potential: "成长作品", status: "processing" },
  { title: "AI 时代的创意写作", author: "墨水工作室", type: "创意表达", episodes: 9, views: 168200, completion: 44.7, interaction: 6.3, conversion: 3.7, income: 5600, refund: 2.7, growth: 18, cost: 2400, potential: "成长作品", status: "processing" },
  { title: "小小建筑师", author: "大象叔叔", type: "科学启蒙", episodes: 15, views: 92600, completion: 52.4, interaction: 5.1, conversion: 2.2, income: 2100, refund: 1.6, growth: 6, cost: 1900, potential: "稳定作品", status: "pending" },
  { title: "小小音乐家：节奏启蒙", author: "橙子老师", type: "艺术启蒙", episodes: 16, views: 38400, completion: 29.8, interaction: 3.2, conversion: 0.8, income: 400, refund: 4.8, growth: -8, cost: 1300, potential: "待优化", status: "rejected" }
];

const authorMetricSeed = [
  { adExposure: 1280000, adCtr: 7.2, bounce2s: 18.4, completion30: 72.6, completion80: 74.2, serialRate: 63.8, likeRate: 6.8, commentRate: 1.9, collectRate: 3.4, danmakuRate: 0.8, purchaseCtr: 10.8, attributedOrders: 158, gmvPerThousand: 33.1, paidCompletion80: 54.6, paidInteractionRate: 9.8, refundRate: 1.2, freeVideos: 14, followers7d: 12800, boosted: true },
  { adExposure: 964000, adCtr: 6.4, bounce2s: 21.7, completion30: 66.2, completion80: 46.7, serialRate: 37.5, likeRate: 5.9, commentRate: 1.5, collectRate: 2.8, danmakuRate: 0.5, purchaseCtr: 6.4, attributedOrders: 97, gmvPerThousand: 28.8, paidCompletion80: 43.2, paidInteractionRate: 8.1, refundRate: 1.8, freeVideos: 9, followers7d: 8600 },
  { adExposure: 728000, adCtr: 5.8, bounce2s: 24.3, completion30: 61.8, completion80: 42.1, serialRate: 31.6, likeRate: 5.2, commentRate: 1.2, collectRate: 2.5, danmakuRate: 0.4, purchaseCtr: 5.1, attributedOrders: 48, gmvPerThousand: 23.7, paidCompletion80: 39.8, paidInteractionRate: 7.4, refundRate: 2.1, freeVideos: 7, followers7d: 5400 },
  { adExposure: 612000, adCtr: 4.9, bounce2s: 26.8, completion30: 59.4, completion80: 51.3, serialRate: 28.2, likeRate: 4.6, commentRate: 1.1, collectRate: 2.1, danmakuRate: 0.3, purchaseCtr: 4.7, attributedOrders: 41, gmvPerThousand: 22.5, paidCompletion80: 47.6, paidInteractionRate: 6.3, refundRate: 2.7, freeVideos: 11, followers7d: 3100, boosted: true },
  { adExposure: 486000, adCtr: 4.3, bounce2s: 28.9, completion30: 57.1, completion80: 48.9, serialRate: 25.6, likeRate: 4.1, commentRate: 0.9, collectRate: 1.8, danmakuRate: 0.2, purchaseCtr: 3.8, attributedOrders: 33, gmvPerThousand: 20.1, paidCompletion80: 45.1, paidInteractionRate: 5.8, refundRate: 1.6, freeVideos: 8, followers7d: 1800 },
  { adExposure: 208000, adCtr: 3.6, bounce2s: 54.5, completion30: 43.6, completion80: 31.5, serialRate: 16.4, likeRate: 2.8, commentRate: 0.6, collectRate: 1.1, danmakuRate: 0.1, purchaseCtr: 1.7, attributedOrders: 28, gmvPerThousand: 10.4, paidCompletion80: 28.7, paidInteractionRate: 3.9, refundRate: 5.8, freeVideos: 3, followers7d: -420 }
];

const workMetricSeed = [
  { adExposure: 860000, adCtr: 8.4, bounce2s: 15.8, completion30: 76.2, completion80: 74.8, serialRate: 63.6, likeRate: 8.9, commentRate: 2.6, collectRate: 4.8, danmakuRate: 1.2, purchaseCtr: 11.4, attributedOrders: 186, gmvPerThousand: 38.3, paidCompletion80: 61.7, paidInteractionRate: 11.4, refundRate: 1.4 },
  { adExposure: 704000, adCtr: 7.6, bounce2s: 18.1, completion30: 69.8, completion80: 56.2, serialRate: 46.3, likeRate: 7.5, commentRate: 2.1, collectRate: 3.9, danmakuRate: 0.9, purchaseCtr: 8.2, attributedOrders: 134, gmvPerThousand: 35.7, paidCompletion80: 53.6, paidInteractionRate: 10.2, refundRate: 1.8 },
  { adExposure: 492000, adCtr: 6.5, bounce2s: 22.7, completion30: 63.4, completion80: 49.6, serialRate: 38.9, likeRate: 6.6, commentRate: 1.7, collectRate: 3.1, danmakuRate: 0.6, purchaseCtr: 6.7, attributedOrders: 82, gmvPerThousand: 31.5, paidCompletion80: 46.2, paidInteractionRate: 8.7, refundRate: 2.1 },
  { adExposure: 356000, adCtr: 5.7, bounce2s: 24.9, completion30: 58.8, completion80: 44.7, serialRate: 34.5, likeRate: 5.4, commentRate: 1.3, collectRate: 2.6, danmakuRate: 0.4, purchaseCtr: 5.3, attributedOrders: 56, gmvPerThousand: 27.8, paidCompletion80: 41.9, paidInteractionRate: 7.4, refundRate: 2.7 },
  { adExposure: 218000, adCtr: 4.8, bounce2s: 27.6, completion30: 62.1, completion80: 52.4, serialRate: 29.8, likeRate: 4.8, commentRate: 1.1, collectRate: 2.2, danmakuRate: 0.3, purchaseCtr: 3.6, attributedOrders: 21, gmvPerThousand: 22.7, paidCompletion80: 49.5, paidInteractionRate: 6.1, refundRate: 1.6 },
  { adExposure: 96000, adCtr: 3.1, bounce2s: 54.8, completion30: 41.5, completion80: 29.8, serialRate: 14.2, likeRate: 2.6, commentRate: 0.5, collectRate: 0.9, danmakuRate: 0.1, purchaseCtr: 1.2, attributedOrders: 5, gmvPerThousand: 8.6, paidCompletion80: 26.4, paidInteractionRate: 3.2, refundRate: 5.8 }
];

creatorObservationRows.forEach((row, index) => Object.assign(row, authorMetricSeed[index]));
workObservationRows.forEach((row, index) => Object.assign(row, workMetricSeed[index]));

const settlementRows = [
  { no: "ST-202610-0098", authors: [{ author: "周老师的奇妙课", authorId: "AUTH-10018", orders: 18, due: 28620, paid: 28620, share: 28620, refund: 120 }, { author: "大象叔叔", authorId: "AUTH-10035", orders: 9, due: 20000, paid: 20000, share: 20000, refund: 80 }], period: "10/01 - 10/15", created: "2026-10-17 14:20", due: 48620, paid: 48620, status: "done", statusText: "已完成", items: 27 },
  { no: "ST-202610-0101", authors: [{ author: "林间心理屋", authorId: "AUTH-10021", orders: 12, due: 32780, paid: 0, share: 32780, refund: 60 }], period: "10/01 - 10/15", created: "2026-10-18 11:06", due: 32780, paid: 0, status: "processing", statusText: "处理中", items: 12 },
  { no: "ST-202610-0105", authors: [{ author: "朵朵讲故事", authorId: "AUTH-10024", orders: 16, due: 28140, paid: 28140, share: 28140, refund: 0 }], period: "10/01 - 10/15", created: "2026-10-19 16:42", due: 28140, paid: 28140, status: "done", statusText: "已完成", items: 16 },
  { no: "ST-202610-0108", authors: [{ author: "墨水工作室", authorId: "AUTH-10031", orders: 9, due: 21320, paid: 0, share: 21320, refund: 40 }], period: "10/16 - 10/25", created: "2026-10-26 09:35", due: 21320, paid: 0, status: "pending", statusText: "待审核", items: 9 },
  { no: "ST-202610-0091", authors: [{ author: "橙子老师", authorId: "AUTH-10041", orders: 11, due: 16860, paid: 16860, share: 16860, refund: 30 }], period: "09/16 - 09/30", created: "2026-10-03 10:11", due: 16860, paid: 16860, status: "done", statusText: "已完成", items: 11 }
];

collections.forEach((item) => { item.removedEpisodes = []; });

const state = {
  route: "collections",
  filters: { collectionStatus: "on" },
  confirmCallback: null,
  selectedCollection: null,
  selectedAuthorId: null,
  bdEditingAuthorId: null,
  bdQuery: "",
  bdDraftOwnerId: "",
  bdDraftOwnerName: "",
  incomeSortKey: "",
  incomeSortDirection: "desc"
};

const routeMeta = {
  dashboard: { title: "工作台", crumb: "总览", description: "今天的运营工作，从这里开始。" },
  collections: { title: "合集管理", crumb: "视频管理 / 合集管理", description: "管理平台上架合集，查看内容表现并配置产品曝光。" },
  "micro-course": { title: "微课 Tab 运营", crumb: "产品运营 / 微课 Tab 运营", description: "用好每一个精选资源位，让好内容被更多用户看见。" },
  "creator-income": { title: "创作者收入", crumb: "创作者运营 / 创作者收入", description: "按创作者和周期查看收入分成与账号状态，及时掌握资金流向。" },
  "creator-workboard": { title: "作者作品看板", crumb: "创作者运营 / 作者作品看板", description: "追踪作者与作品的潜力状态、内容表现和投入产出。" },
  "creator-diagnosis": { title: "创作者诊断", crumb: "创作者运营 / 创作者诊断", description: "查看创作者的收入表现、账号状态和运营诊断信息。" },
  settlements: { title: "结算对账", crumb: "创作者运营 / 结算对账", description: "跟进结算单状态，核对每一笔应付与实付金额。" }
};

const $ = (selector) => document.querySelector(selector);
const escapeHtml = (value) => String(value ?? "").replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[char]));
const formatNumber = (value) => Number(value || 0).toLocaleString("zh-CN");
const formatMoney = (value) => `¥${Number(value || 0).toLocaleString("zh-CN", { minimumFractionDigits: 0 })}`;
const percent = (value) => `${Number(value || 0).toFixed(value % 1 ? 1 : 0)}%`;
const collectionById = (id) => collections.find((item) => item.id === id);
const episodeDurations = ["08:42", "06:15", "09:18", "07:36", "05:54"];
const activeEpisodes = (item) => {
  const totalEpisodes = Math.max(item.episodes + item.removedEpisodes.length, 1);
  return item.episodesData.map((title, index) => ({
    title,
    index,
    paid: item.paid,
    videoId: `${item.id.replace("COL-", "VID-")}-${String(index + 1).padStart(2, "0")}`,
    duration: episodeDurations[index % episodeDurations.length],
    plays30: Math.round(item.plays / totalEpisodes * (1 - index * 0.03))
  })).filter((episode) => !item.removedEpisodes.includes(episode.index));
};
const collectionPeriodScale = { "7": 0.24, "30": 0.68, "90": 0.88, all: 1 };
function metricsForPeriod(item) {
  const period = state.filters.collectionPeriod || "30";
  const scale = collectionPeriodScale[period] ?? collectionPeriodScale["30"];
  const completionDelta = period === "7" ? 2 : period === "30" ? 1 : period === "90" ? 0.5 : 0;
  return {
    plays: Math.round(item.plays * scale),
    completion: Math.min(99, Math.round((item.completion + completionDelta) * 10) / 10),
    revenue: Math.round(item.revenue * scale)
  };
}
const statusTag = (status, label) => `<span class="status-tag ${status === "on" ? "status-on" : status === "off" ? "status-off" : status === "pending" ? "status-pending" : status === "processing" ? "status-processing" : status === "rejected" ? "status-rejected" : "status-on"}">${escapeHtml(label || (status === "on" ? "已上架" : "已下架"))}</span>`;

function init() {
  const initial = parseHashRoute();
  state.route = routeMeta[initial.route] ? initial.route : "collections";
  state.selectedAuthorId = initial.param || null;
  state.filters = defaultFilters(state.route);
  if (!location.hash) history.replaceState(null, "", "#/collections");
  window.addEventListener("hashchange", () => {
    const next = parseHashRoute();
    state.route = routeMeta[next.route] ? next.route : "collections";
    state.selectedAuthorId = next.param || null;
    state.filters = defaultFilters(state.route);
    state.bdEditingAuthorId = null;
    closeAllOverlays();
    render();
  });
  document.addEventListener("click", handleClick);
  document.addEventListener("input", handleInput);
  document.addEventListener("change", handleChange);
  document.addEventListener("submit", handleSubmit);
  document.addEventListener("mouseover", handleTrendMouseOver);
  document.addEventListener("mouseout", handleTrendMouseOut);
  document.addEventListener("focusin", handleTrendMouseOver);
  document.addEventListener("focusout", handleTrendMouseOut);
  render();
}

function parseHashRoute() {
  const parts = location.hash.replace(/^#\//, "").split("/");
  return { route: parts[0] || "collections", param: parts[1] || "" };
}

function defaultFilters(route) {
  if (route === "collections") return { collectionStatus: "on", collectionPeriod: "30" };
  if (route === "micro-course") return { microStatus: "on" };
  if (route === "creator-income") return { incomeView: "authors", incomeMonth: "2026-10", incomeContract: "", incomeBank: "", incomeBdOwner: "", incomeTrendRange: "30" };
  if (route === "creator-workboard") return { workboardView: "authors", workboardAuthorPotential: "", workboardWorkPotential: "" };
  return {};
}

function render() {
  const meta = routeMeta[state.route];
  $("#breadcrumb").innerHTML = state.route === "dashboard" ? "工作台 <span>/</span> 总览" : `工作台 <span>/</span> <strong>${escapeHtml(meta.title)}</strong>`;
  document.querySelectorAll(".nav-item[data-route]").forEach((item) => item.classList.toggle("active", item.dataset.route === state.route));
  const views = {
    dashboard: renderDashboard,
    collections: renderCollections,
    "micro-course": renderMicroCourse,
    "creator-income": renderCreatorIncome,
    "creator-workboard": renderCreatorWorkboard,
    "creator-diagnosis": renderCreatorDiagnosis,
    settlements: renderSettlements
  };
  $("#app").dataset.route = state.route;
  $("#app").innerHTML = views[state.route]();
}

function pageHead(eyebrow, title, description, action = "") {
  if (eyebrow === "财务管理") eyebrow = "创作者运营";
  return `<div class="page-head"><div><div class="eyebrow">${escapeHtml(eyebrow)}</div><h1 class="page-title">${escapeHtml(title)}</h1><p class="page-description">${escapeHtml(description)}</p></div>${action ? `<div class="head-actions">${action}</div>` : ""}</div>`;
}

function metricCard(label, value, trend, icon, trendClass = "") {
  const metricClass = label === "风险待处理" ? " risk-metric" : "";
  return `<div class="metric-card${metricClass}"><div class="metric-label">${escapeHtml(label)}</div><div class="metric-value">${value}</div><div class="metric-trend ${trendClass}">${escapeHtml(trend)}</div><div class="metric-icon">${icon}</div></div>`;
}

function accountStatusTag(status) {
  const map = { done: ["status-on", "已完成"], pending: ["status-pending", "待完成"] };
  const [tone, label] = map[status] || ["status-off", "未完成"];
  return `<span class="status-tag ${tone}">${label}</span>`;
}

function contractStatusCell(account) {
  const tag = accountStatusTag(account.contract);
  return account.contract === "pending" ? `${tag}<button type="button" class="btn-text contract-copy-btn" data-action="copy-contract-link" data-author-id="${account.authorId}">复制合同链接</button>` : tag;
}

function copyText(value, successMessage) {
  const notifySuccess = () => toast(successMessage);
  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(value).then(notifySuccess).catch(() => fallbackCopyText(value, notifySuccess));
    return;
  }
  fallbackCopyText(value, notifySuccess);
}

function fallbackCopyText(value, notifySuccess) {
  const input = document.createElement("textarea");
  input.value = value;
  input.setAttribute("readonly", "");
  input.style.position = "fixed";
  input.style.opacity = "0";
  document.body.appendChild(input);
  input.select();
  let copied = false;
  try { copied = document.execCommand("copy"); } catch (error) { copied = false; }
  input.remove();
  if (copied) notifySuccess();
  else toast(`合同链接：${value}`, "error");
}

function riskStatusTag(status, label) {
  const tone = status === "normal" ? "status-on" : status === "review" ? "status-rejected" : "status-pending";
  return `<span class="status-tag ${tone}">${escapeHtml(label)}</span>`;
}

function renderDashboard() {
  const onShelf = collections.filter((item) => item.status === "on").length;
  const microOn = microCourseItems.filter((item) => item.status === "on").length;
  return `${pageHead("运营概览", "工作台", "掌握内容资源、曝光位和财务节奏。", `<a class="btn btn-primary" href="#/collections">进入合集管理 <span>→</span></a>`)}
    <div class="metric-grid">${metricCard("在架合集", onShelf, "较上周 +2", "▤")}${metricCard("微课 Tab 在架", microOn, "资源位使用率 80%", "◈")}${metricCard("本月内容流水", "¥18.6<small>万</small>", "较上月 +14.8%", "↗")}${metricCard("待处理结算", "¥8.1<small>万</small>", "4 张结算单", "◎", "down")}</div>
    <div class="micro-grid"><div class="card insight-card"><div class="insight-head"><div><div class="insight-title">内容资源表现</div><div class="insight-sub">近 7 日微课 Tab 关键数据</div></div><span class="status-tag status-on">数据正常</span></div><div class="bars">${[52, 68, 61, 84, 72, 92, 78].map((v, i) => `<div class="bar-col"><div class="bar" style="height:${v}%"></div><small>${["周三", "周四", "周五", "周六", "周日", "周一", "今天"][i]}</small></div>`).join("")}</div><div class="legend-row"><span><i class="legend-dot"></i>曝光量</span><span><i class="legend-dot cyan"></i>点击率 8.6%</span></div></div><div class="card pulse-card"><div class="insight-title">本周运营目标</div><div class="insight-sub">微课 Tab 点击转化率</div><div class="pulse-number">8.6<small>%</small></div><div class="pulse-progress"><span style="width:72%"></span></div><div class="pulse-foot"><span>目标 12%</span><strong>完成 72%</strong></div><div class="quick-list"><div class="quick-item"><div class="quick-rank">1</div><div><strong>小小发明家</strong><span>点击 17,240</span></div><div class="quick-value">6.9%</div></div><div class="quick-item"><div class="quick-rank">2</div><div><strong>情绪小课</strong><span>点击 12,870</span></div><div class="quick-value">6.4%</div></div></div></div></div>
    <div class="card table-card"><div class="table-head"><div><span class="table-title">最近更新</span><span class="table-caption">内容与结算动态</span></div><a class="btn btn-small" href="#/micro-course">查看资源位</a></div><div class="table-wrap"><table><thead><tr><th>时间</th><th>动态</th><th>对象</th><th>状态</th></tr></thead><tbody><tr><td class="muted">10:24</td><td>微课 Tab 新增精选</td><td class="strong">绘本里的中国故事</td><td>${statusTag("on", "已生效")}</td></tr><tr><td class="muted">09:50</td><td>创作者收入已更新</td><td class="strong">周老师的奇妙课</td><td>${statusTag("processing", "待结算")}</td></tr><tr><td class="muted">昨天</td><td>结算单已完成</td><td class="strong">ST-202610-0098</td><td>${statusTag("on", "已完成")}</td></tr></tbody></table></div></div>`;
}

function renderCollections() {
  const filtered = collections.filter((item) => {
    const keyword = (state.filters.collectionKeyword || "").toLowerCase();
    const author = (state.filters.collectionAuthor || "").toLowerCase();
    return (!keyword || [item.id, item.title].some((v) => v.toLowerCase().includes(keyword))) && (!author || [item.author, item.authorId].some((v) => v.toLowerCase().includes(author))) && (!state.filters.collectionSource || item.source === state.filters.collectionSource) && (!state.filters.collectionPaid || String(item.paid) === state.filters.collectionPaid) && (!state.filters.collectionStatus || item.status === state.filters.collectionStatus);
  });
  const onShelf = collections.filter((item) => item.status === "on").length;
  const paid = collections.filter((item) => item.paid).length;
  const micro = microCourseItems.filter((item) => item.status === "on").length;
  const filter = `<div class="card filter-card"><div class="filter-row"><span class="filter-label">快速筛选</span><div class="field-wrap"><span class="search-icon">⌕</span><input class="field search" data-filter="collectionKeyword" value="${escapeHtml(state.filters.collectionKeyword || "")}" placeholder="搜索合集 ID / 标题" /></div><input class="field" data-filter="collectionAuthor" value="${escapeHtml(state.filters.collectionAuthor || "")}" placeholder="作者 / 作者 ID" style="width:145px" /><select class="field select-field" data-filter="collectionPeriod"><option value="7" ${state.filters.collectionPeriod === "7" ? "selected" : ""}>近 7 天</option><option value="30" ${state.filters.collectionPeriod === "30" || !state.filters.collectionPeriod ? "selected" : ""}>近 30 天</option><option value="90" ${state.filters.collectionPeriod === "90" ? "selected" : ""}>近 90 天</option><option value="all" ${state.filters.collectionPeriod === "all" ? "selected" : ""}>全部时间</option></select><select class="field select-field" data-filter="collectionSource"><option value="">全部来源</option><option value="PGC" ${state.filters.collectionSource === "PGC" ? "selected" : ""}>PGC</option><option value="UGC" ${state.filters.collectionSource === "UGC" ? "selected" : ""}>UGC</option></select><select class="field select-field" data-filter="collectionPaid"><option value="">付费属性</option><option value="true" ${state.filters.collectionPaid === "true" ? "selected" : ""}>含付费</option><option value="false" ${state.filters.collectionPaid === "false" ? "selected" : ""}>免费</option></select><select class="field select-field" data-filter="collectionStatus"><option value="">全部状态</option><option value="on" ${state.filters.collectionStatus === "on" ? "selected" : ""}>已上架</option><option value="off" ${state.filters.collectionStatus === "off" ? "selected" : ""}>已下架</option></select><span class="filter-spacer"></span><button class="btn btn-small" data-action="clear-filters">清空筛选</button></div></div>`;
  const rows = filtered.map((item) => { const metrics = metricsForPeriod(item); const micro = microCourseItems.find((microItem) => microItem.collectionId === item.id && microItem.status === "on"); return `<tr><td><span class="link-id" data-action="view-collection" data-id="${item.id}">${item.id}</span></td><td><div class="title-cell"><div class="cover ${item.coverClass}">${escapeHtml(item.cover)}</div><div><strong>${escapeHtml(item.title)}</strong></div></div></td><td><div class="author-cell"><strong>${escapeHtml(item.author)}</strong><span>${escapeHtml(item.authorId)}</span></div></td><td><span class="source-tag ${item.source === "PGC" ? "source-pgc" : "source-ugc"}">${item.source}</span></td><td>${item.paid ? '<span class="type-tag paid">含付费</span>' : '<span class="type-tag free">免费</span>'}</td><td class="mono">${item.episodes} 集</td><td class="mono">${formatNumber(metrics.plays)}</td><td class="mono">${metrics.completion}%</td><td class="mono">${formatMoney(metrics.revenue)}</td><td>${statusTag(item.status)}</td><td class="muted">${item.updated.slice(5)}</td><td class="action-col"><div class="row-actions"><button class="btn-text" data-action="view-collection" data-id="${item.id}">查看详情</button><button class="btn-text ${micro ? "is-added" : ""}" data-action="toggle-micro" data-id="${item.id}">${micro ? "已加微课" : "加微课"}</button>${item.status === "on" ? `<button class="btn-text danger" data-action="off-collection" data-id="${item.id}">下架</button>` : `<button class="btn-text" data-action="republish-collection" data-id="${item.id}">重新上架</button>`}</div></td></tr>`; }).join("");
  return `${pageHead("视频管理", "合集管理", "所有上架合集的内容、数据和产品曝光管理。", `<button class="btn" data-action="export-collections">↓ 导出列表</button>`)}<div class="metric-grid">${metricCard("合集总数", collections.length, "本周新增 3 个", "▤")}${metricCard("已上架", onShelf, `占比 ${Math.round(onShelf / collections.length * 100)}%`, "✓")}${metricCard("含付费内容", paid, "收入贡献 82%", "¥")}${metricCard("微课 Tab 中", micro, "资源位使用率 80%", "◈")}</div>${filter}<div class="card table-card"><div class="table-head"><div><span class="table-title">合集列表</span><span class="table-caption">共 ${filtered.length} 个结果</span></div><div class="table-actions"><span class="sortable-hint">默认按更新时间倒序</span></div></div><div class="table-wrap">${filtered.length ? `<table><thead><tr><th>合集 ID</th><th>合集信息</th><th>作者</th><th>来源</th><th>付费</th><th>剧集数</th><th>播放量</th><th>完播率</th><th>累计收入</th><th>状态</th><th>更新时间</th><th class="action-col">操作</th></tr></thead><tbody>${rows}</tbody></table>` : emptyState("没有找到符合条件的合集", "试试清空筛选或换一个关键词")}</div></div>`;
}

function renderMicroCourse() {
  const filtered = microCourseItems.filter((item) => {
    const collection = collectionById(item.collectionId);
    const keyword = (state.filters.microKeyword || "").toLowerCase();
    const author = (state.filters.microAuthor || "").toLowerCase();
    return (!keyword || [item.collectionId, collection?.title || ""].some((v) => v.toLowerCase().includes(keyword))) && (!author || (collection?.author || "").toLowerCase().includes(author)) && (!state.filters.microCategory || item.category === state.filters.microCategory) && (!state.filters.microStatus || item.status === state.filters.microStatus);
  }).sort((a, b) => a.order - b.order);
  const active = microCourseItems.filter((item) => item.status === "on");
  const exposure = active.reduce((sum, item) => sum + item.exposure, 0);
  const clicks = active.reduce((sum, item) => sum + item.clicks, 0);
  const clickRate = exposure ? (clicks / exposure * 100).toFixed(1) : "0.0";
  const filter = `<div class="card filter-card"><div class="filter-row"><span class="filter-label">资源位筛选</span><div class="field-wrap"><span class="search-icon">⌕</span><input class="field search" data-filter="microKeyword" value="${escapeHtml(state.filters.microKeyword || "")}" placeholder="搜索合集 ID / 标题" /></div><input class="field" data-filter="microAuthor" value="${escapeHtml(state.filters.microAuthor || "")}" placeholder="归属作者" style="width:130px" /><select class="field select-field" data-filter="microCategory"><option value="">全部分类</option>${["科学启蒙", "成长心理", "人文故事", "创意表达", "待配置"].map((x) => `<option ${state.filters.microCategory === x ? "selected" : ""}>${x}</option>`).join("")}</select><select class="field select-field" data-filter="microStatus"><option value="">全部状态</option><option value="on" ${state.filters.microStatus === "on" ? "selected" : ""}>在架</option><option value="off" ${state.filters.microStatus === "off" ? "selected" : ""}>已移出</option></select><span class="filter-spacer"></span><button class="btn btn-small" data-action="clear-filters">清空筛选</button></div></div>`;
  const rows = filtered.map((item) => { const collection = collectionById(item.collectionId); return `<tr><td><div class="sort-cell"><span class="sort-no">${item.order}</span><div class="sort-buttons"><button title="上移" data-action="micro-move" data-id="${item.collectionId}" data-direction="up">▲</button><button title="下移" data-action="micro-move" data-id="${item.collectionId}" data-direction="down">▼</button></div></div></td><td><div class="title-cell"><div class="cover ${collection.coverClass}">${escapeHtml(collection.cover)}</div><div><strong>${escapeHtml(collection.title)}</strong><span>${escapeHtml(collection.id)} · ${escapeHtml(collection.author)} · ${escapeHtml(collection.authorId)}</span></div></div></td><td><div class="micro-taxonomy"><strong>${escapeHtml(item.subject || "未设置")}</strong><span>${escapeHtml(item.category || "未设置")}</span></div></td><td class="mono">${item.effective}</td><td class="mono">${formatNumber(item.exposure)}</td><td class="mono">${formatNumber(item.clicks)} <span class="muted">(${item.exposure ? (item.clicks / item.exposure * 100).toFixed(1) : "0.0"}%)</span></td><td>${statusTag(item.status, item.status === "on" ? "在架" : "已移出")}</td><td class="action-col"><div class="row-actions"><button class="btn-text" data-action="view-collection" data-id="${item.collectionId}">查看详情</button>${item.status === "on" ? `<button class="btn-text danger" data-action="remove-micro" data-id="${item.collectionId}">移出微课</button>` : ""}</div></td></tr>`; }).join("");
  return `${pageHead("产品运营", "微课 Tab 运营", "管理动画微课 Tab 的精选内容和曝光资源位。", `<button class="btn btn-primary" data-action="open-add-micro">＋ 新增精选</button>`)}<div class="metric-grid">${metricCard("在架合集", active.length, "最多支持 5 个资源位", "◈")}${metricCard("累计曝光", formatNumber(exposure), "较上周 +12.4%", "◎")}${metricCard("累计点击", formatNumber(clicks), "较上周 +8.6%", "↗")}${metricCard("平均点击率", `${clickRate}<small>%</small>`, "目标 12%", "%")}</div><div class="micro-grid"><div class="card insight-card"><div class="insight-head"><div><div class="insight-title">近 7 日曝光趋势</div><div class="insight-sub">单位：千次</div></div><span class="status-tag status-on">持续增长</span></div><div class="bars">${[44, 55, 49, 70, 64, 88, 77].map((v, i) => `<div class="bar-col"><div class="bar" style="height:${v}%"></div><small>${["10/22", "10/23", "10/24", "10/25", "10/26", "10/27", "今天"][i]}</small></div>`).join("")}</div><div class="legend-row"><span><i class="legend-dot"></i>微课 Tab 曝光</span><span><i class="legend-dot cyan"></i>点击率 ${clickRate}%</span></div></div><div class="card pulse-card"><div class="insight-title">资源位健康度</div><div class="insight-sub">基于近 7 日点击与收入</div><div class="pulse-number">良好</div><div class="pulse-progress"><span style="width:84%; background:linear-gradient(90deg,#28b5a7,#73d7bd)"></span></div><div class="pulse-foot"><span>点击率目标 12%</span><strong style="color:var(--green)">当前 ${clickRate}%</strong></div><div class="quick-list"><div class="quick-item"><div class="quick-rank">01</div><div><strong>小小发明家</strong><span>轮换 8 秒 · 科学启蒙</span></div><div class="quick-value">6.9%</div></div><div class="quick-item"><div class="quick-rank">02</div><div><strong>情绪小课</strong><span>轮换 10 秒 · 成长心理</span></div><div class="quick-value">6.4%</div></div></div></div></div>${filter}<div class="card table-card"><div class="table-head"><div><span class="table-title">在架资源位</span><span class="table-caption">拖动或使用箭头调整展示顺序</span></div><span class="sortable-hint">排序越前，曝光权重越高</span></div><div class="table-wrap">${filtered.length ? `<table><thead><tr><th>排序</th><th>合集信息</th><th>学科 / 分类</th><th>生效时间</th><th>曝光</th><th>点击</th><th>状态</th><th class="action-col">操作</th></tr></thead><tbody>${rows}</tbody></table>` : emptyState("暂无符合条件的资源位", "可调整筛选条件或新增精选")}</div></div>`;
}

function renderCreatorIncomeLegacy() {
  const author = (state.filters.incomeAuthor || "").toLowerCase();
  const incomeView = state.filters.incomeView || "authors";
  const rows = incomeRows.filter((row) => (!author || [row.author, row.authorId].some((value) => value.toLowerCase().includes(author))) && (!state.filters.incomePeriod || (state.filters.incomePeriod === "7" ? Number(row.date.slice(3)) >= 21 : true)));
  const filteredAccounts = creatorAccounts.filter((account) => !author || [account.author, account.authorId, account.enterprise].some((value) => value.toLowerCase().includes(author)));
  const completedRate = (key) => filteredAccounts.length ? Math.round(filteredAccounts.filter((account) => account[key] === "done").length / filteredAccounts.length * 100) : 0;
  const riskCount = filteredAccounts.filter((account) => account.risk !== "normal").length;
  const groupedMap = new Map();
  rows.forEach((row) => {
    const group = groupedMap.get(row.authorId) || { author: row.author, authorId: row.authorId, collections: new Set(), orders: 0, gross: 0, share: 0, refund: 0 };
    group.collections.add(row.collection);
    group.orders += row.orders;
    group.gross += row.gross;
    group.share += row.share;
    group.refund += row.refund;
    groupedMap.set(row.authorId, group);
  });
  const groups = [...groupedMap.values()];
  const filter = `<div class="card filter-card"><div class="filter-row"><span class="filter-label">收入筛选</span><div class="field-wrap"><span class="search-icon">⌕</span><input class="field search" data-filter="incomeAuthor" value="${escapeHtml(state.filters.incomeAuthor || "")}" placeholder="搜索创作者" /></div><select class="field select-field" data-filter="incomePeriod"><option value="">全部周期</option><option value="7" ${state.filters.incomePeriod === "7" ? "selected" : ""}>近 7 天</option><option value="30" ${state.filters.incomePeriod === "30" ? "selected" : ""}>近 30 天</option></select><button class="field" style="width:145px; color:#8790a2; text-align:left">2026/10/01 - 10/28 ▾</button><span class="filter-spacer"></span><button class="btn btn-small" data-action="clear-filters">清空筛选</button><button class="btn btn-small btn-primary" data-action="export-income">↓ 导出明细</button></div></div>`;
  const trend = [40, 54, 48, 63, 57, 76, 68, 83, 72, 92, 78, 96];
  const points = trend.map((v, i) => `${(i / (trend.length - 1) * 100).toFixed(2)},${(100 - v) * .82 + 8}`).join(" ");
  const area = `0,100 ${points} 100,100`;
  const rowsHtml = groups.map((group) => `<tr><td><div class="author-cell"><strong>${escapeHtml(group.author)}</strong><span>${escapeHtml(group.authorId)}</span></div></td><td class="mono">${group.collections.size} 个</td><td class="mono">${formatNumber(group.orders)}</td><td class="mono strong">${formatMoney(group.gross)}</td><td class="mono strong">${formatMoney(group.share)}</td><td class="action-col"><button class="btn-text" data-action="view-income-author" data-author-id="${group.authorId}">查看详情</button></td></tr>`).join("");
  const accountRows = filteredAccounts.map((account) => `<tr><td><div class="author-cell"><strong>${escapeHtml(account.author)}</strong><span>${escapeHtml(account.authorId)}</span></div></td><td>${accountStatusTag(account.verified)}</td><td>${accountStatusTag(account.contract)}</td><td>${accountStatusTag(account.bank)}</td><td><span class="enterprise-cell">${escapeHtml(account.enterprise)}</span></td><td>${riskStatusTag(account.risk, account.riskText)}<span class="risk-detail">${escapeHtml(account.riskDetail)}</span></td></tr>`).join("");
  const accountPanel = `<div class="card account-status-card"><div class="table-head"><div><span class="table-title">创作者账号与风控状态</span><span class="table-caption">共 ${filteredAccounts.length} 位创作者 · 资料状态影响结算资格</span></div><span class="sortable-hint">风险标签仅用于运营排查</span></div><div class="table-wrap">${filteredAccounts.length ? `<table class="account-table"><thead><tr><th>创作者</th><th>实名认证</th><th>合同签约</th><th>银行卡</th><th>关联企业</th><th>安全风险</th></tr></thead><tbody>${accountRows}</tbody></table>` : emptyState("暂无匹配创作者", "换一个作者、作者 ID 或关联企业试试")}</div></div>`;
  const authorRows = creatorObservationRows.filter((row) => !author || [row.author, row.authorId].some((value) => value.toLowerCase().includes(author))).map((row) => `<tr><td><div class="author-cell"><strong>${escapeHtml(row.author)}</strong><span>${escapeHtml(row.authorId)}</span></div></td><td>${escapeHtml(row.level)}</td><td class="mono">${row.works} 个</td><td>${row.cadence}</td><td class="mono">${formatNumber(row.views)}</td><td class="mono">${row.completion}%</td><td class="mono">${row.conversion}%</td><td class="mono strong">${formatMoney(row.income)}</td><td class="mono strong">${formatMoney(row.platform)}</td><td class="mono">${formatMoney(row.cost)}</td><td class="mono">${row.retention}%</td><td>${statusTag(row.status, row.potential)}</td></tr>`).join("");
  const workRows = workObservationRows.filter((row) => !author || [row.title, row.author].some((value) => value.toLowerCase().includes(author))).map((row) => `<tr><td><div class="title-cell"><div class="cover cover-3">${escapeHtml(row.title.slice(0, 1))}</div><div><strong>${escapeHtml(row.title)}</strong><span>${escapeHtml(row.author)}</span></div></div></td><td>${escapeHtml(row.type)}</td><td class="mono">${row.episodes} 集</td><td class="mono">${formatNumber(row.views)}</td><td class="mono">${row.completion}%</td><td class="mono">${row.interaction}%</td><td class="mono">${row.conversion}%</td><td class="mono strong">${formatMoney(row.income)}</td><td class="mono">${row.refund}%</td><td class="mono ${row.growth < 0 ? "refund-value" : ""}">${row.growth > 0 ? "+" : ""}${row.growth}%</td><td class="mono">${formatMoney(row.cost)}</td><td>${statusTag(row.status, row.potential)}</td></tr>`).join("");
  const observationPanel = `<div class="card observation-card"><div class="table-head observation-head"><div><span class="table-title">成长收益观测</span><span class="table-caption">追踪作者 / 作品的潜力状态与投入产出</span></div><div class="observe-tabs"><button class="observe-tab ${incomeView === "authors" ? "active" : ""}" data-action="set-income-view" data-view="authors">作者</button><button class="observe-tab ${incomeView === "works" ? "active" : ""}" data-action="set-income-view" data-view="works">作品</button></div></div><div class="observation-note">${incomeView === "authors" ? "作者维度：稳定产出 × 内容质量 × 商业转化 × 留存效率" : "作品维度：消费质量 × 互动 × 付费转化 × 增长速度 − 退款风险"}</div><div class="table-wrap">${incomeView === "authors" ? `<table class="observation-table"><thead><tr><th>作者</th><th>层级</th><th>有效作品</th><th>更新频次</th><th>有效观看</th><th>完播率</th><th>付费转化</th><th>作者收入</th><th>平台贡献</th><th>单作者成本</th><th>30 日留存</th><th>潜力状态</th></tr></thead><tbody>${authorRows}</tbody></table>` : `<table class="observation-table"><thead><tr><th>作品</th><th>内容类型</th><th>集数</th><th>有效观看</th><th>完播率</th><th>互动率</th><th>付费转化</th><th>作品收入</th><th>退款率</th><th>近 7 日增长</th><th>流量成本</th><th>潜力状态</th></tr></thead><tbody>${workRows}</tbody></table>`}</div></div>`;
  return `${pageHead("财务管理", "创作者收入", "按创作者和时间周期汇总查看订单、收入、分成与账号状态。") }<div class="metric-grid account-metrics">${metricCard("实名完成率", `${completedRate("verified")}<small>%</small>`, `${filteredAccounts.length} 位创作者`, "✓")}${metricCard("合同签约率", `${completedRate("contract")}<small>%</small>`, "影响合作与结算", "▣")}${metricCard("银行卡绑定率", `${completedRate("bank")}<small>%</small>`, "影响打款资格", "¥")}${metricCard("风险待处理", riskCount, riskCount ? "需运营复核" : "暂无风险", "!", riskCount ? "down" : "")}</div><div class="finance-grid"><div class="card chart-card"><div class="insight-head"><div><div class="insight-title">收入趋势</div><div class="insight-sub">近 12 个数据节点 · 单位：元</div></div><select class="duration-select"><option>近 30 天</option><option>近 90 天</option></select></div><div class="chart-wrap"><svg class="chart-svg" viewBox="0 0 100 100" preserveAspectRatio="none"><polygon points="${area}" fill="rgba(91,92,226,.08)"></polygon><polyline points="${points}" fill="none" stroke="#5b5ce2" stroke-width="1.5" vector-effect="non-scaling-stroke"></polyline>${trend.map((v, i) => `<circle cx="${(i / (trend.length - 1) * 100).toFixed(2)}" cy="${(100 - v) * .82 + 8}" r="1.5" fill="#fff" stroke="#5b5ce2" stroke-width="1" vector-effect="non-scaling-stroke"></circle>`).join("")}</svg></div><div class="chart-labels"><span>10/01</span><span>10/07</span><span>10/14</span><span>10/21</span><span>10/28</span></div><div class="chart-legend"><span><i class="line-dot"></i>平台流水</span><span><i class="line-dot green"></i>创作者分成</span></div></div><div class="card quick-card"><h3>收入贡献 Top 3</h3><div class="quick-list"><div class="quick-item"><div class="quick-rank">1</div><div><strong>周老师的奇妙课</strong><span>6 个合集 · 贡献 28%</span></div><div class="quick-value">¥48,620</div></div><div class="quick-item"><div class="quick-rank">2</div><div><strong>林间心理屋</strong><span>3 个合集 · 贡献 19%</span></div><div class="quick-value">¥32,780</div></div><div class="quick-item"><div class="quick-rank">3</div><div><strong>朵朵讲故事</strong><span>5 个合集 · 贡献 16%</span></div><div class="quick-value">¥28,140</div></div></div><div style="margin-top:20px; padding-top:14px; border-top:1px solid var(--line); color:var(--muted); font-size:11px">本周期共有 <strong style="color:var(--text)">${groups.length}</strong> 位创作者产生收入</div></div></div>${filter}${observationPanel}${accountPanel}<div class="card table-card"><div class="table-head"><div><span class="table-title">创作者收入汇总</span><span class="table-caption">共 ${groups.length} 位创作者</span></div></div><div class="table-wrap">${groups.length ? `<table><thead><tr><th>创作者</th><th>合集数</th><th>总订单</th><th>总收入</th><th>创作者分成</th><th class="action-col">操作</th></tr></thead><tbody>${rowsHtml}</tbody></table>` : emptyState("暂无收入记录", "换一个作者或周期试试")}</div></div>`;
}

function renderObservationPanelPrevious(view, filterKey = "workboardKeyword") {
  const keyword = (state.filters[filterKey] || "").toLowerCase();
  const authorRows = creatorObservationRows.filter((row) => !keyword || [row.author, row.authorId].some((value) => value.toLowerCase().includes(keyword))).map((row) => `<tr><td><div class="author-cell"><strong>${escapeHtml(row.author)}</strong><span>${escapeHtml(row.authorId)}</span></div></td><td>${escapeHtml(row.level)}</td><td class="mono">${row.works} 个</td><td>${row.cadence}</td><td class="mono">${formatNumber(row.views)}</td><td class="mono">${row.completion}%</td><td class="mono">${row.conversion}%</td><td class="mono strong">${formatMoney(row.income)}</td><td class="mono strong">${formatMoney(row.platform)}</td><td class="mono">${formatMoney(row.cost)}</td><td class="mono">${row.retention}%</td><td>${statusTag(row.status, row.potential)}</td></tr>`).join("");
  const workRows = workObservationRows.filter((row) => !keyword || [row.title, row.author].some((value) => value.toLowerCase().includes(keyword))).map((row) => `<tr><td><div class="title-cell"><div class="cover cover-3">${escapeHtml(row.title.slice(0, 1))}</div><div><strong>${escapeHtml(row.title)}</strong><span>${escapeHtml(row.author)}</span></div></div></td><td>${escapeHtml(row.type)}</td><td class="mono">${row.episodes} 集</td><td class="mono">${formatNumber(row.views)}</td><td class="mono">${row.completion}%</td><td class="mono">${row.interaction}%</td><td class="mono">${row.conversion}%</td><td class="mono strong">${formatMoney(row.income)}</td><td class="mono">${row.refund}%</td><td class="mono ${row.growth < 0 ? "refund-value" : ""}">${row.growth > 0 ? "+" : ""}${row.growth}%</td><td class="mono">${formatMoney(row.cost)}</td><td>${statusTag(row.status, row.potential)}</td></tr>`).join("");
  const filter = `<div class="card filter-card"><div class="filter-row"><span class="filter-label">看板筛选</span><div class="field-wrap"><span class="search-icon">⌕</span><input class="field search" data-filter="${filterKey}" value="${escapeHtml(state.filters[filterKey] || "")}" placeholder="${view === "authors" ? "搜索作者 / 作者 ID" : "搜索作品 / 作者"}" /></div><span class="filter-spacer"></span><button class="btn btn-small" data-action="clear-filters">清空筛选</button></div></div>`;
  const panel = `<div class="card observation-card"><div class="table-head observation-head"><div><span class="table-title">成长收益观测</span><span class="table-caption">追踪作者 / 作品的潜力状态与投入产出</span></div><div class="observe-tabs"><button class="observe-tab ${view === "authors" ? "active" : ""}" data-action="set-workboard-view" data-view="authors">作者</button><button class="observe-tab ${view === "works" ? "active" : ""}" data-action="set-workboard-view" data-view="works">作品</button></div></div><div class="observation-note">${view === "authors" ? "作者维度：稳定产出 × 内容质量 × 商业转化 × 留存效率" : "作品维度：消费质量 × 互动 × 付费转化 × 增长速度 − 退款风险"}</div><div class="table-wrap">${view === "authors" ? `<table class="observation-table"><thead><tr><th>作者</th><th>层级</th><th>有效作品</th><th>更新频次</th><th>有效观看</th><th>完播率</th><th>付费转化</th><th>作者收入</th><th>平台贡献</th><th>单作者成本</th><th>30 日留存</th><th>潜力状态</th></tr></thead><tbody>${authorRows || `<tr><td colspan="12">${emptyState("暂无匹配作者", "换一个作者或作者 ID 试试")}</td></tr>`}</tbody></table>` : `<table class="observation-table"><thead><tr><th>作品</th><th>内容类型</th><th>集数</th><th>有效观看</th><th>完播率</th><th>互动率</th><th>付费转化</th><th>作品收入</th><th>退款率</th><th>近 7 日增长</th><th>流量成本</th><th>潜力状态</th></tr></thead><tbody>${workRows || `<tr><td colspan="12">${emptyState("暂无匹配作品", "换一个作品标题或作者试试")}</td></tr>`}</tbody></table>`}</div></div>`;
  return `${filter}${panel}`;
}

function renderCreatorIncomePrevious() {
  const author = (state.filters.incomeAuthor || "").toLowerCase();
  const incomeContract = state.filters.incomeContract || "";
  const incomeBank = state.filters.incomeBank || "";
  const accountMatches = (account) => (!author || [account.author, account.authorId, account.enterprise].some((value) => value.toLowerCase().includes(author))) && (!incomeContract || account.contract === incomeContract) && (!incomeBank || account.bank === incomeBank);
  const filteredAccounts = creatorAccounts.filter(accountMatches);
  const eligibleAuthorIds = new Set(filteredAccounts.map((account) => account.authorId));
  const rows = incomeRows.filter((row) => eligibleAuthorIds.has(row.authorId) && (!author || [row.author, row.authorId].some((value) => value.toLowerCase().includes(author)) || eligibleAuthorIds.has(row.authorId)) && (!state.filters.incomePeriod || (state.filters.incomePeriod === "7" ? Number(row.date.slice(3)) >= 21 : true)));
  const completedRate = (key) => filteredAccounts.length ? Math.round(filteredAccounts.filter((account) => account[key] === "done").length / filteredAccounts.length * 100) : 0;
  const riskCount = filteredAccounts.filter((account) => account.risk !== "normal").length;
  const groupedMap = new Map(filteredAccounts.map((account) => [account.authorId, { ...account, collections: new Set(), orders: 0, gross: 0, share: 0, refund: 0 }]));
  rows.forEach((row) => {
    const group = groupedMap.get(row.authorId);
    if (!group) return;
    group.collections.add(row.collection);
    group.orders += row.orders;
    group.gross += row.gross;
    group.share += row.share;
    group.refund += row.refund;
  });
  const groups = [...groupedMap.values()];
  const filter = `<div class="card filter-card"><div class="filter-row"><span class="filter-label">收入筛选</span><div class="field-wrap"><span class="search-icon">⌕</span><input class="field search" data-filter="incomeAuthor" value="${escapeHtml(state.filters.incomeAuthor || "")}" placeholder="搜索创作者" /></div><select class="field select-field" data-filter="incomePeriod"><option value="">全部周期</option><option value="7" ${state.filters.incomePeriod === "7" ? "selected" : ""}>近 7 天</option><option value="30" ${state.filters.incomePeriod === "30" ? "selected" : ""}>近 30 天</option></select><select class="field select-field" data-filter="incomeContract"><option value="">全部签约状态</option><option value="done" ${incomeContract === "done" ? "selected" : ""}>已签约</option><option value="pending" ${incomeContract === "pending" ? "selected" : ""}>待签约</option></select><select class="field select-field" data-filter="incomeBank"><option value="">全部绑卡状态</option><option value="done" ${incomeBank === "done" ? "selected" : ""}>已绑卡</option><option value="pending" ${incomeBank === "pending" ? "selected" : ""}>待绑卡</option></select><button class="field date-filter" type="button">2026/10/01 - 10/28 ▾</button><span class="filter-spacer"></span><button class="btn btn-small" data-action="clear-filters">清空筛选</button><button class="btn btn-small btn-primary" data-action="export-income">↓ 导出明细</button></div></div>`;
  const trend = [40, 54, 48, 63, 57, 76, 68, 83, 72, 92, 78, 96];
  const points = trend.map((v, i) => `${(i / (trend.length - 1) * 100).toFixed(2)},${(100 - v) * .82 + 8}`).join(" ");
  const area = `0,100 ${points} 100,100`;
  const rowsHtml = groups.map((group) => `<tr><td><div class="author-cell"><strong>${escapeHtml(group.author)}</strong><span>${escapeHtml(group.authorId)}</span></div></td><td class="mono">${group.collections.size} 个</td><td class="mono">${formatNumber(group.orders)}</td><td class="mono strong">${formatMoney(group.gross)}</td><td class="mono strong">${formatMoney(group.share)}</td><td>${accountStatusTag(group.verified)}</td><td>${accountStatusTag(group.contract)}</td><td>${accountStatusTag(group.bank)}</td><td><span class="enterprise-cell">${escapeHtml(group.enterprise)}</span></td><td>${riskStatusTag(group.risk, group.riskText)}<span class="risk-detail">${escapeHtml(group.riskDetail)}</span></td><td class="action-col"><button class="btn-text" data-action="view-income-author" data-author-id="${group.authorId}">查看详情</button></td></tr>`).join("");
  const table = groups.length ? `<table class="merged-account-table"><thead><tr class="table-group-row"><th rowspan="2">创作者</th><th colspan="4">收入汇总</th><th colspan="5">账号与风控</th><th rowspan="2" class="action-col">操作</th></tr><tr><th>合集数</th><th>总订单</th><th>总收入</th><th>创作者分成</th><th>实名认证</th><th>合同签约</th><th>银行卡</th><th>关联企业</th><th>安全风险</th></tr></thead><tbody>${rowsHtml}</tbody></table>` : emptyState("暂无匹配创作者", "调整作者、签约或绑卡筛选试试");
  return `${pageHead("创作者运营", "创作者收入", "按创作者和时间周期汇总查看收入分成与账号状态。") }<div class="metric-grid account-metrics">${metricCard("实名完成率", `${completedRate("verified")}<small>%</small>`, `${filteredAccounts.length} 位创作者`, "✓")}${metricCard("合同签约率", `${completedRate("contract")}<small>%</small>`, "影响合作与结算", "▣")}${metricCard("银行卡绑定率", `${completedRate("bank")}<small>%</small>`, "影响打款资格", "¥")}${metricCard("风险待处理", riskCount, riskCount ? "需运营复核" : "暂无风险", "!", riskCount ? "down" : "")}</div><div class="finance-grid"><div class="card chart-card"><div class="insight-head"><div><div class="insight-title">收入趋势</div><div class="insight-sub">近 12 个数据节点 · 单位：元</div></div><select class="duration-select"><option>近 30 天</option><option>近 90 天</option></select></div><div class="chart-wrap"><svg class="chart-svg" viewBox="0 0 100 100" preserveAspectRatio="none"><polygon points="${area}" fill="rgba(91,92,226,.08)"></polygon><polyline points="${points}" fill="none" stroke="#5b5ce2" stroke-width="1.5" vector-effect="non-scaling-stroke"></polyline>${trend.map((v, i) => `<circle cx="${(i / (trend.length - 1) * 100).toFixed(2)}" cy="${(100 - v) * .82 + 8}" r="1.5" fill="#fff" stroke="#5b5ce2" stroke-width="1" vector-effect="non-scaling-stroke"></circle>`).join("")}</svg></div><div class="chart-labels"><span>10/01</span><span>10/07</span><span>10/14</span><span>10/21</span><span>10/28</span></div><div class="chart-legend"><span><i class="line-dot"></i>平台流水</span><span><i class="line-dot green"></i>创作者分成</span></div></div><div class="card quick-card"><h3>收入贡献 Top 3</h3><div class="quick-list"><div class="quick-item"><div class="quick-rank">1</div><div><strong>周老师的奇妙课</strong><span>6 个合集 · 贡献 28%</span></div><div class="quick-value">¥48,620</div></div><div class="quick-item"><div class="quick-rank">2</div><div><strong>林间心理屋</strong><span>3 个合集 · 贡献 19%</span></div><div class="quick-value">¥32,780</div></div><div class="quick-item"><div class="quick-rank">3</div><div><strong>朵朵讲故事</strong><span>5 个合集 · 贡献 16%</span></div><div class="quick-value">¥28,140</div></div></div><div style="margin-top:20px; padding-top:14px; border-top:1px solid var(--line); color:var(--muted); font-size:11px">当前筛选共有 <strong style="color:var(--text)">${groups.length}</strong> 位创作者</div></div></div>${filter}<div class="card table-card"><div class="table-head"><div><span class="table-title">创作者收入与账号状态</span><span class="table-caption">共 ${groups.length} 位创作者 · 资料状态影响结算资格</span></div><span class="sortable-hint">风险标签仅用于运营排查</span></div><div class="table-wrap">${table}</div></div>`;
}

function renderBdOwnerCell(account) {
  if (state.bdEditingAuthorId !== account.authorId) {
    return `<div class="bd-owner-cell"><span class="bd-owner-name">${account.bdOwnerName ? `${escapeHtml(account.bdOwnerName)}<small>${escapeHtml(account.bdOwnerId)}</small>` : "未分配"}<button type="button" class="bd-edit-icon" data-action="edit-bd" data-author-id="${account.authorId}" aria-label="编辑 BD 责任人" title="编辑 BD 责任人">✎</button></span></div>`;
  }
  const query = state.bdQuery || "";
  const results = bdOwners.filter((owner) => !query || `${owner.employeeId} ${owner.name}`.toLowerCase().includes(query.toLowerCase())).map((owner) => `<button type="button" class="bd-result ${state.bdDraftOwnerId === owner.employeeId ? "selected" : ""}" data-action="select-bd" data-owner-id="${owner.employeeId}" data-owner-name="${owner.name}" data-author-id="${account.authorId}"><strong>${owner.employeeId}</strong><span>${owner.name}</span></button>`).join("");
  return `<div class="bd-editor"><input class="field bd-search" data-bd-search data-author-id="${account.authorId}" value="${escapeHtml(query)}" placeholder="搜索工号 / 姓名" autocomplete="off" />${results ? `<div class="bd-results">${results}</div>` : ""}${state.bdDraftOwnerId ? `<span class="bd-selected">已选 ${escapeHtml(state.bdDraftOwnerId)} · ${escapeHtml(state.bdDraftOwnerName)}</span>` : ""}<div class="bd-editor-actions"><button type="button" class="btn btn-small btn-primary" data-action="confirm-bd" data-author-id="${account.authorId}" ${state.bdDraftOwnerId ? "" : "disabled"}>确认</button><button type="button" class="btn btn-small" data-action="cancel-bd">取消</button></div></div>`;
}

function renderObservationPanel(view, filterKey = "workboardKeyword") {
  const keyword = (state.filters[filterKey] || "").toLowerCase();
  const potentialFilterKey = view === "authors" ? "workboardAuthorPotential" : "workboardWorkPotential";
  const potential = state.filters[potentialFilterKey] || "";
  const pct = (value) => `${Number(value || 0).toFixed(1)}%`;
  const gmv = (value) => `¥${Number(value || 0).toFixed(1)}`;
  const interactionRate = (row) => row.likeRate + row.commentRate + row.collectRate + row.danmakuRate;
  const alertClass = (value, threshold, tone) => Number(value) > threshold ? ` metric-alert-${tone}` : "";
  const metricCell = (value, formatter, threshold, tone) => `<td class="mono${alertClass(value, threshold, tone)}">${formatter(value)}</td>`;
  const signedNumber = (value) => `${Number(value || 0) > 0 ? "+" : ""}${formatNumber(value)}`;
  const episodeCount = (row) => String(row.episodeStructure || `1个${row.works}集`).replace(/结构$/, "");
  const authorRows = creatorObservationRows.filter((row) => (!keyword || [row.author, row.authorId].some((value) => value.toLowerCase().includes(keyword))) && (!potential || row.potential === potential)).map((row) => `<tr><td><div class="author-cell"><div class="author-name-line"><strong>${escapeHtml(row.author)}</strong>${row.boosted ? '<span class="boost-tag">加广</span>' : ""}</div><span>${escapeHtml(row.authorId)}</span></div></td><td><div class="potential-cell">${statusTag(row.status, row.potential)}</div></td><td class="mono">${escapeHtml(episodeCount(row))}</td><td>${escapeHtml(row.cadence)}</td><td class="mono">${row.freeVideos} 个</td><td class="mono">${formatNumber(row.views)}</td><td class="mono">${pct(row.completion)}</td><td class="mono">${pct(interactionRate(row))}</td><td class="mono">${signedNumber(row.followers7d)}</td><td class="mono">${pct(row.conversion)}</td><td class="mono">${pct(row.paidCompletion80)}</td><td class="mono strong">${formatMoney(row.income)}</td><td class="mono">${formatMoney(row.cost)}</td><td class="mono">${pct(row.retention)}</td></tr>`).join("");
  const workRows = workObservationRows.filter((row) => (!keyword || [row.title, row.author].some((value) => value.toLowerCase().includes(keyword))) && (!potential || row.potential === potential)).map((row) => `<tr><td><div class="title-cell"><div class="cover cover-3">${escapeHtml(row.title.slice(0, 1))}</div><div><strong>${escapeHtml(row.title)}</strong><span>${escapeHtml(row.author)}</span></div></div></td><td>${statusTag(row.status, row.potential)}</td><td>${escapeHtml(row.type)}</td><td class="mono">${formatNumber(row.adExposure)}</td><td class="mono">${pct(row.adCtr)}</td><td class="mono">${row.episodes} 集</td>${metricCell(row.bounce2s, pct, 50, "red")}${metricCell(row.completion80, pct, 70, "green")}${metricCell(row.serialRate, pct, 60, "green")}<td class="mono">${pct(interactionRate(row))}</td>${metricCell(row.purchaseCtr, pct, 10, "green")}<td class="mono">${formatNumber(row.attributedOrders)}</td><td class="mono strong">${gmv(row.gmvPerThousand)}</td><td class="mono">${pct(row.paidCompletion80)}</td><td class="mono">${pct(row.paidInteractionRate)}</td>${metricCell(row.refundRate, pct, 5, "red")}</tr>`).join("");
  const groupHead = `<tr class="metric-group-row"><th rowspan="2">作品</th><th rowspan="2">潜力状态</th><th rowspan="2">内容类型</th><th colspan="2">广告曝光</th><th colspan="5">免费吸引力</th><th colspan="3">付费转化能力</th><th colspan="2">付费观看</th><th rowspan="2">退费率</th></tr>`;
  const subHead = `<tr><th>广告曝光量</th><th>曝光点击率</th><th>${view === "authors" ? "有效作品数" : "集数"}</th><th>2s 跳出率</th><th>80% 完播率</th><th>连播率</th><th>互动率</th><th>购买点击率</th><th>归因订单数</th><th>千次播放 GMV</th><th>付费视频 80% 完播率</th><th>付费互动率</th></tr>`;
  const authorTable = `<table class="observation-table observation-author-table"><thead><tr><th>作者</th><th>潜力层级</th><th>剧集个数</th><th>更新频次</th><th>视频个数</th><th>免费平均播放量</th><th>免费完播率</th><th>互动率</th><th>7日粉丝增长</th><th>付费转化率</th><th>付费完播率</th><th>作者收入</th><th>激励成本</th><th>30日留存</th></tr></thead><tbody>${authorRows || `<tr><td colspan="14">${emptyState("暂无匹配作者", "换一个作者或作者 ID 试试")}</td></tr>`}</tbody></table>`;
  const workTable = `<table class="observation-table observation-metrics-table"><thead>${groupHead}${subHead}</thead><tbody>${workRows || `<tr><td colspan="16">${emptyState("暂无匹配作品", "换一个作品标题或作者试试")}</td></tr>`}</tbody></table>`;
  const table = view === "authors" ? authorTable : workTable;
  const potentialOptions = (view === "authors" ? ["高潜作者", "成长作者", "稳定作者", "观察对象"] : ["高潜作品", "成长作品", "稳定作品", "待优化"]).map((value) => `<option value="${escapeHtml(value)}" ${potential === value ? "selected" : ""}>${escapeHtml(value)}</option>`).join("");
  const filter = `<div class="card filter-card"><div class="filter-row"><span class="filter-label">看板筛选</span><div class="field-wrap"><span class="search-icon">⌕</span><input class="field search" data-filter="${filterKey}" value="${escapeHtml(state.filters[filterKey] || "")}" placeholder="${view === "authors" ? "搜索作者 / 作者 ID" : "搜索作品 / 作者"}" /></div><select class="field select-field potential-select" data-filter="${potentialFilterKey}"><option value="">全部潜力</option>${potentialOptions}</select><span class="filter-spacer"></span><button class="btn btn-small" data-action="clear-filters">清空筛选</button><button class="btn btn-small btn-primary" data-action="export-workboard">↓ 导出明细</button></div></div>`;
  const panel = `<div class="card observation-card"><div class="table-head observation-head"><div><span class="table-title">成长收益观测</span><span class="table-caption">广告曝光、免费吸引力、付费转化、付费观看与退费表现</span></div><div class="observe-tabs"><button class="observe-tab ${view === "authors" ? "active" : ""}" data-action="set-workboard-view" data-view="authors">作者</button><button class="observe-tab ${view === "works" ? "active" : ""}" data-action="set-workboard-view" data-view="works">作品</button></div></div><div class="observation-note">指标分为广告曝光、免费吸引力、付费转化能力、付费观看和退费率五组，表格支持横向滚动查看完整字段。</div><div class="table-wrap">${table}</div></div>`;
  return `${filter}${panel}`;
}

function formatTrendDate(date) {
  return `${String(date.getMonth() + 1).padStart(2, "0")}/${String(date.getDate()).padStart(2, "0")}`;
}

function buildIncomeTrend(groups, range, incomeMonth) {
  const nodeCount = range === "90" ? 90 : 30;
  const [year, month] = (incomeMonth || "2026-10").split("-").map(Number);
  const monthEndDay = new Date(year, month, 0).getDate();
  const endDate = new Date(year, month - 1, Math.min(30, monthEndDay));
  const dates = Array.from({ length: nodeCount }, (_, index) => {
    const date = new Date(endDate);
    date.setDate(endDate.getDate() - (nodeCount - 1 - index));
    return date;
  });
  const grossBase = groups.reduce((sum, group) => sum + group.gross, 0);
  const creatorBase = groups.reduce((sum, group) => sum + group.share, 0);
  if (!grossBase && !creatorBase) return dates.map((date) => ({ date: formatTrendDate(date), platformTotal: 0, ugcRevenue: 0, creatorIncome: 0 }));
  const ugcBase = Math.max(grossBase, creatorBase);
  const platformBase = Math.max(ugcBase + 1, Math.round(ugcBase * 1.22));
  return dates.map((date, index) => {
    const wave = 0.88 + (Math.sin(index * 0.55) + 1) * 0.08 + ((index % 5) - 2) * 0.012;
    const creatorIncome = Math.round(creatorBase * wave);
    const ugcRevenue = Math.max(creatorIncome, Math.round(ugcBase * wave));
    const platformTotal = Math.max(ugcRevenue + 1, Math.round(platformBase * wave));
    return { date: formatTrendDate(date), platformTotal, ugcRevenue, creatorIncome };
  });
}

function showTrendTooltip(target) {
  const chartWrap = target.closest(".chart-wrap");
  const tooltip = chartWrap?.querySelector(".trend-tooltip");
  if (!chartWrap || !tooltip) return;
  tooltip.innerHTML = `<strong>${escapeHtml(target.dataset.trendDate)}</strong><span><i class="tooltip-dot platform"></i>平台总流水 <b>${formatMoney(target.dataset.platformTotal)}</b></span><span><i class="tooltip-dot ugc"></i>UGC来源营收 <b>${formatMoney(target.dataset.ugcRevenue)}</b></span><span><i class="tooltip-dot creator"></i>创作者收入 <b>${formatMoney(target.dataset.creatorIncome)}</b></span>`;
  tooltip.classList.add("is-visible");
  const wrapRect = chartWrap.getBoundingClientRect();
  const targetRect = target.getBoundingClientRect();
  const left = Math.min(Math.max(targetRect.left - wrapRect.left + targetRect.width / 2 - tooltip.offsetWidth / 2, 6), wrapRect.width - tooltip.offsetWidth - 6);
  const top = Math.max(targetRect.top - wrapRect.top - tooltip.offsetHeight - 10, 6);
  tooltip.style.left = `${left}px`;
  tooltip.style.top = `${top}px`;
}

function hideTrendTooltip(target) {
  target.closest(".chart-wrap")?.querySelector(".trend-tooltip")?.classList.remove("is-visible");
}

function handleTrendMouseOver(event) {
  const target = event.target.closest("[data-trend-index]");
  if (target) showTrendTooltip(target);
}

function handleTrendMouseOut(event) {
  const target = event.target.closest("[data-trend-index]");
  if (target && !target.contains(event.relatedTarget)) hideTrendTooltip(target);
}

function renderCreatorIncomeBase() {
  const author = (state.filters.incomeAuthor || "").toLowerCase();
  const incomeMonth = state.filters.incomeMonth || "2026-10";
  const incomeContract = state.filters.incomeContract || "";
  const incomeBank = state.filters.incomeBank || "";
  const incomeBdOwner = state.filters.incomeBdOwner || "";
  const ownerMatches = (account) => !incomeBdOwner || (incomeBdOwner === "unassigned" ? !account.bdOwnerId : account.bdOwnerId === incomeBdOwner);
  const accountMatches = (account) => (!author || [account.author, account.authorId, account.enterprise].some((value) => value.toLowerCase().includes(author))) && (!incomeContract || account.contract === incomeContract) && (!incomeBank || account.bank === incomeBank) && ownerMatches(account);
  const filteredAccounts = creatorAccounts.filter(accountMatches);
  const eligibleAuthorIds = new Set(filteredAccounts.map((account) => account.authorId));
  const rows = incomeRows.filter((row) => eligibleAuthorIds.has(row.authorId) && (!incomeMonth || row.month === incomeMonth) && (!state.filters.incomePeriod || (state.filters.incomePeriod === "7" ? Number(row.date.slice(3)) >= 21 : true)));
  const completedRate = (key) => filteredAccounts.length ? Math.round(filteredAccounts.filter((account) => account[key] === "done").length / filteredAccounts.length * 100) : 0;
  const riskCount = filteredAccounts.filter((account) => account.risk !== "normal").length;
  const groupedMap = new Map(filteredAccounts.map((account) => [account.authorId, { ...account, collections: new Set(), orders: 0, gross: 0, share: 0, refund: 0 }]));
  rows.forEach((row) => {
    const group = groupedMap.get(row.authorId);
    if (!group) return;
    group.collections.add(row.collection);
    group.orders += row.orders;
    group.gross += row.gross;
    group.share += row.share;
    group.refund += row.refund;
  });
  const groups = [...groupedMap.values()].sort((a, b) => {
    const sortKey = state.incomeSortKey;
    if (!sortKey) return a.author.localeCompare(b.author, "zh-CN");
    const aValue = sortKey === "collections" ? a.collections.size : a.gross;
    const bValue = sortKey === "collections" ? b.collections.size : b.gross;
    const delta = Number(bValue) - Number(aValue);
    if (delta !== 0) return state.incomeSortDirection === "asc" ? -delta : delta;
    return a.author.localeCompare(b.author, "zh-CN");
  });
  const bdOptions = bdOwners.map((owner) => `<option value="${owner.employeeId}" ${incomeBdOwner === owner.employeeId ? "selected" : ""}>${owner.name} · ${owner.employeeId}</option>`).join("");
  const filter = `<div class="card filter-card"><div class="filter-row"><span class="filter-label">收入筛选</span><div class="field-wrap"><span class="search-icon">⌕</span><input class="field search" data-filter="incomeAuthor" value="${escapeHtml(state.filters.incomeAuthor || "")}" placeholder="搜索创作者" /></div><select class="field select-field" data-filter="incomePeriod"><option value="">全部周期</option><option value="7" ${state.filters.incomePeriod === "7" ? "selected" : ""}>近 7 天</option><option value="30" ${state.filters.incomePeriod === "30" ? "selected" : ""}>近 30 天</option></select><select class="field select-field" data-filter="incomeContract"><option value="">全部签约状态</option><option value="done" ${incomeContract === "done" ? "selected" : ""}>已签约</option><option value="pending" ${incomeContract === "pending" ? "selected" : ""}>待签约</option></select><select class="field select-field" data-filter="incomeBank"><option value="">全部绑卡状态</option><option value="done" ${incomeBank === "done" ? "selected" : ""}>已绑卡</option><option value="pending" ${incomeBank === "pending" ? "selected" : ""}>待绑卡</option></select><select class="field select-field" data-filter="incomeBdOwner"><option value="">全部 BD 责任人</option><option value="unassigned" ${incomeBdOwner === "unassigned" ? "selected" : ""}>未分配</option>${bdOptions}</select><select class="field select-field month-select" data-filter="incomeMonth"><option value="2026-10" ${incomeMonth === "2026-10" ? "selected" : ""}>账期选择：2026 年 10 月</option><option value="2026-09" ${incomeMonth === "2026-09" ? "selected" : ""}>账期选择：2026 年 09 月</option></select><span class="filter-spacer"></span><button class="btn btn-small" data-action="clear-filters">清空筛选</button><button class="btn btn-small btn-primary" data-action="export-income">↓ 导出明细</button></div></div>`;
  const trendRange = state.filters.incomeTrendRange || "30";
  const trend = buildIncomeTrend(groups, trendRange, incomeMonth);
  const trendValues = trend.flatMap((item) => [item.platformTotal, item.ugcRevenue, item.creatorIncome]);
  const trendMin = Math.min(...trendValues);
  const trendMax = Math.max(...trendValues);
  const trendPadding = Math.max((trendMax - trendMin) * 0.12, 1);
  const scaleMin = Math.max(0, trendMin - trendPadding);
  const scaleMax = trendMax + trendPadding;
  const chartY = (value) => 92 - ((value - scaleMin) / Math.max(scaleMax - scaleMin, 1)) * 82;
  const chartX = (index) => trend.length === 1 ? 0 : (index / (trend.length - 1) * 100).toFixed(2);
  const trendSeries = [
    { key: "platformTotal", label: "平台总流水", color: "#5b5ce2" },
    { key: "ugcRevenue", label: "UGC来源营收", color: "#e49a52" },
    { key: "creatorIncome", label: "创作者收入", color: "#28b5a7" }
  ];
  const chartSvg = trendSeries.map((series) => {
    const points = trend.map((item, index) => `${chartX(index)},${chartY(item[series.key]).toFixed(2)}`).join(" ");
    return `<polyline points="${points}" fill="none" stroke="${series.color}" stroke-width="1.7" vector-effect="non-scaling-stroke"></polyline>`;
  }).join("");
  const chartHoverTargets = trend.map((item, index) => {
    const currentX = Number(chartX(index));
    const previousX = index === 0 ? 0 : Number(chartX(index - 1));
    const nextX = index === trend.length - 1 ? 100 : Number(chartX(index + 1));
    const start = index === 0 ? 0 : (previousX + currentX) / 2;
    const end = index === trend.length - 1 ? 100 : (currentX + nextX) / 2;
    return `<rect class="chart-hover-target" data-trend-index="${index}" data-trend-date="${item.date}" data-platform-total="${item.platformTotal}" data-ugc-revenue="${item.ugcRevenue}" data-creator-income="${item.creatorIncome}" x="${start.toFixed(2)}" y="0" width="${(end - start).toFixed(2)}" height="100" fill="#fff" fill-opacity="0" pointer-events="all" tabindex="0" aria-label="${escapeHtml(`${item.date} 收入趋势`)}"></rect>`;
  }).join("");
  const axisLabels = [0, 0.25, 0.5, 0.75, 1].map((ratio) => formatMoney(Math.round(trendMax - (trendMax - scaleMin) * ratio)));
  const chartLabelIndexes = [...new Set([0, Math.round((trend.length - 1) * 0.25), Math.round((trend.length - 1) * 0.5), Math.round((trend.length - 1) * 0.75), trend.length - 1])];
  const chartLabels = chartLabelIndexes.map((index) => `<span>${trend[index].date}</span>`).join("");
  const sortButton = (key, label) => {
    const active = state.incomeSortKey === key;
    const icon = active ? (state.incomeSortDirection === "asc" ? "↑" : "↓") : "↕";
    return `<button type="button" class="table-sort-button${active ? " is-active" : ""}" data-action="sort-income" data-sort-key="${key}" aria-label="按${label}${active && state.incomeSortDirection === "asc" ? "升序" : "降序"}排序" aria-sort="${active ? state.incomeSortDirection : "none"}"><span>${label}</span><span class="table-sort-icon">${icon}</span></button>`;
  };
  const rowsHtml = groups.map((group) => `<tr><td><div class="author-cell"><button class="creator-link" data-action="view-creator-diagnosis" data-author-id="${group.authorId}">${escapeHtml(group.author)}</button><span>${escapeHtml(group.authorId)}</span></div></td><td>${renderBdOwnerCell(group)}</td><td>${contractStatusCell(group)}</td><td>${accountStatusTag(group.bank)}</td><td><span class="enterprise-cell">${escapeHtml(group.enterprise)}</span></td><td>${riskStatusTag(group.risk, group.riskText)}<span class="risk-detail">${escapeHtml(group.riskDetail)}</span></td><td class="mono">${group.collections.size} 个</td><td class="mono">${formatNumber(group.orders)}</td><td class="mono strong">${formatMoney(group.gross)}</td><td class="mono strong">${formatMoney(group.share)}</td><td class="action-col"><div class="row-actions action-stack"><button class="btn-text danger" data-action="unbind-realname" data-author-id="${group.authorId}">解绑实名</button><button class="btn-text" data-action="view-phone" data-author-id="${group.authorId}">查看手机号</button></div></td></tr>`).join("");
  const table = groups.length ? `<table class="merged-account-table"><thead><tr class="table-group-row"><th rowspan="2">创作者</th><th rowspan="2">BD 责任人</th><th colspan="4">账号与风控</th><th colspan="4">收入汇总</th><th rowspan="2" class="action-col">操作</th></tr><tr><th>合同签约</th><th>银行卡</th><th>关联企业</th><th>安全风险</th><th>${sortButton("collections", "合集数")}</th><th>总订单</th><th>${sortButton("gross", "总收入")}</th><th>创作者分成</th></tr></thead><tbody>${rowsHtml}</tbody></table>` : emptyState("暂无匹配创作者", "调整作者、签约、绑卡或 BD 责任人筛选试试");
  return `${pageHead("创作者运营", "创作者收入", "按创作者和时间周期汇总查看收入分成与账号状态。") }<div class="metric-grid account-metrics">${metricCard("实名完成率", `${completedRate("verified")}<small>%</small>`, `${filteredAccounts.length} 位创作者`, "✓")}${metricCard("合同签约率", `${completedRate("contract")}<small>%</small>`, "影响合作与结算", "▣")}${metricCard("银行卡绑定率", `${completedRate("bank")}<small>%</small>`, "影响打款资格", "¥")}${metricCard("风险待处理", riskCount, riskCount ? "需运营复核" : "暂无风险", "!", riskCount ? "down" : "")}</div><div class="finance-grid"><div class="card chart-card"><div class="insight-head"><div><div class="insight-title">收入趋势</div><div class="insight-sub">近 ${trendRange} 天 · 每日数据 · 单位：元</div></div><select class="duration-select" data-filter="incomeTrendRange" aria-label="收入趋势时间范围"><option value="30" ${trendRange === "30" ? "selected" : ""}>近 30 天</option><option value="90" ${trendRange === "90" ? "selected" : ""}>近 90 天</option></select></div><div class="chart-with-axis"><div class="chart-y-axis">${axisLabels.map((label) => `<span>${label}</span>`).join("")}</div><div class="chart-wrap"><svg class="chart-svg" viewBox="0 0 100 100" preserveAspectRatio="none">${chartSvg}${chartHoverTargets}</svg><div class="trend-tooltip" role="status" aria-live="polite"></div></div></div><div class="chart-labels">${chartLabels}</div><div class="chart-legend"><span><i class="line-dot"></i>平台总流水</span><span><i class="line-dot orange"></i>UGC来源营收</span><span><i class="line-dot green"></i>创作者收入</span></div></div><div class="card quick-card"><h3>收入贡献 Top 3</h3><div class="quick-list"><div class="quick-item"><div class="quick-rank">1</div><div><strong>周老师的奇妙课</strong><span>6 个合集 · 贡献 28%</span></div><div class="quick-value">¥48,620</div></div><div class="quick-item"><div class="quick-rank">2</div><div><strong>林间心理屋</strong><span>3 个合集 · 贡献 19%</span></div><div class="quick-value">¥32,780</div></div><div class="quick-item"><div class="quick-rank">3</div><div><strong>朵朵讲故事</strong><span>5 个合集 · 贡献 16%</span></div><div class="quick-value">¥28,140</div></div></div><div class="quick-status-placeholder"></div></div></div>${filter}<div class="card table-card"><div class="table-head"><div><span class="table-title">创作者收入与账号状态</span><span class="table-caption">共 ${groups.length} 位创作者 · 资料状态影响结算资格</span></div><span class="sortable-hint">BD 责任人可单独维护</span></div><div class="table-wrap">${table}</div></div>`;
}

function renderCreatorIncome() {
  const author = (state.filters.incomeAuthor || "").toLowerCase();
  const incomeContract = state.filters.incomeContract || "";
  const incomeBank = state.filters.incomeBank || "";
  const incomeBdOwner = state.filters.incomeBdOwner || "";
  const accounts = creatorAccounts.filter((account) => {
    const ownerMatched = !incomeBdOwner || (incomeBdOwner === "unassigned" ? !account.bdOwnerId : account.bdOwnerId === incomeBdOwner);
    return (!author || [account.author, account.authorId, account.enterprise].some((value) => value.toLowerCase().includes(author))) && (!incomeContract || account.contract === incomeContract) && (!incomeBank || account.bank === incomeBank) && ownerMatched;
  });
  const rate = (key) => accounts.length ? Math.round(accounts.filter((account) => account[key] === "done").length / accounts.length * 100) : 0;
  let html = renderCreatorIncomeBase();
  html = html.replace(/<div class="metric-grid account-metrics">[\s\S]*?<\/div><div class="finance-grid">/, '<div class="finance-grid">');
  return html.replace(/<div class="quick-status-placeholder"><\/div>/, `<div class="quick-status-row"><span>签约率 <strong>${rate("contract")}%</strong></span><span>绑卡率 <strong>${rate("bank")}%</strong></span></div>`);
}

function renderCreatorWorkboard() {
  const view = state.filters.workboardView || "authors";
  return `${pageHead("创作者运营", "作者作品看板", "追踪作者与作品的潜力状态、内容表现和投入产出。")}${renderObservationPanel(view)}`;
}

function renderCreatorDiagnosis() {
  const account = creatorAccounts.find((item) => item.authorId === state.selectedAuthorId);
  if (!account) return `${pageHead("创作者运营", "创作者诊断", "未找到对应的创作者。", `<a class="btn" href="#/creator-income">← 返回创作者收入</a>`)}${emptyState("暂无创作者数据", "请从创作者收入页选择一个作者查看诊断")}`;
  const income = incomeRows.filter((row) => row.authorId === account.authorId);
  const observation = creatorObservationRows.find((row) => row.authorId === account.authorId);
  const totalOrders = income.reduce((sum, row) => sum + row.orders, 0);
  const totalGross = income.reduce((sum, row) => sum + row.gross, 0);
  const totalShare = income.reduce((sum, row) => sum + row.share, 0);
  const diagnosis = account.risk === "normal" ? "账号状态稳定，可继续关注内容产出和商业转化。" : account.risk === "watch" ? "存在内容相似风险，建议 BD 跟进作者内容来源和后续选题。" : "存在需要运营跟进的风险，请先完成资料或风控复核。";
  const incomeDetail = income.map((row) => `<tr><td>${escapeHtml(row.date)}</td><td>${escapeHtml(row.collection)}</td><td class="mono">${row.orders}</td><td class="mono strong">${formatMoney(row.gross)}</td><td class="mono strong">${formatMoney(row.share)}</td><td>${statusTag(row.status, row.status)}</td></tr>`).join("");
  return `${pageHead("创作者运营", "创作者诊断", `${account.author} · ${account.authorId}`, `<a class="btn" href="#/creator-income">← 返回创作者收入</a>`)}<div class="diagnosis-hero card"><div class="detail-hero"><div class="avatar" style="width:58px;height:58px;font-size:18px">${escapeHtml(account.author.slice(0, 1))}</div><div><h3>${escapeHtml(account.author)}</h3><p>作者 ID：${escapeHtml(account.authorId)} · 关联企业：${escapeHtml(account.enterprise)}</p><div class="tag-row">${accountStatusTag(account.contract)}${accountStatusTag(account.bank)}${riskStatusTag(account.risk, account.riskText)}</div></div></div><div class="diagnosis-summary"><strong>运营诊断</strong><span>${escapeHtml(diagnosis)}</span></div></div><div class="metric-grid">${metricCard("合集数", new Set(income.map((row) => row.collection)).size, "当前收入周期", "▤")}${metricCard("总订单", formatNumber(totalOrders), "收入订单累计", "◎")}${metricCard("总收入", formatMoney(totalGross), "平台流水", "¥")}${metricCard("创作者分成", formatMoney(totalShare), "当前应结分成", "↗")}</div><div class="card table-card"><div class="table-head"><div><span class="table-title">收入明细</span><span class="table-caption">共 ${income.length} 条记录</span></div></div><div class="table-wrap"><table><thead><tr><th>日期</th><th>合集</th><th>订单数</th><th>总收入</th><th>创作者分成</th><th>状态</th></tr></thead><tbody>${incomeDetail}</tbody></table></div></div><div class="card diagnosis-card"><div class="table-head"><div><span class="table-title">内容表现摘要</span><span class="table-caption">来自作者作品看板</span></div></div><div class="diagnosis-grid"><div><span>作者层级</span><strong>${escapeHtml(observation?.level || "暂无")}</strong></div><div><span>有效作品</span><strong>${observation?.works ?? 0} 个</strong></div><div><span>有效观看</span><strong>${formatNumber(observation?.views || 0)}</strong></div><div><span>30 日留存</span><strong>${observation?.retention ?? 0}%</strong></div><div><span>潜力状态</span><strong>${escapeHtml(observation?.potential || "暂无")}</strong></div></div></div>`;
}

function renderSettlements() {
  const keyword = (state.filters.settlementKeyword || "").toLowerCase();
  const status = state.filters.settlementStatus || "";
  const rows = settlementRows.filter((row) => (!keyword || [row.no, ...row.authors.flatMap((author) => [author.author, author.authorId])].some((v) => v.toLowerCase().includes(keyword))) && (!status || row.status === status));
  const processing = settlementRows.filter((row) => row.status === "processing" || row.status === "pending").length;
  const pendingMoney = settlementRows.filter((row) => row.status !== "done").reduce((sum, row) => sum + row.due, 0);
  const filter = `<div class="card filter-card"><div class="filter-row"><span class="filter-label">对账筛选</span><div class="field-wrap"><span class="search-icon">⌕</span><input class="field search" data-filter="settlementKeyword" value="${escapeHtml(state.filters.settlementKeyword || "")}" placeholder="搜索结算单号 / 作者 / 作者 ID" /></div><select class="field select-field" data-filter="settlementStatus"><option value="">全部状态</option><option value="pending" ${status === "pending" ? "selected" : ""}>待审核</option><option value="processing" ${status === "processing" ? "selected" : ""}>处理中</option><option value="done" ${status === "done" ? "selected" : ""}>已完成</option></select><button class="field" style="width:145px; color:#8790a2; text-align:left">结算周期 ▾</button><span class="filter-spacer"></span><button class="btn btn-small" data-action="clear-filters">清空筛选</button></div></div>`;
  const rowsHtml = rows.map((row) => `<tr><td><span class="link-id" data-action="view-settlement" data-id="${row.no}">${row.no}</span></td><td class="mono">${row.authors.length} 位</td><td>${row.period}</td><td class="muted">${row.created.slice(5)}</td><td class="mono strong">${formatMoney(row.due)}</td><td>${statusTag(row.status, row.statusText)}</td><td class="action-col"><div class="row-actions"><button class="btn-text" data-action="view-settlement" data-id="${row.no}">查看明细</button><button class="btn-text" data-action="export-settlement" data-id="${row.no}">导出</button></div></td></tr>`).join("");
  return `${pageHead("财务管理", "结算对账", "跟进已发起结算单，核对应付金额和多个创作者的结算进度。", `<button class="btn btn-primary" data-action="open-import-settlement">＋ 手动导入结算单</button>`)}<div class="metric-grid">${metricCard("结算单总数", settlementRows.length, "本月新增 5 张", "◎")}${metricCard("处理中", processing, "请在 2 个工作日内处理", "◷")}${metricCard("待结算金额", formatMoney(pendingMoney), "较上周 -8.2%", "¥")}${metricCard("本月已结算", formatMoney(settlementRows.filter((row) => row.status === "done").reduce((sum, row) => sum + row.paid, 0)), "共 3 张结算单", "✓")}</div>${filter}<div class="card table-card"><div class="table-head"><div><span class="table-title">结算单列表</span><span class="table-caption">共 ${rows.length} 张</span></div><span class="sortable-hint">每张结算单可包含多个创作者</span></div><div class="table-wrap">${rows.length ? `<table><thead><tr><th>结算单号</th><th>作者数</th><th>结算周期</th><th>发起时间</th><th>应结金额</th><th>状态</th><th class="action-col">操作</th></tr></thead><tbody>${rowsHtml}</tbody></table>` : emptyState("暂无符合条件的结算单", "换一个关键词或清空筛选")}</div></div>`;
}

function emptyState(title, text) { return `<div class="empty"><div class="empty-icon">⌕</div><strong>${escapeHtml(title)}</strong><span>${escapeHtml(text)}</span></div>`; }

function handleInput(event) {
  const target = event.target;
  if (target.matches("[data-bd-search]")) {
    state.bdQuery = target.value;
    render();
    const matching = document.querySelector("[data-bd-search]");
    if (matching) { matching.focus(); matching.setSelectionRange(matching.value.length, matching.value.length); }
    return;
  }
  if (!target.matches("[data-filter]")) return;
  state.filters[target.dataset.filter] = target.value;
  render();
  const matching = document.querySelector(`[data-filter="${target.dataset.filter}"]`);
  if (matching && matching.type === "text") { matching.focus(); matching.setSelectionRange(matching.value.length, matching.value.length); }
}

function handleChange(event) {
  const target = event.target;
  if (target.matches("[data-filter]")) { state.filters[target.dataset.filter] = target.value; render(); return; }
}

function handleSubmit(event) {
  const form = event.target;
  if (form.dataset.form === "settlement-import") {
    event.preventDefault();
    const settlementNo = String(new FormData(form).get("settlementNo") || "").trim().toUpperCase();
    if (!settlementNo) { toast("请输入结算单号", "error"); return; }
    if (settlementRows.some((row) => row.no === settlementNo)) { toast("该结算单已在列表中，不能重复导入", "error"); return; }
    const imported = { no: settlementNo, authors: [{ author: "系统查询中", authorId: "QUERYING", orders: 0, due: 0, paid: 0, share: 0, refund: 0 }], period: "查询中", created: "2026-10-28 15:20", due: 0, paid: 0, status: "processing", statusText: "查询中", items: 0 };
    settlementRows.unshift(imported);
    closeAllOverlays();
    render();
    toast(`结算单 ${settlementNo} 已导入，正在查询状态`);
    setTimeout(() => {
      imported.authors = [{ author: "周老师的奇妙课", authorId: "AUTH-10018", orders: 21, due: 12680, paid: 0, share: 12680, refund: 80 }];
      imported.period = "10/16 - 10/28";
      imported.due = 12680;
      imported.items = 21;
      imported.status = "pending";
      imported.statusText = "待审核";
      if (state.route === "settlements") render();
      toast(`结算单 ${settlementNo} 状态查询完成`);
    }, 1200);
    return;
  }
  if (form.dataset.form !== "micro-add") return;
  event.preventDefault();
  const data = new FormData(form);
  const collectionId = data.get("collectionId");
  const subject = String(data.get("subject") || "").trim();
  const category = String(data.get("category") || "").trim();
  const order = Number(data.get("order"));
  if (!collectionId || !subject || !category || !order) { toast("请完整填写必填项", "error"); return; }
  const existing = microCourseItems.find((item) => item.collectionId === collectionId);
  if (existing && existing.status === "on") { toast("该合集已在微课 Tab 中", "error"); return; }
  const item = { collectionId, subject, category, order, effective: data.get("effective") || "2026-10-28", exposure: existing?.exposure || 0, clicks: existing?.clicks || 0, status: "on" };
  if (existing) Object.assign(existing, item); else microCourseItems.push(item);
  microCourseItems.sort((a, b) => a.order - b.order).forEach((entry, index) => { entry.order = index + 1; });
  closeAllOverlays(); render(); toast("精选内容已加入微课 Tab");
}

function handleClick(event) {
  const target = event.target.closest("[data-action]");
  if (!target) return;
  const action = target.dataset.action;
  if (action === "clear-filters") { state.filters = {}; render(); return; }
  if (action === "set-income-view") { state.filters.incomeView = target.dataset.view || "authors"; render(); return; }
  if (action === "set-workboard-view") { state.filters.workboardView = target.dataset.view || "authors"; render(); return; }
  if (action === "sort-income") {
    const key = target.dataset.sortKey;
    if (!["collections", "gross"].includes(key)) return;
    if (state.incomeSortKey === key) state.incomeSortDirection = state.incomeSortDirection === "asc" ? "desc" : "asc";
    else { state.incomeSortKey = key; state.incomeSortDirection = "desc"; }
    render();
    return;
  }
  if (action === "view-creator-diagnosis") { location.hash = `#/creator-diagnosis/${target.dataset.authorId}`; return; }
  if (action === "view-phone") { openPhoneModal(target.dataset.authorId); return; }
  if (action === "copy-contract-link") {
    const account = creatorAccounts.find((item) => item.authorId === target.dataset.authorId);
    if (!account) return;
    copyText(`https://ops.ttxue.cn/contracts/${encodeURIComponent(account.authorId)}`, "合同链接已复制");
    return;
  }
  if (action === "unbind-realname") {
    const account = creatorAccounts.find((item) => item.authorId === target.dataset.authorId);
    if (!account) return;
    confirmAction("确认解绑实名认证？", `解绑后「${account.author}」将无法继续使用当前实名认证信息，需重新完成认证。`, () => { account.verified = "pending"; render(); toast("已解绑实名认证"); });
    return;
  }
  if (action === "edit-bd") {
    const account = creatorAccounts.find((item) => item.authorId === target.dataset.authorId);
    state.bdEditingAuthorId = target.dataset.authorId;
    state.bdQuery = account?.bdOwnerId || "";
    state.bdDraftOwnerId = account?.bdOwnerId || "";
    state.bdDraftOwnerName = account?.bdOwnerName || "";
    render();
    return;
  }
  if (action === "select-bd") {
    state.bdDraftOwnerId = target.dataset.ownerId;
    state.bdDraftOwnerName = target.dataset.ownerName;
    state.bdQuery = target.dataset.ownerId;
    render();
    return;
  }
  if (action === "confirm-bd") {
    const account = creatorAccounts.find((item) => item.authorId === target.dataset.authorId);
    if (!account || !state.bdDraftOwnerId) return;
    account.bdOwnerId = state.bdDraftOwnerId;
    account.bdOwnerName = state.bdDraftOwnerName;
    state.bdEditingAuthorId = null;
    state.bdQuery = "";
    state.bdDraftOwnerId = "";
    state.bdDraftOwnerName = "";
    render();
    toast(`已将 BD 责任人设置为 ${account.bdOwnerName}`);
    return;
  }
  if (action === "cancel-bd") {
    state.bdEditingAuthorId = null;
    state.bdQuery = "";
    state.bdDraftOwnerId = "";
    state.bdDraftOwnerName = "";
    render();
    return;
  }
  if (action === "view-collection") { openCollectionDrawer(target.dataset.id); return; }
  if (action === "toggle-micro") {
    const collection = collectionById(target.dataset.id);
    const existing = microCourseItems.find((item) => item.collectionId === target.dataset.id && item.status === "on");
    if (existing) toggleMicroAssociation(target.dataset.id);
    else if (collection?.status === "on") openMicroModal(target.dataset.id);
    else toast("仅可将已上架合集加入微课 Tab", "error");
    return;
  }
  if (action === "add-micro" || action === "open-add-micro") { openMicroModal(action === "add-micro" ? target.dataset.id : ""); return; }
  if (action === "view-episode") { openVideoModal(target.dataset.collectionId, Number(target.dataset.episodeIndex)); return; }
  if (action === "off-episode") { offEpisode(target.dataset.collectionId, Number(target.dataset.episodeIndex)); return; }
  if (action === "view-income-author") { openCreatorIncomeDrawer(target.dataset.authorId); return; }
  if (action === "export-workboard") {
    const view = state.filters.workboardView || "authors";
    const keyword = (state.filters.workboardKeyword || "").toLowerCase();
    const potential = state.filters[view === "authors" ? "workboardAuthorPotential" : "workboardWorkPotential"] || "";
    const exportRows = view === "authors"
      ? creatorObservationRows.filter((row) => (!keyword || [row.author, row.authorId].some((value) => value.toLowerCase().includes(keyword))) && (!potential || row.potential === potential)).map((row) => ({ author: row.author, boostTag: row.boosted ? "加广" : "", potentialLevel: row.potential, episodes: String(row.episodeStructure || `1个${row.works}集`).replace(/结构$/, ""), cadence: row.cadence, freeVideos: `${row.freeVideos} 个`, freeAvgViews: formatNumber(row.views), freeCompletion: `${row.completion}%`, interactionRate: `${(row.likeRate + row.commentRate + row.collectRate + row.danmakuRate).toFixed(1)}%`, followers7d: `${Number(row.followers7d) > 0 ? "+" : ""}${formatNumber(row.followers7d)}`, paidConversion: `${row.conversion}%`, paidCompletion: `${row.paidCompletion80}%`, income: formatMoney(row.income), incentiveCost: formatMoney(row.cost), retention: `${row.retention}%` }))
      : workObservationRows.filter((row) => (!keyword || [row.title, row.author].some((value) => value.toLowerCase().includes(keyword))) && (!potential || row.potential === potential)).map((row) => ({ title: row.title, author: row.author, potential: row.potential, type: row.type, adExposure: row.adExposure, adCtr: `${row.adCtr}%`, episodes: row.episodes, bounce2s: `${row.bounce2s}%`, completion80: `${row.completion80}%`, serialRate: `${row.serialRate}%`, interactionRate: `${(row.likeRate + row.commentRate + row.collectRate + row.danmakuRate).toFixed(1)}%`, purchaseCtr: `${row.purchaseCtr}%`, attributedOrders: row.attributedOrders, gmvPerThousand: `¥${row.gmvPerThousand}`, paidCompletion80: `${row.paidCompletion80}%`, paidInteractionRate: `${row.paidInteractionRate}%`, refundRate: `${row.refundRate}%` }));
    downloadCsv("creator-workboard.csv", exportRows, view === "authors" ? ["作者", "加广标识", "潜力层级", "剧集个数", "更新频次", "视频个数", "免费平均播放量", "免费完播率", "互动率", "7日粉丝增长", "付费转化率", "付费完播率", "作者收入", "激励成本", "30日留存"] : ["作品", "作者", "潜力状态", "内容类型", "广告曝光量", "曝光点击率", "集数", "2s跳出率", "80%完播率", "连播率", "互动率", "购买点击率", "归因订单数", "千次播放GMV", "付费视频80%完播率", "付费互动率", "退费率"]);
    toast("看板明细已导出");
    return;
  }
  if (action === "off-collection") { const item = collectionById(target.dataset.id); confirmAction("确认下架合集？", `下架后「${item.title}」将不再对用户展示，但历史播放和收入数据会保留。`, () => { item.status = "off"; render(); toast("合集已下架"); }); return; }
  if (action === "republish-collection") { const item = collectionById(target.dataset.id); confirmAction("确认重新上架合集？", `上架后「${item.title}」会恢复对用户展示。`, () => { item.status = "on"; render(); toast("合集已重新上架"); }); return; }
  if (action === "remove-micro") { const micro = microCourseItems.find((entry) => entry.collectionId === target.dataset.id); const item = collectionById(target.dataset.id); confirmAction("确认移出微课？", `移出后「${item.title}」会从微课 Tab 资源位移除，但合集本身仍保持当前状态。`, () => { micro.status = "off"; render(); toast("已移出微课"); }); return; }
  if (action === "micro-move") { moveMicro(target.dataset.id, target.dataset.direction); return; }
  if (action === "view-settlement") { openSettlementDrawer(target.dataset.id); return; }
  if (action === "open-import-settlement") { openSettlementImportModal(); return; }
  if (action === "export-income") { const incomeMonth = state.filters.incomeMonth || "2026-10"; const exportRows = incomeRows.filter((row) => !incomeMonth || row.month === incomeMonth); downloadCsv("creator-income.csv", exportRows, ["日期", "创作者", "合集", "订单数", "流水", "创作者分成", "平台服务费", "状态"]); toast("当前账期收入明细已导出"); return; }
  if (action === "export-settlement" || action === "export-all-settlements") { const exportRows = settlementRows.map((row) => ({ settlementNo: row.no, authorCount: row.authors.length, period: row.period, created: row.created, due: row.due, status: row.statusText })); downloadCsv("settlements.csv", exportRows, ["结算单号", "作者数", "结算周期", "发起时间", "应结金额", "状态"]); toast("结算单明细已导出"); return; }
  if (action === "export-collections") { downloadCsv("collections.csv", collections, ["合集ID", "合集标题", "作者", "来源", "付费", "剧集数", "播放量", "完播率", "累计收入", "状态"]); toast("合集列表已导出"); return; }
  if (action === "close-drawer" || action === "confirm-cancel") { closeAllOverlays(); return; }
  if (action === "close-modal") { $("#modal-wrap").classList.add("hidden"); state.confirmCallback = null; return; }
  if (action === "confirm-ok") { const callback = state.confirmCallback; closeAllOverlays(); if (callback) callback(); }
}

function toggleMicroAssociation(collectionId) {
  const collection = collectionById(collectionId);
  if (!collection) return;
  const existing = microCourseItems.find((item) => item.collectionId === collectionId);
  if (existing && existing.status === "on") {
    existing.status = "off";
    render();
    toast(`已取消「${collection.title}」的微课关联`);
    return;
  }
  if (existing) {
    existing.status = "on";
    existing.order = microCourseItems.filter((item) => item.status === "on").length;
  } else {
    microCourseItems.push({ collectionId, subject: "待配置", category: "待配置", order: microCourseItems.filter((item) => item.status === "on").length + 1, effective: "2026-10-28", exposure: 0, clicks: 0, status: "on" });
  }
  render();
  toast(`已将「${collection.title}」加入微课 Tab`);
}

function moveMicro(id, direction) {
  const active = microCourseItems.filter((item) => item.status === "on").sort((a, b) => a.order - b.order);
  const index = active.findIndex((item) => item.collectionId === id);
  const next = direction === "up" ? index - 1 : index + 1;
  if (index < 0 || next < 0 || next >= active.length) { toast(direction === "up" ? "已经是第一位" : "已经是最后一位", "error"); return; }
  [active[index].order, active[next].order] = [active[next].order, active[index].order];
  render(); toast("展示顺序已更新");
}

function offEpisode(collectionId, episodeIndex) {
  const item = collectionById(collectionId);
  if (!item || item.removedEpisodes.includes(episodeIndex)) return;
  const displayIndex = activeEpisodes(item).findIndex((episode) => episode.index === episodeIndex) + 1;
  item.removedEpisodes.push(episodeIndex);
  item.episodes = Math.max(0, item.episodes - 1);
  openCollectionDrawer(collectionId);
  toast(`已下架「${item.title}」的第 ${displayIndex} 集，后续剧集已自动重排`);
}

function openVideoModal(collectionId, episodeIndex) {
  const item = collectionById(collectionId);
  const episode = item && activeEpisodes(item).find((entry) => entry.index === episodeIndex);
  if (!item || !episode) return;
  $("#modal-wrap").innerHTML = `<div class="modal video-modal"><div class="modal-head"><div><h2>${escapeHtml(episode.title)}</h2><p>${escapeHtml(item.title)} · 第 ${activeEpisodes(item).findIndex((entry) => entry.index === episodeIndex) + 1} 集 · ${escapeHtml(episode.videoId)}</p></div><button class="close-btn" data-action="close-modal">×</button></div><div class="video-body"><video controls autoplay muted playsinline poster="" src="video-preview.mp4"><span>当前浏览器不支持视频播放</span></video><div class="video-caption"><span>播放预览 · ${episode.duration}</span><span>近30天播放量 ${formatNumber(episode.plays30)} 次</span></div></div></div>`;
  $("#modal-wrap").classList.remove("hidden");
}

function openCreatorIncomeDrawer(authorId) {
  const incomeMonth = state.filters.incomeMonth || "2026-10";
  const rows = incomeRows.filter((row) => row.authorId === authorId && (!incomeMonth || row.month === incomeMonth) && (!state.filters.incomePeriod || (state.filters.incomePeriod === "7" ? Number(row.date.slice(3)) >= 21 : true)));
  if (!rows.length) return;
  const author = rows[0].author;
  const totalOrders = rows.reduce((sum, row) => sum + row.orders, 0);
  const totalGross = rows.reduce((sum, row) => sum + row.gross, 0);
  const totalShare = rows.reduce((sum, row) => sum + row.share, 0);
  const totalRefund = rows.reduce((sum, row) => sum + row.refund, 0);
  const monthLabel = incomeMonth === "2026-09" ? "2026 年 09 月账期" : "2026 年 10 月账期";
  $("#drawer").innerHTML = `<div class="drawer-head"><div><h2>创作者收入详情</h2><p>${escapeHtml(author)} · ${escapeHtml(authorId)}</p></div><button class="close-btn" data-action="close-drawer">×</button></div><div class="drawer-body"><div class="detail-hero"><div class="avatar" style="width:58px;height:58px;font-size:18px">${escapeHtml(author.slice(0, 1))}</div><div><h3>${escapeHtml(author)}</h3><p>作者 ID：${escapeHtml(authorId)} · ${monthLabel}</p><div class="tag-row"><span class="type-tag source-pgc">收入已汇总</span></div></div></div><div class="detail-section"><div class="detail-grid"><div class="detail-metric"><span>总订单</span><strong>${formatNumber(totalOrders)}</strong></div><div class="detail-metric"><span>总收入</span><strong>${formatMoney(totalGross)}</strong></div><div class="detail-metric"><span>创作者分成</span><strong>${formatMoney(totalShare)}</strong></div><div class="detail-metric"><span>退款金额</span><strong>${formatMoney(totalRefund)}</strong></div></div></div><div class="detail-section"><div class="detail-section-head"><h4>合集收入明细</h4><span class="muted">共 ${rows.length} 个合集</span></div><div class="income-detail-list">${rows.map((row) => `<div class="income-detail-row"><div><strong>${escapeHtml(row.collection)}</strong><span>${row.date} · ${row.orders} 单</span></div><div class="income-detail-values"><span>收入 <b>${formatMoney(row.gross)}</b></span><span>分成 <b>${formatMoney(row.share)}</b></span><span>退款 <b>${formatMoney(row.refund)}</b></span></div></div>`).join("")}</div></div></div>`;
  $("#drawer").classList.remove("hidden"); $("#overlay").classList.remove("hidden");
}

function openCollectionDrawer(id) {
  const item = collectionById(id); if (!item) return;
  const micro = microCourseItems.find((entry) => entry.collectionId === id && entry.status === "on");
  const episodes = activeEpisodes(item);
  $("#drawer").innerHTML = `<div class="drawer-head"><div><h2>合集详情</h2><p>${item.id} · 最后更新于 ${item.updated}</p></div><button class="close-btn" data-action="close-drawer">×</button></div><div class="drawer-body"><div class="detail-hero"><div class="cover ${item.coverClass}">${escapeHtml(item.cover)}</div><div><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.author)} · ${item.source} · ${item.paid ? "含付费内容" : "免费内容"}</p><div class="tag-row">${statusTag(item.status)}${micro ? '<span class="type-tag source-pgc">微课 Tab · 排名 ' + micro.order + '</span>' : ""}</div></div></div><div class="detail-section"><div class="detail-section-head"><h4>剧集列表</h4><span class="muted">共 ${item.episodes} 集 · 下架后自动重排</span></div><div class="episode-list">${episodes.map((episode, index) => `<div class="episode-row"><span class="episode-no">${String(index + 1).padStart(2, "0")}</span><div class="episode-cover ${item.coverClass}">${escapeHtml(item.cover)}</div><div class="episode-main"><div class="episode-title-line"><strong>${escapeHtml(episode.title)}</strong><span class="episode-paid ${episode.paid ? "paid" : "free"}">${episode.paid ? "付费" : "免费"}</span></div><div class="episode-meta"><span>视频 ID ${escapeHtml(episode.videoId)}</span><span>时长 ${episode.duration}</span><span>近30天播放量 ${formatNumber(episode.plays30)}</span></div></div><div class="episode-actions"><button class="btn-text" data-action="view-episode" data-collection-id="${item.id}" data-episode-index="${episode.index}">查看</button><button class="btn-text danger" data-action="off-episode" data-collection-id="${item.id}" data-episode-index="${episode.index}">下架</button></div></div>`).join("")}</div></div><div class="detail-section" style="display:flex; gap:8px; justify-content:flex-end">${item.status === "on" ? `<button class="btn btn-danger" data-action="off-collection" data-id="${item.id}">下架合集</button>` : ""}<button class="btn ${micro ? "btn-danger" : "btn-primary"}" data-action="toggle-micro" data-id="${item.id}">${micro ? "已加微课" : "加微课"}</button></div></div>`;
  $("#drawer").classList.remove("hidden"); $("#overlay").classList.remove("hidden");
}

function openSettlementDrawer(id) {
  const row = settlementRows.find((entry) => entry.no === id); if (!row) return;
  const authorsHtml = row.authors.map((author) => {
    const maskedName = `${String(author.author).slice(0, 1)}**`;
    const maskedIdCard = `110***********${String(author.authorId).slice(-4)}`;
    const afterTax = Math.round(author.due * 0.8);
    return `<div class="settlement-author-row"><div><strong>${escapeHtml(author.author)}</strong></div><span class="mono">${escapeHtml(author.authorId)}</span><div class="settlement-realname"><span>${maskedName}</span><span>${maskedIdCard}</span></div><span class="mono">${formatMoney(author.due)}</span><span class="mono">${formatMoney(afterTax)}</span></div>`;
  }).join("");
  $("#drawer").innerHTML = `<div class="drawer-head"><div><h2>结算单明细</h2><p>${row.no} · 发起于 ${row.created}</p></div><button class="close-btn" data-action="close-drawer">×</button></div><div class="drawer-body"><div class="detail-hero"><div class="cover cover-4">¥</div><div><h3>${row.authors.length} 位创作者</h3><p>${row.period} · 共 ${row.items} 条收入记录</p><div class="tag-row">${statusTag(row.status, row.statusText)}</div></div></div><div class="detail-section"><div class="detail-section-head"><h4>创作者明细</h4><span class="muted">共 ${row.authors.length} 人</span></div><div class="settlement-author-head"><span>作者昵称</span><span>作者 ID</span><span>实名信息</span><span>结算金额</span><span>预估税后</span></div><div class="settlement-author-list">${authorsHtml}</div></div><div class="detail-section"><div class="detail-section-head"><h4>对账说明</h4></div><div style="padding:13px;border-radius:9px;background:#f8f9fc;color:var(--muted);font-size:11px;line-height:1.7">实名信息已脱敏展示；预估税后金额按结算金额的 80% 模拟计算，实际以财务核算结果为准。</div></div></div>`;
  $("#drawer").classList.remove("hidden"); $("#overlay").classList.remove("hidden");
}

function openSettlementImportModal() {
  $("#modal-wrap").innerHTML = `<div class="modal"><div class="modal-head"><div><h2>手动导入结算单</h2><p>输入结算单号后，系统会自动查询该单据的状态信息。</p></div><button class="close-btn" data-action="close-modal">×</button></div><form data-form="settlement-import"><div class="modal-body"><div class="form-field"><label>结算单号<em>*</em></label><input class="field" name="settlementNo" placeholder="例如：ST-202610-0112" autocomplete="off" required /><span class="form-hint">导入前会校验列表中是否已存在相同结算单号。</span></div></div><div class="modal-foot"><button type="button" class="btn" data-action="close-modal">取消</button><button class="btn btn-primary" type="submit">确认导入</button></div></form></div>`;
  $("#modal-wrap").classList.remove("hidden");
}

function openMicroModal(preselected = "") {
  const candidates = collections.filter((item) => item.status === "on" && !microCourseItems.some((entry) => entry.collectionId === item.id && entry.status === "on"));
  const defaultOrder = microCourseItems.filter((item) => item.status === "on").length + 1;
  $("#modal-wrap").innerHTML = `<div class="modal"><div class="modal-head"><div><h2>新增微课精选</h2><p>从在架合集里选择内容加入微课 Tab。</p></div><button class="close-btn" data-action="close-modal">×</button></div><form data-form="micro-add"><div class="modal-body"><div class="form-grid"><div class="form-field full"><label>选择合集<em>*</em></label><select class="field" name="collectionId" required><option value="">请选择候选合集</option>${candidates.map((item) => `<option value="${item.id}" ${preselected === item.id ? "selected" : ""}>${item.title} · ${item.author}</option>`).join("")}</select><span class="form-hint">仅展示已上架且尚未加入微课 Tab 的合集</span></div><div class="form-field"><label>学科<em>*</em></label><select class="field" name="subject" required><option value="">请选择学科</option><option>语文</option><option>数学</option><option>英语</option><option>科学</option><option>心理</option><option>艺术</option></select></div><div class="form-field"><label>分类<em>*</em></label><select class="field" name="category" required><option value="">请选择分类</option><option>科学启蒙</option><option>成长心理</option><option>人文故事</option><option>创意表达</option></select></div><div class="form-field"><label>展示排序<em>*</em></label><input class="field" type="number" min="1" max="20" name="order" value="${defaultOrder}" required /></div><div class="form-field"><label>生效时间<em>*</em></label><input class="field" type="date" name="effective" value="2026-10-28" required /></div></div></div><div class="modal-foot"><button type="button" class="btn" data-action="close-modal">取消</button><button class="btn btn-primary" type="submit">确认加入</button></div></form></div>`;
  $("#modal-wrap").classList.remove("hidden");
}

function confirmAction(title, text, callback) {
  state.confirmCallback = callback;
  $("#modal-wrap").innerHTML = `<div class="modal"><div class="confirm-body"><div class="confirm-icon">!</div><h3>${escapeHtml(title)}</h3><p>${escapeHtml(text)}</p></div><div class="modal-foot"><button class="btn" data-action="confirm-cancel">取消</button><button class="btn btn-primary" data-action="confirm-ok">确认操作</button></div></div>`;
  $("#modal-wrap").classList.remove("hidden");
}

function openPhoneModal(authorId) {
  const account = creatorAccounts.find((item) => item.authorId === authorId);
  if (!account) { toast("未找到该作者的手机号", "error"); return; }
  $("#modal-wrap").innerHTML = `<div class="modal phone-modal"><div class="modal-head"><div><h2>查看手机号</h2><p>${escapeHtml(account.author)} · ${escapeHtml(account.authorId)}</p></div><button class="close-btn" data-action="close-modal">×</button></div><div class="modal-body"><div class="phone-info"><span>登录手机号</span><strong class="phone-display">${escapeHtml(account.phone)}</strong></div><p class="form-hint">该手机号为 Demo mock 数据，仅用于运营查看演示。</p></div><div class="modal-foot"><button class="btn btn-primary" data-action="close-modal">关闭</button></div></div>`;
  $("#modal-wrap").classList.remove("hidden");
}

function closeAllOverlays() {
  $("#drawer").classList.add("hidden"); $("#overlay").classList.add("hidden"); $("#modal-wrap").classList.add("hidden"); state.confirmCallback = null;
}

function toast(message, type = "success") {
  const node = document.createElement("div"); node.className = `toast ${type === "error" ? "error" : ""}`; node.textContent = message; $("#toast-stack").appendChild(node); setTimeout(() => node.remove(), 2800);
}

function downloadCsv(filename, rows, headers) {
  const keys = Object.keys(rows[0] || {});
  const lines = [headers.join(","), ...rows.map((row) => keys.map((key) => `"${String(row[key] ?? "").replace(/"/g, '""')}"`).join(","))];
  const blob = new Blob(["\ufeff" + lines.join("\n")], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob); const link = document.createElement("a"); link.href = url; link.download = filename; link.click(); URL.revokeObjectURL(url);
}

init();
