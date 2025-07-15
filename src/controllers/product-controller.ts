import { Express, Router } from "express";
import { AuthenticatedRequest, authMiddleware } from "../middlewares/auth-middleware";
import validateRequestBody from "../middlewares/validate-request-body";
import {productValidation, ProductValidation} from "../validations/product-validation";
import ProductService from "../services/product-service";

const productService = new ProductService();

export default async function productController(app: Express) {
    const router = Router();
    router.use(authMiddleware);

    router.get("/",async (req: AuthenticatedRequest, res) => {
        
        const productId = req.query.id as string || "";

        try {
            const product = await productService.productDetails(productId);
            res.status(200).json(product);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    });

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