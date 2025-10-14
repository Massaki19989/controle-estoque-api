import { Express, Router } from "express";
import { AuthenticatedRequest } from "../middlewares/auth-middleware";
import StockService from "../services/stock-service";

const stockService = new StockService();

export default async function stockController(app: Express) {
    const router = Router();

    /**
 * @swagger
 * /stock:
 *   get:
 *     summary: Retorna uma lista de itens de estoque com paginação e ordenação
 *     tags: [Stock]
 *     parameters:
 *       - in: query
 *         name: take
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Número de itens a serem retornados
 *       - in: query
 *         name: skip
 *         schema:
 *           type: integer
 *           default: 0
 *         description: Número de itens a serem pulados (paginamento)
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: desc
 *         description: Ordem de ordenação dos resultados
 *     responses:
 *       200:
 *         description: Lista de itens de estoque retornada com sucesso
 *         content:
 *           application/json:
 *             example:
 *               {
 *                 "data": [
 *                   {
 *                     "id": "1",
 *                     "product": "Produto A",
 *                     "quantity": 100,
 *                     "price": 10.00
 *                   },
 *                   {
 *                     "id": "2",
 *                     "product": "Produto B",
 *                     "quantity": 50,
 *                     "price": 20.00
 *                   }
 *                 ]
 *               }
 *       400:
 *         description: Erro ao buscar itens de estoque
 *         content:
 *           application/json:
 *             example:
 *               {
 *                 "error": "Mensagem de erro detalhada"
 *               }
 */


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

    /**
 * @swagger
 * /stock/add:
 *   put:
 *     summary: Adiciona quantidade ao estoque de um produto
 *     tags: [Stock]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - quantity
 *             properties:
 *               id:
 *                 type: string
 *                 description: ID do produto no estoque
 *               quantity:
 *                 type: integer
 *                 description: Quantidade a ser adicionada ao estoque
 *     responses:
 *       200:
 *         description: Estoque atualizado com sucesso
 *         content:
 *           application/json:
 *             example:
 *               data:
 *                 id: "12345"
 *                 product: "Produto A"
 *                 quantity: 150
 *       400:
 *         description: Erro ao atualizar estoque
 *         content:
 *           application/json:
 *             example:
 *               error: "ID e quantidade são obrigatórios"
 *       404:
 *         description: Produto não encontrado
 *         content:
 *           application/json:
 *             example:
 *               error: "Produto com ID 12345 não encontrado"
 *       500:
 *         description: Erro interno no servidor
 *         content:
 *           application/json:
 *             example:
 *               error: "Erro ao adicionar estoque"
 */


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

    /**
 * @swagger
 * /stock/remove:
 *   put:
 *     summary: Remove quantidade do estoque de um produto
 *     tags: [Stock]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - quantity
 *             properties:
 *               id:
 *                 type: string
 *                 description: ID do produto no estoque
 *               quantity:
 *                 type: integer
 *                 description: Quantidade a ser removida do estoque
 *     responses:
 *       200:
 *         description: Estoque atualizado com sucesso
 *         content:
 *           application/json:
 *             example:
 *               data:
 *                 id: "12345"
 *                 product: "Produto A"
 *                 quantity: 50
 *       400:
 *         description: Erro ao atualizar estoque
 *         content:
 *           application/json:
 *             example:
 *               error: "ID e quantidade são obrigatórios"
 *       404:
 *         description: Produto não encontrado
 *         content:
 *           application/json:
 *             example:
 *               error: "Produto com ID 12345 não encontrado"
 *       500:
 *         description: Erro interno no servidor
 *         content:
 *           application/json:
 *             example:
 *               error: "Erro ao remover estoque"
 */


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