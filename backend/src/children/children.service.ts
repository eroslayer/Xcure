import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { CreateChildDto } from './children.dto';

@Injectable()
export class ChildrenService {
  constructor(private readonly prisma: PrismaService) {}

  create(userId: number, dto: CreateChildDto) {
    return this.prisma.child.create({
      data: {
        userId,
        ...dto,
        birthday: new Date(dto.birthday),
      },
    });
  }

  list(userId: number) {
    return this.prisma.child.findMany({ where: { userId }, orderBy: { id: 'desc' } });
  }
}
