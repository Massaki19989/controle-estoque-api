import { Express, Request, Response, Router } from "express";
import { AuthenticatedRequest, authMiddleware } from "../middlewares/auth-middleware";
import SaleService from "../services/sale-service";

export default function saleController(app: Express) {
    app.use(authMiddleware);
    const router = Router()
    const SaleDb = new SaleService();

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

    router.delete('/:id', (req: AuthenticatedRequest, res: Response) => {
        const user = req.user
        const saleId = req.params.id
        res.status(200).json({ message: `Sale with ID ${saleId} deleted successfully`, user })
    })

    app.use('/sale', router)
}