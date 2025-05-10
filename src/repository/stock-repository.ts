import prisma from "../prisma/prisma-client";

export default class StockRepository {
    async serchAll(take: number, skip: number, orderBy: "asc" | "desc") {
        return await prisma.products.findMany({
            take: take,
            skip: skip,
            orderBy: {
                createdAt: orderBy
            }
        })
    }

    async selectQtd(id: string) {
        return await prisma.products.findUnique({
            where: {
                id
            },
            select: {
                quantity: true
            }
        })
    }

    async updateStock(id: string, quantity: number) {
        return await prisma.products.update({
            where: {
                id
            },
            data: {
                quantity
            }
        })
    }
}