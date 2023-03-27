export enum Topics {
  TicketCreated = "ticket-created",
  TicketUpdated = "ticket-updated",
}

export interface ticketCreatedMessageContent {
  ticket: string;
  price: number;
  id: string;
  userId: string;
}

export interface TicketCreated {
  Topic: Topics.TicketCreated;
  data: ticketCreatedMessageContent;
}

export interface TicketUpdated {
  topic: Topics.TicketUpdated;
  data: ticketCreatedMessageContent;
}

export interface EventPrototype {
  Topic: Topics;
  data: ticketCreatedMessageContent;
}
