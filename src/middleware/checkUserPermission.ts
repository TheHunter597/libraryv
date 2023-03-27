import { NextFunction, Request, Response } from "express";
import { ForbiddenError } from "../errors/forbidden";

declare global {
  namespace Express {
    interface Request {
      user: {
        Email: string;
        id: string;
        Role: "Member" | "Admin";
      };
    }
  }
}
export function checkUserPermission(roles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    for (const role of roles) {
      if (role === req.user.Role) {
        return next();
      }
    }

    return next(
      new ForbiddenError(
        "You are not authorized to access this route"
      ).normalize()
    );
  };
}
