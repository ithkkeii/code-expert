// TODO: carefully config kafka connection
import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'random-string',
  brokers: ['localhost:31461']
});

export const createProducer = async () => {
  const producer = kafka.producer();
  console.log('Connecting to kafka as producer...');
  await producer.connect();
  console.log('Connected to kafka!');
};

export const createConsumer = async () => {
  const consumer = kafka.consumer({ groupId: 'test-group' });
  console.log('Connecting to kafka as consumer...');
  await consumer.connect();
  console.log('Connected to kafka!');
  console.log('Subscribing into my-topic...');
  await consumer.subscribe({ topic: 'my-topic', fromBeginning: true });
  console.log('Subscribed into my-topic!');
};

export const connectToKafka = async () => {
  const kafka = new Kafka({
    clientId: 'random-string',
    brokers: ['localhost:31461']
  });
};
