import { IsString, IsOptional, IsDateString, IsInt, IsEnum, Min } from 'class-validator';

export enum MatchStatusDto {
  A_VENIR = 'A_VENIR',
  TERMINE = 'TERMINE',
  REPORTE = 'REPORTE',
  ANNULE = 'ANNULE',
}

export class CreateMatchDto {
  @IsOptional()
  @IsString()
  competitionName?: string;

  @IsString()
  homeTeamId!: string;

  @IsString()
  awayTeamId!: string;

  @IsDateString()
  scheduledAt!: string;

  @IsOptional()
  @IsString()
  venue?: string;

  @IsOptional()
  @IsEnum(MatchStatusDto)
  status?: MatchStatusDto;

  @IsOptional()
  @IsInt()
  @Min(0)
  homeScore?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  awayScore?: number;
}