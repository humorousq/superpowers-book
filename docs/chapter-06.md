# 第六章：实施计划示例

本章通过真实的实施计划示例，展示如何编写高质量的执行计划。

## 什么是实施计划？

实施计划是将设计转化为具体可执行任务的文档。一个好的实施计划应该：

- **清晰** - 任何人都能理解要做什么
- **具体** - 包含精确的文件路径和代码
- **可验证** - 每步都有验证方法
- **原子性** - 每个任务独立且可完成

## 实施计划结构

Superpowers 的实施计划遵循以下标准结构：

```markdown
# [功能名称] 实施计划

> **对代理工作者**：必需：使用 superpowers:subagent-driven-development 或 superpowers:executing-plans 执行此计划。

**目标**: [一句话描述目标]

**架构**: [技术架构概述]

**技术栈**: [使用的技术]

**规格**: [规格文档链接]

---

## 块 1: [功能块名称]

本块添加 [功能描述]。

### 任务 1: [任务标题]

**文件**:
- 创建: `path/to/file.ts`
- 修改: `path/to/existing.ts`

- [ ] **步骤 1:** [具体操作]

**代码**:
```typescript
// 完整的代码示例
```

- [ ] **步骤 2:** 验证

运行: `npm test`
预期: 所有测试通过

- [ ] **步骤 3:** 提交

```bash
git add .
git commit -m "feat: [提交信息]"
```

---

## 块 2: [下一功能块]
...
```

## 真实案例：文档审查系统

让我们通过真实的案例来学习。以下是 Superpowers 文档审查系统的实施计划示例。

### 项目背景

**目标**: 为 brainstorming 和 writing-plans 技能添加规格和计划文档审查循环。

**架构**: 在每个技能目录中创建审查器提示模板。修改技能文件以在文档创建后添加审查循环。使用 Task 工具和通用目的子代理进行审查器分发。

**技术栈**: Markdown 技能文件、通过 Task 工具进行子代理分发

**规格**: `docs/superpowers/specs/2026-01-22-document-review-system-design.md`

### 块 1: 规格文档审查器

这个块为 brainstorming 技能添加规格文档审查器。

#### 任务 1: 创建规格文档审查器提示模板

**文件**:
- 创建: `skills/brainstorming/spec-document-reviewer-prompt.md`

**步骤 1**: 创建审查器提示模板文件

```markdown
# 规格文档审查器提示模板

在分发规格文档审查器子代理时使用此模板。

**目的**: 验证规格是否完整、一致、可实施。

**在以下情况分发**: 规格文档写入 docs/superpowers/specs/ 后

```
Task 工具 (general-purpose):
  description: "审查规格文档"
  prompt: |
    你是一个规格文档审查器。验证此规格是否完整并准备好制定计划。

    **要审查的规格**: [SPEC_FILE_PATH]

    ## 检查内容

    | 类别 | 查找内容 |
    |----------|------------------|
    | 完整性 | TODO、占位符、"TBD"、不完整章节 |
    | 覆盖度 | 缺失的错误处理、边界情况、集成点 |
    | 一致性 | 内部矛盾、冲突的需求 |
    | 清晰度 | 模糊的需求 |
    | YAGNI | 未请求的功能、过度设计 |

    ## 关键

    特别注意查找：
    - 任何 TODO 标记或占位符文本
    - 说"稍后定义"或"等 X 完成后再规格"的章节
    - 明显比其他章节详细度低的章节

    ## 输出格式

    ## 规格审查

    **状态**: ✅ 通过 | ❌ 发现问题

    **问题（如有）**:
    - [章节 X]: [具体问题] - [为什么重要]

    **建议（参考）**:
    - [不阻止通过的建议]
```

**审查器返回**: 状态、问题（如有）、建议
```

**步骤 2**: 验证文件创建正确

运行: `cat skills/brainstorming/spec-document-reviewer-prompt.md | head -20`
预期: 显示标题和目的部分

**步骤 3**: 提交

```bash
git add skills/brainstorming/spec-document-reviewer-prompt.md
git commit -m "feat: 添加规格文档审查器提示模板"
```

#### 任务 2: 向 Brainstorming 技能添加审查循环

