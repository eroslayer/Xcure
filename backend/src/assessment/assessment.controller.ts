import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import { AssessmentService } from './assessment.service';
import { InitAssessmentDto } from './assessment.dto';

@UseGuards(JwtAuthGuard)
@Controller('assessment')
export class AssessmentController {
  constructor(private readonly assessmentService: AssessmentService) {}

  @Post('init')
  init(@CurrentUser() user: { userId: number }, @Body() dto: InitAssessmentDto) {
    return this.assessmentService.init(user.userId, dto);
  }
}
