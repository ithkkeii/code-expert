import { Module } from '@nestjs/common';
import { ChallengesService } from './challenges.service';
import { ChallengesResolver } from './challenges.resolver';
import { KafkaModule } from 'src/kafka.module';

@Module({
  imports: [KafkaModule],
  providers: [ChallengesResolver, ChallengesService],
})
export class ChallengesModule {}
