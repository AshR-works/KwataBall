import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
// Service dédié à la gestion des utilisateurs

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  //Methode pour enregistrer un nouvel utilisateur
async create(createUserDto: CreateUserDto) {
  try {
    const { email, password, name } = createUserDto;
    const passwordHash = await bcrypt.hash(password, 10);
    return this.prisma.user.create({
      data: { email, passwordHash, name },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,  //standard role is 'user' by default
        createdAt: true,
        // passwordHash absent
      }
    });
  } catch (error: any) {
    console.error('Erreur create user:', error.message, error.code);
    if (error.code === 'P2002') {
      throw new HttpException('Email déjà utilisé', HttpStatus.BAD_REQUEST);
    }
    throw new HttpException('Erreur serveur', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
  // Methode pour récupérer tous les utilisateurs
async findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        // passwordHash absent = non renvoyé
      }
    });
  }
  // Methode pour récupérer un utilisateur par son ID
  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
       select: {
      id: true,
      email: true,
      name: true,
      createdAt: true,
      }
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }
  // Methode pour mettre à jour un utilisateur
    async update(id: string, updateUserDto: UpdateUserDto) {
  try {
    const data: any = { ...updateUserDto };

    if (updateUserDto.password) {
      data.passwordHash = await bcrypt.hash(updateUserDto.password, 10);
      delete data.password;
    }

    return await this.prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
      }
    });
  } catch (error: any) {
    if (error.code === 'P2025') {
      throw new HttpException(`Utilisateur ${id} introuvable`, HttpStatus.NOT_FOUND);
    }
    if (error.code === 'P2002') {
      throw new HttpException('Email déjà utilisé', HttpStatus.BAD_REQUEST);
    }
    throw new HttpException('Erreur serveur', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
  // Methode pour supprimer un utilisateur
  async remove(id: string) {
  const matchingUser = await this.prisma.user.findUnique({ where: { id } });
    if (!matchingUser) {
      throw new HttpException(`Utilisateur introuvable`, HttpStatus.NOT_FOUND);
    }
      await this.prisma.user.delete({ where: { id } });
  return { message: `Utilisateur ${id} supprimé avec succès` };
}


}