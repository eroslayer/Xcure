import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AssessmentService } from './assessment.service';

@Controller('assessment')
export class AssessmentController {
  constructor(private readonly assessmentService: AssessmentService) {}

  @Post('initial')
  createInitial(@Body() body: Record<string, unknown>) {
    return { code: 0, message: 'ok', data: { id: 'ia-001', ...body, riskLevel: 'medium' }, requestId: 'mock-req' };
  }

  @Get('initial/:childId/latest')
  latest(@Param('childId') childId: string) {
    return { code: 0, message: 'ok', data: this.assessmentService.latest(childId), requestId: 'mock-req' };
  }
}
