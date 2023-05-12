export declare enum Topics {
    TicketCreated = "ticket-created",
    TicketUpdated = "ticket-updated",
    OrderCreated = "order-created",
    OrderCancelled = "order-cancelled",
    OrderExpired = "order-expired"
}
export type messagesContent = ticketMessageContent | orderCreatedMessageContent | orderCancelledMessageContent | orderExpiredMessageContent;
export interface EventPrototype {
    Topic: Topics;
    data: messagesContent;
}
export interface ticketMessageContent {
    ticket: string;
    price: number;
    id: string;
    userId: string;
    version: number;
    reservedBy?: string;
}
export interface TicketCreatedEvent {
    Topic: Topics.TicketCreated;
    data: ticketMessageContent;
}
export interface TicketUpdatedEvent {
    Topic: Topics.TicketUpdated;
    data: ticketMessageContent;
}
export declare enum statusType {
    created = "created",
    cancelled = "cancelled",
    pending = "Pending",
    complete = "complete"
}
export interface orderCreatedMessageContent {
    id: string;
    ticket: {
        Title: string;
        Price: number;
        id: string;
    };
    userId: string;
    status: statusType;
    expiresAt: string;
}
export interface orderCancelledMessageContent {
    id: string;
    ticket: {
        id: string;
    };
}
export interface orderExpiredMessageContent {
    orderId: string;
}
export interface orderCreatedEvent {
    Topic: Topics.OrderCreated;
    data: orderCreatedMessageContent;
}
export interface orderCancelledEvent {
    Topic: Topics.OrderCancelled;
    data: orderCancelledMessageContent;
}
export interface orderExpiredEvent {
    Topic: Topics.OrderExpired;
    data: orderExpiredMessageContent;
}
