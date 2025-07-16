import prisma from "../prisma/prisma-client";
import { SaleSchema } from "../validations/sale-validation";

export default class SaleRepository {
    async getAllSales() {
        return await prisma.sales.findMany({
            include: {
                
                product: true,
                user: true,
            },
        });
    }

    async groupByProduct() {
        return await prisma.sales.groupBy({
            by: ['productId'], 
            _sum: {
                quantity: true,
            }
        });
    }

    async addSale(data: SaleSchema){
        return await prisma.sales.create({
            data: {
                productId: data.productId,
                quantity: data.quantity,
                price: data.price,
                updatedAt: new Date(),
                userId: data.userId
            }
        })
    }
}