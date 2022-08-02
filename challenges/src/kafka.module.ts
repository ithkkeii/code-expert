import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KafkaConfig, ProducerConfig } from 'kafkajs';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'CHALLENGE_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'challenge-srv',
            brokers: ['localhost:30584'],
          } as KafkaConfig,
          producer: {
            allowAutoTopicCreation: false,
            transactionTimeout: 3000,
          } as ProducerConfig,
          producerOnlyMode: true,
        },
      },
    ]),
  ],
  exports: [
    ClientsModule.register([
      {
        name: 'CHALLENGE_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'challenge-srv',
            brokers: ['localhost:30584'],
          } as KafkaConfig,
          producer: {
            allowAutoTopicCreation: false,
            transactionTimeout: 3000,
          } as ProducerConfig,
          producerOnlyMode: true,
        },
      },
    ]),
  ],
})
export class KafkaModule {}
