import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import { CreateSymptomDto } from './symptoms.dto';
import { SymptomsService } from './symptoms.service';

@UseGuards(JwtAuthGuard)
@Controller('symptoms')
export class SymptomsController {
  constructor(private readonly symptomsService: SymptomsService) {}

  @Post()
  create(@CurrentUser() user: { userId: number }, @Body() dto: CreateSymptomDto) {
    return this.symptomsService.create(user.userId, dto);
  }
}
