import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { TeamsModule } from './teams/teams.module';

@Module({
  imports: [PrismaModule, UsersModule, TeamsModule],
})
export class AppModule {}