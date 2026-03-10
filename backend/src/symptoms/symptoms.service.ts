import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { CreateSymptomDto } from './symptoms.dto';

@Injectable()
export class SymptomsService {
  constructor(private readonly prisma: PrismaService) {}

  create(userId: number, dto: CreateSymptomDto) {
    return this.prisma.symptom.create({
      data: {
        userId,
        childId: dto.childId,
        tags: dto.tags,
        severity: dto.severity,
        note: dto.note,
      },
    });
  }
}
