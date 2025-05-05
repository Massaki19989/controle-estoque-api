import {Express, Router} from 'express';
import { RegisterRequest } from '../types/auth-types';
import AuthService from '../services/auth-service';
import { registerSchema } from "../validations/user-validation";
import validateRequestBody from '../middlewares/validate-request-body';

const authService = new AuthService();

export default async function authController(app: Express) {
    const router = Router();

    router.post('/login', async (req, res) => {
        
        try {
            const data = req.body;
            if (!data.email || !data.password) {
                throw new Error("Email e senha são obrigatórios!");
            }
            const token = await authService.login(data.email, data.password);

            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 2 * 24 * 60 * 60 * 1000 
            })

            res.status(200).json({ message: "Sucesso no login!" });
        }catch (error: any) {
            res.status(400).json({ error: error.message });
        }
        
    })

    router.post('/register', validateRequestBody(registerSchema), async (req, res) => {
        try {
            req.body.role = Number(req.body.role);
            const data: RegisterRequest = {
                ...req.body,
                updatedAt: new Date(),
                active: false
            };
            const newUser = await authService.register(data);
            res.status(201).json({ message: newUser });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    });


    app.use('/auth', router)
}