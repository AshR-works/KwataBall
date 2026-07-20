import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';

@Injectable()
export class TeamsService {
    constructor(private prisma: PrismaService) {}

    async create(createTeamDto: CreateTeamDto) {
        try {
            const { name, shortName, city, foundedYear, logoUrl } = createTeamDto;
            return await this.prisma.team.create({
                data: { name, shortName, city, foundedYear, logoUrl },
            });
        } catch (error: any) {
            if (error.code === 'P2002') {
                throw new HttpException('Equipe déjà existante', HttpStatus.BAD_REQUEST);
            }
            throw new HttpException('Erreur serveur', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async findAll() {
        return this.prisma.team.findMany({
            select: {
                id: true,
                name: true,
                shortName: true,
                city: true,
                foundedYear: true,
                logoUrl: true,
            },
        });
    }

    async findOne(id: string) {
        const team = await this.prisma.team.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                shortName: true,
                city: true,
                foundedYear: true,
                logoUrl: true,
            },
        });
        if (!team) {
            throw new HttpException(`Equipe ${id} introuvable`, HttpStatus.NOT_FOUND);
        }
        return team;
    }

    async update(id: string, updateTeamDto: UpdateTeamDto) {
        try {
            return await this.prisma.team.update({
                where: { id },
                data: { ...updateTeamDto },
            });
        } catch (error: any) {
            if (error.code === 'P2025') {
                throw new HttpException(`Equipe ${id} introuvable`, HttpStatus.NOT_FOUND);
            }
            if (error.code === 'P2002') {
                throw new HttpException('shortName déjà utilisé', HttpStatus.BAD_REQUEST);
            }
            throw new HttpException('Erreur serveur', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async remove(id: string) {
        const team = await this.prisma.team.findUnique({ where: { id } });
        if (!team) {
            throw new HttpException(`Equipe ${id} introuvable`, HttpStatus.NOT_FOUND);
        }
        await this.prisma.team.delete({ where: { id } });
        return { message: `Equipe ${team.name} supprimée avec succès` };
    }
}