import { Express, Router } from "express";
import { AuthenticatedRequest, authMiddleware } from "../middlewares/auth-middleware";
import validateRequestBody from "../middlewares/validate-request-body";
import {productValidation, ProductValidation} from "../validations/product-validation";
import ProductService from "../services/product-service";

const productService = new ProductService();

export default async function productController(app: Express) {
    const router = Router();
    router.use(authMiddleware);

    /**
 * @swagger
 * /product/:
 *   get:
 *     summary: Retorna os detalhes de um produto
 *     tags: [Product]
 *     parameters:
 *       - in: query
 *         name: id
 *         required: false
 *         schema:
 *           type: string
 *         description: ID do produto a ser buscado
 *     responses:
 *       200:
 *         description: Detalhes do produto retornados com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 price:
 *                   type: number
 *                   format: float
 *                 description:
 *                   type: string
 *       400:
 *         description: Erro ao buscar os detalhes do produto
 *         content:
 *           application/json:
 *             example:
 *               error: Produto não encontrado
 */

    router.get("/",async (req: AuthenticatedRequest, res) => {
        
        const productId = req.query.id as string || "";

        try {
            const product = await productService.productDetails(productId);
            res.status(200).json(product);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    });

    /**
 * @swagger
 * /product/register:
 *   post:
 *     summary: Cadastra um novo produto
 *     tags: [Product]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *               - categoryId
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome do produto
 *               price:
 *                 type: number
 *                 format: float
 *                 description: Preço do produto
 *               categoryId:
 *                 type: string
 *                 description: ID da categoria do produto
 *     responses:
 *       201:
 *         description: Produto cadastrado com sucesso
 *         content:
 *           application/json:
 *             example:
 *               message: Produto cadastrado com sucesso
 *       400:
 *         description: Erro ao cadastrar o produto
 *         content:
 *           application/json:
 *             example:
 *               error: Nome do produto já existe ou dados inválidos
 */


    router.post("/register", validateRequestBody(productValidation),async (req: AuthenticatedRequest, res) => {
        try {
            const { name, categoryId } = req.body;
            const price = req.body.price;
            const userId = req.user.id;
            const data: ProductValidation = {
                name,
                price,
                categoryId
            }

            await productService.registerProduct(data, userId);
            
            res.status(201).json({ message: "Produto cadastrado com sucesso" });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    });

    /**
 * @swagger
 * /product/update:
 *   put:
 *     summary: Atualiza os dados de um produto existente
 *     tags: [Product]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - price
 *             properties:
 *               id:
 *                 type: string
 *                 description: ID do produto a ser atualizado
 *               name:
 *                 type: string
 *                 description: Nome do produto
 *               price:
 *                 type: number
 *                 format: float
 *                 description: Novo preço do produto
 *               categoryId:
 *                 type: string
 *                 description: ID da nova categoria do produto
 *     responses:
 *       200:
 *         description: Produto atualizado com sucesso
 *         content:
 *           application/json:
 *             example:
 *               message: Produto atualizado com sucesso
 *       400:
 *         description: Erro ao atualizar o produto
 *         content:
 *           application/json:
 *             example:
 *               error: ID do produto é obrigatório ou dados inválidos
 */


    router.put("/update", async (req: AuthenticatedRequest, res) => {
        try{
            const { id, price, name, categoryId } = req.body;

            if (!id) {
                throw new Error("ID é obrigatório");
            }

            await productService.updateProduct(id, Number(price), name, categoryId);
            
            res.status(200).json({ message: "Produto atualizado com sucesso" });
        }catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    })

    /**
 * @swagger
 * /product/delete:
 *   delete:
 *     summary: Deleta um produto existente
 *     tags: [Product]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: string
 *                 description: ID do produto a ser deletado
 *     responses:
 *       200:
 *         description: Produto deletado com sucesso
 *         content:
 *           application/json:
 *             example:
 *               message: Produto deletado com sucesso
 *       400:
 *         description: Erro ao deletar o produto
 *         content:
 *           application/json:
 *             example:
 *               error: ID do produto é obrigatório ou produto não encontrado
 */


    router.delete("/delete", async (req: AuthenticatedRequest, res) => {
        try {
            const { id } = req.body;

            if (!id) {
                throw new Error("ID é obrigatório");
            }

            await productService.deleteProduct(id);
            
            res.status(200).json({ message: "Produto deletado com sucesso" });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    });


    app.use("/product", router);
}