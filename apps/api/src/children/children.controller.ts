import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ChildrenService } from './children.service';

@Controller('children')
export class ChildrenController {
  constructor(private readonly childrenService: ChildrenService) {}

  @Get()
  list() {
    return { code: 0, message: 'ok', data: this.childrenService.list(), requestId: 'mock-req' };
  }

  @Post()
  create(@Body() body: Record<string, unknown>) {
    return { code: 0, message: 'ok', data: { id: 'child-new', ...body }, requestId: 'mock-req' };
  }

  @Get(':id')
  detail(@Param('id') id: string) {
    return { code: 0, message: 'ok', data: { id, name: '小明' }, requestId: 'mock-req' };
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: Record<string, unknown>) {
    return { code: 0, message: 'ok', data: { id, ...body }, requestId: 'mock-req' };
  }
}
