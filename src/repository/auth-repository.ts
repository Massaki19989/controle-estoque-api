import prisma from "../prisma/prisma-client";
import { RegisterRequest, LoginRequest } from "../types/auth-types";

export default class AuthRepository {

    async findUserByEmail(email: string) {
        return await prisma.users.findUnique({
            where: { 
                email
            }
        })
    }

    async findUserByCpf(cpf: string) {
        return await prisma.users.findUnique({
            where: { 
                cpf  
            }
        })
    }
    
    async createUser(data: RegisterRequest) {
        return await prisma.users.create({
            data: data
        })
    }
    
    async login(data: LoginRequest) {
        return await prisma.users.findUnique({
            where: data
        })
    }
}
