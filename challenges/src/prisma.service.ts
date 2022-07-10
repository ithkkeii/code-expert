import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    const reconnect = async () => {
      let count = 0;
      while (count < 20) {
        console.log(`connecting to db... try ${count + 1} times.`);
        try {
          await this.$connect();
          console.log(`prisma is connected!`);
          return;
        } catch {
          // do nothing
          count++;
          await sleep(1000);
        }
      }
    };

    reconnect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
