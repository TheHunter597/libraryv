import { Kafka, Producer as ProducerType, Transaction } from "kafkajs";
import { EventPrototype, ticketCreatedMessageContent } from "./types";
export declare abstract class Producer<T extends EventPrototype> {
    abstract topic: T["Topic"];
    protected producer: ProducerType | null;
    protected transaction: Transaction | null;
    private client;
    constructor(client: Kafka);
    createProducer(options?: {
        allowAutoTopicCreation: boolean;
        ExactlyOnce: boolean;
    }): Promise<void>;
    produceMessage({ data }: {
        data: ticketCreatedMessageContent;
    }): Promise<void>;
    shutdownProducer(): Promise<void>;
}
