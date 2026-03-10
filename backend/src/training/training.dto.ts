import { IsInt } from 'class-validator';

export class GeneratePlanDto {
  @IsInt()
  childId!: number;
}

export class CheckinDto {
  @IsInt()
  childId!: number;

  @IsInt()
  taskId!: number;

  @IsInt()
  completedMinutes!: number;
}
