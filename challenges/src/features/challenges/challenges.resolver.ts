import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Challenge } from 'src/features/challenges/models/challenge.model';
import { SubmitSolutionArgs } from 'src/features/dto/submit-solution.args';
import { ChallengesService } from './challenges.service';

@Resolver(() => Challenge)
export class ChallengesResolver {
  constructor(private readonly challengesService: ChallengesService) {}

  @Query(() => [Challenge])
  async challenges() {
    return this.challengesService.getChallenges();
  }

  @Query(() => Challenge)
  async challenge(@Args('slug') slug: string) {
    return this.challengesService.getChallenge(slug);
  }

  @Mutation(() => Boolean)
  async submitSolution(@Args() submitSolutionArgs: SubmitSolutionArgs) {
    return this.challengesService.submitSolution(submitSolutionArgs);
  }
}
