import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { KafkaConfig, ProducerConfig } from 'kafkajs';
import { Transport, KafkaOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.connectMicroservice({
  //   transport: Transport.KAFKA,
  //   options: {
  //     client: {
  //       clientId: 'challenge-srv',
  //       brokers: ['localhost:30584'],
  //     } as KafkaConfig,
  //     producer: {
  //       allowAutoTopicCreation: false,
  //       transactionTimeout: 3000,
  //     } as ProducerConfig,
  //     producerOnlyMode: true,
  //   },
  // } as KafkaOptions);

  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
