import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { SubmitSolutionArgs } from 'src/features/dto/submit-solution.args';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ChallengesService {
  constructor(
    private prismaService: PrismaService,
    @Inject('CHALLENGE_SERVICE') private client: ClientKafka,
  ) {}

  async getChallenges() {
    const challenges = await this.prismaService.challenge.findMany({
      include: { testCases: true, testInputs: true },
    });
    return challenges;
  }

  async getChallenge(slug: string) {
    const challenge = await this.prismaService.challenge.findUnique({
      where: { slug },
      include: { testCases: true, testInputs: true },
    });
    if (!challenge) {
      throw new NotFoundException();
    }

    return challenge;
  }

  async submitSolution(submitSolutionArgs: SubmitSolutionArgs) {
    const { challengeId, guestId, solution } = submitSolutionArgs;

    const challenge = await this.prismaService.challenge.findUnique({
      where: { id: challengeId },
      include: { testCases: true, testInputs: true },
    });
    if (!challenge) {
      throw new NotFoundException();
    }

    const message = {
      id: guestId,
      challengeId,
      solution,
      testCases: challenge.testCases.map(({ id, content }) => ({
        id,
        content,
      })),
      testInputs: challenge.testInputs.map(({ id, content }) => ({
        id,
        content,
      })),
    };

    await firstValueFrom(
      this.client.emit('javascript', JSON.stringify(message)),
    );
    return true;
  }
}
