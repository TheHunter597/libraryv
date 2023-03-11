import { CustomError } from "./customError";

export class badRequest extends CustomError {
  public statusCode = 400;
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
