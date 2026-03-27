# 第二章：平台适配

Superpowers 支持多个 AI 编码代理平台。每个平台的安装方式略有不同，但核心功能保持一致。

本章将详细介绍如何在各个平台上安装和配置 Superpowers。

## 支持的平台

| 平台 | 安装方式 | 自动更新 | 难度 |
|------|---------|---------|------|
| Claude Code | 插件市场 | ✅ | ⭐ 简单 |
| Cursor | 插件市场 | ✅ | ⭐ 简单 |
| Gemini CLI | 扩展命令 | ✅ | ⭐ 简单 |
| OpenCode | 配置文件 | ✅ | ⭐⭐ 中等 |
| Codex | 手动克隆 | ❌ | ⭐⭐⭐ 较复杂 |

## Claude Code 安装

Claude Code 是 Superpowers 的首选平台，提供最完整的支持。

### 方法一：官方插件市场（推荐）

Superpowers 已在 [Claude 官方插件市场](https://claude.com/plugins/superpowers)上线。

在 Claude Code 中运行：

```bash
/plugin install superpowers@claude-plugins-official
```

### 方法二：通过市场仓库安装

首先注册市场：

```bash
/plugin marketplace add obra/superpowers-marketplace
```

然后从市场安装：

```bash
/plugin install superpowers@superpowers-marketplace
```

### 验证安装

启动一个新的会话并尝试触发技能：

```
帮我规划这个功能...
```

代理应该自动调用 `brainstorming` 技能。

## Cursor 安装

Cursor 同样支持通过插件市场安装 Superpowers。

### 安装步骤

在 Cursor Agent 聊天中运行：

```text
/add-plugin superpowers
```

或者在插件市场中搜索"superpowers"并安装。

### 验证安装

在 Cursor 中开始一个新对话，尝试请求规划或调试功能，确认技能自动触发。

## Gemini CLI 安装

Gemini CLI 通过扩展系统支持 Superpowers。

### 安装

```bash
gemini extensions install https://github.com/obra/superpowers
```

### 更新

```bash
gemini extensions update superpowers
```

### 验证

启动 Gemini CLI 并尝试触发技能：

```
让我们系统化地调试这个问题
```

## OpenCode 安装

OpenCode 通过插件系统自动安装和管理 Superpowers。

### 安装

编辑你的 `opencode.json`（全局或项目级别）：

```json
{
  "plugin": ["superpowers@git+https://github.com/obra/superpowers.git"]
}
```

重启 OpenCode，插件会通过 Bun 自动安装并注册所有技能。

### 验证安装

在 OpenCode 中询问：

```
告诉我你的 superpowers
```

代理应该列出所有可用的技能。

### 查看可用技能

使用 OpenCode 的原生工具列出技能：

```
use skill tool to list skills
```

### 加载特定技能

```
use skill tool to load superpowers/brainstorming
```

### 迁移旧版本

如果你之前使用 `git clone` 和符号链接安装，需要先清理旧安装：

```bash
# 删除旧的符号链接
rm -f ~/.config/opencode/plugins/superpowers.js
rm -rf ~/.config/opencode/skills/superpowers

# 可选：删除克隆的仓库
rm -rf ~/.config/opencode/superpowers

# 如果在 opencode.json 中添加了 skills.paths，也需要移除
```

### 固定版本

要固定到特定版本，使用分支或标签：

```json
{
  "plugin": ["superpowers@git+https://github.com/obra/superpowers.git#v5.0.3"]
}
```

### 工作原理

OpenCode 插件做两件事：

1. **注入引导上下文**：通过 `experimental.chat.system.transform` 钩子，为每个对话添加 superpowers 意识
2. **注册技能目录**：通过 `config` 钩子，让 OpenCode 自动发现所有 superpowers 技能

### 工具映射

Superpowers 技能会自动适配 OpenCode 的工具系统：

| Claude Code | OpenCode |
|-------------|----------|
| `TodoWrite` | `todowrite` |
| `Task` with subagents | `@mention` 系统 |
| `Skill` tool | 原生 `skill` 工具 |
| 文件操作 | OpenCode 原生工具 |

## Codex 安装

Codex 需要手动安装，但设置后即可正常工作。

### 快速安装

告诉 Codex：

```
Fetch and follow instructions from https://raw.githubusercontent.com/obra/superpowers/refs/heads/main/.codex/INSTALL.md
```

Codex 会自动获取并执行安装指令。

### 手动安装

#### 前置要求

- OpenAI Codex CLI
- Git

#### 步骤

1. **克隆仓库**

   ```bash
   git clone https://github.com/obra/superpowers.git ~/.codex/superpowers
   ```

2. **创建技能符号链接**

   ```bash
   mkdir -p ~/.agents/skills
   ln -s ~/.codex/superpowers/skills ~/.agents/skills/superpowers
   ```

3. **重启 Codex**

4. **启用多代理功能**（可选）

   某些技能（如 `dispatching-parallel-agents` 和 `subagent-driven-development`）需要 Codex 的多代理功能。添加到 Codex 配置：

   ```toml
   [features]
   multi_agent = true
   ```

### Windows 安装

在 Windows 上使用 junction（无需开发者模式）：

```powershell
New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\.agents\skills"
cmd /c mklink /J "$env:USERPROFILE\.agents\skills\superpowers" "$env:USERPROFILE\.codex\superpowers\skills"
```

### 工作原理

Codex 具有原生技能发现机制——它在启动时扫描 `~/.agents/skills/`，解析 SKILL.md frontmatter，并按需加载技能。Superpowers 技能通过单个符号链接变得可见：

```
~/.agents/skills/superpowers/ → ~/.codex/superpowers/skills/
```

`using-superpowers` 技能会被自动发现并强制执行技能使用纪律——无需额外配置。

### 更新

```bash
cd ~/.codex/superpowers && git pull
```

技能通过符号链接即时更新。

### 卸载

```bash
rm ~/.agents/skills/superpowers
```

Windows (PowerShell):

```powershell
Remove-Item "$env:USERPROFILE\.agents\skills\superpowers"
```

可选删除克隆的仓库：

```bash
rm -rf ~/.codex/superpowers
```

## 创建个人技能

在 Superpowers 之外，你还可以创建自己的个人技能。

### Claude Code / Cursor

创建目录和技能文件：

```bash
mkdir -p ~/.agents/skills/my-skill
```

创建 `~/.agents/skills/my-skill/SKILL.md`：

```markdown
---
name: my-skill
description: Use when [condition] - [what it does]
---

# My Skill

[你的技能内容]
```

### OpenCode

在 `~/.config/opencode/skills/` 中创建：

```bash
mkdir -p ~/.config/opencode/skills/my-skill
```

同样的 SKILL.md 格式。

### Codex

Codex 使用 `~/.agents/skills/` 目录。

### 项目级技能

你还可以为特定项目创建技能：

- **OpenCode**: `.opencode/skills/` 在项目根目录
- **其他平台**: 查看对应文档

**技能优先级**: 项目技能 > 个人技能 > Superpowers 技能

## 技能触发方式

Superpowers 技能会在以下情况下自动激活：

1. **按名称提及**: "使用 brainstorming 技能"
2. **任务匹配**: 任务描述与技能的 `description` 字段匹配
3. **强制执行**: `using-superpowers` 技能指示代理使用特定技能

## 验证安装

无论使用哪个平台，都可以通过以下方式验证安装：

1. **开始新会话**
2. **请求触发技能的任务**:
   - "帮我规划这个功能" → 应触发 `brainstorming`
   - "让我们调试这个问题" → 应触发 `systematic-debugging`
   - "帮我写一个计划" → 应触发 `writing-plans`

3. **检查技能列表**:
   - Claude Code/Cursor: `/help` 或询问可用技能
   - OpenCode: `use skill tool to list skills`
   - Codex: 检查 `~/.agents/skills/superpowers/` 目录

## 故障排除

### Claude Code/Cursor: 技能未显示

1. 检查插件是否正确安装
2. 重启应用
3. 查看日志中的错误信息

### OpenCode: 插件未加载

1. 检查 OpenCode 日志:

   ```bash
   opencode run --print-logs "hello" 2>&1 | grep -i superpowers
   ```

2. 验证 `opencode.json` 中的插件行正确
3. 确保使用的是支持插件的 OpenCode 版本

### OpenCode: 技能未找到

1. 使用 OpenCode 的 `skill` 工具列出可用技能
2. 检查插件是否正在加载（见上）
3. 每个技能需要有效的 `SKILL.md` 文件

### Codex: 技能未显示

1. 验证符号链接:

   ```bash
   ls -la ~/.agents/skills/superpowers
   ```

2. 检查技能是否存在:

   ```bash
   ls ~/.codex/superpowers/skills
   ```

3. 重启 Codex——技能在启动时发现

### Windows Junction 问题

Junction 通常无需特殊权限即可工作。如果创建失败，尝试以管理员身份运行 PowerShell。

## 获取帮助

- **问题报告**: https://github.com/obra/superpowers/issues
- **主要文档**: https://github.com/obra/superpowers
- **OpenCode 文档**: https://opencode.ai/docs/
- **社区支持**: [Discord](https://discord.gg/Jd8Vphy9jq)

## 下一步

现在你已经成功安装了 Superpowers，在下一章中，我们将深入学习核心技能系统，了解每个技能的详细用法和最佳实践。
