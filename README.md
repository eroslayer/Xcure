# 儿童鼻炎康复 App MVP Monorepo

本仓库包含三端骨架：
- `apps/mobile`：Flutter 家长端 App
- `apps/admin`：React + Ant Design 管理后台
- `apps/api`：NestJS 后端 API
- `packages/shared`：共享常量、类型、mock 规则
- `docs`：产品、路由、API、数据模型、MVP 范围文档

## 快速启动

### 1) 安装依赖
```bash
npm install
```

### 2) 启动后台与 API
```bash
npm run dev:admin
npm run dev:api
```

### 3) 启动 Flutter App
```bash
cd apps/mobile
flutter pub get
flutter run
```

## 环境变量

每个子应用都提供 `.env.example`，复制为 `.env` 后按需修改。

## MVP 闭环
看风险 → 做检测 → 开始训练 → 记录症状 → 查看趋势
