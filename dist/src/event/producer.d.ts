import { Kafka, Producer as ProducerType, Transaction } from "kafkajs";
import { EventPrototype } from "./types";
export declare abstract class Producer<T extends EventPrototype> {
    abstract topic: T["Topic"];
    protected producer: ProducerType | null;
    protected transaction: Transaction | null;
    private client;
    constructor(client: Kafka);
    createProducer(options?: {
        allowAutoTopicCreation: boolean;
    }): Promise<void>;
    produceMessage({ data }: {
        data: T["data"];
    }): Promise<void>;
    shutdownProducer(): Promise<void>;
}
