# 第九章：高级主题与扩展

本章深入 Superpowers 的高级用法，学习如何自定义和扩展。

## 创建自定义技能

Superpowers 支持创建自定义技能，满足特定需求。

### 技能结构

每个技能包含：

```
skills/my-skill/
├── SKILL.md           # 必需：技能定义
├── templates/         # 可选：模板文件
├── scripts/          # 可选：脚本文件
└── knowledge/        # 可选：知识库
```

### SKILL.md 格式

```markdown
---
name: my-skill
description: Use when [触发条件] - [功能描述]
---

# My Skill

[技能的详细说明]

## 何时使用

- 场景 1
- 场景 2

## 工作流程

1. 步骤 1
2. 步骤 2
3. ...

## 示例

[实际使用示例]
```

### 创建步骤

1. 创建技能目录：

```bash
mkdir -p ~/.claude/skills/my-skill
```

2. 创建 SKILL.md：

```bash
cat > ~/.claude/skills/my-skill/SKILL.md << 'SKILL_EOF'
---
name: code-review-checklist
description: Use when requesting code review - ensures all checklist items are covered
---

# Code Review Checklist

## 检查项

- [ ] 代码符合编码规范
- [ ] 测试覆盖率足够
- [ ] 没有安全漏洞
- [ ] 性能影响已评估
- [ ] 文档已更新

## 使用方法

1. 完成代码后运行此检查清单
2. 确保所有项目都已检查
3. 然后提交审查请求
SKILL_EOF
```

3. 重启 Claude Code

技能会自动加载并在匹配条件时触发。

## 扩展现有技能

### 添加新功能

1. Fork Superpowers 仓库
2. 修改现有技能
3. 测试变更
4. 提交 Pull Request

### 示例：扩展 brainstorming 技能

```markdown
# 在 skills/brainstorming/SKILL.md 中添加

## 高级技巧

### 可视化设计

对于复杂的系统设计：
1. 创建系统架构图
2. 标注数据流向
3. 识别关键接口

这有助于更好地理解系统。
```

## 集成到现有工作流

### 与 CI/CD 集成

```yaml
# .github/workflows/ai-review.yml
name: AI Code Review
on: [pull_request]
jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run AI review
        run: |
          # 触发 requesting-code-review 技能
          claude code --skill requesting-code-review
```

### 与 Git Hooks 集成

```bash
# .git/hooks/pre-commit
#!/bin/bash

# 运行测试
npm test

# 验证代码质量
claude code --skill verification-before-completion
```

### 与编辑器集成

**VS Code**:
```json
// .vscode/tasks.json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Brainstorm Feature",
      "type": "shell",
      "command": "claude code --skill brainstorming",
      "problemMatcher": []
    }
  ]
}
```

## 性能优化

### 1. 减少子代理数量

合并小任务，减少子代理分发的开销：

```markdown
## 任务 1-3: 基础设施（合并）

而不是：

## 任务 1: 创建文件
## 任务 2: 添加配置
## 任务 3: 安装依赖
```

### 2. 优化提示模板

精简提示，去除冗余信息：

```markdown
# 优化前
Please implement the user authentication system according to the specification document...

# 优化后
Implement user auth per spec. Files: src/auth.ts, src/user.ts.
```

### 3. 缓存重复操作

对于重复操作，缓存结果：

```javascript
// 使用缓存避免重复读取
const cachedSpec = await cache.get('spec-content')
if (!cachedSpec) {
  const spec = await fs.readFile('spec.md')
  cache.set('spec-content', spec)
}
```

## 团队协作

### 技能共享

1. 将技能放在共享仓库
2. 团队成员克隆到各自的技能目录
3. 定期同步更新

### 标准化流程

创建团队专用的技能：

```markdown
---
name: team-code-review
description: Team-specific code review checklist
---

# 团队代码审查

## 必查项

- [ ] 遵循团队编码规范
- [ ] 国际化处理正确
- [ ] 错误码符合规范
- [ ] 日志级别正确
```

### 技能版本管理

使用 Git 分支管理技能版本：

```bash
# 团队主分支
git checkout main
git pull origin main

# 个人自定义
git checkout -b my-custom-skills
# 修改技能...
git commit -m "Add custom skill"
```

## 调试技巧

### 查看技能加载

```bash
# Claude Code
claude code --verbose

# 查看加载的技能
claude code --list-skills
```

### 测试单个技能

```bash
# 触发特定技能
claude code --skill brainstorming

# 使用测试输入
claude code --skill test-driven-development --test-input "add user login"
```

### 日志分析

查看详细日志：

```bash
# Claude Code 日志
tail -f ~/.claude/logs/claude-code.log

# OpenCode 日志
opencode run --print-logs "test" 2>&1 | grep -i skill
```

## 最佳实践

### 1. 保持简单

不要过度复杂化技能。简单、专注的技能更可靠。

### 2. 文档优先

先写文档，再实现功能。这确保设计清晰。

### 3. 测试驱动

为新技能编写测试，确保功能正确。

### 4. 渐进增强

从基础功能开始，逐步添加高级功能。

### 5. 社区协作

分享技能到社区，获取反馈和改进建议。

## 下一步

在最后一章中，我们将通过真实案例看 Superpowers 的实际应用。

---

**参考资源**：
- [Writing Skills Guide](https://github.com/obra/superpowers/blob/main/skills/writing-skills/SKILL.md)
- [Skill Examples](https://github.com/obra/superpowers/tree/main/skills)
