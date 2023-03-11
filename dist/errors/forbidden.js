"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForbiddenError = void 0;
const customError_1 = require("./customError");
class ForbiddenError extends customError_1.CustomError {
    constructor(message) {
        super(message);
        this.message = message;
        this.statusCode = 403;
        this.isOperational = true;
    }
    normalize() {
        return {
            statusCode: this.statusCode,
            message: this.message,
            isOperational: this.isOperational,
        };
    }
}
exports.ForbiddenError = ForbiddenError;
