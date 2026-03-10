# Xcure 前端可演示 MVP（家长端 + 管理后台）

## 启动方式

### Mobile（Flutter 家长端）
```bash
cd mobile
flutter pub get
flutter run
```

### Admin（React）
```bash
cd admin
npm install
npm run dev
```

## 当前 mock 逻辑说明
- 家长端统一由 `mobile/lib/mock/mock_data.dart` 提供 mock 数据，通过 `MockDataProvider` 注入页面。
- 管理后台列表数据集中在 `admin/src/mock/adminMock.js`。
- UI 组件只消费 mock 层，不在组件内部写死业务数据。

## 已可演示功能

### 家长端页面
- 登录、儿童档案创建、初始评估
- 首页（儿童信息、风险、最近检测、训练计划、任务引导、症状摘要）
- 个性化过敏源地图、地图详情
- 检测首页、检测问卷（分步 + 进度条）、检测结果（图形区 + 高风险提示 + CTA）
- 训练首页、训练详情（步骤、开始/暂停/继续/完成、倒计时）
- 打卡完成、症状记录、报告（7/30天切换、趋势图占位、数据不足提示）
- 我的、设置、消息中心

### 可演示主流程
首页 → 地图 → 检测 → 检测结果 → 训练 → 打卡 → 症状记录 → 报告

### 管理后台
已完成基础壳子与路由：
- Dashboard
- 用户管理
- 儿童档案管理
- 内容管理
- 地图数据管理
- 检测规则管理
- 训练模板管理
- 报表管理

