import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class TrainingService {
  constructor(private readonly prisma: PrismaService) {}

  async generatePlan(userId: number, childId: number) {
    const child = await this.prisma.child.findUnique({ where: { id: childId } });
    const latestDetection = await this.prisma.detection.findFirst({ where: { childId, userId }, orderBy: { createdAt: 'desc' } });
    const latestSymptom = await this.prisma.symptom.findFirst({ where: { childId, userId }, orderBy: { createdAt: 'desc' } });

    const completionRate = 0.6;
    const ageLevel = (child?.age ?? 6) < 8 ? '低龄' : '学龄';
    const score = latestDetection?.nasalVentilationScore ?? 65;
    const difficulty = score < 50 || (latestSymptom?.severity ?? 0) >= 4 ? '低' : completionRate > 0.8 ? '高' : '中';
    const duration = difficulty === '低' ? 10 : difficulty === '中' ? 15 : 20;

    const tasks = [
      { name: '鼻呼吸节律训练', targetMinutes: duration },
      { name: '鼻翼按摩', targetMinutes: 5 },
      { name: '睡前放松呼吸', targetMinutes: duration },
    ];

    const plan = await this.prisma.trainingPlan.create({
      data: {
        userId,
        childId,
        ageLevel,
        difficulty,
        recommendedMinutes: duration,
        tasks: {
          create: tasks,
        },
      },
      include: { tasks: true },
    });

    return plan;
  }

  async todayTasks(userId: number, childId: number) {
    const plan = await this.prisma.trainingPlan.findFirst({
      where: { userId, childId },
      orderBy: { createdAt: 'desc' },
      include: { tasks: true },
    });
    if (!plan) {
      return { plan: null, tasks: [] };
    }

    return { planId: plan.id, difficulty: plan.difficulty, tasks: plan.tasks };
  }

  async checkin(userId: number, childId: number, taskId: number, completedMinutes: number) {
    return this.prisma.trainingCheckin.create({
      data: { userId, childId, taskId, completedMinutes },
    });
  }
}
