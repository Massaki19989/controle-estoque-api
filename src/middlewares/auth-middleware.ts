import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthenticatedRequest extends Request {
    user?: any;
}

export function authMiddleware(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const token = req.cookies.token;

    if (!token) {
        res.status(401).json({ message: "Token não fornecido!" });
    }else{
        try {
            const secret = process.env.SECRET_KEY;
    
            if (secret) {
                const decoded = jwt.verify(token, secret);
                req.user = decoded;
                if(req.user.active == false){
                    res.status(401).json({ message: "Usuário inativo!" });
                }
                next();
            }else{
                res.status(500).json({ message: "Chave secreta não encontrada!" });
            }
            
            
        }catch (error: any) {
            res.status(500).json({ message: "Erro ao verificar o token!" });
        }
    }

    
}
