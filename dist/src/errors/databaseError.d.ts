import { CustomError } from "./customError";
export declare class DatabaseError extends CustomError {
    err: any;
    isOperational: boolean;
    message: string;
    statusCode: number;
    constructor(err: any);
    normalize(): {
        statusCode: number;
        isOperational: boolean;
        message: string;
        fullError?: any;
    };
}
