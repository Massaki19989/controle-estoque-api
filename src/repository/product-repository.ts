import prisma from "../prisma/prisma-client";
import { ProductValidation } from "../validations/product-validation";

export default class ProductRepository {
    async productDetails(id: string) {
        return await prisma.products.findUnique({
            where: { 
                id
            }
        })
    }

    async registerProduct(data: ProductValidation, userId: string) {
        return await prisma.products.create({
            data: {
                ...data,
                userId,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        })
    }
}