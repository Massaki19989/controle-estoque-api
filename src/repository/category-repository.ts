import prisma from "../prisma/prisma-client";

export default class CategoryRepository {
    async allCategories() {
        return await prisma.category.findMany({
            orderBy: {
                name: "asc"
            }
        })
    }

    async createCategory(name: string) {
        return await prisma.category.create({
            data: {
                name,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        })
    }

    async getByName(name: string) {
        return await prisma.category.findFirst({
            where: {
                name
            }
        })
    }

    async getById(id: string) {
        return await prisma.category.findUnique({
            where: {
                id
            }
        })
    }

    async updateCategory(id: string, name: string) {
        return await prisma.category.update({
            where: {
                id
            },
            data: {
                name,
                updatedAt: new Date()
            }
        })
    }

    async deleteCategory(id: string) {
        return await prisma.category.delete({
            where: {
                id
            }
        })
    }
}