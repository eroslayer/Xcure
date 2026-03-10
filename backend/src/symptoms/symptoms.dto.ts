import { IsArray, IsInt, IsString, Max, Min } from 'class-validator';

export class CreateSymptomDto {
  @IsInt()
  childId!: number;

  @IsArray()
  tags!: string[];

  @IsInt()
  @Min(1)
  @Max(5)
  severity!: number;

  @IsString()
  note!: string;
}
