import { ChildGender } from '@prisma/client';
import { IsDateString, IsEnum, IsInt, IsString, Max, Min } from 'class-validator';

export class CreateChildDto {
  @IsString()
  name!: string;

  @IsEnum(ChildGender)
  gender!: ChildGender;

  @IsDateString()
  birthday!: string;

  @IsInt()
  @Min(1)
  @Max(18)
  age!: number;
}
