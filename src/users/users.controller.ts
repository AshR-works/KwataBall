import { Body, Controller, Post, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
//auth est mentionné pour le moment en attendant,on mettra en place un module auth pour gérer l'authentification et la sécurité des routes
@Controller('auth')
// logique de gestion des utilisateurs
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Endpoint pour créer un nouvel utilisateur
  @Post('register')
  async create(
    @Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
  // Récupérer tous les utilisateurs
    @Get('users')
  findAll() {
    return this.usersService.findAll();
  }
  // Récupérer un utilisateur par son ID
  @Get('users/:id')
  async findOne(@Body('id') id: string) {
    return this.usersService.findOne(id);
  }
  // Mettre à jour un utilisateur
  @Post('users/:id')
  async update(@Body('id') id: string, @Body() updateUserDto: any) {
    return this.usersService.update(id, updateUserDto);
  }
  // Supprimer un utilisateur
  @Post('users/:id/delete')
  async remove(@Body('id') id: string) {
    return this.usersService.remove(id);
  }
}
