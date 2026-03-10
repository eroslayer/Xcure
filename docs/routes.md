# 页面与路由设计

## 家长端 App（Flutter）
| 页面 | 路由 | 说明 |
|---|---|---|
| 启动页 | `/splash` | App 冷启动与状态检查 |
| 登录页 | `/login` | 手机号/验证码登录 |
| 儿童档案创建页 | `/child/create` | 创建年龄、性别、既往信息 |
| 初始评估页 | `/assessment/initial` | 初始问卷评估 |
| 首页 | `/home` | 风险、检测、训练、记录入口 |
| 个性化过敏源地图页 | `/map` | 风险分布与当日建议 |
| 地图详情页 | `/map/detail` | 单指标拆解 |
| 检测首页 | `/detection` | 检测任务总览 |
| 检测问卷页 | `/detection/questionnaire` | 睡眠通气问卷 |
| 检测结果页 | `/detection/result` | 风险等级与建议 |
| 训练首页 | `/training` | 今日训练计划 |
| 训练详情页 | `/training/detail` | 单次训练内容 |
| 打卡完成页 | `/training/checkin-done` | 完成反馈 |
| 症状记录页 | `/symptoms` | 每日症状打卡 |
| 报告页 | `/report` | 周/月趋势 |
| 我的页面 | `/me` | 用户信息 |
| 设置页 | `/settings` | 通知、隐私、设备 |
| 消息中心 | `/messages` | 系统消息与提醒 |

## 管理后台（React + Ant Design）
| 页面 | 路由 | 说明 |
|---|---|---|
| Dashboard | `/dashboard` | 核心运营指标 |
| 用户管理 | `/users` | 家长账户管理 |
| 儿童档案管理 | `/children` | 档案查询与统计 |
| 内容管理 | `/content` | 科普/训练文案 |
| 地图数据管理 | `/map-data` | 风险参数管理 |
| 检测规则管理 | `/detection-rules` | 检测评分规则 |
| AI 训练模板管理 | `/training-templates` | 模板配置 |
| 报表管理 | `/reports` | 数据报表 |
| 权限管理 | `/permissions` | 角色权限 |
| 系统设置 | `/settings` | 系统参数 |
