import { z} from 'zod';

export const saleSchema = z.object({
    productId: z.string().uuid("ID do produto inválido!"),
    quantity: z.number().min(1, "Quantidade deve ser pelo menos 1!"),
    price: z.number().positive("Preço total deve ser um valor positivo!"),
    userId: z.string()
});

export type SaleSchema = z.infer<typeof saleSchema>;