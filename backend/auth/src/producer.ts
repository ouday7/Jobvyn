import { Kafka, Producer, Admin } from "kafkajs";
import dotenv from "dotenv";

dotenv.config();

let producer: Producer;
let admin: Admin;

export const connectKafka = async () => {
  try {
    const kafka = new Kafka({
      clientId: "auth-service",
      // Utilisation du port 9096 défini dans ton docker-compose
      brokers: [process.env.Kafka_Brokers || "localhost:9096"],
      // Désactivation de SSL car Docker tourne en mode Plaintext localement
      ssl: false,
    });

    admin = kafka.admin();
    await admin.connect();

    const topics = await admin.listTopics();

    if (!topics.includes("send-mail")) {
      await admin.createTopics({
        topics: [
          {
            topic: "send-mail",
            numPartitions: 1,
            replicationFactor: 1,
          },
        ],
      });

      console.log("✅ Topic: 'send-mail' created successfully.");
    }
    
    await admin.disconnect();

    // Initialisation et connexion du producer
    producer = kafka.producer();
    await producer.connect();

    console.log("✅ Connected to kafka producer");
  } catch (error) {
    console.log("❌ Failed to connect kafka", error);
  }
};

export const publishToTopic = async (topic: string, message: any) => {
  if (!producer) {
    console.log("❌ kafka producer is not initialized");
    return;
  }

  try {
    await producer.send({
      topic: topic,
      messages: [
        {
          value: JSON.stringify(message),
        },
      ],
    });
  } catch (error) {
    console.log("❌ Failed to publish message to kafka", error);
  }
};

export const disconnectKafka = async () => {
  if (producer) {
    await producer.disconnect();
  }
};