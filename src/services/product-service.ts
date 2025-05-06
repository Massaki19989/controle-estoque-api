import ProductRepository from "../repository/product-repository";
import { ProductValidation } from "../validations/product-validation";

const productDb = new ProductRepository();

export default class ProductService {

    async productDetails(id: string) {
        const product = await productDb.productDetails(id);
        if (!product) {
            throw new Error("Produto não encontrado");
        }
        return product;
    }

    async registerProduct(data: ProductValidation, userId: string) {

        const productExists = await productDb.getByName(data.name);
        if (productExists) {
            throw new Error("Produto já cadastrado");
        }

        const product = await productDb.registerProduct(data, userId);
        if (!product) {
            throw new Error("Erro ao cadastrar produto");
        }
        return product;

    }
}