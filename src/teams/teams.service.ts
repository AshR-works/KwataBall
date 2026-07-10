import { Injectable, HttpException, HttpStatus} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import  * as bcrypt  from 'bcrypt';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
@Injectable()
export class TeamsService {
    constructor(private prisma: PrismaService) {}
//Methode pour créer une équipe
async create(createTeamDto: CreateTeamDto){
    try {
        const { name, shortName, city, foundedYear, logoUrl } = createTeamDto;
        return this.prisma.team.create({
            data: {
                name,
                shortName,
                city,
                foundedYear,
                logoUrl,
            },
        });
    } catch (error: any) {
        console.error('Erreur create team:', error.message, error.code);
        if (error.code === 'P2002') {
                throw new HttpException('Equipe déjà créée', HttpStatus.BAD_REQUEST);
                }
                throw new HttpException('Erreur serveur', HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
//Methode pour récupérer toutes les équipes
async findAll() {
    return this.prisma.team.findMany({
        select: {
            id: true,
            name: true,
            shortName: true,
            city: true,
            foundedYear: true,
            logoUrl: true,
        }
    });
}
//Methode pour récupérer une équipe par son ID
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
        }
    });
    if (!team) {
        throw new HttpException('Equipe introuvable', HttpStatus.NOT_FOUND);
    }
        return team;
    }
//Methode pour mettre à jour une équipe
    async update(id: string, updateTeamDto: UpdateTeamDto) {
        try {
            const data: any = { ...updateTeamDto };
            return this.prisma.team.update({
                where: { id },
                data,
            });
        } catch (error: any) {
            if (error.code === 'P2025') {
                throw new HttpException(`Equipe ${id} introuvable`, HttpStatus.NOT_FOUND);
            }
            if (error.code === 'P2002') {
                throw new HttpException('shortName déjà utilisé', HttpStatus.BAD_REQUEST);
            }   
            console.error('Erreur update team:', error.message, error.code);
            throw new HttpException('Erreur serveur', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
//Methode pour supprimer une équipe
    async remove(id: string) {
        const matchingTeam = await this.prisma.team.findUnique({ where: { id } });
        if (!matchingTeam) {
            throw new HttpException(`Equipe introuvable`, HttpStatus.NOT_FOUND);
        }
            await this.prisma.team.delete({ where: { id } });
        return { message: `Equipe ${id} supprimée avec succès` };
    }



}
