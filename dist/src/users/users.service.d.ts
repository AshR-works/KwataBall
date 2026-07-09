import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    register(createUserDto: CreateUserDto): Promise<{
        email: string;
        name: string;
        passwordHash: string;
        createdAt: Date;
        id: number;
    }>;
    findAll(): Promise<{
        email: string;
        name: string;
        passwordHash: string;
        createdAt: Date;
        id: number;
    }[]>;
}
