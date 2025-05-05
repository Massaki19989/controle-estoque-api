import {z} from 'zod';

export const registerSchema = z.object({
    email: z.string().email("Email inválido!"),
    password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres!"),
    cpf: z.string().min(11, "CPF deve ter no mínimo 11 dígitos!").max(11, "CPF deve ter no máximo 11 dígitos!"),
    name: z.string().min(3, "Nome deve ter no mínimo 3 caracteres!"),
    role: z.number().int("Role deve ser um número inteiro!")
})