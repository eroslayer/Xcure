import { Injectable } from '@nestjs/common';

@Injectable()
export class MapService {
  risk() {
    return {
      riskScore: 82,
      riskLevel: 'high',
      factors: { aqi: 128, pollen: 75, temperature: 29, humidity: 78, tagScore: 68 },
    };
  }
}
