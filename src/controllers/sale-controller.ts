import { Express, Request, Response, Router } from "express";
import { AuthenticatedRequest, authMiddleware } from "../middlewares/auth-middleware";
import SaleService from "../services/sale-service";

export default function saleController(app: Express) {
    app.use(authMiddleware);
    const router = Router()
    const SaleDb = new SaleService();

    /**
 * @swagger
 * /sale:
 *   get:
 *     summary: Retorna uma lista de vendas com paginação e ordenação
 *     tags: [Sale]
 *     parameters:
 *       - in: query
 *         name: take
 *         schema:
 *           type: integer
 *           default: 20
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
 *         description: Lista de vendas retornada com sucesso
 *         content:
 *           application/json:
 *             example:
 *               [
 *                 {
 *                   "id": "1",
 *                   "product": "Produto A",
 *                   "quantity": 10,
 *                   "total": 100.00,
 *                   "date": "2025-10-14T00:00:00Z"
 *                 },
 *                 {
 *                   "id": "2",
 *                   "product": "Produto B",
 *                   "quantity": 5,
 *                   "total": 50.00,
 *                   "date": "2025-10-13T00:00:00Z"
 *                 }
 *               ]
 *       500:
 *         description: Erro ao buscar vendas
 *         content:
 *           application/json:
 *             example:
 *               {
 *                 "message": "Error fetching sales",
 *                 "error": "Mensagem de erro detalhada"
 *               }
 */


    router.get('/', (req: AuthenticatedRequest, res: Response) => {

        try{
            let take = 20
            let skip = 0
            let order = 'desc'

            if(req.params.take && req.params.skip && req.params.order) {
                take = Number(req.params.take);
                skip = Number(req.params.skip);
                order = req.params.order;
            }

            if(!order || order != 'asc' && order != 'desc'){
                throw new Error("Ordem inválida, deve ser 'asc' ou 'desc'");
            }

            const getAllSales = SaleDb.getAllSales(take, skip, order);
            res.status(200).json(getAllSales);
        }catch(err: any){
            res.status(500).json({ message: 'Error fetching sales', error: err.message});
        }
    })

    /**
 * @swagger
 * /sale/add:
 *   post:
 *     summary: Adiciona uma nova venda
 *     tags: [Sale]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *               - quantity
 *               - totalPrice
 *             properties:
 *               productId:
 *                 type: string
 *                 description: ID do produto vendido
 *               quantity:
 *                 type: integer
 *                 description: Quantidade do produto vendido
 *               totalPrice:
 *                 type: number
 *                 format: float
 *                 description: Preço total da venda
 *     responses:
 *       201:
 *         description: Venda adicionada com sucesso
 *         content:
 *           application/json:
 *             example:
 *               message: Sale added successfully
 *               data:
 *                 id: "12345"
 *                 productId: "abc123"
 *                 quantity: 10
 *                 totalPrice: 100.00
 *       500:
 *         description: Erro ao adicionar venda
 *         content:
 *           application/json:
 *             example:
 *               message: Error adding sale
 *               error: Detalhes do erro
 */


    router.post('/add', (req: AuthenticatedRequest, res: Response) => {
        try{
            const user = req.user;
            const saleData = req.body;
            saleData.userId = user.id;
            const sale = SaleDb.saleRegister(saleData);
            res.status(201).json({ message: 'Sale added successfully', data: sale });
        }catch(err: any){
            res.status(500).json({ message: 'Error adding sale', error: err.message });
        }
    })

    /**
 * @swagger
 * /sale/{id}:
 *   delete:
 *     summary: Exclui uma venda pelo ID
 *     tags: [Sale]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da venda a ser excluída
 *     responses:
 *       200:
 *         description: Venda excluída com sucesso
 *         content:
 *           application/json:
 *             example:
 *               message: Sale with ID 12345 deleted successfully
 *               user: { id: "1", name: "João Silva" }
 *       404:
 *         description: Venda não encontrada
 *         content:
 *           application/json:
 *             example:
 *               message: Sale with ID 12345 not found
 *       500:
 *         description: Erro ao excluir venda
 *         content:
 *           application/json:
 *             example:
 *               message: Error deleting sale
 *               error: Detalhes do erro
 */


    router.delete('/:id', (req: AuthenticatedRequest, res: Response) => {
        const user = req.user
        const saleId = req.params.id
        res.status(200).json({ message: `Sale with ID ${saleId} deleted successfully`, user })
    })

    app.use('/sale', router)
}