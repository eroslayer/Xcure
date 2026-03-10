import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import { MapService } from './map.service';

@UseGuards(JwtAuthGuard)
@Controller('map')
export class MapController {
  constructor(private readonly mapService: MapService) {}

  @Get('risk/current')
  current(@CurrentUser() user: { userId: number }) {
    return this.mapService.currentRisk(user.userId);
  }
}
