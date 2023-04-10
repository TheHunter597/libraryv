import { Kafka, Consumer as ConsumerType, Message } from "kafkajs";
import { EventPrototype } from "./types";
export declare abstract class Consumer<T extends EventPrototype> {
    abstract topic: T["Topic"];
    abstract groupId: string;
    private client;
    consumer: ConsumerType | null;
    abstract listen(): void;
    constructor(client: Kafka);
    createConsumer(options?: {
        fromBeginning: boolean;
        timeout: number;
    }): Promise<ConsumerType>;
    protected parseMessage(message: Message): T["data"];
    shutdownConsumer(): Promise<void>;
}
