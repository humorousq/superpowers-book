import{_ as n,o as a,c as p,a2 as l}from"./chunks/framework._l9dR58Y.js";const o=JSON.parse('{"title":"第五章：设计文档解析","description":"","frontmatter":{},"headers":[],"relativePath":"chapter-05.md","filePath":"chapter-05.md","lastUpdated":1774633865000}'),i={name:"chapter-05.md"};function e(r,s,t,c,b,d){return a(),p("div",null,[...s[0]||(s[0]=[l(`<h1 id="第五章-设计文档解析" tabindex="-1">第五章：设计文档解析 <a class="header-anchor" href="#第五章-设计文档解析" aria-label="Permalink to &quot;第五章：设计文档解析&quot;">​</a></h1><p>本章深入解析 Superpowers 的设计思想，帮助你理解其背后的设计理念。</p><h2 id="设计文档的价值" tabindex="-1">设计文档的价值 <a class="header-anchor" href="#设计文档的价值" aria-label="Permalink to &quot;设计文档的价值&quot;">​</a></h2><p>Superpowers 的每个功能都经过深思熟虑的设计。阅读设计文档可以：</p><ul><li><strong>理解设计决策</strong> - 为什么这样设计</li><li><strong>学习架构思想</strong> - 如何构建可扩展系统</li><li><strong>指导自定义开发</strong> - 如何扩展和定制</li></ul><h2 id="文档审查系统设计" tabindex="-1">文档审查系统设计 <a class="header-anchor" href="#文档审查系统设计" aria-label="Permalink to &quot;文档审查系统设计&quot;">​</a></h2><h3 id="背景" tabindex="-1">背景 <a class="header-anchor" href="#背景" aria-label="Permalink to &quot;背景&quot;">​</a></h3><p>在开发过程中，经常会遇到：</p><ul><li>规格文档不完整</li><li>实施计划与规格不符</li><li>缺少错误处理考虑</li><li>过度设计或设计不足</li></ul><p>为了解决这些问题，Superpowers 引入了<strong>文档审查系统</strong>。</p><h3 id="核心设计" tabindex="-1">核心设计 <a class="header-anchor" href="#核心设计" aria-label="Permalink to &quot;核心设计&quot;">​</a></h3><p>在 Superpowers 工作流中增加两个审查阶段：</p><ol><li><strong>规格文档审查</strong> - 在 brainstorming 之后，writing-plans 之前</li><li><strong>计划文档审查</strong> - 在 writing-plans 之后，实施之前</li></ol><p>两者都使用迭代循环模式，类似于代码审查。</p><h3 id="规格文档审查器" tabindex="-1">规格文档审查器 <a class="header-anchor" href="#规格文档审查器" aria-label="Permalink to &quot;规格文档审查器&quot;">​</a></h3><p><strong>目的</strong>: 验证规格是否完整、一致、可实施。</p><p><strong>检查内容</strong>：</p><table tabindex="0"><thead><tr><th>类别</th><th>检查项</th></tr></thead><tbody><tr><td>完整性</td><td>TODO、占位符、&quot;TBD&quot;、不完整章节</td></tr><tr><td>覆盖度</td><td>缺失的错误处理、边界情况、集成点</td></tr><tr><td>一致性</td><td>内部矛盾、冲突的需求</td></tr><tr><td>清晰度</td><td>模糊的需求描述</td></tr><tr><td>YAGNI</td><td>未请求的功能、过度设计</td></tr></tbody></table><p><strong>输出格式</strong>：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>## 规格审查</span></span>
<span class="line"><span></span></span>
<span class="line"><span>**状态:** 通过 | 发现问题</span></span>
<span class="line"><span></span></span>
<span class="line"><span>**问题（如有）**:</span></span>
<span class="line"><span>- [章节 X]: [问题] - [为什么重要]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>**建议（参考）**:</span></span>
<span class="line"><span>- [不阻止通过的建议]</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p><strong>审查循环</strong>: 发现问题 → 修复 → 重新审查 → 重复直到通过。</p><h3 id="计划文档审查器" tabindex="-1">计划文档审查器 <a class="header-anchor" href="#计划文档审查器" aria-label="Permalink to &quot;计划文档审查器&quot;">​</a></h3><p><strong>目的</strong>: 验证计划是否完整、符合规格、任务分解合理。</p><p><strong>检查内容</strong>：</p><table tabindex="0"><thead><tr><th>类别</th><th>检查项</th></tr></thead><tbody><tr><td>完整性</td><td>TODO、占位符、不完整任务</td></tr><tr><td>规格对齐</td><td>计划覆盖规格需求、无范围蔓延</td></tr><tr><td>任务分解</td><td>任务原子性、边界清晰</td></tr><tr><td>任务语法</td><td>任务和步骤的复选框语法</td></tr><tr><td>块大小</td><td>每块不超过 1000 行</td></tr></tbody></table><p><strong>块定义</strong>: 块是计划文档中的逻辑任务组，由 <code>## 块 N: &lt;名称&gt;</code> 标题分隔。writing-plans 技能根据逻辑阶段（如&quot;基础&quot;、&quot;核心功能&quot;、&quot;集成&quot;）创建这些边界。每个块应该足够独立，可以单独审查。</p><p><strong>规格对齐验证</strong>: 审查器接收：</p><ol><li>计划文档（或当前块）</li><li>规格文档路径供参考</li></ol><p>审查器读取两者并比较需求覆盖度。</p><p><strong>审查过程（逐块进行）</strong>：</p><ol><li>writing-plans 创建块 N</li><li>控制器分发计划文档审查器处理块 N 内容和规格路径</li><li>审查器读取块和规格，返回结论</li><li>如有问题: writing-plans 修复块 N，转到步骤 2</li><li>如通过: 继续块 N+1</li><li>重复直到所有块通过</li></ol><h3 id="更新后的工作流" tabindex="-1">更新后的工作流 <a class="header-anchor" href="#更新后的工作流" aria-label="Permalink to &quot;更新后的工作流&quot;">​</a></h3><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>brainstorming → 规格 → 规格审查循环 → writing-plans → 计划 → 计划审查循环 → 实施</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p><strong>规格审查循环</strong>：</p><ol><li>规格完成</li><li>分发审查器</li><li>如有问题: 修复 → 转到 2</li><li>如通过: 继续</li></ol><p><strong>计划审查循环</strong>：</p><ol><li>块 N 完成</li><li>分发审查器处理块 N</li><li>如有问题: 修复 → 转到 2</li><li>如通过: 下一块或实施</li></ol><h2 id="markdown-任务语法" tabindex="-1">Markdown 任务语法 <a class="header-anchor" href="#markdown-任务语法" aria-label="Permalink to &quot;Markdown 任务语法&quot;">​</a></h2><p>计划文档使用标准化的 Markdown 任务语法：</p><div class="language-markdown vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">## 任务 1: 实现用户认证</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-light-font-weight:bold;--shiki-dark:#E1E4E8;--shiki-dark-font-weight:bold;">**文件**</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\`src/auth.ts\`</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-light-font-weight:bold;--shiki-dark:#E1E4E8;--shiki-dark-font-weight:bold;">**操作**</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [ ] 创建 User 接口</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [ ] 实现登录函数</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [ ] 添加错误处理</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-light-font-weight:bold;--shiki-dark:#E1E4E8;--shiki-dark-font-weight:bold;">**验证**</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [ ] 单元测试通过</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [ ] 类型检查通过</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-light-font-weight:bold;--shiki-dark:#E1E4E8;--shiki-dark-font-weight:bold;">**代码**</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">\`\`\`typescript</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">interface</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> User</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">  id</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> string</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">  email</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> string</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><p><strong>时间</strong>: 预计 30 分钟</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span></span></span>
<span class="line"><span>这种标准化语法确保：</span></span>
<span class="line"><span>- 任务可以自动解析</span></span>
<span class="line"><span>- 审查器可以验证语法</span></span>
<span class="line"><span>- 执行器可以跟踪进度</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## 设计原则</span></span>
<span class="line"><span></span></span>
<span class="line"><span>### 1. 渐进式验证</span></span>
<span class="line"><span></span></span>
<span class="line"><span>不要等到最后才验证。在每个关键阶段都进行审查：</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>设计 → 审查 → 计划 → 审查 → 实施 → 审查</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span></span></span>
<span class="line"><span>这确保问题及早发现，修复成本更低。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>### 2. 自动化审查</span></span>
<span class="line"><span></span></span>
<span class="line"><span>使用 AI 审查器，而非完全依赖人工：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>- **一致性**: 标准化的审查标准</span></span>
<span class="line"><span>- **速度**: 即时反馈</span></span>
<span class="line"><span>- **可扩展**: 可以审查大量文档</span></span>
<span class="line"><span></span></span>
<span class="line"><span>### 3. 迭代改进</span></span>
<span class="line"><span></span></span>
<span class="line"><span>审查不是一次性的：</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p>审查 → 问题 → 修复 → 审查 → ...</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span></span></span>
<span class="line"><span>持续迭代直到质量达标。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## 其他设计文档</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Superpowers 还有其他重要的设计文档：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>### 可视化头脑风暴重构</span></span>
<span class="line"><span></span></span>
<span class="line"><span>重构了可视化头脑风暴功能，改进了浏览器显示和终端命令。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>主要改进：</span></span>
<span class="line"><span>- 零依赖服务器</span></span>
<span class="line"><span>- 更好的跨平台支持</span></span>
<span class="line"><span>- 改进的图形渲染</span></span>
<span class="line"><span></span></span>
<span class="line"><span>### Codex 应用兼容性</span></span>
<span class="line"><span></span></span>
<span class="line"><span>确保 Superpowers 在 Codex 应用中正常工作，特别是 worktree 和 finishing 技能的适配。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>关键考虑：</span></span>
<span class="line"><span>- 不同的工具 API</span></span>
<span class="line"><span>- 平台特定行为</span></span>
<span class="line"><span>- 向后兼容性</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## 设计模式总结</span></span>
<span class="line"><span></span></span>
<span class="line"><span>从这些设计文档中，我们可以学到：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. **问题驱动设计** - 先识别痛点，再设计解决方案</span></span>
<span class="line"><span>2. **渐进增强** - 从简单开始，逐步增加复杂度</span></span>
<span class="line"><span>3. **自动化优先** - 能自动化的不要手动</span></span>
<span class="line"><span>4. **验证循环** - 不断验证，持续改进</span></span>
<span class="line"><span>5. **文档化思考** - 设计决策都要记录理由</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## 下一步</span></span>
<span class="line"><span></span></span>
<span class="line"><span>在下一章中，我们将看到这些设计思想的实际应用，通过真实的实施计划示例来学习。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>---</span></span>
<span class="line"><span></span></span>
<span class="line"><span>**参考资源**：</span></span>
<span class="line"><span>- [文档审查系统设计](https://github.com/obra/superpowers/blob/main/docs/superpowers/specs/2026-01-22-document-review-system-design.md)</span></span>
<span class="line"><span>- [可视化头脑风暴重构设计](https://github.com/obra/superpowers/blob/main/docs/superpowers/specs/2026-02-19-visual-brainstorming-refactor-design.md)</span></span>
<span class="line"><span>- [Codex 兼容性设计](https://github.com/obra/superpowers/blob/main/docs/superpowers/specs/2026-03-23-codex-app-compatibility-design.md)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br></div></div>`,46)])])}const u=n(i,[["render",e]]);export{o as __pageData,u as default};
