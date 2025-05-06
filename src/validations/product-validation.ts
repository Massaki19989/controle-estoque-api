import {z} from 'zod';

export const productValidation = z.object({
    name: z.string().min(3, { message: "O nome deve ter pelo menos 3 caracteres" }),
    price: z.number().positive({ message: "O preço deve ser um número positivo" }),
    categoryId: z.string().uuid({ message: "ID da categoria inválido" })
})

export type ProductValidation = z.infer<typeof productValidation>;