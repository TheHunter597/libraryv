import { CustomError } from "./customError";

export class NotFound extends CustomError {
  public statusCode = 404;
  public isOperational = true;
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
      isOperational: this.isOperational,
      message: this.message,
    };
  }
}
