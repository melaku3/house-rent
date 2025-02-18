import expressAsyncHandler from "express-async-handler";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

// Middleware to protect routes
export const protect = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const cookie = req.headers.cookie;
    if (!cookie || !cookie.startsWith('token')) {
        res.status(401);
        throw new Error('Not authorized, no token');
    }

    const token = cookie.split('=')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        req.body.user = decoded;
        next();
    } catch (error) {
        res.status(401);
        throw new Error('Not authorized, token failed');
    }
});

// Middleware to restrict routes to certain roles
export const restrictTo = (...roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!roles.includes(req.body.user.role)) {
            res.status(403);
            throw new Error('You do not have permission to perform this action');
        }
        next();
    };
};