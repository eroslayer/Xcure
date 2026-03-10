import { Injectable } from '@nestjs/common';

@Injectable()
export class ReportService {
  summary() {
    return {
      trainingCompletion: 86,
      riskTrend: [82, 80, 75, 71, 68, 64, 60],
      symptomTrend: [7, 6, 6, 5, 4, 3, 3],
      highlights: ['睡前训练完成率提升', '晨起口干评分下降'],
    };
  }
}
