import { authMiddleware } from "../middlewares/auth-middleware";
import CategoryService from "../services/category-service";
import { Express, Router } from "express";

export default async function categoryController(app: Express) {
    const router = Router();
    const categoryService = new CategoryService();
    app.use(authMiddleware);

    /**
 * @swagger
 * /category/:
 *   get:
 *     summary: Retorna todas as categorias
 *     tags: [Category]
 *     responses:
 *       200:
 *         description: Lista de categorias retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *       400:
 *         description: Erro ao buscar as categorias
 */


    router.get("/", async (req, res) => {
        try {
            const categories = await categoryService.allCategories();
            res.status(200).json(categories);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    });

    /**
 * @swagger
 * /category/create:
 *   post:
 *     summary: Cria uma nova categoria
 *     tags: [Category]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome da categoria a ser criada
 *     responses:
 *       201:
 *         description: Categoria cadastrada com sucesso
 *         content:
 *           application/json:
 *             example:
 *               message: Categoria cadastrada com sucesso
 *       400:
 *         description: Erro ao cadastrar a categoria
 *         content:
 *           application/json:
 *             example:
 *               error: Nome da categoria já existe
 */


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

    /**
 * @swagger
 * /category/update/{id}:
 *   put:
 *     summary: Atualiza uma categoria existente
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da categoria a ser atualizada
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 description: Novo nome da categoria
 *     responses:
 *       200:
 *         description: Categoria atualizada com sucesso
 *         content:
 *           application/json:
 *             example:
 *               message: Categoria atualizada com sucesso
 *       400:
 *         description: Erro ao atualizar a categoria
 *         content:
 *           application/json:
 *             example:
 *               error: Categoria não encontrada
 */


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

/**
 * @swagger
 * /category/delete/{id}:
 *   delete:
 *     summary: Exclui uma categoria pelo ID
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da categoria a ser excluída
 *     responses:
 *       200:
 *         description: Categoria excluída com sucesso
 *         content:
 *           application/json:
 *             example:
 *               message: Categoria excluída com sucesso
 *       400:
 *         description: Erro ao excluir a categoria
 *         content:
 *           application/json:
 *             example:
 *               error: Categoria não encontrada ou erro na exclusão
 */


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