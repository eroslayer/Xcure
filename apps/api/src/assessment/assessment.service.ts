import { Injectable } from '@nestjs/common';

@Injectable()
export class AssessmentService {
  latest(childId: string) {
    return { childId, riskLevel: 'medium', score: 63 };
  }
}
