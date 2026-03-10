import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);

  sendTrainingReminder(phone: string, message: string) {
    this.logger.log(`[mock notification] to=${phone} message=${message}`);
    return { success: true };
  }
}
