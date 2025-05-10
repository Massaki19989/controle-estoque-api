import prisma from "../prisma/prisma-client";

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
}