import { Injectable } from '@nestjs/common';

@Injectable()
export class TrainingService {
  currentPlan() {
    return {
      planId: 'plan-001',
      durationDays: 14,
      difficultyLevel: 2,
      sessionMinutes: 12,
      preferredPeriod: 'bedtime',
    };
  }
}
