import { Module } from '@nestjs/common';
import { ChallengesService } from './challenges.service';
import { ChallengesResolver } from './challenges.resolver';

@Module({
  providers: [ChallengesResolver, ChallengesService],
})
export class ChallengesModule {}
