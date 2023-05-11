import { Kafka, Producer as ProducerType, Transaction } from "kafkajs";
import { EventPrototype } from "./types";
export declare abstract class Producer<T extends EventPrototype> {
    abstract topic: T["Topic"];
    private producer;
    protected transaction: Transaction | null;
    private client;
    constructor(client: Kafka);
    get getProducer(): ProducerType | null;
    createProducer(options?: {
        allowAutoTopicCreation: boolean;
    }): Promise<void>;
    produceMessage({ data }: {
        data: T["data"];
    }): Promise<void>;
    shutdownProducer(): Promise<void>;
}
