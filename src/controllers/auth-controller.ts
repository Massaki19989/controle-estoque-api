import {Express, Router} from 'express';
import { RegisterRequest } from '../types/auth-types';
import AuthService from '../services/auth-service';
import { registerSchema } from "../validations/user-validation";
import validateRequestBody from '../middlewares/validate-request-body';
import cookieParser from 'cookie-parser';

const authService = new AuthService();

export default async function authController(app: Express) {
    const router = Router();
    app.use(cookieParser());

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Realiza login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *       400:
 *         description: Erro ao fazer login
 */

    router.post('/login', async (req, res) => {
        
        try {
            const data = req.body;
            if (!data.email || !data.password) {
                throw new Error("Email e senha são obrigatórios!");
            }
            const token = await authService.login(data.email, data.password);
            /*
            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 2 * 24 * 60 * 60 * 1000 
            })*/

            res.cookie("token", token, {
                httpOnly: true,
                secure: false,        // 👍 sem HTTPS, precisa ser false
                sameSite: "strict", 
                maxAge: 2 * 24 * 60 * 60 * 1000 
            });
            

            res.status(200).json({ message: token });
        }catch (error: any) {
            res.status(400).json({ error: error.message });
        }
        
    })

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Realiza o cadastro de um novo usuário
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - role
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: integer
 *                 description: Código numérico representando o tipo de usuário
 *     responses:
 *       201:
 *         description: Usuário registrado com sucesso
 *       400:
 *         description: Erro ao registrar o usuário
 */


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


/**
 * @swagger
 * /auth/logout:
 *   get:
 *     summary: Realiza logout
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Logout realizado com sucesso
 */

    router.get('/logout', (req, res) => {
        res.clearCookie("token");
        res.status(200).json({ message: "Logout realizado com sucesso!" });
    });


    app.use('/auth', router)
}