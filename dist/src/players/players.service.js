"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let PlayersService = class PlayersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createPlayerDto) {
        try {
            const existing = await this.prisma.player.findFirst({
                where: {
                    firstName: createPlayerDto.firstName,
                    lastName: createPlayerDto.lastName,
                    teamId: createPlayerDto.teamId,
                },
            });
            if (existing) {
                throw new common_1.HttpException('Ce joueur existe déjà dans cette équipe', common_1.HttpStatus.CONFLICT);
            }
            return await this.prisma.player.create({
                data: {
                    ...createPlayerDto,
                    dateOfBirth: new Date(createPlayerDto.dateOfBirth),
                },
            });
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            if (error.code === 'P2002') {
                throw new common_1.HttpException('Conflit de données uniques', common_1.HttpStatus.CONFLICT);
            }
            if (error.code === 'P2003') {
                throw new common_1.HttpException('Équipe introuvable', common_1.HttpStatus.BAD_REQUEST);
            }
            if (error.code === 'P2025') {
                throw new common_1.HttpException('Impossible de créer le joueur', common_1.HttpStatus.NOT_FOUND);
            }
            throw new common_1.HttpException('Erreur serveur', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
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
    async findOne(id) {
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
            throw new common_1.HttpException(`Joueur ${id} introuvable`, common_1.HttpStatus.NOT_FOUND);
        }
        return player;
    }
    async findByTeam(teamId) {
        const team = await this.prisma.team.findUnique({ where: { id: teamId } });
        if (!team) {
            throw new common_1.HttpException(`Equipe ${teamId} introuvable`, common_1.HttpStatus.NOT_FOUND);
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
    async update(id, updatePlayerDto) {
        try {
            if (updatePlayerDto.firstName && updatePlayerDto.lastName && updatePlayerDto.teamId) {
                const existing = await this.prisma.player.findFirst({
                    where: {
                        firstName: updatePlayerDto.firstName,
                        lastName: updatePlayerDto.lastName,
                        teamId: updatePlayerDto.teamId,
                        NOT: { id },
                    },
                });
                if (existing) {
                    throw new common_1.HttpException('Un joueur avec ce nom existe déjà dans cette équipe', common_1.HttpStatus.CONFLICT);
                }
            }
            return await this.prisma.player.update({
                where: { id },
                data: {
                    ...updatePlayerDto,
                    dateOfBirth: updatePlayerDto.dateOfBirth
                        ? new Date(updatePlayerDto.dateOfBirth)
                        : undefined,
                },
            });
        }
        catch (error) {
            console.error(error);
            if (error.code === 'P2002') {
                throw new common_1.HttpException('Conflit de données uniques', common_1.HttpStatus.CONFLICT);
            }
            if (error.code === 'P2025') {
                throw new common_1.HttpException(`Joueur ${id} introuvable`, common_1.HttpStatus.NOT_FOUND);
            }
            if (error.code === 'P2003') {
                throw new common_1.HttpException('Équipe introuvable ou relation invalide', common_1.HttpStatus.BAD_REQUEST);
            }
            throw new common_1.HttpException('Erreur serveur', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async remove(id) {
        const player = await this.prisma.player.findUnique({ where: { id } });
        if (!player) {
            throw new common_1.HttpException(`Joueur ${id} introuvable`, common_1.HttpStatus.NOT_FOUND);
        }
        await this.prisma.player.delete({ where: { id } });
        return { message: `Joueur ${player.firstName} ${player.lastName} supprimé avec succès` };
    }
};
exports.PlayersService = PlayersService;
exports.PlayersService = PlayersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PlayersService);
//# sourceMappingURL=players.service.js.map