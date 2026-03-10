import { Injectable } from '@nestjs/common';

@Injectable()
export class SymptomsService {
  trend() {
    return { nasalCongestion: [7, 6, 5, 5, 4, 3, 3], snore: [6, 6, 5, 5, 4, 3, 2] };
  }
}
