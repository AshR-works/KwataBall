import { Position } from '../../../generated/prisma/enums';
export declare class CreatePlayerDto {
    firstName: string;
    lastName: string;
    position: Position;
    jerseyNumber: number;
    nationality: string;
    dateOfBirth: string;
    height?: number;
    weight?: number;
    photoUrl?: string;
    isActive?: boolean;
    teamId: string;
    externalId?: string;
}
