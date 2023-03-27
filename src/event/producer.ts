import { Kafka, Producer as ProducerType, Transaction } from "kafkajs";
import {
  EventPrototype,
  TicketCreated,
  Topics,
  ticketCreatedMessageContent,
} from "./types";

abstract class Producer<T extends EventPrototype> {
  abstract topic: T["Topic"];
  protected producer: ProducerType | null;
  protected transaction: Transaction | null;
  private client: Kafka;
  abstract produceMessage({
    data,
    options,
  }: {
    data: T["data"];
    options: { delay: number };
  }): void;
  abstract produceMessageExactlyOnce(
    data: T["data"],
    options: { delay: number }
  ): void;
  constructor(client: Kafka) {
    this.client = client;
    this.producer = null;
    this.transaction = null;
  }
  async createProducer(
    options: { allowAutoTopicCreation: boolean; ExactlyOnce: boolean } = {
      allowAutoTopicCreation: false,
      ExactlyOnce: false,
    }
  ) {
    /// if ExactlyOnce is set to true produceMessageExactlyOnce must be used to produce messages
    /// otherwise just use produceMessage
    let { ExactlyOnce } = options;

    if (!ExactlyOnce) {
      let { allowAutoTopicCreation } = options;
      const producer = this.client.producer({ allowAutoTopicCreation });
      await producer.connect();
      this.producer = producer;
    } else {
      const producer = this.client.producer({
        maxInFlightRequests: 1,
        idempotent: true,
      });
      const transaction = await producer.transaction();
      this.transaction = transaction;
    }
    console.log("producer created");
  }
}

export class TicketCreatedProducer extends Producer<TicketCreated> {
  topic: Topics.TicketCreated = Topics.TicketCreated;
  constructor(kafka: Kafka) {
    super(kafka);
  }
  async produceMessage({
    data,
    options = { delay: 0 },
  }: {
    data: ticketCreatedMessageContent;
    options?: { delay: number };
  }) {
    if (!this.producer) {
      throw new Error("Please initialze the producer first");
    }
    if (!data) {
      throw new Error("Please provide message data");
    }

    await this.producer.send({
      topic: this.topic,
      messages: [{ key: "key1", value: JSON.stringify(data) }],
    });
  }
  async produceMessageExactlyOnce(
    data: ticketCreatedMessageContent,
    options: { delay: number } = { delay: 0 }
  ) {
    if (!this.transaction) {
      throw new Error("Please initialze the transaction first");
    }
    if (!data) {
      throw new Error("Please provide message data");
    }
    try {
      let { delay } = options;
      await new Promise((resolve) => setTimeout(() => resolve, delay));

      await this.transaction.send({
        topic: this.topic,
        messages: [{ value: JSON.stringify(data) }],
      });

      await this.transaction.commit();
    } catch (e) {
      await this.transaction.abort();
    }
  }
}
