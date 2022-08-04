import Docker from 'dockerode';
import { Kafka } from 'kafkajs';

export const docker = new Docker({ socketPath: '/var/run/docker.sock' });
const kafka = new Kafka({
  clientId: 'random-string',
  brokers: ['localhost:30584'],
  // brokers: ["localhost:31461"],
});

export const connectToDocker = async () => {
  try {
    await docker.ping();
    return docker;
  } catch (error) {
    throw new Error('Unable to connect docker');
  }
};

export const createProducer = async () => {
  const producer = kafka.producer();
  console.log('Connecting to kafka as producer...');
  await producer.connect();
  console.log('Connected to kafka!');

  return producer;
};

export const createConsumer = async () => {
  const topicName = 'javascript';
  const consumer = kafka.consumer({ groupId: 'test-group' });
  console.log('Connecting to kafka as consumer...');
  await consumer.connect();
  console.log('Connected to kafka!');
  console.log(`Subscribing into ${topicName}...`);
  await consumer.subscribe({ topic: topicName, fromBeginning: true });
  console.log(`Subscribed into ${topicName}!`);

  return consumer;
};
