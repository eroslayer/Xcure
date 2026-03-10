import { Body, Controller, Get, Post } from '@nestjs/common';
import { SymptomsService } from './symptoms.service';

@Controller('symptoms')
export class SymptomsController {
  constructor(private readonly symptomsService: SymptomsService) {}

  @Post()
  create(@Body() body: Record<string, unknown>) {
    return { code: 0, message: 'ok', data: { id: 'sr-001', ...body }, requestId: 'mock-req' };
  }

  @Get('trend')
  trend() {
    return { code: 0, message: 'ok', data: this.symptomsService.trend(), requestId: 'mock-req' };
  }
}
