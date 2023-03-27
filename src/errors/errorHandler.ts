import { NextFunction, Request, Response } from "express";

function devHandler(err: any, res: Response) {
  res.status(err.statusCode).json({
    message: err.message,
    fullError: err.fullError ? err.fullError : "",
  });
}

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err.isOperational) {
    devHandler(err, res);
  } else {
    res.status(500).json({ message: "unexpected error has occurred." });
  }
}
