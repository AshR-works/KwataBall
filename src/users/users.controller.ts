import { Body, Controller, Post, Delete, Get, Param, Put } from '@nestjs/common';
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
  async findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }
  // Mettre à jour un utilisateur
  @Put('users/:id')
  async update(@Param('id') id: string, @Body() updateUserDto: any) {
    return this.usersService.update(id, updateUserDto);
  }
  // Supprimer un utilisateur
  @Delete('users/:id/delete')
  async remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
