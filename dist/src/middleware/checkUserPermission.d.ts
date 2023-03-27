import { NextFunction, Request, Response } from "express";
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
export declare function checkUserPermission(roles: string[]): (req: Request, res: Response, next: NextFunction) => void;
