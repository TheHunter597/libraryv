import { CustomError } from "./customError";

export class ForbiddenError extends CustomError {
  statusCode = 403;
  isOperational = true;
  constructor(public message: string) {
    super(message);
  }
  normalize(): {
    statusCode: number;
    isOperational: boolean;
    message: string;
    fullError?: any;
  } {
    return {
      statusCode: this.statusCode,
      message: this.message,
      isOperational: this.isOperational,
    };
  }
}
