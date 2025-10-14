import {Express, Request, Response, Router} from 'express';
import {authMiddleware, AuthenticatedRequest} from "../middlewares/auth-middleware";
import UserService from '../services/user-service';

export default async function userController(app: Express){
    const userService  = new UserService();
    app.use(authMiddleware);
    const router = Router();

    /**
 * @swagger
 * /user:
 *   get:
 *     summary: Retorna os dados do usuário autenticado
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dados do usuário retornados com sucesso
 *         content:
 *           application/json:
 *             example:
 *               id: "1"
 *               name: "João Silva"
 *               email: "joao.silva@example.com"
 *               role: "admin"
 *       401:
 *         description: Não autorizado
 *         content:
 *           application/json:
 *             example:
 *               error: "Token de autenticação ausente ou inválido"
 *       500:
 *         description: Erro interno no servidor
 *         content:
 *           application/json:
 *             example:
 *               error: "Erro ao buscar dados do usuário"
 */


    router.get("/", async (req: AuthenticatedRequest, res: Response) => {
        try {
            const user = await userService.getUserById(req.user.id);
            res.status(200).json(user);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    });

/**
 * @swagger
 * /user/update:
 *   put:
 *     summary: Atualiza os dados do usuário autenticado
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Novo nome do usuário
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Novo e-mail do usuário
 *               password:
 *                 type: string
 *                 description: Nova senha do usuário
 *             example:
 *               name: João Silva
 *               email: joao.silva@example.com
 *               password: "novaSenha123"
 *     responses:
 *       200:
 *         description: Dados do usuário atualizados com sucesso
 *         content:
 *           application/json:
 *             example:
 *               id: "1"
 *               name: "João Silva"
 *               email: "joao.silva@example.com"
 *               role: "admin"
 *       400:
 *         description: Erro ao atualizar dados do usuário
 *         content:
 *           application/json:
 *             example:
 *               error: "Erro ao atualizar dados do usuário"
 *       401:
 *         description: Não autorizado
 *         content:
 *           application/json:
 *             example:
 *               error: "Token de autenticação ausente ou inválido"
 *       500:
 *         description: Erro interno no servidor
 *         content:
 *           application/json:
 *             example:
 *               error: "Erro ao processar a solicitação"
 */



    router.put("/update", async (req: AuthenticatedRequest, res: Response) => {
        try {
            const user = await userService.updateUser(req.user.id, req.body);
            user.password = "";
            res.status(200).json(user);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    })

    /**
 * @swagger
 * /user/deactive:
 *   delete:
 *     summary: Desativa a conta do usuário autenticado
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Conta do usuário desativada com sucesso
 *         content:
 *           application/json:
 *             example:
 *               id: "1"
 *               name: "João Silva"
 *               email: "joao.silva@example.com"
 *               status: "desativado"
 *       401:
 *         description: Não autorizado
 *         content:
 *           application/json:
 *             example:
 *               error: "Token de autenticação ausente ou inválido"
 *       500:
 *         description: Erro interno no servidor
 *         content:
 *           application/json:
 *             example:
 *               error: "Erro ao desativar conta do usuário"
 */


    router.delete("/deactive", async (req: AuthenticatedRequest, res: Response) => {
        try {
            const user = await userService.deactive(req.user.id, req.user.id);
            res.status(200).json(user);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    })

    /**
 * @swagger
 * /user/approved:
 *   post:
 *     summary: Aprova um usuário por um administrador
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: string
 *                 description: ID do usuário a ser aprovado
 *             example:
 *               id: "12345"
 *     responses:
 *       200:
 *         description: Usuário aprovado com sucesso
 *         content:
 *           application/json:
 *             example:
 *               id: "12345"
 *               name: "Maria Oliveira"
 *               email: "maria.oliveira@example.com"
 *               role: "user"
 *               status: "approved"
 *       400:
 *         description: Erro ao aprovar usuário
 *         content:
 *           application/json:
 *             example:
 *               error: "Erro ao aprovar usuário"
 *       401:
 *         description: Não autorizado
 *         content:
 *           application/json:
 *             example:
 *               error: "Token de autenticação ausente ou inválido"
 *       404:
 *         description: Usuário não encontrado
 *         content:
 *           application/json:
 *             example:
 *               error: "Usuário com ID 12345 não encontrado"
 *       500:
 *         description: Erro interno no servidor
 *         content:
 *           application/json:
 *             example:
 *               error: "Erro ao processar a solicitação"
 */


    router.post('/approved', async (req: AuthenticatedRequest, res)=>{
        try {
            const currentUserId = req.user.id;
            const userId = req.body.id;
            const user = await userService.approveUser(userId, currentUserId);
            user.password = "";
            res.status(200).json(user);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    })

    /**
 * @swagger
 * /user/disapproved:
 *   post:
 *     summary: Reprova um usuário por um administrador
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: string
 *                 description: ID do usuário a ser reprovado
 *             example:
 *               id: "12345"
 *     responses:
 *       200:
 *         description: Usuário reprovado com sucesso
 *         content:
 *           application/json:
 *             example:
 *               id: "12345"
 *               name: "Maria Oliveira"
 *               email: "maria.oliveira@example.com"
 *               role: "user"
 *               status: "disapproved"
 *       400:
 *         description: Erro ao reprovar usuário
 *         content:
 *           application/json:
 *             example:
 *               error: "Erro ao reprovar usuário"
 *       401:
 *         description: Não autorizado
 *         content:
 *           application/json:
 *             example:
 *               error: "Token de autenticação ausente ou inválido"
 *       404:
 *         description: Usuário não encontrado
 *         content:
 *           application/json:
 *             example:
 *               error: "Usuário com ID 12345 não encontrado"
 *       500:
 *         description: Erro interno no servidor
 *         content:
 *           application/json:
 *             example:
 *               error: "Erro ao processar a solicitação"
 */


    router.post("/disapproved", async (req: AuthenticatedRequest, res) => {
        try {
            const userId = req.body.id;
            const currentUserId = req.user.id;
            const user = await userService.deactive(userId, currentUserId);
            user.password = "";
            res.status(200).json(user);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    });

    app.use("/user", router);
}