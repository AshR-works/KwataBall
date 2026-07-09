import { Body, Controller, Post, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('auth')
// logique de gestion des utilisateurs
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.register(createUserDto);
  }
    @Get('users')
  findAll() {
    return this.usersService.findAll();
  }
}
