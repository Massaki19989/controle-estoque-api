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
                quantity: 0,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        })
    }

    async getByName(name: string) {
        return await prisma.products.findFirst({
            where: {
                name
            }
        })
    }

    async getProductsFiltered(categoryId: string, take: number, skip: number, order: "asc" | "desc") {
        if(categoryId != 'all'){
            return await prisma.products.findMany({
                where: {
                    categoryId
                },
                take,
                skip,
                orderBy: {
                    createdAt: order
                }
            })
        }else{
            return await prisma.products.findMany({
                take,
                skip,
                orderBy: {
                    createdAt: order
                }
            })
        }
        
    }

    async updateProduct(id: string, price: number, name: string , categoryId: string) {
        return await prisma.products.update({
            where: {
                id
            },
            data: {
                price,
                name,
                categoryId,
                updatedAt: new Date()
            }
        })
    }

    async productWithCategory(categoryId: string) {
        return await prisma.products.count({
            where: {
                categoryId
            }
        })
    }

    async deleteProduct(id: string) {
        return await prisma.products.delete({
            where: {
                id
            }
        })
    }

    async stockVerification(id: string) {
        return await prisma.products.count({
            where: {
                id
            },
        })
    }

    async updateStock(id: string, quantity: number) {
        return await prisma.products.update({
            where: {
                id
            },
            data: {
                quantity,
                updatedAt: new Date()
            }
        })
    }
}