import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';

@Injectable()
export class PlayersService {
    constructor(private prisma: PrismaService) {}
async create(createPlayerDto: CreatePlayerDto) {
    try {
        const existing = await this.prisma.player.findFirst({
            where: {
                firstName: createPlayerDto.firstName,
                lastName: createPlayerDto.lastName,
                teamId: createPlayerDto.teamId,
            },
        });

        if (existing) {
            throw new HttpException(
                'Ce joueur existe déjà dans cette équipe',
                HttpStatus.CONFLICT,
            );
        }

        return await this.prisma.player.create({
            data: {
                ...createPlayerDto,
                dateOfBirth: new Date(createPlayerDto.dateOfBirth),
            },
        });

    } catch (error: any) {
        // ✅ Laisser passer les HttpException déjà gérées
        if (error instanceof HttpException) {
            throw error;
        }

        if (error.code === 'P2002') {
            throw new HttpException('Conflit de données uniques', HttpStatus.CONFLICT);
        }
        if (error.code === 'P2003') {
            throw new HttpException('Équipe introuvable', HttpStatus.BAD_REQUEST);
        }
        if (error.code === 'P2025') {
            throw new HttpException('Impossible de créer le joueur', HttpStatus.NOT_FOUND);
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
    // Vérification manuelle des doublons
    if (updatePlayerDto.firstName && updatePlayerDto.lastName && updatePlayerDto.teamId) {
      const existing = await this.prisma.player.findFirst({
        where: {
          firstName: updatePlayerDto.firstName,
          lastName: updatePlayerDto.lastName,
          teamId: updatePlayerDto.teamId,
          NOT: { id }, // exclure le joueur qu’on est en train de modifier
        },
      });

      if (existing) {
        throw new HttpException(
          'Un joueur avec ce nom existe déjà dans cette équipe',
          HttpStatus.CONFLICT,
        );
      }
    }

    // Mise à jour
    return await this.prisma.player.update({
      where: { id },
      data: {
        ...updatePlayerDto,
        dateOfBirth: updatePlayerDto.dateOfBirth
          ? new Date(updatePlayerDto.dateOfBirth)
          : undefined, // conversion explicite
      },
    });
  } catch (error: any) {
    console.error(error);

    if (error.code === 'P2002') {
      throw new HttpException('Conflit de données uniques', HttpStatus.CONFLICT);
    }
    if (error.code === 'P2025') {
      throw new HttpException(`Joueur ${id} introuvable`, HttpStatus.NOT_FOUND);
    }
    if (error.code === 'P2003') {
      throw new HttpException('Équipe introuvable ou relation invalide', HttpStatus.BAD_REQUEST);
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