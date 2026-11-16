# 创作者运营规划 H5 接入导航页 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将创作者运营规划 H5 接入 `ttxue` 项目，并在 Demo 导航页增加独立的“产品规划”模块入口。

**Architecture:** 保持 H5 为根目录级静态单页文件，不引入构建或路由依赖。导航页继续使用现有静态 HTML 结构，新增一个独立 module，并用相对路径打开根目录 H5。

**Tech Stack:** 静态 HTML、内嵌 CSS/JavaScript、Git、Node.js 脚本校验。

---

### Task 1: 接入创作者运营规划 H5

**Files:**
- Create: `/Users/tal/Desktop/天天学/ttxue/创作者运营规划-H5.html`
- Source: `/Users/tal/Desktop/天天学/创作者运营规划-H5.html`

- [x] **Step 1: 复制 H5 文件到项目根目录**

Run:

```bash
cp '/Users/tal/Desktop/天天学/创作者运营规划-H5.html' '/Users/tal/Desktop/天天学/ttxue/创作者运营规划-H5.html'
```

Expected: 项目根目录出现 `创作者运营规划-H5.html`，内容与源文件一致。

- [x] **Step 2: 检查 H5 文件基本结构**

Run:

```bash
rg -n '<!doctype html>|<title>|创作者运营规划|id="flow"|id="stages"|id="incentives"|id="metrics"' '/Users/tal/Desktop/天天学/ttxue/创作者运营规划-H5.html'
```

Expected: 能找到 HTML 文档声明、页面标题、页面主标题以及闭环、阶段、激励和指标四个模块。

### Task 2: 在导航页增加独立“产品规划”模块

**Files:**
- Modify: `/Users/tal/Desktop/天天学/ttxue/demo-hub/index.html`

- [x] **Step 1: 在现有模块网格末尾增加产品规划模块**

在 `后台` 模块之后追加以下结构，保持现有入口的 `target="_blank"` 和 `.demo` 样式：

```html
<section class="module"><h2>产品规划</h2><div class="demo-list"><a class="demo" href="../创作者运营规划-H5.html" target="_blank"><span><span class="demo-title">创作者运营规划 · H5</span><span class="demo-meta">创作者运营闭环、平台阶段、激励体系与 ROI 看板</span></span><span class="demo-arrow">›</span></a></div></section>
```

- [x] **Step 2: 检查导航页已有模块未被改动**

Run:

```bash
git diff -- demo-hub/index.html
```

Expected: diff 只包含新增的“产品规划” section，不改变原有 App、创作者、赛事和后台入口。

### Task 3: 验证文件、链接和工作区状态

**Files:**
- Test: `/Users/tal/Desktop/天天学/ttxue/创作者运营规划-H5.html`
- Test: `/Users/tal/Desktop/天天学/ttxue/demo-hub/index.html`

- [x] **Step 1: 用 Node.js 校验导航链接目标存在**

Run:

```bash
node - <<'NODE'
const fs = require('fs');
const path = require('path');
const nav = fs.readFileSync('demo-hub/index.html', 'utf8');
const match = nav.match(/<section class="module"><h2>产品规划<\/h2>[\s\S]*?href="([^"]+)"/);
if (!match) throw new Error('未找到产品规划模块或链接');
const target = path.resolve('demo-hub', match[1]);
if (!fs.existsSync(target)) throw new Error(`链接目标不存在: ${target}`);
console.log(`产品规划链接有效: ${match[1]}`);
NODE
```

Expected: 输出 `产品规划链接有效: ../创作者运营规划-H5.html`。

- [x] **Step 2: 检查工作区 diff 和既有改动**

Run:

```bash
git status --short
git diff --stat
git diff -- contest/index.html
```

Expected: 新增 H5、修改导航页；`contest/index.html` 仍保留执行前已有的未提交修改，未被本次任务覆盖。
