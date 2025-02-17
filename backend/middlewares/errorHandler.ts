import { Request, Response, NextFunction } from "express";

const errorHandler = (err: Error, req: Request, res: Response, _next: NextFunction) => {
    const status = res.statusCode ? res.statusCode : 500;
    res.status(status).send(err.message);
}

export default errorHandler;
