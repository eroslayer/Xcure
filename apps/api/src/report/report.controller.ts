import { Controller, Get } from '@nestjs/common';
import { ReportService } from './report.service';

@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get('summary')
  summary() {
    return { code: 0, message: 'ok', data: this.reportService.summary(), requestId: 'mock-req' };
  }
}
