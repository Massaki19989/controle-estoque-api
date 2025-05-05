import { Express, Router } from "express";
import { AuthenticatedRequest } from "../middlewares/auth-middleware";

async function stockController(app: Express) {
    const router = Router();

    router.get('/', async (req: AuthenticatedRequest, res) => {
        try {
            // Implementar lógica para buscar ações
            res.status(200).json({ message: "Ações buscadas com sucesso!" });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    });

    app.use('/stock', router);
}