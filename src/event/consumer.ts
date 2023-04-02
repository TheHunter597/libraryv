import { Kafka, Consumer as ConsumerType, Message } from "kafkajs";
import { EventPrototype, TicketCreated, Topics } from "./types";

abstract class Consumer<T extends EventPrototype> {
  abstract topic: T["Topic"];
  abstract groupId: string;
  private client: Kafka;
  public consumer: ConsumerType | null;
  abstract onMessage(): void;
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
}
