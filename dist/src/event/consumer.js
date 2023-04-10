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
exports.Consumer = void 0;
class Consumer {
    constructor(client) {
        this.client = client;
        this.consumer = null;
    }
    createConsumer(options = {
        fromBeginning: true,
        timeout: 10000,
    }) {
        return __awaiter(this, void 0, void 0, function* () {
            let { fromBeginning, timeout } = options;
            const consumer = this.client.consumer({
                groupId: this.groupId,
                heartbeatInterval: timeout,
            });
            yield consumer.connect();
            yield consumer.subscribe({
                topics: [this.topic],
                fromBeginning: fromBeginning,
            });
            this.consumer = consumer;
            console.log("consumer created");
            return consumer;
        });
    }
    parseMessage(message) {
        var _a;
        let value;
        if (message.value == undefined) {
            throw new Error("Message doesnt have a value");
        }
        else {
            value = JSON.parse((_a = message.value) === null || _a === void 0 ? void 0 : _a.toString());
            return value;
        }
    }
    shutdownConsumer() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Shutting down Kafka consumer gracefully...");
            if (!this.consumer)
                return;
            try {
                // Disconnect from the Kafka cluster
                yield this.consumer.disconnect();
                console.log("Kafka consumer has been successfully shutdown.");
                process.exit(0);
            }
            catch (err) {
                console.error("Error occurred during Kafka consumer shutdown:", err);
                process.exit(1);
            }
        });
    }
}
exports.Consumer = Consumer;
