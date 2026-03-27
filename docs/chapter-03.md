# 第三章：核心 Skills 详解

本章深入讲解 Superpowers 的核心技能系统。每个技能都针对特定场景优化，并遵循最佳实践。

## 技能概览

Superpowers 包含以下核心技能：

**测试相关**
- `test-driven-development` - 红-绿-重构循环
- `verification-before-completion` - 完成前验证

**调试相关**
- `systematic-debugging` - 系统化调试流程

**协作相关**
- `brainstorming` - 苏格拉底式设计细化
- `writing-plans` - 详细实施计划
- `executing-plans` - 批量执行
- `dispatching-parallel-agents` - 并发子代理
- `subagent-driven-development` - 子代理驱动开发
- `requesting-code-review` - 代码审查请求
- `receiving-code-review` - 响应审查反馈
- `using-git-worktrees` - Git 工作树管理
- `finishing-a-development-branch` - 分支完成流程

## test-driven-development - 测试驱动开发

### 核心原则

**RED-GREEN-REFACTOR 循环**

1. **RED**: 编写失败的测试
2. 运行测试，确认失败
3. **GREEN**: 编写最小代码使测试通过
4. 运行测试，确认通过
5. **REFACTOR**: 重构代码（可选）
6. 提交代码

### 为什么必须先写测试？

- 确保你理解需求
- 防止过度设计
- 提供回归保护
- 作为活文档

### 示例

```typescript
// 步骤 1: 编写失败测试
test('should hash password correctly', async () => {
  const password = 'myPassword123'
  const hash = await hashPassword(password)

  expect(hash).toBeDefined()
  expect(hash).not.toBe(password)
  expect(await verifyPassword(password, hash)).toBe(true)
})

// 步骤 2: 运行测试，看到失败
// Error: hashPassword is not defined

// 步骤 3: 编写最小实现
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10)
}

export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

// 步骤 4: 测试通过
// ✓ should hash password correctly
```

## systematic-debugging - 系统化调试

当遇到 bug 时，不要随机猜测。使用系统化的四阶段流程：

### 阶段 1: 重现问题

- 确定可以稳定重现
- 记录重现步骤
- 创建最小复现案例

### 阶段 2: 定位根本原因

- 使用二分法缩小范围
- 添加日志和断点
- 分析调用栈
- 检查最近变更

### 阶段 3: 制定修复方案

- 理解为什么问题发生
- 设计最小化修复
- 考虑副作用

### 阶段 4: 实施并验证

- 先编写失败测试
- 实施修复
- 运行所有测试

### 示例对话

```
用户：用户登录有时会失败

代理（systematic-debugging）：

让我系统地调试这个问题。

**阶段 1: 重现问题**
- 什么时候失败？有规律吗？
- 失败时的错误信息是什么？

**分析中...**
我已经定位到问题：数据库连接池在并发情况下会耗尽。

**阶段 3: 修复方案**
1. 增加连接池大小
2. 添加连接超时处理
3. 添加连接池监控

让我先写一个测试来重现这个问题...
```

## brainstorming - 头脑风暴

在开始任何新功能前，先澄清需求。

### 工作方式

1. 通过提问澄清需求
2. 探索不同方案
3. 分段展示设计
4. 保存设计文档

### 示例

```
用户：我想实现用户认证

代理（brainstorming）：
好的，让我问几个问题：

1. 支持哪些登录方式？
   - 用户名/密码？
   - OAuth（Google、GitHub）？
   - 手机验证码？

2. 会话管理：
   - 保持登录多久？
   - 是否需要"记住我"？
   - 多设备同时登录？

3. 安全要求：
   - 密码复杂度？
   - 登录失败限制？
   - 双因素认证？

让我们逐一讨论...
```

## writing-plans - 编写计划

将设计转换为可执行的任务清单。

### 计划特点

- 每个任务 2-5 分钟
- 明确文件路径
- 包含完整代码
- 有验证步骤

### 示例计划

```markdown
## 任务 1: 创建 User 模型
**文件**: src/models/User.ts
**代码**:
```typescript
export interface User {
  id: string
  email: string
  passwordHash: string
  createdAt: Date
}
```
**验证**: TypeScript 编译通过
**时间**: 5 分钟

## 任务 2: 实现密码哈希
**文件**: src/utils/password.ts
**测试**: 先写测试
**代码**: ...完整代码...
**验证**: npm test
**时间**: 15 分钟
```

## subagent-driven-development - 子代理驱动

自动执行计划，每个任务一个子代理。

### 流程

1. 创建子代理执行任务
2. 两阶段审查：
   - 规格合规性
   - 代码质量
3. 继续下一任务

### 优势

- 长时间自主工作
- 自动代码审查
- 更高质量

## verification-before-completion - 完成前验证

在声称完成前，必须验证。

### 验证清单

- [ ] 所有测试通过
- [ ] 没有类型错误
- [ ] 代码格式正确
- [ ] 功能已手动验证
- [ ] 文档已更新

### 强制执行

```
❌ "我觉得应该好了"
✅ "测试运行完成，所有测试通过"
```

## 技能组合

实际项目中，技能会组合使用：

### 新功能开发

```
brainstorming → writing-plans → using-git-worktrees
→ subagent-driven-development → verification-before-completion
→ finishing-a-development-branch
```

### Bug 修复

```
systematic-debugging → test-driven-development
→ verification-before-completion
```

### 代码审查响应

```
receiving-code-review → brainstorming
→ test-driven-development → verification-before-completion
```

## 最佳实践

1. **信任流程** - 不要跳过步骤
2. **先写测试** - 永远是第一步
3. **证据为王** - 用命令输出验证，不用"感觉"
4. **保持简单** - YAGNI（你不会需要它）

## 下一步

下一章我们将深入理解完整的工作流程，学习如何在实际项目中应用这些技能。
