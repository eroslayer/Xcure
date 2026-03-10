import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class ReportService {
  constructor(private readonly prisma: PrismaService) {}

  async summary(userId: number, childId: number) {
    const detections = await this.prisma.detection.findMany({ where: { userId, childId }, orderBy: { createdAt: 'desc' }, take: 7 });
    const checkins = await this.prisma.trainingCheckin.findMany({ where: { userId, childId }, orderBy: { createdAt: 'desc' }, take: 20 });
    const symptoms = await this.prisma.symptom.findMany({ where: { userId, childId }, orderBy: { createdAt: 'desc' }, take: 7 });

    const avgVentilation = detections.length > 0 ? Math.round(detections.reduce((sum, d) => sum + d.nasalVentilationScore, 0) / detections.length) : 0;
    const completionMinutes = checkins.reduce((sum, c) => sum + c.completedMinutes, 0);
    const symptomAvg = symptoms.length > 0 ? Number((symptoms.reduce((sum, s) => sum + s.severity, 0) / symptoms.length).toFixed(1)) : 0;

    return {
      childId,
      period: '近7天',
      nasalVentilationAvg: avgVentilation,
      trainingCompletedMinutes: completionMinutes,
      symptomSeverityAvg: symptomAvg,
      trend: avgVentilation >= 70 && symptomAvg <= 2 ? '改善中' : '需持续干预',
      suggestion: symptomAvg >= 3 ? '建议提升冲洗频次并增加夜间呼吸训练。' : '维持当前训练频率，持续观察。',
    };
  }
}
