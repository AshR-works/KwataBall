import { Body, Query, Controller, Post, Delete, Get, Param, Put, UseGuards } from '@nestjs/common';
import { MatchesService } from './matches.service';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../../generated/prisma/enums';
import { Public } from '../auth/public.decorator';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';

@Controller('matches')
@UseGuards(JwtAuthGuard, RolesGuard)
export class MatchesController {
  constructor(private readonly matchesService: MatchesService) {}

  @Get()
  @Public()
  async findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.matchesService.findAll(paginationQuery);
  }

  @Get('team/:teamId')
  @Public()
  async findByTeam(@Param('teamId') teamId: string, @Query() paginationQuery: PaginationQueryDto) {
    return this.matchesService.findByTeam(teamId, paginationQuery);
  }

  @Get(':id')
  @Public()
  async findOne(@Param('id') id: string) {
    return this.matchesService.findOne(id);
  }

  @Post()
  @Roles(Role.ADMIN, Role.EDITOR)
  async create(@Body() createMatchDto: CreateMatchDto) {
    return this.matchesService.create(createMatchDto);
  }

  @Put(':id')
  @Roles(Role.ADMIN, Role.EDITOR)
  async update(@Param('id') id: string, @Body() updateMatchDto: UpdateMatchDto) {
    return this.matchesService.update(id, updateMatchDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  async remove(@Param('id') id: string) {
    return this.matchesService.remove(id);
  }
}