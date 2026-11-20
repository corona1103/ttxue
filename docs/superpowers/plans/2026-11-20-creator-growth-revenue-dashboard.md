# 创作者成长收益看板 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在创作者运营规划 H5 中增加成长收益看板入口，并新增可交互的作者/作品双维度静态看板页面。

**Architecture:** 继续使用独立静态 HTML，不引入框架或后端。主页面通过相对链接打开二级页面；二级页面使用内嵌演示数据和原生 JavaScript 实现周期筛选、作者/作品切换与表格渲染，数据对象与渲染逻辑分离，便于后续替换 API。

**Tech Stack:** HTML、CSS、原生 JavaScript、Node.js 校验、Git。

---

### Task 1: 给主运营规划 H5 增加看板入口

**Files:**
- Modify: `/Users/tal/Desktop/天天学/ttxue/创作者运营规划-H5.html`

- [x] **Step 1: 为指标模块添加入口样式和跳转按钮**

在现有指标模块样式中增加入口按钮样式，并在 `#metrics` 的标题区域加入：

```html
<a class="metrics-link" href="创作者运营成长收益看板-H5.html">查看成长收益看板 <span>→</span></a>
```

让四个指标卡和入口保持同一模块，不改动原有四类指标内容。

- [x] **Step 2: 确认入口路径相对当前页面有效**

Run:

```bash
node -e "const fs=require('fs');const s=fs.readFileSync('创作者运营规划-H5.html','utf8');if(!s.includes('创作者运营成长收益看板-H5.html'))throw new Error('主页面未找到看板链接');console.log('主页面入口存在')"
```

Expected: 输出 `主页面入口存在`。

### Task 2: 新增成长收益看板二级页面

**Files:**
- Create: `/Users/tal/Desktop/天天学/ttxue/创作者运营成长收益看板-H5.html`

- [x] **Step 1: 创建静态看板页面结构**

页面包含返回入口、标题和 Demo 数据提示、周期筛选、总览指标、作者/作品 Tab、横向可滚动数据表和潜力状态说明。

- [x] **Step 2: 写入双维度演示数据**

数据对象必须包含 `overview`、`authors`、`works`、`periods` 四组数据。作者字段包含层级、作品数、更新频次、有效观看、完播率、付费转化、收入、成本、留存和潜力状态；作品字段包含作者、类型、集数、有效观看、完播率、互动率、付费转化、收入、退款率、增长、成本和潜力状态。

- [x] **Step 3: 实现交互渲染**

使用原生 JavaScript 实现：

```js
setView('authors' | 'works');
setPeriod('7d' | '30d' | 'quarter');
renderOverview(period);
renderTable(view, period);
```

作者 / 作品 Tab 更新表头和表格；周期筛选同步更新总览指标、更新时间文案和对应数据。

- [x] **Step 4: 实现窄屏展示**

保留表格横向滚动，指标卡在窄屏下降为两列或一列，潜力状态使用文字和颜色双重标识。

### Task 3: 验证和提交

**Files:**
- Test: `/Users/tal/Desktop/天天学/ttxue/创作者运营规划-H5.html`
- Test: `/Users/tal/Desktop/天天学/ttxue/创作者运营成长收益看板-H5.html`

- [x] **Step 1: 校验页面文件、入口和关键交互**

Run:

```bash
node - <<'NODE'
const fs = require('fs');
const path = require('path');
const main = fs.readFileSync('创作者运营规划-H5.html', 'utf8');
const page = fs.readFileSync('创作者运营成长收益看板-H5.html', 'utf8');
if (!main.includes('创作者运营成长收益看板-H5.html')) throw new Error('主页面入口缺失');
for (const token of ['authors', 'works', 'periods', 'setView', 'setPeriod', 'potential']) {
  if (!page.includes(token)) throw new Error(`看板缺少关键结构: ${token}`);
}
if (!fs.existsSync(path.resolve('创作者运营成长收益看板-H5.html'))) throw new Error('二级页面不存在');
console.log('成长收益看板静态校验通过');
NODE
git diff --check
```

Expected: 输出 `成长收益看板静态校验通过`，且 `git diff --check` 无输出。

- [x] **Step 2: 检查既有赛事改动不受影响**

Run:

```bash
git diff -- contest/index.html
git status --short
```

Expected: `contest/index.html` 仍保留原有未提交修改，本次只新增看板页面和修改主 H5。

- [x] **Step 3: 提交本次实现**

```bash
git add -- '创作者运营规划-H5.html' '创作者运营成长收益看板-H5.html' 'docs/superpowers/plans/2026-11-20-creator-growth-revenue-dashboard.md'
git commit -m "feat: add creator growth revenue dashboard"
```
