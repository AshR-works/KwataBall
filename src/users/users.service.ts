import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
// Service dédié à la gestion des utilisateurs

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  //Methode pour enregistrer un nouvel utilisateur
  async register(createUserDto: CreateUserDto) {
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


    
    }






