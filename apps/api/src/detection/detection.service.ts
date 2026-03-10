import { Injectable } from '@nestjs/common';

@Injectable()
export class DetectionService {
  evaluate(input: any) {
    const score = input.congestionLevel * 3 + input.snoreLevel * 3 + input.mouthBreathingLevel * 2 + input.morningDryness + input.daytimeFatigue;
    const high = input.congestionLevel >= 7 && input.snoreLevel >= 7 && input.mouthBreathingLevel >= 6 && (input.morningDryness >= 6 || input.daytimeFatigue >= 6);
    return {
      assessmentId: 'nh-001',
      score,
      riskLevel: high ? 'high' : score > 55 ? 'medium' : 'low',
      suggestions: ['建议睡前训练', '保持鼻腔清洁'],
    };
  }
}
