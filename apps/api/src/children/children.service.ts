import { Injectable } from '@nestjs/common';

@Injectable()
export class ChildrenService {
  list() {
    return [{ id: 'child-001', name: '小明', cityCode: '310100', age: 8 }];
  }
}
