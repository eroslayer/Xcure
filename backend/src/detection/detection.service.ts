import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { NasalHealthDto } from './detection.dto';

@Injectable()
export class DetectionService {
  constructor(private readonly prisma: PrismaService) {}

  async nasalHealth(userId: number, dto: NasalHealthDto) {
    const answers = Object.values(dto.questionnaire);
    const avg = answers.length > 0 ? answers.reduce((a, b) => a + b, 0) / answers.length : 2;
    const nasalVentilationScore = Math.max(0, Math.round(100 - avg * 18));
    const sleepRisk = nasalVentilationScore < 45 ? '高' : nasalVentilationScore < 70 ? '中' : '低';
    const mouthBreathing = dto.symptoms.includes('口呼吸') || avg >= 3 ? '明显' : '轻微';

    const detection = await this.prisma.detection.create({
      data: {
        userId,
        childId: dto.childId,
        questionnaire: dto.questionnaire,
        nasalVentilationScore,
        sleepVentilationRisk: sleepRisk,
        mouthBreathingTrend: mouthBreathing,
        actions: sleepRisk === '高' ? ['缩唇呼吸', '鼻翼按摩', '睡前冲洗'] : ['鼻呼吸训练', '腹式呼吸'],
      },
    });

    return detection;
  }
}
