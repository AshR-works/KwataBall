import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    register(createUserDto: CreateUserDto): Promise<{
        email: string;
        passwordHash: string;
        name: string;
        createdAt: Date;
        id: number;
    }>;
    findAll(): Promise<{
        email: string;
        passwordHash: string;
        name: string;
        createdAt: Date;
        id: number;
    }[]>;
    findOne(id: number): Promise<{
        email: string;
        passwordHash: string;
        name: string;
        createdAt: Date;
        id: number;
    } | null>;
    update(id: number, updateUserDto: any): Promise<(<T extends import("../../generated/prisma/models").UserUpdateArgs>(args: import("../../generated/prisma/internal/prismaNamespace").SelectSubset<T, import("../../generated/prisma/models").UserUpdateArgs<import("@prisma/client/runtime/client").DefaultArgs>>) => import("../../generated/prisma/models").Prisma__UserClient<import("@prisma/client/runtime/client").GetFindResult<import("../../generated/prisma/models").$UserPayload<import("@prisma/client/runtime/client").DefaultArgs>, T, {
        omit: import("../../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>)>;
}
