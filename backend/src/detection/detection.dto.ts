import { IsArray, IsInt, IsObject } from 'class-validator';

export class NasalHealthDto {
  @IsInt()
  childId!: number;

  @IsObject()
  questionnaire!: Record<string, number>;

  @IsArray()
  symptoms!: string[];
}
