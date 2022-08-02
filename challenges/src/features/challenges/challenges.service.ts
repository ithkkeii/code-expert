import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ChallengesService {
  constructor(private prismaService: PrismaService) {}

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
}
