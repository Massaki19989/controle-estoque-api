import { Express, Request, Response, Router } from "express";
import { AuthenticatedRequest, authMiddleware } from "../middlewares/auth-middleware";

export default function saleController(app: Express) {
    app.use(authMiddleware);
    const router = Router()

    router.get('/', (req: AuthenticatedRequest, res: Response) => {
        const user = req.user
        res.status(200).json({ message: 'Hello from sale controller', user })
    })

    app.use('/sale', router)
}