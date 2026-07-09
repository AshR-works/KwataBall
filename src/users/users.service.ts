import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
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
        data: {
          email: createUserDto.email,
          passwordHash,
          name: createUserDto.name,
        },
      });
    } catch (error: any) {
        console.error('Erreur create user:', error.message, error.code);
        if (error.code === 'P2002') {
          throw new HttpException('Email déjà utilisé', HttpStatus.BAD_REQUEST);
        }
        throw new HttpException('Erreur serveur', HttpStatus.INTERNAL_SERVER_ERROR);
      }
  }
  // Récupérer tous les utilisateurs
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
  // Récupérer un utilisateur par son ID
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
  // Mettre à jour un utilisateur
  /*async update(id: string, updateUserDto: any) {
  const data: any = { ...updateUserDto };

  if (updateUserDto.password) {
    data.passwordHash = await bcrypt.hash(updateUserDto.password, 10);
    delete data.password;
  }

  return this.prisma.user.update({
    where: { id },
    data,
  });
}*/
    async update(id: string, updateUserDto: any) {
    try {
      const data: any = { ...updateUserDto };

      if (updateUserDto.password) {
        data.passwordHash = await bcrypt.hash(updateUserDto.password, 10);
        delete data.password;
      }

      return await this.prisma.user.update({
        where: { id },
        data,
      });
  } catch (error: any) {
    if (error.code === 'P2025') {
      throw new HttpException(`Utilisateur ${id} introuvable`, HttpStatus.NOT_FOUND);
    }
    throw new HttpException('Erreur serveur', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

  // Supprimer un utilisateur
  async remove(id: string) {
  const matchingUser = await this.prisma.user.findUnique({ where: { id } });
    if (!matchingUser) {
      throw new HttpException(`Utilisateur introuvable`, HttpStatus.NOT_FOUND);
    }
    return this.prisma.user.delete({ where: { id } });
}


}