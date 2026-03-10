import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationsService {
  list() {
    return [{ id: 'msg-001', title: '今晚记得睡前训练', isRead: false }];
  }
}
