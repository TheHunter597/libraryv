import { NextFunction, Request, Response } from "express";
export declare function validateInputs(inputs: string[]): (req: Request, res: Response, next: NextFunction) => void;
