import { NextFunction, Response, Request } from "express";
declare global {
    namespace Express {
        interface Request {
            session: {
                jwt: string;
            } | null;
        }
    }
}
export declare function checkUserSignedIn(req: Request, res: Response, next: NextFunction): Promise<void>;
