import { Body, Controller, Get, Post } from '@nestjs/common';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  list() {
    return { code: 0, message: 'ok', data: this.notificationsService.list(), requestId: 'mock-req' };
  }

  @Post('read')
  read(@Body() body: { ids: string[] }) {
    return { code: 0, message: 'ok', data: { readIds: body.ids }, requestId: 'mock-req' };
  }
}
