export interface User {
    id: string;
    name: string;
    email: string;
    role: 'ADMIN' | 'EDITOR' | 'USER';
}
export interface Team {
    id: string;
    name: string;
    shortName: string;
    city?: string;
    foundedYear?: number;
    logoUrl?: string;
}
export interface Player {
    id: string;
    firstName: string;
    lastName: string;
    position: string;
    jerseyNumber: number;
    nationality: string;
    dateOfBirth: string;
    height?: number;
    weight?: number;
    photoUrl?: string;
    isActive: boolean;
    team: {
        id: string;
        name: string;
        shortName: string;
    };
}
export interface AuthResponse {
    access_token: string;
    user: User;
}
