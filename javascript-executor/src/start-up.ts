import Docker from "dockerode";
import { Kafka } from "kafkajs";

export const docker = new Docker({ socketPath: "/var/run/docker.sock" });
const kafka = new Kafka({
  clientId: "random-string",
  // brokers: ["localhost:30584"],
  brokers: ["localhost:31461"],
});

export const connectToDocker = async () => {
  try {
    await docker.ping();
    return docker;
  } catch (error) {
    throw new Error("Unable to connect docker");
  }
};

export const createProducer = async () => {
  const producer = kafka.producer();
  console.log("Connecting to kafka as producer...");
  await producer.connect();
  console.log("Connected to kafka!");
};

export const createConsumer = async () => {
  const consumer = kafka.consumer({ groupId: "test-group" });
  console.log("Connecting to kafka as consumer...");
  await consumer.connect();
  console.log("Connected to kafka!");
  console.log("Subscribing into my-topic...");
  await consumer.subscribe({ topic: "my-topic", fromBeginning: true });
  console.log("Subscribed into my-topic!");

  return consumer;
};