**文件**:
- 修改: `skills/brainstorming/SKILL.md`

**步骤 1**: 读取当前的 brainstorming 技能

运行: `cat skills/brainstorming/SKILL.md`

**步骤 2**: 在"After the Design"之后添加审查循环部分

找到"After the Design"部分，在文档化之后、实施设置之前添加新的"规格审查循环"部分：

```markdown
**规格审查循环**:
编写规格文档后:
1. 分发 spec-document-reviewer 子代理（见 spec-document-reviewer-prompt.md）
2. 如 ❌ 发现问题:
   - 修复规格文档中的问题
   - 重新分发审查器
   - 重复直到 ✅ 通过
3. 如 ✅ 通过: 继续实施设置

**审查循环指导**:
- 编写规格的同一代理修复它（保持上下文）
- 如循环超过 5 次迭代，向人工寻求指导
- 审查器是咨询性的 - 如果你认为反馈不正确，解释分歧
```

**步骤 3**: 验证更改

运行: `grep -A 15 "规格审查循环" skills/brainstorming/SKILL.md`
预期: 显示新的审查循环部分

**步骤 4**: 提交

```bash
git add skills/brainstorming/SKILL.md
git commit -m "feat: 向 brainstorming 技能添加规格审查循环"
```

### 块 2: 计划文档审查器

这个块为 writing-plans 技能添加计划文档审查器。

#### 任务 3: 创建计划文档审查器提示模板

**文件**:
- 创建: `skills/writing-plans/plan-document-reviewer-prompt.md`

**步骤 1**: 创建审查器提示模板文件

内容类似规格审查器，但专注于计划验证。

#### 任务 4: 向 Writing-Plans 技能添加审查循环

修改 writing-plans 技能，在完成每个计划块后触发审查。

## 关键模式

从这个实施计划中，我们可以学到几个关键模式：

### 1. 块化分解

将大型功能分解为独立的块：

- **块 1**: 规格审查器（独立功能）
- **块 2**: 计划审查器（独立功能）

每个块可以独立实施、测试和提交。

### 2. 任务原子性

每个任务都足够小和具体：

```
任务 1: 创建审查器模板（1个文件，约50行）
任务 2: 添加审查循环（1个文件，约10行修改）
```

避免模糊的大任务，如"实现审查系统"。

### 3. 可验证步骤

每个任务都有明确的验证步骤：

```markdown
- [ ] 验证文件创建
  运行: `cat file.md | head -20`
  预期: 显示标题部分

- [ ] 提交
  ```bash
  git add .
  git commit -m "..."
  ```
```

这确保任何人都能验证任务是否正确完成。

### 4. 包含完整代码

不要只说"创建文件"。提供完整的代码：

```markdown
**代码**:
```markdown
# 完整的文件内容
...
```
```

这消除了歧义，执行者可以直接复制粘贴。

### 5. Git 工作流集成

每个任务完成后立即提交：

```markdown
- [ ] 提交
  ```bash
  git add skills/brainstorming/SKILL.md
  git commit -m "feat: 向 brainstorming 技能添加规格审查循环"
  ```
```

这确保：
- 原子性提交
- 清晰的提交历史
- 易于回滚

## 其他实施计划示例

Superpowers 仓库中还有更多实施计划：

- **可视化头脑风暴重构** - 重构可视化功能
- **零依赖头脑风暴服务器** - 简化服务器实现
- **Codex 应用兼容性** - 适配 Codex 平台

## 最佳实践总结

### ✅ 应该做

- 每个任务 2-5 分钟可完成
- 包含完整代码示例
- 有明确的验证步骤
- 任务间保持独立
- 每个任务一个提交

### ❌ 不应该做

- 模糊的任务描述
- 缺少验证方法
- 大型任务（超过 100 行代码）
- 遗漏代码示例
- 批量提交多个任务

## 下一步

在下一章中，我们将学习如何测试 Superpowers 技能，确保代码质量。

---

**参考资源**：
- [文档审查系统实施计划](https://github.com/obra/superpowers/blob/main/docs/superpowers/plans/2026-01-22-document-review-system.md)
- [其他实施计划](https://github.com/obra/superpowers/tree/main/docs/superpowers/plans)
