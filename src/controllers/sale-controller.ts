import { Express, Request, Response, Router } from "express";
import { AuthenticatedRequest, authMiddleware } from "../middlewares/auth-middleware";

export default function saleController(app: Express) {
    app.use(authMiddleware);
    const router = Router()

    router.get('/', (req: AuthenticatedRequest, res: Response) => {
        const user = req.user
        res.status(200).json({ message: 'Hello from sale controller', user })
    })

    router.post('/', (req: AuthenticatedRequest, res: Response) => {
        const user = req.user
        res.status(201).json({ message: 'Sale created successfully', user })
    })

    router.delete('/:id', (req: AuthenticatedRequest, res: Response) => {
        const user = req.user
        const saleId = req.params.id
        res.status(200).json({ message: `Sale with ID ${saleId} deleted successfully`, user })
    })

    app.use('/sale', router)
}