import { Kafka, Producer as ProducerType, Transaction } from "kafkajs";
import { EventPrototype, TicketCreated, Topics, ticketCreatedMessageContent } from "./types";
declare abstract class Producer<T extends EventPrototype> {
    abstract topic: T["Topic"];
    protected producer: ProducerType | null;
    protected transaction: Transaction | null;
    private client;
    abstract produceMessage({ data, options, }: {
        data: T["data"];
        options: {
            delay: number;
        };
    }): void;
    abstract produceMessageExactlyOnce(data: T["data"], options: {
        delay: number;
    }): void;
    constructor(client: Kafka);
    createProducer(options?: {
        allowAutoTopicCreation: boolean;
        ExactlyOnce: boolean;
    }): Promise<void>;
}
export declare class TicketCreatedProducer extends Producer<TicketCreated> {
    topic: Topics.TicketCreated;
    constructor(kafka: Kafka);
    produceMessage({ data, options, }: {
        data: ticketCreatedMessageContent;
        options?: {
            delay: number;
        };
    }): Promise<void>;
    produceMessageExactlyOnce(data: ticketCreatedMessageContent, options?: {
        delay: number;
    }): Promise<void>;
}
export {};
