import { Body, Controller, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import { CheckinDto, GeneratePlanDto } from './training.dto';
import { TrainingService } from './training.service';

@UseGuards(JwtAuthGuard)
@Controller('training')
export class TrainingController {
  constructor(private readonly trainingService: TrainingService) {}

  @Post('plan/generate')
  generate(@CurrentUser() user: { userId: number }, @Body() dto: GeneratePlanDto) {
    return this.trainingService.generatePlan(user.userId, dto.childId);
  }

  @Get('tasks/today/:childId')
  today(@CurrentUser() user: { userId: number }, @Param('childId', ParseIntPipe) childId: number) {
    return this.trainingService.todayTasks(user.userId, childId);
  }

  @Post('checkin')
  checkin(@CurrentUser() user: { userId: number }, @Body() dto: CheckinDto) {
    return this.trainingService.checkin(user.userId, dto.childId, dto.taskId, dto.completedMinutes);
  }
}
