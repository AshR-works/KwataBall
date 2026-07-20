import { PlayersService } from './players.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
export declare class PlayersController {
    private readonly playersService;
    constructor(playersService: PlayersService);
    findAll(): Promise<{
        id: string;
        firstName: string;
        lastName: string;
        position: import("../../generated/prisma/enums").Position;
        jerseyNumber: number;
        nationality: string;
        dateOfBirth: Date;
        height: number | null;
        weight: number | null;
        photoUrl: string | null;
        isActive: boolean;
        team: {
            id: string;
            name: string;
            shortName: string;
        };
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        firstName: string;
        lastName: string;
        position: import("../../generated/prisma/enums").Position;
        jerseyNumber: number;
        nationality: string;
        dateOfBirth: Date;
        height: number | null;
        weight: number | null;
        photoUrl: string | null;
        isActive: boolean;
        team: {
            id: string;
            name: string;
            shortName: string;
        };
    }>;
    findByTeam(teamId: string): Promise<{
        id: string;
        firstName: string;
        lastName: string;
        position: import("../../generated/prisma/enums").Position;
        jerseyNumber: number;
        isActive: boolean;
    }[]>;
    create(createPlayerDto: CreatePlayerDto): Promise<{
        id: string;
        firstName: string;
        lastName: string;
        position: import("../../generated/prisma/enums").Position;
        jerseyNumber: number;
        nationality: string;
        dateOfBirth: Date;
        height: number | null;
        weight: number | null;
        photoUrl: string | null;
        isActive: boolean;
        externalId: string | null;
        createdAt: Date;
        updatedAt: Date;
        teamId: string;
    }>;
    update(id: string, updatePlayerDto: UpdatePlayerDto): Promise<{
        id: string;
        firstName: string;
        lastName: string;
        position: import("../../generated/prisma/enums").Position;
        jerseyNumber: number;
        nationality: string;
        dateOfBirth: Date;
        height: number | null;
        weight: number | null;
        photoUrl: string | null;
        isActive: boolean;
        externalId: string | null;
        createdAt: Date;
        updatedAt: Date;
        teamId: string;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
