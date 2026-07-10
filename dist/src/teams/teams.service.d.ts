import { PrismaService } from '../../prisma/prisma.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
export declare class TeamsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createTeamDto: CreateTeamDto): Promise<{
        id: string;
        name: string;
        shortName: string;
        city: string | null;
        foundedYear: number | null;
        logoUrl: string | null;
        externalId: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(): Promise<{
        id: string;
        name: string;
        shortName: string;
        city: string | null;
        foundedYear: number | null;
        logoUrl: string | null;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        name: string;
        shortName: string;
        city: string | null;
        foundedYear: number | null;
        logoUrl: string | null;
    }>;
    update(id: string, updateTeamDto: UpdateTeamDto): Promise<{
        id: string;
        name: string;
        shortName: string;
        city: string | null;
        foundedYear: number | null;
        logoUrl: string | null;
        externalId: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
