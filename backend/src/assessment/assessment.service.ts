import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { InitAssessmentDto } from './assessment.dto';

@Injectable()
export class AssessmentService {
  constructor(private readonly prisma: PrismaService) {}

  async init(userId: number, dto: InitAssessmentDto) {
    const assessment = await this.prisma.assessment.create({
      data: {
        userId,
        childId: dto.childId,
        city: dto.city,
        sensitivities: dto.sensitivities,
        note: dto.note,
      },
    });

    return { message: '初始评估已提交', assessment };
  }
}
