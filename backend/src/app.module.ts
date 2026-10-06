import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { TeamsModule } from './teams/teams.module';
import { AuthModule } from './auth/auth.module';
import { PlayersModule } from './players/players.module';
import { MatchesModule } from './matches/matches.module';
@Module({
  imports: [PrismaModule, UsersModule, TeamsModule, AuthModule, PlayersModule, MatchesModule],
})
export class AppModule {}