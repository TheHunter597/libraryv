import { CustomError } from "./customError";

export class DatabaseError extends CustomError {
  isOperational = true;
  message = "";
  statusCode = 500;
  constructor(public err: any) {
    super(err.message);
  }
  normalize(): {
    statusCode: number;
    isOperational: boolean;
    message: string;
    fullError?: any;
  } {
    try {
      let message = "";
      let errors = Object.keys(this.err.errors);
      errors.map((val: string, i) => {
        message = message.concat(
          `${this.err.errors[val].message}${i != errors.length - 2 ? "" : ","}`
        );
      });

      return {
        statusCode: 400,
        message: message,
        isOperational: this.isOperational,
      };
    } catch (err) {
      console.log(err);
      return {
        statusCode: 400,
        message: this.err,
        isOperational: this.isOperational,
      };
    }
  }
}
