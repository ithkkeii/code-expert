import Docker from 'dockerode';
import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'random-string',
  // brokers: ['localhost:30584', 'localhost:31461'],
  brokers: ['localhost:9092'],
});

export const docker = new Docker({ socketPath: '/var/run/docker.sock' });
export const connectToDocker = async () => {
  console.info('Connect to docker...');
  await docker.ping();
  console.info('Docker connected!');
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
  // TODO: Learn what is group id
  const consumer = kafka.consumer({ groupId: 'test-group' });
  console.log('Connecting to kafka as consumer...');
  await consumer.connect();
  console.log('Connected to kafka!');

  console.log(`Subscribing into ${topicName}...`);
  await consumer.subscribe({ topic: topicName, fromBeginning: true });
  console.log(`Subscribed into ${topicName}!`);

  return consumer;
};
