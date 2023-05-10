"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Producer = void 0;
class Producer {
    constructor(client) {
        this.client = client;
        this.producer = null;
        this.transaction = null;
    }
    get getProducer() {
        return this.producer;
    }
    createAdmin() {
        return __awaiter(this, void 0, void 0, function* () {
            let admin = this.client.admin();
            yield admin.connect();
            return {
                topicExists: () => __awaiter(this, void 0, void 0, function* () {
                    let topics = yield admin.listTopics();
                    return topics.includes(this.topic);
                }),
                createTopic: () => __awaiter(this, void 0, void 0, function* () {
                    yield admin.createTopics({
                        topics: [
                            { topic: this.topic, numPartitions: 2, replicationFactor: 1 },
                        ],
                        waitForLeaders: true,
                    });
                }),
            };
        });
    }
    createProducer(options = {
        allowAutoTopicCreation: false,
    }) {
        return __awaiter(this, void 0, void 0, function* () {
            let { allowAutoTopicCreation } = options;
            const producer = this.client.producer({ allowAutoTopicCreation });
            yield producer.connect();
            this.producer = producer;
            let admin = yield this.createAdmin();
            if (!(yield admin.topicExists())) {
                yield admin.createTopic();
            }
            console.log("producer created");
        });
    }
    produceMessage({ data }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.producer) {
                throw new Error("Please initialze the producer first");
            }
            if (!data) {
                throw new Error("Please provide message data");
            }
            yield this.producer.send({
                topic: this.topic,
                messages: [{ value: JSON.stringify(data) }],
            });
        });
    }
    shutdownProducer() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Shutting down Kafka producer gracefully...");
            if (!this.producer)
                return;
            try {
                // Disconnect from the Kafka cluster
                yield this.producer.disconnect();
                console.log("Kafka producer has been successfully shutdown.");
                process.exit(0);
            }
            catch (err) {
                console.error("Error occurred during Kafka producer shutdown:", err);
                process.exit(1);
            }
        });
    }
}
exports.Producer = Producer;
