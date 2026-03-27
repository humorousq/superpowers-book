# 第十章：实战案例

本章通过真实项目案例，展示 Superpowers 的完整应用。

## 案例 1: 新功能开发

### 场景

为电商平台添加用户评价功能。

### 完整流程

#### 步骤 1: 需求澄清 (brainstorming)

```
用户：我想添加用户评价功能

代理：好的，让我问几个问题：

1. 评价对象
   - 只评价商品？
   - 还要评价商家？
   - 物流服务？

2. 评价内容
   - 星级评分？
   - 文字评价？
   - 图片/视频？

3. 评价规则
   - 购买后多久可以评价？
   - 是否可以修改评价？
   - 商家可以回复吗？

用户：只评价商品，星级+文字，购买后7天内可评价，商家可回复...

代理：好的，让我整理一下设计方案...

[展示设计文档片段]
```

#### 步骤 2: 编写计划 (writing-plans)

代理生成了详细的实施计划：

```markdown
# 用户评价功能实施计划

## 块 1: 数据模型

### 任务 1: 创建评价模型
**文件**: `src/models/Review.ts`

- [ ] 定义 Review 接口
- [ ] 添加数据库 schema

**代码**:
```typescript
interface Review {
  id: string
  productId: string
  userId: string
  rating: number  // 1-5
  comment: string
  images?: string[]
  createdAt: Date
}
```

### 任务 2: 添加数据库迁移
**文件**: `migrations/add_reviews.ts`

...
```

#### 步骤 3: 测试驱动开发 (test-driven-development)

```typescript
// 先写测试
describe('Review API', () => {
  test('should create review for purchased product', async () => {
    const review = await createReview({
      productId: 'prod-123',
      userId: 'user-456',
      rating: 5,
      comment: 'Great product!'
    })
    
    expect(review.id).toBeDefined()
    expect(review.rating).toBe(5)
  })
  
  test('should not allow review from non-buyer', async () => {
    await expect(createReview({
      productId: 'prod-123',
      userId: 'non-buyer',
      rating: 5,
      comment: 'Test'
    })).rejects.toThrow('Only buyers can review')
  })
})
```

#### 步骤 4: 执行实施 (subagent-driven-development)

代理自动执行计划：
- 创建数据模型
- 实现 API
- 添加测试
- 通过审查

#### 结果

- ✅ 功能完整实现
- ✅ 测试覆盖率 92%
- ✅ 代码审查通过
- ✅ 已合并到主分支

## 案例 2: Bug 修复

### 场景

用户报告登录偶尔失败。

### 系统化调试流程

#### 阶段 1: 重现问题

```
用户：登录有时会失败

代理（systematic-debugging）：
让我重现这个问题。

问题：什么时候失败？
用户：高并发情况下

让我创建测试环境...
[创建并发测试脚本]

✓ 问题已重现：当并发超过 50 时，数据库连接池耗尽
```

#### 阶段 2: 定位根本原因

```
代理：分析调用栈...

检查数据库连接池配置：
当前设置：max: 10

问题：并发请求超过连接池限制，导致等待超时。
```

#### 阶段 3: 制定修复方案

```markdown
# 修复方案

1. 增加连接池大小
2. 添加连接超时处理
3. 添加连接池监控
4. 实施连接复用优化
```

#### 阶段 4: 实施并验证

```typescript
// 先写失败测试
test('should handle 100 concurrent logins', async () => {
  const promises = Array(100).fill(null).map(() => 
    login('user', 'password')
  )
  
  const results = await Promise.allSettled(promises)
  const success = results.filter(r => r.status === 'fulfilled')
  
  expect(success.length).toBeGreaterThan(95)
})

// 修复代码
const pool = createPool({
  max: 50,           // 增加连接池大小
  min: 10,
  acquireTimeoutMillis: 30000,
  idleTimeoutMillis: 10000
})
```

#### 结果

- ✅ 修复已验证
- ✅ 所有测试通过
- ✅ 监控已添加
- ✅ 文档已更新

## 案例 3: 代码重构

### 场景

重构遗留的用户服务代码。

### 重构流程

#### 分析现状

