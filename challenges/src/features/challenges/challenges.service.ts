import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InterpretSolutionRes } from 'src/features/dto/interpret-solution-res';
import { InterpretSolutionArgs } from 'src/features/dto/interpret-solution.args';
import { SubmitSolutionArgs } from 'src/features/dto/submit-solution.args';
import { SubmitSolutionMessage } from 'src/kafka/interface';
import { KafkaService } from 'src/kafka/kafka.service';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ChallengesService {
  constructor(
    private prismaService: PrismaService,
    private kafkaService: KafkaService,
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

  async interpretSolution(
    interpretSolutionArgs: InterpretSolutionArgs,
  ): Promise<InterpretSolutionRes> {
    const { challengeId, dataInput, lang, typedCode } = interpretSolutionArgs;

    const challenge = await this.prismaService.challenge.findUnique({
      where: { id: challengeId },
    });
    if (!challenge) throw new NotFoundException();

    // TODO: Must be unique across data table
    const interpretId = `${challengeId}-${Date.now()}`;

    await this.kafkaService.interpretSolution({
      challengeId,
      dataInput,
      typedCode,
      interpretId: `${challengeId}-${Date.now()}`,
      lang,
      rightSolution: challenge.rightSolution,
    });

    return { interpretId };
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

    const { id, testCases, testInputs } = challenge;
    if (testCases.length !== testInputs.length) {
      throw new BadRequestException();
    }

    const messages: SubmitSolutionMessage[] = testCases.map((tc, index) => ({
      guestId,
      challengeId: id,
      solution,
      testCase: { id: tc.id, content: tc.content },
      testInput: {
        id: testInputs[index].id,
        content: testInputs[index].content,
      },
    }));

    await Promise.all(
      [...messages].map((m) => this.kafkaService.submitSolution(m)),
    );

    return true;
  }
}
