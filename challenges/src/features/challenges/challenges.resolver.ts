import { Query, Resolver } from '@nestjs/graphql';
import { Challenge } from 'src/features/challenges/models/challenge.model';
import { ChallengesService } from './challenges.service';

@Resolver(() => Challenge)
export class ChallengesResolver {
  constructor(private readonly challengesService: ChallengesService) {}

  @Query(() => [Challenge])
  async challenges() {
    return this.challengesService.findAll();
  }
}
