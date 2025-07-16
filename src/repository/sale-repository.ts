import prisma from "../prisma/prisma-client";
import { SaleSchema } from "../validations/sale-validation";

export default class SaleRepository {

    async getAllSales(take: number, skip: number, order: 'asc' | 'desc' = 'desc') {
        return await prisma.sales.findMany({
            include: {
                product: true,
                user: true,
            },
            take,
            skip
        });
    }

    async groupByProduct() {
        return await prisma.sales.groupBy({
            by: ['productId'], 
            _sum: {
                quantity: true,
                price: true,
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

    async getSaleById(id: string) {
        return await prisma.sales.findUnique({
            where: { id },
            include: {
                product: true
            },
        });
    }


}