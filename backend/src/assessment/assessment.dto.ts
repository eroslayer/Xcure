import { IsArray, IsInt, IsOptional, IsString } from 'class-validator';

export class InitAssessmentDto {
  @IsInt()
  childId!: number;

  @IsArray()
  sensitivities!: string[];

  @IsString()
  city!: string;

  @IsOptional()
  @IsString()
  note?: string;
}
