import prisma from "../prisma/prisma-client";
import { RegisterRequest, LoginRequest } from "../types/auth-types";

export default class AuthRepository {

    async countUsers() {
        return await prisma.users.count();
    }

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

        const count = await this.countUsers();
        if (count > 0) {
            return await prisma.users.create({
                data: {
                    ...data,
                    role: 0
                }
            })
        }else{
            data.active = true;
            return await prisma.users.create({
            data: {
                ...data,
                role: 1
            }
        })
        }

        
    }
    
    async login(data: LoginRequest) {
        return await prisma.users.findUnique({
            where: data
        })
    }
}
