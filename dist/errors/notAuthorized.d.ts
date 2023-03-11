import { CustomError } from "./customError";
export declare class notAuthorized extends CustomError {
    message: string;
    statusCode: number;
    isOperational: boolean;
    constructor(message: string);
    normalize(): {
        statusCode: number;
        isOperational: boolean;
        message: string;
        fullError?: any;
    };
}
