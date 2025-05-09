import ProductRepository from "../repository/product-repository";
import { ProductValidation } from "../validations/product-validation";
import  CategoryRepository from "../repository/category-repository";

const productDb = new ProductRepository();
const categoryDb = new CategoryRepository();

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

        const categoryExists = await categoryDb.getById(data.categoryId);
        if (!categoryExists) {
            throw new Error("Categoria não encontrada");
        }


        const product = await productDb.registerProduct(data, userId);
        if (!product) {
            throw new Error("Erro ao cadastrar produto");
        }
        return product;

    }

    async getProductsFiltered(categoryId: string, take: number, skip: number, order: "asc" | "desc") {
        const products = await productDb.getProductsFiltered(categoryId, take, skip, order);
        if (!products) {
            throw new Error("Erro ao buscar produtos");
        }
        return products;
    }
}