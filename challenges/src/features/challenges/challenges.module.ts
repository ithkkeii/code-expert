import { Module } from '@nestjs/common';
import { ChallengesService } from './challenges.service';
import { ChallengesResolver } from './challenges.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [ChallengesResolver, ChallengesService, PrismaService],
})
export class ChallengesModule {}
