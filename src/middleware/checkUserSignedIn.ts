import { NextFunction, Response, Request } from "express";
import { notAuthorized } from "../errors/notAuthorized";
import { JWT } from "../utils/JWT";

declare global {
  namespace Express {
    interface Request {
      session: { jwt: string } | null;
    }
  }
}

export async function checkUserSignedIn(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.session?.jwt) {
    return next(
      new notAuthorized("Please sign in to acess this route").normalize()
    );
  }
  let { Email, id, Role } = JWT.verify(req.session.jwt);

  if (!Email || !id) {
    return next(
      new notAuthorized("Please sign in to acess this route").normalize()
    );
  }
  req.user = {
    Email,
    id,
    Role,
  };

  next();
}
