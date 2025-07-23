import prisma from "../prisma/prisma-client";

export default class UserRepository {
    async getUserById(id: string) {
        const user = await prisma.users.findUnique({
            where: {
                id: id
            }, 
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
                updatedAt: true,
                cpf: true,
                password: false
            }
        });
        return user;
    }

    async updateUser(id: string, data: any) {
        const user = await prisma.users.update({
            where: {
                id: id
            },
            data: data
        });
        return user;
    }

    async deactive(id: string) {
        const user = await prisma.users.update({
            where: {
                id: id
            },
            data: {
                active: false
            }
        });
        return user;
    }

    async approveUser(id: string) {
        return await prisma.users.update({
            where: {
                id: id
            },
            data: {
                active: true
            }
        });
    }

}