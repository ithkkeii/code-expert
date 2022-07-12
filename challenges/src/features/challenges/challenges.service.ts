import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ChallengesService {
  constructor(private prismaService: PrismaService) {}

  async findAll() {
    const challenges = await this.prismaService.challenge.findMany();
    return challenges;
  }
}
