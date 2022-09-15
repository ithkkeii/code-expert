import { Module } from '@nestjs/common';
import { KafkaService } from './kafka.service';
import { KafkaController } from './kafka.controller';
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
            brokers: ['localhost:9092', 'localhost:31461', 'localhost:30584'],
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
  providers: [KafkaService],
  controllers: [KafkaController],
  exports: [KafkaService],
})
export class KafkaModule {}
