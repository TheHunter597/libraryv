import { Kafka, Producer as ProducerType, Transaction } from "kafkajs";
import { EventPrototype, messagesContent } from "./types";

export abstract class Producer<T extends EventPrototype> {
  abstract topic: T["Topic"];
  private producer: ProducerType | null;
  protected transaction: Transaction | null;
  private client: Kafka;
  constructor(client: Kafka) {
    this.client = client;
    this.producer = null;
    this.transaction = null;
  }
  get getProducer() {
    return this.producer;
  }
  private async createAdmin() {
    let admin = this.client.admin();
    await admin.connect();
    return {
      topicExists: async () => {
        let topics = await admin.listTopics();
        return topics.includes(this.topic);
      },
      createTopic: async () => {
        await admin.createTopics({
          topics: [
            { topic: this.topic, numPartitions: 2, replicationFactor: 1 },
          ],
          waitForLeaders: true,
        });
      },
    };
  }
  async createProducer(
    options: { allowAutoTopicCreation: boolean } = {
      allowAutoTopicCreation: false,
    }
  ) {
    let { allowAutoTopicCreation } = options;
    const producer = this.client.producer({ allowAutoTopicCreation });
    await producer.connect();

    this.producer = producer;
    let admin = await this.createAdmin();
    if (!(await admin.topicExists())) {
      await admin.createTopic();
    }
    console.log("producer created");
  }
  async produceMessage({ data }: { data: T["data"] }) {
    if (!this.producer) {
      throw new Error("Please initialze the producer first");
    }
    if (!data) {
      throw new Error("Please provide message data");
    }

    await this.producer.send({
      topic: this.topic,
      messages: [{ value: JSON.stringify(data) }],
    });
  }
  async shutdownProducer() {
    console.log("Shutting down Kafka producer gracefully...");
    if (!this.producer) return;
    try {
      // Disconnect from the Kafka cluster
      await this.producer.disconnect();
      console.log("Kafka producer has been successfully shutdown.");
      process.exit(0);
    } catch (err) {
      console.error("Error occurred during Kafka producer shutdown:", err);
      process.exit(1);
    }
  }
}
