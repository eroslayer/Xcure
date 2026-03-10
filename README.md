# 儿童鼻炎康复 App MVP（本地联调版）

本仓库当前提供：
- `backend/`：NestJS + Prisma + PostgreSQL 的最小可用后端。
- `flutter/`：Flutter 端真实 API 联调层（仓储 + API Client），用于替换纯 mock 数据源。

## 1. 后端启动

```bash
cd backend
cp .env.example .env
npm install
npm run prisma:generate
npm run prisma:push
npm run seed
npm run start:dev
```

默认服务地址：`http://localhost:3000`。

## 2. 数据库初始化（PostgreSQL）

### 方式 A：Docker（推荐）

```bash
docker compose up -d postgres
```

### 方式 B：本地 PostgreSQL

手动创建数据库后，修改 `backend/.env` 里的 `DATABASE_URL`。

## 3. schema / migration / seed

- Prisma Schema：`backend/prisma/schema.prisma`
- 初始化 SQL（可选）：`backend/scripts/init.sql`
- 同步结构：`npm run prisma:push`
- seed 数据：`npm run seed`

## 4. mock 验证码与测试账号

- 登录验证码流程为 mock：`POST /api/auth/send-code` 固定返回 `1234`。
- 可直接使用手机号 `13800000000` + 验证码 `1234` 登录。

## 5. Flutter 前后端联调方式

1. 在 Flutter 工程中引用 `flutter/lib/services/api_client.dart` 与 `flutter/lib/repositories/app_repository.dart`。
2. 初始化：
   - `ApiClient(baseUrl: 'http://localhost:3000')`
   - 注入 `AppRepository` 到页面状态管理层。
3. 把原先 mock provider 的调用替换为仓储方法。
4. 页面映射见 `flutter/lib/pages/integration_notes.md`。

## 6. 已实现后端模块

- auth
- children
- assessment
- map
- detection
- training
- symptoms
- report
- notifications（mock 通知服务）

## 7. 已落地接口

- `POST /api/auth/send-code`
- `POST /api/auth/login`
- `POST /api/children`
- `GET /api/children`
- `POST /api/assessment/init`
- `GET /api/map/risk/current`
- `POST /api/detection/nasal-health`
- `POST /api/training/plan/generate`
- `GET /api/training/tasks/today/:childId`
- `POST /api/training/checkin`
- `POST /api/symptoms`
- `GET /api/report/summary/:childId`

## 8. 基础错误处理

- 后端：Nest ValidationPipe + 401 JWT 鉴权。
- Flutter API Client：
  - 401 抛出 `UnauthenticatedException`（用于未登录跳转）。
  - 其他异常抛出统一错误（页面可做 toast 与 fallback UI）。
  - 空数据时仓储层返回空对象/空列表（由页面显示空态）。
