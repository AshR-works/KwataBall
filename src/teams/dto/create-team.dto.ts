import { IsString, IsOptional, IsInt, MinLength, MaxLength, Min, Max } from 'class-validator';

export class CreateTeamDto {
  @IsString()
  @MinLength(2)
  @MaxLength(150)
  name!: string;

  @IsString()
  @MinLength(2)
  @MaxLength(10)
  shortName: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsInt()
  @Min(1900)
  @Max(new Date().getFullYear())
  foundedYear?: number;

  @IsOptional()
  @IsString()
  logoUrl?: string;

  @IsOptional()
  @IsString()
  externalId?: string;
}