import { Kafka, Consumer as ConsumerType, Message } from "kafkajs";
import { EventPrototype, TicketCreated, Topics } from "./types";
declare abstract class Consumer<T extends EventPrototype> {
    abstract topic: T["Topic"];
    abstract groupId: string;
    private client;
    consumer: ConsumerType | null;
    abstract onMessage(): void;
    constructor(client: Kafka);
    createConsumer(options?: {
        fromBeginning: boolean;
        timeout: number;
    }): Promise<ConsumerType>;
    protected parseMessage(message: Message): T["data"];
}
export declare class TicketCreatedClass extends Consumer<TicketCreated> {
    topic: Topics.TicketCreated;
    groupId: string;
    constructor(client: Kafka);
    onMessage(options?: {
        delay: number;
    }): Promise<void>;
}
export {};
