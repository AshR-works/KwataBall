import { IsString, IsEnum, IsInt, IsOptional, IsBoolean, IsDateString, IsUrl, MinLength, MaxLength, Min, Max } from 'class-validator';
import { Position } from '../../../generated/prisma/enums';

export class CreatePlayerDto {
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  firstName!: string;

  @IsString()
  @MinLength(2)
  @MaxLength(100)
  lastName!: string;

  @IsEnum(Position)
  position!: Position;

  @IsInt()
  @Min(0)
  @Max(99)
  jerseyNumber!: number;

  @IsString()
  @MaxLength(100)
  nationality!: string;

  @IsDateString()
  dateOfBirth!: string;

  @IsOptional()
  @IsInt()
  @Min(140)
  @Max(250)
  height?: number;

  @IsOptional()
  @IsInt()
  @Min(50)
  @Max(200)
  weight?: number;

  @IsOptional()
  @IsUrl()
  photoUrl?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsString()
  teamId!: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  externalId?: string;
}