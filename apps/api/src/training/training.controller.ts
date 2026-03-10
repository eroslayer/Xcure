import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { TrainingService } from './training.service';

@Controller('training')
export class TrainingController {
  constructor(private readonly trainingService: TrainingService) {}

  @Get('plan/current')
  current(@Query('childId') _childId: string) {
    return { code: 0, message: 'ok', data: this.trainingService.currentPlan(), requestId: 'mock-req' };
  }

  @Post('plan/generate')
  generate(@Body() body: { age?: number; nightSymptomScore?: number; completionRate?: number; interruptedDays?: number }) {
    let minutes = 12;
    if ((body.age ?? 8) < 6) minutes = 8;
    if ((body.age ?? 8) > 12) minutes = 18;

    let difficultyLevel = 2;
    if ((body.completionRate ?? 0) >= 85) difficultyLevel = 3;
    if ((body.interruptedDays ?? 0) >= 3) difficultyLevel = 1;

    const preferredPeriod = (body.nightSymptomScore ?? 0) >= 7 ? 'bedtime' : 'evening';
    return { code: 0, message: 'ok', data: { planId: 'plan-new', sessionMinutes: minutes, difficultyLevel, preferredPeriod }, requestId: 'mock-req' };
  }

  @Post('records')
  record(@Body() body: Record<string, unknown>) {
    return { code: 0, message: 'ok', data: { id: 'tr-001', ...body }, requestId: 'mock-req' };
  }
}
