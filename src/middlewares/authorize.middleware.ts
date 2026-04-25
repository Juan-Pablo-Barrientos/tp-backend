import { RequestHandler } from "express";

export const authorizeRoles = (allowedRoles: string[]): RequestHandler => {
    return (req:any , res:any, next: any) => {
        const user = req.user;
        if(!user || !allowedRoles.includes(user.role)){
            return res.status(403).json({ message: "Forbidden" });
        }

        next();
    }
}