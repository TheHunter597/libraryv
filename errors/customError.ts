export abstract class CustomError extends Error {
  abstract statusCode: number;
  abstract isOperational: boolean;
  abstract message: string;
  constructor(message: string) {
    super(message);
  }
  abstract normalize(): {
    statusCode: number;
    isOperational: boolean;
    message: string;
    fullError?: any;
  };
}
