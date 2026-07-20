import { Body, Controller, Post, Delete, Get, Param, Put, UseGuards } from '@nestjs/common';
import { PlayersService } from './players.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../../generated/prisma/enums';

@Controller('players')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PlayersController {
    constructor(private readonly playersService: PlayersService) {}

    @Get()
    @Roles(Role.ADMIN, Role.EDITOR, Role.USER)
    async findAll() {
        return this.playersService.findAll();
    }

    @Get(':id')
    @Roles(Role.ADMIN, Role.EDITOR, Role.USER)
    async findOne(@Param('id') id: string) {
        return this.playersService.findOne(id);
    }

    @Get('team/:teamId')
    @Roles(Role.ADMIN, Role.EDITOR, Role.USER)
    async findByTeam(@Param('teamId') teamId: string) {
        return this.playersService.findByTeam(teamId);
    }

    @Post()
    @Roles(Role.ADMIN, Role.EDITOR)
    async create(@Body() createPlayerDto: CreatePlayerDto) {
        return this.playersService.create(createPlayerDto);
    }

    @Put(':id')
    @Roles(Role.ADMIN, Role.EDITOR)
    async update(@Param('id') id: string, @Body() updatePlayerDto: UpdatePlayerDto) {
        return this.playersService.update(id, updatePlayerDto);
    }

    @Delete(':id')
    @Roles(Role.ADMIN)
    async remove(@Param('id') id: string) {
        return this.playersService.remove(id);
    }
}