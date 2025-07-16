import ProductRepository from "../repository/product-repository";
import SaleRepository from "../repository/sale-repository";
import { SaleSchema } from "../validations/sale-validation";

const saleRepository = new SaleRepository();
const productRepository = new ProductRepository();

export default class SaleService {
    
    async getAllSales(take: number = 20, skip: number = 0, order: 'asc' | 'desc' = 'desc') {
        const sales = await saleRepository.getAllSales(take, skip, order);
        return sales.map((sale) => ({
            id: sale.id,
            product: {
                id: sale.product.id,
                name: sale.product.name,
                price: sale.product.price,
            },
            user: {
                id: sale.user.id,
                name: sale.user.name,
            },
            quantity: sale.quantity,
            createdAt: sale.createdAt,
        }));
    }

    async saleRegister(data: SaleSchema){
        const sale = await saleRepository.addSale(data);
        const product = await productRepository.productDetails(sale.productId);
        

        if(!product) {
            throw new Error('Erro ao tentar encontrar o produto');
        }

        if(product.quantity < sale.quantity){
            throw new Error("O estoque possui apenas " + product.quantity + " unidades do produto " + product.name);
        }

        const updatedProduct = await productRepository.updateStock(product.id, product.quantity - sale.quantity);

        if(!updatedProduct) {
            throw new Error('Erro ao tentar atualizar o estoque do produto');
        }

        return sale;
    }

    
}