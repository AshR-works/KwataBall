import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';

@Injectable()
export class PlayersService {
    constructor(private prisma: PrismaService) {}

    async create(createPlayerDto: CreatePlayerDto) {
        try {
            return await this.prisma.player.create({
                data: { ...createPlayerDto },
            });
        } catch (error: any) {
            if (error.code === 'P2002') {
                throw new HttpException('Joueur déjà existant', HttpStatus.BAD_REQUEST);
            }
            if (error.code === 'P2025') {
                throw new HttpException('Equipe introuvable', HttpStatus.NOT_FOUND);
            }
            throw new HttpException('Erreur serveur', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async findAll() {
        return this.prisma.player.findMany({
            select: {
                id: true,
                firstName: true,
                lastName: true,
                position: true,
                jerseyNumber: true,
                nationality: true,
                dateOfBirth: true,
                height: true,
                weight: true,
                photoUrl: true,
                isActive: true,
                team: {
                    select: {
                        id: true,
                        name: true,
                        shortName: true,
                    },
                },
            },
        });
    }

    async findOne(id: string) {
        const player = await this.prisma.player.findUnique({
            where: { id },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                position: true,
                jerseyNumber: true,
                nationality: true,
                dateOfBirth: true,
                height: true,
                weight: true,
                photoUrl: true,
                isActive: true,
                team: {
                    select: {
                        id: true,
                        name: true,
                        shortName: true,
                    },
                },
            },
        });
        if (!player) {
            throw new HttpException(`Joueur ${id} introuvable`, HttpStatus.NOT_FOUND);
        }
        return player;
    }

    async findByTeam(teamId: string) {
        const team = await this.prisma.team.findUnique({ where: { id: teamId } });
        if (!team) {
            throw new HttpException(`Equipe ${teamId} introuvable`, HttpStatus.NOT_FOUND);
        }
        return this.prisma.player.findMany({
            where: { teamId },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                position: true,
                jerseyNumber: true,
                isActive: true,
            },
        });
    }

    async update(id: string, updatePlayerDto: UpdatePlayerDto) {
        try {
            return await this.prisma.player.update({
                where: { id },
                data: { ...updatePlayerDto },
            });
        } catch (error: any) {
            if (error.code === 'P2025') {
                throw new HttpException(`Joueur ${id} introuvable`, HttpStatus.NOT_FOUND);
            }
            if (error.code === 'P2002') {
                throw new HttpException('Conflit de données', HttpStatus.BAD_REQUEST);
            }
            throw new HttpException('Erreur serveur', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async remove(id: string) {
        const player = await this.prisma.player.findUnique({ where: { id } });
        if (!player) {
            throw new HttpException(`Joueur ${id} introuvable`, HttpStatus.NOT_FOUND);
        }
        await this.prisma.player.delete({ where: { id } });
        return { message: `Joueur ${player.firstName} ${player.lastName} supprimé avec succès` };
    }
}