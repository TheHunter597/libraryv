import { Kafka, Consumer as ConsumerType, Message } from "kafkajs";
import { EventPrototype } from "./types";

export abstract class Consumer<T extends EventPrototype> {
  abstract topic: T["Topic"];
  abstract groupId: string;
  private client: Kafka;
  public consumer: ConsumerType | null;
  abstract listen(): void;
  constructor(client: Kafka) {
    this.client = client;
    this.consumer = null;
  }

  async createConsumer(
    options: { fromBeginning: boolean; timeout: number } = {
      fromBeginning: true,
      timeout: 10000,
    }
  ) {
    let { fromBeginning, timeout } = options;
    const consumer = this.client.consumer({
      groupId: this.groupId,
      heartbeatInterval: timeout,
    });
    await consumer.connect();
    await consumer.subscribe({
      topics: [this.topic],
      fromBeginning: fromBeginning,
    });
    this.consumer = consumer;
    console.log("consumer created");
    return consumer;
  }
  protected parseMessage(message: Message) {
    let value: T["data"];
    if (message.value == undefined) {
      throw new Error("Message doesnt have a value");
    } else {
      value = JSON.parse(message.value?.toString());
      return value;
    }
  }
  async shutdownConsumer() {
    console.log("Shutting down Kafka consumer gracefully...");
    if (!this.consumer) return;
    try {
      // Disconnect from the Kafka cluster
      await this.consumer.disconnect();
      console.log("Kafka consumer has been successfully shutdown.");
      process.exit(0);
    } catch (err) {
      console.error("Error occurred during Kafka consumer shutdown:", err);
      process.exit(1);
    }
  }
}
