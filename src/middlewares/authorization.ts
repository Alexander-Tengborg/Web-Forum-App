import { Request, Response, NextFunction } from "express";

export const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
    if(req.user)
        next();
    else
        return res.sendStatus(401);
}

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    if(req.headers.token == process.env.ADMIN_API_KEY)
        next();
    else
        return res.sendStatus(401);
}