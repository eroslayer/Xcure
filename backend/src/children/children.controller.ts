import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import { ChildrenService } from './children.service';
import { CreateChildDto } from './children.dto';

@UseGuards(JwtAuthGuard)
@Controller('children')
export class ChildrenController {
  constructor(private readonly childrenService: ChildrenService) {}

  @Post()
  create(@CurrentUser() user: { userId: number }, @Body() dto: CreateChildDto) {
    return this.childrenService.create(user.userId, dto);
  }

  @Get()
  list(@CurrentUser() user: { userId: number }) {
    return this.childrenService.list(user.userId);
  }
}
