import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { join } from 'path';
import { EventsModule } from './events/events.module';
import { ChallengesModule } from './features/challenges/challenges.module';
import { KafkaModule } from './kafka/kafka.module';
import { PrismaModule } from './prisma.module';

@Module({
  imports: [
    PrismaModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.graphql'),
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      playground: false,
    }),
    ChallengesModule,
    EventsModule,
    KafkaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
