import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class MapService {
  constructor(private readonly prisma: PrismaService) {}

  async currentRisk(userId: number) {
    const latestAssessment = await this.prisma.assessment.findFirst({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    const city = latestAssessment?.city ?? '上海';
    const sensitivities = latestAssessment?.sensitivities ?? [];
    const now = new Date();
    const hour = now.getHours();

    const aqi = 120;
    const pollen = 85;
    const humidity = 70;
    const temp = 28;

    let riskScore = 30;
    riskScore += Math.min(30, aqi / 5);
    riskScore += Math.min(20, pollen / 5);
    riskScore += humidity > 65 ? 10 : 0;
    riskScore += hour >= 5 && hour <= 9 ? 10 : 0;
    riskScore += sensitivities.length > 0 ? 10 : 0;

    const level = riskScore > 75 ? '高' : riskScore > 55 ? '中' : '低';

    const factors = [
      `AQI ${aqi}`,
      `花粉指数 ${pollen}`,
      `湿度 ${humidity}%`,
      `温度 ${temp}°C`,
      `敏感标签 ${sensitivities.join('、') || '无'}`,
    ];

    return {
      city,
      timeDimension: `${hour}:00`,
      airQuality: aqi,
      pollen,
      temperature: temp,
      humidity,
      sensitivities,
      risk: { score: riskScore, level },
      mainFactors: factors.slice(0, 3),
      advice: level === '高' ? '减少晨间户外活动，外出佩戴口罩并回家及时冲洗鼻腔。' : '风险可控，保持通风与鼻腔清洁训练。',
    };
  }
}
