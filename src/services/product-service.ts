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

    async updateProduct(id: string, price: number | null, name: string | null, categoryId: string | null) {
        const product = await productDb.productDetails(id);

        
        if (!product) {
            throw new Error("Produto não encontrado");
        }

        if(price == null || price == undefined){
            price = product.price;
        }

        if(name == null || name == undefined || name == ""){
            name = product.name;
        }

        if(categoryId == null || categoryId == undefined || categoryId == ""){
            categoryId = product.categoryId;
        }

        const categoryExists = await categoryDb.getById(categoryId as string);
        if (!categoryExists) {
            throw new Error("Categoria não encontrada");
        }

        if(price == null){
            throw new Error("Erro com o preço do produto");
        }

        if(name == null || name == ""){
            throw new Error("Erro com o nome do produto");
        }

        if(categoryId == null || categoryId == ""){
            throw new Error("Erro com a categoria do produto");
        }

        const updatedProduct = await productDb.updateProduct(id, price, name, categoryId);
        if (!updatedProduct) {
            throw new Error("Erro ao atualizar produto");
        }
        return updatedProduct;

    }

    async deleteProduct(id: string) {
        const product = await productDb.productDetails(id);
        const verifyStock = await productDb.stockVerification(id);

        if (verifyStock > 0) {
            throw new Error("Produto ainda possui estoque, não é possível deletar");
        }

        if (!product) {
            throw new Error("Produto não encontrado");
        }



        const deletedProduct = await productDb.deleteProduct(id);
        if (!deletedProduct) {
            throw new Error("Erro ao deletar produto");
        }
        return deletedProduct;
    }
}