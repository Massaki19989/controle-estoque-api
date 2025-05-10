import { Express, Router } from "express";
import { AuthenticatedRequest } from "../middlewares/auth-middleware";
import StockService from "../services/stock-service";

const stockService = new StockService();

export default async function stockController(app: Express) {
    const router = Router();

    router.get('/', async (req: AuthenticatedRequest, res) => {
        try {

            const { take, skip, order } = req.query;

            const takeNumber = parseInt(take as string) || 10;
            const skipNumber = parseInt(skip as string) || 0;
            const orderBy = (order as string) === "asc" ? "asc" : "desc";

            const searchAll = await stockService.searchAll(takeNumber, skipNumber, orderBy);

            res.status(200).json({ data: searchAll });

        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    });

    router.put('/add', async (req: AuthenticatedRequest, res) => {
        try {
            const { id, quantity } = req.body;

            if (!id || !quantity) {
                throw new Error("ID e quantidade são obrigatórios");
            }

            const addStock = await stockService.addStock(id, Number(quantity));
            if (!addStock) {
                throw new Error("Erro ao adicionar estoque");
            }

            res.status(200).json({ data: addStock });
        }catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    })

    router.put('/remove', async (req: AuthenticatedRequest, res) => {
        try {
            const { id, quantity } = req.body;

            if (!id || !quantity) {
                throw new Error("ID e quantidade são obrigatórios");
            }

            const removeStock = await stockService.removeStock(id, Number(quantity));
            if (!removeStock) {
                throw new Error("Erro ao remover estoque");
            }

            res.status(200).json({ data: removeStock });
        }catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    })

    app.use('/stock', router);
}