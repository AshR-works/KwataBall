import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
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
}
