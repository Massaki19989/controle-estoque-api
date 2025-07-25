import { authMiddleware } from "../middlewares/auth-middleware";
import CategoryService from "../services/category-service";
import { Express, Router } from "express";

export default async function categoryController(app: Express) {
    const router = Router();
    const categoryService = new CategoryService();
    app.use(authMiddleware);

    router.get("/", async (req, res) => {
        try {
            const categories = await categoryService.allCategories();
            res.status(200).json(categories);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    });

    router.post("/create", async (req, res) => {
        try {
            const { name } = req.body;
            await categoryService.validateCategory(name);
            await categoryService.createCategory(name);
            res.status(201).json({ message: "Categoria cadastrada com sucesso" });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    });

    router.put("/update/:id", async (req, res) => {
        try{
            const { id } = req.params;
            const { name } = req.body;

            await categoryService.updateCategory(id, name);
            res.status(200).json({ message: "Categoria atualizada com sucesso" });
        }catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    })

    router.delete("/delete/:id", async (req, res) => {
        try {
            const { id } = req.params;
            await categoryService.deleteCategory(id);
            res.status(200).json({ message: "Categoria excluída com sucesso" });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    })

    app.use("/category", router);
}