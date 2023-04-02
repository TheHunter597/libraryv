import { Kafka, Producer as ProducerType, Transaction } from "kafkajs";
import { EventPrototype, ticketCreatedMessageContent } from "./types";

export abstract class Producer<T extends EventPrototype> {
  abstract topic: T["Topic"];
  protected producer: ProducerType | null;
  protected transaction: Transaction | null;
  private client: Kafka;
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
      try {
        let { allowAutoTopicCreation } = options;
        const producer = this.client.producer({ allowAutoTopicCreation });
        await producer.connect();
        this.producer = producer;
        console.log("producer created");
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const producer = this.client.producer({
          maxInFlightRequests: 1,
          idempotent: true,
        });
        const transaction = await producer.transaction();
        this.transaction = transaction;
        console.log("transaction created");
      } catch (err) {
        console.log(err);
      }
    }
  }
  async produceMessage({ data }: { data: ticketCreatedMessageContent }) {
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
  async produceMessageExactlyOnce(data: ticketCreatedMessageContent) {
    if (!this.transaction) {
      throw new Error("Please initialze the transaction first");
    }
    if (!data) {
      throw new Error("Please provide message data");
    }
    try {
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
