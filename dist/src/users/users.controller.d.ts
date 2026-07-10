import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<{
        id: string;
        email: string;
        passwordHash: string;
        name: string;
        createdAt: Date;
    }>;
    findAll(): Promise<{
        id: string;
        email: string;
        name: string;
        createdAt: Date;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        email: string;
        name: string;
        createdAt: Date;
    }>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
        id: string;
        email: string;
        name: string;
        createdAt: Date;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
