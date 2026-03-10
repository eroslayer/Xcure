# API 契约（MVP）

Base URL: `/api/v1`

统一响应：
```json
{
  "code": 0,
  "message": "ok",
  "data": {},
  "requestId": "uuid"
}
```

## Auth
- `POST /auth/login`
  - req: `{ "phone": "", "otp": "" }`
  - resp: `{ "accessToken": "", "refreshToken": "", "user": { "id": "", "role": "parent" } }`
- `POST /auth/refresh`
  - req: `{ "refreshToken": "" }`

## Children
- `GET /children`
- `POST /children`
  - req: `{ "name":"", "gender":"", "birthDate":"YYYY-MM-DD", "cityCode":"" }`
- `GET /children/:id`
- `PATCH /children/:id`

## Assessment
- `POST /assessment/initial`
  - req: `{ "childId":"", "questionnaire": { ... } }`
- `GET /assessment/initial/:childId/latest`

## Map
- `GET /map/risk?childId=...&cityCode=...`
  - resp: `{ "riskScore":78, "riskLevel":"high", "factors": { "aqi":120, "pollen":80, "temperature":31, "humidity":76, "tagScore":65 } }`
- `GET /map/risk/history?childId=...&days=7`

## Detection
- `POST /detection/questionnaire`
  - req: `{ "childId":"", "congestionLevel":8, "snoreLevel":7, "mouthBreathingLevel":6, "morningDryness":6, "daytimeFatigue":5 }`
  - resp: `{ "assessmentId":"", "score":82, "riskLevel":"high", "suggestions":["睡前训练"] }`
- `GET /detection/:assessmentId`

## Training
- `GET /training/plan/current?childId=...`
- `POST /training/plan/generate`
  - req: `{ "childId":"", "assessmentId":"" }`
- `POST /training/records`
  - req: `{ "childId":"", "planId":"", "taskId":"", "completionStatus":"done", "completionRate":100 }`

## Symptoms
- `POST /symptoms`
  - req: `{ "childId":"", "recordDate":"", "nasalCongestion":6, "snore":5, "mouthBreathing":4, "daytimeEnergy":7, "medicationUsed":false, "note":"" }`
- `GET /symptoms/trend?childId=...&range=week`

## Report
- `GET /report/summary?childId=...&range=week`
  - resp: `{ "riskTrend":[], "trainingCompletion":85, "symptomTrend":[], "highlights":[] }`

## Notifications
- `GET /notifications`
- `POST /notifications/read`
  - req: `{ "ids": ["..."] }`
