import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
// Service dédié à la gestion des utilisateurs

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  //Methode pour enregistrer un nouvel utilisateur
  async create(createUserDto: CreateUserDto) {
    const { email, password, name } = createUserDto;
    const passwordHash = await bcrypt.hash(password, 10);
    return this.prisma.user.create({
      data: {
        email: createUserDto.email,
        passwordHash,
        name: createUserDto.name,
      },
    });
  }
  // Récupérer tous les utilisateurs
  async findAll() {
    return this.prisma.user.findMany();
  }
  // Récupérer un utilisateur
  async findOne(id: string) {
    return this.prisma.user.findUnique({
      where: { id }
    });

  }
  // Mettre à jour un utilisateur
  async update(id: string, updateUserDto: any){
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }
  // Supprimer un utilisateur
  async remove (id: string){
    const matchingUser = await this.prisma.user.findUnique(
      {
        where: { id }
      }
    );
    if (!matchingUser) {
      throw new Error(`User with id ${id} not found`);
    }
    this.prisma.user.delete({
      where: { id },
    });
  }


}