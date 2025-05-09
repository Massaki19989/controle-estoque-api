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
}