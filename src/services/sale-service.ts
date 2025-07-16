import SaleRepository from "../repository/sale-repository";
import { SaleSchema } from "../validations/sale-validation";

const saleRepository = new SaleRepository();

export default class SaleService {
    
    async getAllSales() {
        const sales = await saleRepository.getAllSales();
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
        return sale;
    }

    
}