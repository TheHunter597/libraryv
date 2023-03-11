import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
declare global {
    namespace Express {
        interface Request {
            user: {
                Email: string;
                id: mongoose.Types.ObjectId;
                Role: "Member" | "Admin";
            };
        }
    }
}
export declare function checkUserPermission(roles: string[]): (req: Request, res: Response, next: NextFunction) => void;
