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
exports.TeamsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let TeamsService = class TeamsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createTeamDto) {
        try {
            const existing = await this.prisma.team.findFirst({
                where: {
                    name: createTeamDto.name,
                },
            });
            if (existing) {
                throw new common_1.HttpException('Une équipe avec ce nom existe déjà', common_1.HttpStatus.CONFLICT);
            }
            return await this.prisma.team.create({
                data: { ...createTeamDto },
            });
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            if (error.code === 'P2002') {
                throw new common_1.HttpException('Conflit de données uniques', common_1.HttpStatus.CONFLICT);
            }
            throw new common_1.HttpException('Erreur serveur', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
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
    async findOne(id) {
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
            throw new common_1.HttpException(`Equipe ${id} introuvable`, common_1.HttpStatus.NOT_FOUND);
        }
        return team;
    }
    async update(id, updateTeamDto) {
        try {
            return await this.prisma.team.update({
                where: { id },
                data: { ...updateTeamDto },
            });
        }
        catch (error) {
            if (error.code === 'P2025') {
                throw new common_1.HttpException(`Equipe ${id} introuvable`, common_1.HttpStatus.NOT_FOUND);
            }
            if (error.code === 'P2002') {
                throw new common_1.HttpException('shortName déjà utilisé', common_1.HttpStatus.BAD_REQUEST);
            }
            throw new common_1.HttpException('Erreur serveur', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async remove(id) {
        const team = await this.prisma.team.findUnique({ where: { id } });
        if (!team) {
            throw new common_1.HttpException(`Equipe ${id} introuvable`, common_1.HttpStatus.NOT_FOUND);
        }
        await this.prisma.team.delete({ where: { id } });
        return { message: `Equipe ${team.name} supprimée avec succès` };
    }
};
exports.TeamsService = TeamsService;
exports.TeamsService = TeamsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TeamsService);
//# sourceMappingURL=teams.service.js.map