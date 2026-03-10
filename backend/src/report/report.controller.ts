import { Controller, Get, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import { ReportService } from './report.service';

@UseGuards(JwtAuthGuard)
@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get('summary/:childId')
  summary(@CurrentUser() user: { userId: number }, @Param('childId', ParseIntPipe) childId: number) {
    return this.reportService.summary(user.userId, childId);
  }
}
