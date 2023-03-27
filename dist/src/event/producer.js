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
exports.TicketCreatedProducer = void 0;
const types_1 = require("./types");
class Producer {
    constructor(client) {
        this.client = client;
        this.producer = null;
        this.transaction = null;
    }
    createProducer(options = {
        allowAutoTopicCreation: false,
        ExactlyOnce: false,
    }) {
        return __awaiter(this, void 0, void 0, function* () {
            /// if ExactlyOnce is set to true produceMessageExactlyOnce must be used to produce messages
            /// otherwise just use produceMessage
            let { ExactlyOnce } = options;
            if (!ExactlyOnce) {
                let { allowAutoTopicCreation } = options;
                const producer = this.client.producer({ allowAutoTopicCreation });
                yield producer.connect();
                this.producer = producer;
            }
            else {
                const producer = this.client.producer({
                    maxInFlightRequests: 1,
                    idempotent: true,
                });
                const transaction = yield producer.transaction();
                this.transaction = transaction;
            }
            console.log("producer created");
        });
    }
}
class TicketCreatedProducer extends Producer {
    constructor(kafka) {
        super(kafka);
        this.topic = types_1.Topics.TicketCreated;
    }
    produceMessage({ data, options = { delay: 0 }, }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.producer) {
                throw new Error("Please initialze the producer first");
            }
            if (!data) {
                throw new Error("Please provide message data");
            }
            yield this.producer.send({
                topic: this.topic,
                messages: [{ key: "key1", value: JSON.stringify(data) }],
            });
        });
    }
    produceMessageExactlyOnce(data, options = { delay: 0 }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.transaction) {
                throw new Error("Please initialze the transaction first");
            }
            if (!data) {
                throw new Error("Please provide message data");
            }
            try {
                let { delay } = options;
                yield new Promise((resolve) => setTimeout(() => resolve, delay));
                yield this.transaction.send({
                    topic: this.topic,
                    messages: [{ value: JSON.stringify(data) }],
                });
                yield this.transaction.commit();
            }
            catch (e) {
                yield this.transaction.abort();
            }
        });
    }
}
exports.TicketCreatedProducer = TicketCreatedProducer;
