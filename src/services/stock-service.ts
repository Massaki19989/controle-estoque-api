import StockRepository from "../repository/stock-repository";

const stockDb = new StockRepository();

export default class StockService {
    async searchAll(take: number, skip: number, orderBy: "asc" | "desc") {
        return await stockDb.serchAll(take, skip, orderBy);
    }

    async addStock(id: string, quantity: number) {
        const currentStock = await stockDb.selectQtd(id);
        if (!currentStock) {
            throw new Error("Produto não encontrado");
        }

        const newStock = currentStock.quantity + quantity;

        if (newStock < 0) {
            throw new Error("Estoque insuficiente");
        }

        const updatedStock = await stockDb.updateStock(id, newStock);
        if (!updatedStock) {
            throw new Error("Erro ao atualizar estoque");
        }
        return updatedStock;
    }

    async removeStock(id: string, quantity: number) {
        const currentStock = await stockDb.selectQtd(id);
        if (!currentStock) {
            throw new Error("Produto não encontrado");
        }

        const newStock = currentStock.quantity - quantity;

        if (newStock < 0) {
            throw new Error("Estoque insuficiente");
        }

        const updatedStock = await stockDb.updateStock(id, newStock);
        if (!updatedStock) {
            throw new Error("Erro ao atualizar estoque");
        }
        return updatedStock;
    }
}