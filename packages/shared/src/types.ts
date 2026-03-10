export type RiskLevel = 'low' | 'medium' | 'high';

export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
  requestId: string;
}

export interface MapRiskData {
  cityCode: string;
  aqi: number;
  pollenIndex: number;
  temperature: number;
  humidity: number;
  sensitiveTagScore: number;
  riskScore: number;
  riskLevel: RiskLevel;
}

export interface DetectionResult {
  score: number;
  riskLevel: RiskLevel;
  suggestions: string[];
}
