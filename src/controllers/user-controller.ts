import {Express, Request, Response, Router} from 'express';
import {authMiddleware, AuthenticatedRequest} from "../middlewares/auth-middleware";
import UserService from '../services/user-service';

export default async function userController(app: Express){
    const userService  = new UserService();
    app.use(authMiddleware);
    const router = Router();

    router.get("/", async (req: AuthenticatedRequest, res: Response) => {
        try {
            const user = await userService.getUserById(req.user.id);
            res.status(200).json(user);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    });

    router.put("/update", async (req: AuthenticatedRequest, res: Response) => {
        try {
            const user = await userService.updateUser(req.user.id, req.body);
            user.password = "";
            res.status(200).json(user);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    })

    router.delete("/deactive", async (req: AuthenticatedRequest, res: Response) => {
        try {
            const user = await userService.deactive(req.user.id);
            res.status(200).json(user);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    })

    app.use("/user", router);
}