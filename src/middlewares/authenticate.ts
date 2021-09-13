import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

export default function authenticate(req: Request, res: Response, next: NextFunction): void {
    try {
        const authorizationHeader = req.headers.authorization as unknown as string;
        const splitted = authorizationHeader.split(' ');
        const token = (splitted.length > 1) ? splitted[1] : authorizationHeader;

        jwt.verify(token, process.env.TOKEN_SECRET as unknown as string);

        next();
    } catch (error) {
        res.status(401).send();
    }
}