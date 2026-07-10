import { Body, Controller, Post, Delete, Get, Param, Put } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';

@Controller('auth')
export class TeamsController {
    constructor(private readonly teamsService: TeamsService) {}

//endpoint pour créer une équipe
    @Post('register')
    async create(
        @Body() createTeamDto: CreateTeamDto) {
        return this.teamsService.create(createTeamDto);
  }
//endpoint pour récupérer toutes les équipes
    @Get('teams')
    async findAll() {
        return this.teamsService.findAll();
  }

//endpoint pour récupérer une équipe par son ID
    @Get('teams/:id')
    async findOne(@Param('id') id: string) {
        return this.teamsService.findOne(id);
  }

//endpoint pour mettre à jour une équipe
    @Put('teams/:id')
    async update(@Param('id') id: string, @Body() updateTeamDto: UpdateTeamDto) {
        return this.teamsService.update(id, updateTeamDto);
  }             

//endpoint pour supprimer une équipe
    @Delete('teams/:id/delete')
    async remove(@Param('id') id: string) {
        return this.teamsService.remove(id);
  }


}
