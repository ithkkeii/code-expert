import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { KafkaConfig, ProducerConfig } from 'kafkajs';
import { join } from 'path';
import { ChallengesModule } from './features/challenges/challenges.module';
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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
