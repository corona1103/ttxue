# 作者跟进手机号查看与收入排序 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在作者跟进页增加查看手机号只读弹窗，并为合集数、总收入增加升降序排序。

**Architecture:** 复用现有单文件 Demo 的数据、状态、事件委托和 modal 体系。在 `renderCreatorIncomeBase` 中生成排序表头与排序后的行，在 `handleClick` 中处理排序和手机号操作；手机号 mock 数据挂在 `creatorAccounts` 上，样式只补充表头排序按钮与手机号展示样式。

**Tech Stack:** 原生 JavaScript、HTML 模板字符串、CSS、浏览器 Blob/DOM API。

---

### Task 1: 补充 Demo 手机号与排序状态

**Files:**
- Modify: `/Users/tal/Desktop/天天学/ttxue/product-ops-demo/app.js`

- [ ] **Step 1: 为每个 `creatorAccounts` mock 账号增加 `phone` 字段**

使用固定的 11 位演示手机号，例如 `13800001018`、`13800001021`，不读取真实系统数据。

- [ ] **Step 2: 在 `state` 增加 `incomeSortKey` 与 `incomeSortDirection`**

默认值为空，第一次点击某列设置为该列并使用 `desc`；再次点击同列切换 `asc`/`desc`，点击另一列切换到新列降序。

- [ ] **Step 3: 执行语法检查**

运行：`node --check app.js`

预期：命令成功退出且无输出。

### Task 2: 实现收入表排序表头和排序结果

**Files:**
- Modify: `/Users/tal/Desktop/天天学/ttxue/product-ops-demo/app.js`
- Modify: `/Users/tal/Desktop/天天学/ttxue/product-ops-demo/styles.css`

- [ ] **Step 1: 在 `renderCreatorIncomeBase` 中对 `groups` 做稳定排序**

根据 `state.incomeSortKey` 映射 `collections.size` 或 `gross`，按方向比较；数值相同时用 `author` 升序作为次级排序。

- [ ] **Step 2: 将“合集数”“总收入”普通表头替换为排序按钮**

按钮携带 `data-action="sort-income"` 和 `data-sort-key="collections"` / `gross`，并显示 `↕`、`↑` 或 `↓`。

- [ ] **Step 3: 在 `handleClick` 增加排序处理**

更新 state 后调用 `render()`，不改变筛选、趋势图和其他页面状态。

- [ ] **Step 4: 增加排序按钮视觉样式**

补充 `.table-sort-button`、`.table-sort-button.is-active` 等样式，保持表头可读且点击区域足够。

- [ ] **Step 5: 运行 `node --check app.js` 与 `git diff --check`**

预期：两条命令均成功。

### Task 3: 增加查看手机号弹窗

**Files:**
- Modify: `/Users/tal/Desktop/天天学/ttxue/product-ops-demo/app.js`
- Modify: `/Users/tal/Desktop/天天学/ttxue/product-ops-demo/styles.css`

- [ ] **Step 1: 在收入表操作列追加“查看手机号”按钮**

按钮使用 `data-action="view-phone"` 和作者 ID，保留现有“解绑实名”按钮。

- [ ] **Step 2: 新增 `openPhoneModal(authorId)`**

查找账号，渲染作者昵称、作者 ID、手机号和关闭按钮到 `#modal-wrap`；找不到账号时显示错误 toast，不打开空弹窗。

- [ ] **Step 3: 在 `handleClick` 处理 `view-phone`**

调用 `openPhoneModal(target.dataset.authorId)`。

- [ ] **Step 4: 增加手机号信息块样式**

复用现有 modal 布局，增加 `.phone-display` 及等宽数字样式。

### Task 4: 完成验证与提交

**Files:**
- Verify: `/Users/tal/Desktop/天天学/ttxue/product-ops-demo/app.js`
- Verify: `/Users/tal/Desktop/天天学/ttxue/product-ops-demo/styles.css`

- [ ] **Step 1: 运行静态验证**

运行：`node --check app.js`、`git diff --check`。

- [ ] **Step 2: 检查变更范围**

运行：`git diff --stat` 和 `git status --short`，确认只包含本需求代码、规格和计划文件，不处理 `contest/index.html`、`.DS_Store` 等无关文件。

- [ ] **Step 3: 提交本次变更**

运行：`git add app.js styles.css docs/superpowers/specs/2026-11-26-creator-income-phone-sort-design.md docs/superpowers/plans/2026-11-26-creator-income-phone-sort.md && git commit -m "feat: add creator phone lookup and income sorting"`
