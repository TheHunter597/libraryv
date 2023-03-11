"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
function devHandler(err, res) {
    res.status(err.statusCode).json({
        message: err.message,
        fullError: err.fullError ? err.fullError : "",
    });
}
function errorHandler(err, req, res, next) {
    if (err.isOperational) {
        devHandler(err, res);
    }
    else {
        res.status(500).json({ message: "unexpected error has occurred." });
    }
}
exports.errorHandler = errorHandler;
