"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseError = void 0;
const customError_1 = require("./customError");
class DatabaseError extends customError_1.CustomError {
    constructor(err) {
        super(err.message);
        this.err = err;
        this.isOperational = true;
        this.message = "";
        this.statusCode = 500;
    }
    normalize() {
        try {
            let message = "";
            let errors = Object.keys(this.err.errors);
            errors.map((val, i) => {
                message = message.concat(`${this.err.errors[val].message}${i != errors.length - 2 ? "" : ","}`);
            });
            return {
                statusCode: 400,
                message: message,
                isOperational: this.isOperational,
            };
        }
        catch (err) {
            console.log(err);
            return {
                statusCode: 400,
                message: this.err,
                isOperational: this.isOperational,
            };
        }
    }
}
exports.DatabaseError = DatabaseError;
