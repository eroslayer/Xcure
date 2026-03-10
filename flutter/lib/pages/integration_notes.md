# 前后端联调页面改造说明

已切到真实 API（通过 `AppRepository`）：
- 登录页（send-code/login）
- 创建儿童档案页（createChild）
- 初始评估页（initAssessment）
- 地图首页（getMapRisk）
- 检测提交页（submitDetection）
- 训练计划页（generatePlan/todayTasks）
- 打卡页（checkin）
- 症状记录页（submitSymptom）
- 报告摘要页（reportSummary）

如果 UI 组件尚未接入，可通过页面状态管理层调用上述仓储方法替换原 mock provider。
