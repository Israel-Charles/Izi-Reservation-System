import { RequestHandler } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

declare global {
    namespace Express {
        interface Request {
            userId: string;
            userName: string;
        }
    }
}

const authenticate: RequestHandler = (req, res, next) => {
    const token = req.cookies["auth_token"];
    if (!token) {
        return res
            .status(401)
            .json({ message: "Unauthorized: no token provided" });
    }

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET as string
        ) as JwtPayload;
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({ message: "Unauthorized: invalid token" });
    }
};

export default authenticate;
