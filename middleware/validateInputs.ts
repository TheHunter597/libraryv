import { NextFunction, Request, Response } from "express";
import { badRequest } from "../errors/badRequest";

export function validateInputs(inputs: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    let missing = inputs;
    for (const input of inputs) {
      if (req.body[input]) {
        missing = missing.filter((entry) => entry != input);
      }
    }
    if (missing.length == 1) {
      return next(new badRequest(`${missing[0]} should be provided`));
    } else if (missing.length > 1) {
      let comment = "";
      for (let i = 0; i < missing.length; i++) {
        if (i === missing.length - 1) {
          comment = comment.concat(`and ${missing[i]}`);
        } else {
          comment = comment.concat(
            `${missing[i]} ${i != missing.length - 2 ? "," : ""}`
          );
        }
      }
      return next(new badRequest(`${comment} must be provided`).normalize());
    }
    next();
  };
}
