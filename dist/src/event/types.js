"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.statusType = exports.Topics = void 0;
var Topics;
(function (Topics) {
    Topics["TicketCreated"] = "ticket-created";
    Topics["TicketUpdated"] = "ticket-updated";
    /////////////
    Topics["OrderCreated"] = "order-created";
    Topics["OrderCancelled"] = "order-cancelled";
})(Topics = exports.Topics || (exports.Topics = {}));
////
var statusType;
(function (statusType) {
    statusType["created"] = "created";
    statusType["cancelled"] = "cancelled";
    statusType["pending"] = "Pending";
    statusType["complete"] = "complete";
})(statusType = exports.statusType || (exports.statusType = {}));
