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
    createProducer(options = {
        allowAutoTopicCreation: false,
        ExactlyOnce: false,
    }) {
        return __awaiter(this, void 0, void 0, function* () {
            /// if ExactlyOnce is set to true produceMessageExactlyOnce must be used to produce messages
            /// otherwise just use produceMessage
            let { ExactlyOnce } = options;
            if (!ExactlyOnce) {
                try {
                    let { allowAutoTopicCreation } = options;
                    const producer = this.client.producer({ allowAutoTopicCreation });
                    yield producer.connect();
                    this.producer = producer;
                    console.log("producer created");
                }
                catch (err) {
                    console.log(err);
                }
            }
            else {
                try {
                    const producer = this.client.producer({
                        maxInFlightRequests: 1,
                        idempotent: true,
                    });
                    const transaction = yield producer.transaction();
                    this.transaction = transaction;
                    console.log("transaction created");
                }
                catch (err) {
                    console.log(err);
                }
            }
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
                messages: [{ key: "key1", value: JSON.stringify(data) }],
            });
        });
    }
    produceMessageExactlyOnce(data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.transaction) {
                throw new Error("Please initialze the transaction first");
            }
            if (!data) {
                throw new Error("Please provide message data");
            }
            try {
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
exports.Producer = Producer;
