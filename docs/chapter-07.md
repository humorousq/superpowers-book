# 第七章：测试与质量保证

本章介绍如何测试 Superpowers 技能，确保代码质量。

## 测试理念

Superpowers 强调**测试驱动开发**，技能本身也不例外。每个技能都需要经过严格测试。

## 测试类型

### 集成测试

测试技能在真实环境中的行为，特别是涉及子代理、工作流和复杂交互的技能。

**特点**：
- 执行真实的 Claude Code 会话
- 在无头模式下运行
- 通过会话记录验证行为

**测试结构**：

```
tests/
├── claude-code/
│   ├── test-helpers.sh                    # 共享测试工具
│   ├── test-subagent-driven-development-integration.sh
│   ├── analyze-token-usage.py             # Token 分析工具
│   └── run-skill-tests.sh                 # 测试运行器
```

### 运行测试

```bash
# 运行 subagent-driven-development 集成测试
cd tests/claude-code
./test-subagent-driven-development-integration.sh
```

**注意**：集成测试可能需要 10-30 分钟，因为它们执行真实的实施计划。

### 要求

- 必须从 **superpowers 插件目录**运行（而非临时目录）
- Claude Code 必须安装并作为 `claude` 命令可用
- 本地开发市场必须启用：`~/.claude/settings.json` 中 `"superpowers@superpowers-dev": true`

## 集成测试示例：subagent-driven-development

### 测试内容

验证 `subagent-driven-development` 技能是否正确：

1. **计划加载** - 在开始时读取一次计划
2. **完整任务文本** - 向子代理提供完整的任务描述
3. **自我审查** - 确保子代理在报告前进行自我审查
4. **审查顺序** - 先运行规格合规性审查，再运行代码质量审查
5. **审查循环** - 发现问题时使用审查循环
6. **独立验证** - 规格审查器独立读取代码，不信任实施者报告

### 工作原理

1. **设置**：创建一个临时的 Node.js 项目和最小实施计划
2. **执行**：在无头模式下运行 Claude Code 和技能
3. **验证**：解析会话记录（`.jsonl` 文件）验证：
   - Skill 工具被调用
   - 子代理被分发（Task 工具）
   - TodoWrite 用于跟踪
   - 实施文件被创建
   - 测试通过
   - Git 提交显示正确的工作流
4. **Token 分析**：按子代理显示 token 使用情况

### 测试输出

```
========================================
 集成测试: subagent-driven-development
========================================

测试项目: /tmp/tmp.xyz123

=== 验证测试 ===

测试 1: Skill 工具调用...
  [通过] subagent-driven-development 技能被调用

测试 2: 子代理分发...
  [通过] 分发了 7 个子代理

测试 3: 任务跟踪...
  [通过] TodoWrite 使用了 5 次

测试 6: 实施验证...
  [通过] src/math.js 已创建
  [通过] add 函数存在
  [通过] multiply 函数存在
  [通过] test/math.test.js 已创建
  [通过] 测试通过

测试 7: Git 提交历史...
  [通过] 创建了多个提交（共 3 个）

测试 8: 未添加额外功能...
  [通过] 未添加额外功能

=========================================
 Token 使用分析
=========================================
子代理 1: 12,345 tokens
子代理 2: 8,234 tokens
...
总计: 45,678 tokens
```

## 测试最佳实践

### 1. 真实环境测试

不要过度 mock。使用真实的 Claude Code 会话测试实际行为。

### 2. 全流程验证

不仅测试最终结果，还要验证：
- 工作流程是否正确
- 中间步骤是否执行
- 错误处理是否正确

### 3. 会话记录分析

解析会话记录（`.jsonl`）可以获取：
- 工具调用序列
- Token 使用情况
- 错误和警告
- 用户交互

### 4. Token 效率分析

监控每个子代理的 token 使用：
- 识别低效的子代理
- 优化提示模板
- 减少不必要的上下文

## 质量保证

### 代码审查

在合并任何技能前，进行代码审查：

- **规格合规性** - 是否符合设计文档
- **代码质量** - 是否遵循最佳实践
- **测试覆盖** - 是否有足够的测试
- **文档完整** - 文档是否清晰完整

### 持续集成

使用 CI 确保每次提交都经过测试：

```yaml
# .github/workflows/test.yml
name: Test Skills
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run integration tests
        run: |
          cd tests/claude-code
          ./run-skill-tests.sh
```

## 下一步

在下一章中，我们将学习跨平台兼容性，确保技能在不同平台上正常工作。

---

**参考资源**：
- [测试文档](https://github.com/obra/superpowers/blob/main/docs/testing.md)
