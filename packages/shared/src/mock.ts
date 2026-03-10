import { DetectionResult, MapRiskData } from './types';

export const mockMapRisk: MapRiskData = {
  cityCode: '310100',
  aqi: 128,
  pollenIndex: 75,
  temperature: 29,
  humidity: 78,
  sensitiveTagScore: 68,
  riskScore: 82,
  riskLevel: 'high',
};

export const mockDetectionResult: DetectionResult = {
  score: 81,
  riskLevel: 'high',
  suggestions: ['建议优先安排睡前鼻呼吸训练', '保持卧室湿度 45%-60%'],
};

export const mockTrainingPlan = {
  planId: 'plan-mock-001',
  durationDays: 14,
  sessionMinutes: 12,
  difficultyLevel: 2,
  tasks: [
    { taskId: 'task-1', title: '鼻呼吸引导', minutes: 4 },
    { taskId: 'task-2', title: '节律呼吸训练', minutes: 4 },
    { taskId: 'task-3', title: '睡前放松训练', minutes: 4 },
  ],
};

export const mockReportData = {
  trainingCompletion: 86,
  symptomTrend: [7, 6, 6, 5, 4, 4, 3],
  riskTrend: [82, 80, 76, 72, 68, 64, 60],
};
