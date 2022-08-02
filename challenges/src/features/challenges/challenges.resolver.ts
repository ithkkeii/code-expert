import { Args, Query, Resolver } from '@nestjs/graphql';
import { Challenge } from 'src/features/challenges/models/challenge.model';
import { ChallengesService } from './challenges.service';

@Resolver(() => Challenge)
export class ChallengesResolver {
  constructor(private readonly challengesService: ChallengesService) {}

  @Query(() => [Challenge])
  async getChallenges() {
    return this.challengesService.getChallenges();
  }

  @Query(() => Challenge)
  async getChallenge(@Args('slug') slug: string) {
    return this.challengesService.getChallenge(slug);
  }
}
