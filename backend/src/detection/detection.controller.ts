import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import { NasalHealthDto } from './detection.dto';
import { DetectionService } from './detection.service';

@UseGuards(JwtAuthGuard)
@Controller('detection')
export class DetectionController {
  constructor(private readonly detectionService: DetectionService) {}

  @Post('nasal-health')
  submit(@CurrentUser() user: { userId: number }, @Body() dto: NasalHealthDto) {
    return this.detectionService.nasalHealth(user.userId, dto);
  }
}