```
代理：让我分析代码...

发现的问题：
- 单个文件 2000+ 行
- 混合了业务逻辑和数据访问
- 缺少测试
- 重复代码多处
```

#### 制定计划

```markdown
# 重构计划

## 块 1: 提取数据访问层

### 任务 1: 创建 UserRepository
- 分离数据库操作
- 添加接口定义

## 块 2: 提取业务逻辑层

### 任务 2: 创建 UserService
- 业务规则集中
- 依赖注入

## 块 3: 添加测试

### 任务 3: 单元测试
- Repository 测试
- Service 测试
```

#### 执行重构

遵循 TDD：
1. 为新模块编写测试
2. 提取代码到新模块
3. 确保测试通过
4. 删除旧代码
5. 验证功能

#### 结果

```
重构前：
- 1个文件 2000+ 行
- 测试覆盖率 0%
- 难以维护

重构后：
- 5个文件，每个 < 400 行
- 测试覆盖率 85%
- 清晰的架构分层
- 易于扩展
```

## 案例 4: API 集成

### 场景

集成第三方支付系统。

### 集成流程

#### 设计阶段

```
代理（brainstorming）：
需要集成哪个支付系统？
用户：Stripe

代理：好的，让我设计集成方案...

[设计文档]
- 支付流程
- 错误处理
- 回调处理
- 安全考虑
```

#### 实施阶段

```typescript
// 支付服务
export class PaymentService {
  async createPayment(order: Order): Promise<PaymentResult> {
    // 1. 验证订单
    this.validateOrder(order)
    
    // 2. 调用 Stripe
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: order.total * 100,  // cents
      currency: 'usd',
      metadata: { orderId: order.id }
    })
    
    // 3. 保存记录
    await this.savePayment({
      orderId: order.id,
      paymentIntentId: paymentIntent.id,
      status: 'pending'
    })
    
    return {
      clientSecret: paymentIntent.client_secret,
      paymentId: paymentIntent.id
    }
  }
}
```

#### 测试策略

```typescript
// 使用 Stripe 测试模式
describe('Payment Integration', () => {
  test('should create payment intent', async () => {
    const result = await paymentService.createPayment(mockOrder)
    
    expect(result.clientSecret).toBeDefined()
    expect(result.paymentId).toMatch(/^pi_/)
  })
  
  test('should handle webhook', async () => {
    const webhook = createMockWebhook({
      type: 'payment_intent.succeeded',
      data: { /* ... */ }
    })
    
    await paymentService.handleWebhook(webhook)
    
    const order = await getOrder(mockOrder.id)
    expect(order.status).toBe('paid')
  })
})
```

#### 结果

- ✅ 支付功能正常
- ✅ 错误处理完善
- ✅ 安全审计通过
- ✅ 文档完整

## 经验总结

### 成功要素

1. **遵循流程** - 不跳过步骤，每个阶段都很重要
2. **测试优先** - TDD 不是可选项
3. **持续验证** - 在每个阶段都验证结果
4. **清晰沟通** - 文档和注释要清晰
5. **迭代改进** - 不追求一次完美

### 常见陷阱

1. **跳过设计** - 直接编码导致返工
2. **测试后补** - 质量难以保证
3. **过度设计** - YAGNI 原则被忽视
4. **缺少验证** - "应该没问题"的心态
5. **忽视文档** - 知识无法传承

## 最佳实践清单

### 开发前
- [ ] 需求澄清完成
- [ ] 设计文档通过审查
- [ ] 实施计划已制定

### 开发中
- [ ] 测试先行
- [ ] 代码已审查
- [ ] 文档已更新

### 开发后
- [ ] 所有测试通过
- [ ] 功能已验证
- [ ] 部署已完成

## 继续学习

Superpowers 是一个持续发展的项目。继续学习：

- 阅读源码
- 参与社区讨论
- 分享你的经验
- 贡献新技能

---

**参考资源**：
- [Superpowers GitHub](https://github.com/obra/superpowers)
- [Discord 社区](https://discord.gg/Jd8Vphy9jq)
- [官方博客](https://blog.fsck.com/2025/10/09/superpowers/)

恭喜你完成了 Superpowers 学习之旅！现在开始实践吧！
