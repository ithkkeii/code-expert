import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class AppService {
  constructor(private prismaService: PrismaService) {}

  async getHello(): Promise<string> {
    await this.prismaService.challenge.findMany();

    return 'Hello World!';
  }
}
