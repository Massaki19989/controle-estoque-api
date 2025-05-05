import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthenticatedRequest extends Request {
    user?: any;
}

export default function authMiddleware(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "Token não fornecido!" });
    }

    try {
        const secret = process.env.SECRET_KEY;

        if (secret) {
            const decoded = jwt.verify(token, secret);
            req.user = decoded;
            next();
        }else{
            res.status(500).json({ message: "Chave secreta não encontrada!" });
        }
        
        
    }catch (error: any) {
        res.status(500).json({ message: "Erro ao verificar o token!" });
    }
}
