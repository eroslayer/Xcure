import { Controller, Get, Query } from '@nestjs/common';
import { MapService } from './map.service';

@Controller('map')
export class MapController {
  constructor(private readonly mapService: MapService) {}

  @Get('risk')
  risk(@Query('childId') _childId: string) {
    return { code: 0, message: 'ok', data: this.mapService.risk(), requestId: 'mock-req' };
  }

  @Get('risk/history')
  history() {
    return { code: 0, message: 'ok', data: [82, 80, 76, 70, 65, 62, 60], requestId: 'mock-req' };
  }
}
