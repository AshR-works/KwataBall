import { Body, Query, Controller, Post, Delete, Get, Param, Put, UseGuards } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../../generated/prisma/enums';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { Public } from '../auth/public.decorator';
@Controller('teams')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TeamsController {
    constructor(private readonly teamsService: TeamsService) {}

//endpoint pour récupérer toutes les équipes
    @Get()
    @Public()
    async findAll(@Query() paginationQuery: PaginationQueryDto) {
  return this.teamsService.findAll(paginationQuery);
}
//endpoint pour récupérer une équipe par son ID
    @Get(':id')
    @Public()
    async findOne(@Param('id') id: string) {
    return this.teamsService.findOne(id);
    }
//endpoint pour créer une équipe
    @Post()
    @Roles(Role.ADMIN, Role.EDITOR)
    async create(
        @Body() createTeamDto: CreateTeamDto) {
        return this.teamsService.create(createTeamDto);
  }
//endpoint pour mettre à jour une équipe
    @Put(':id')
    @Roles(Role.ADMIN, Role.EDITOR)
    async update(@Param('id') id: string, @Body() updateTeamDto: UpdateTeamDto) {
        return this.teamsService.update(id, updateTeamDto);
  }             
//endpoint pour supprimer une équipe
//Version temporaire, à modifier pour que seul l'admin puisse supprimer
//une équipe et à terme plutôt l'archivage d'une équipe plutôt que la suppression
    @Delete(':id')
    @Roles(Role.ADMIN, Role.EDITOR)
    async remove(@Param('id') id: string) {
        return this.teamsService.remove(id);
  }
}
