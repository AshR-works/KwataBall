import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';

@Injectable()
export class MatchesService {
  constructor(private prisma: PrismaService) {}

  async create(createMatchDto: CreateMatchDto) {
    try {
      return await this.prisma.match.create({
        data: {
          ...createMatchDto,
          scheduledAt: new Date(createMatchDto.scheduledAt),
        },
        include: { homeTeam: true, awayTeam: true },
      });
    } catch (error: any) {
      console.error('Erreur create match:', error.message, error.code);
      if (error.code === 'P2003') {
        throw new HttpException('Équipe domicile ou extérieure introuvable', HttpStatus.BAD_REQUEST);
      }
      throw new HttpException('Erreur serveur', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(paginationQuery: PaginationQueryDto) {
    const { page = 1, limit = 20 } = paginationQuery;
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.match.findMany({
        skip,
        take: limit,
        orderBy: { scheduledAt: 'asc' },
        include: { homeTeam: true, awayTeam: true },
      }),
      this.prisma.match.count(),
    ]);

    return {
      data,
      meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }

  async findOne(id: string) {
    const match = await this.prisma.match.findUnique({
      where: { id },
      include: { homeTeam: true, awayTeam: true },
    });
    if (!match) {
      throw new HttpException('Match introuvable', HttpStatus.NOT_FOUND);
    }
    return match;
  }

  async findByTeam(teamId: string, paginationQuery: PaginationQueryDto) {
    const { page = 1, limit = 20 } = paginationQuery;
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.match.findMany({
        where: {
          OR: [{ homeTeamId: teamId }, { awayTeamId: teamId }],
        },
        skip,
        take: limit,
        orderBy: { scheduledAt: 'asc' },
        include: { homeTeam: true, awayTeam: true },
      }),
      this.prisma.match.count({
        where: {
          OR: [{ homeTeamId: teamId }, { awayTeamId: teamId }],
        },
      }),
    ]);

    return {
      data,
      meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }

  async update(id: string, updateMatchDto: UpdateMatchDto) {
    try {
      const data: any = { ...updateMatchDto };
      if (updateMatchDto.scheduledAt) {
        data.scheduledAt = new Date(updateMatchDto.scheduledAt);
      }
      return await this.prisma.match.update({
        where: { id },
        data,
        include: { homeTeam: true, awayTeam: true },
      });
    } catch (error: any) {
      if (error.code === 'P2025') {
        throw new HttpException(`Match ${id} introuvable`, HttpStatus.NOT_FOUND);
      }
      console.error('Erreur update match:', error.message, error.code);
      throw new HttpException('Erreur serveur', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: string) {
    const match = await this.prisma.match.findUnique({ where: { id } });
    if (!match) {
      throw new HttpException('Match introuvable', HttpStatus.NOT_FOUND);
    }
    await this.prisma.match.delete({ where: { id } });
    return { message: `Match ${id} supprimé avec succès` };
  }
}