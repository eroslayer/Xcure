import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { DetectionService } from './detection.service';

@Controller('detection')
export class DetectionController {
  constructor(private readonly detectionService: DetectionService) {}

  @Post('questionnaire')
  questionnaire(@Body() body: Record<string, number>) {
    return { code: 0, message: 'ok', data: this.detectionService.evaluate(body), requestId: 'mock-req' };
  }

  @Get(':assessmentId')
  detail(@Param('assessmentId') assessmentId: string) {
    return { code: 0, message: 'ok', data: { assessmentId, riskLevel: 'high', score: 81 }, requestId: 'mock-req' };
  }
}
