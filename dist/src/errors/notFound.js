"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFound = void 0;
const customError_1 = require("./customError");
class NotFound extends customError_1.CustomError {
    constructor(message) {
        super(message);
        this.message = message;
        this.statusCode = 404;
        this.isOperational = true;
    }
    normalize() {
        return {
            statusCode: this.statusCode,
            isOperational: this.isOperational,
            message: this.message,
        };
    }
}
exports.NotFound = NotFound;
