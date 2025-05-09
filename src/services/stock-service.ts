import StockRepository from "../repository/stock-repository";

const stockDb = new StockRepository();

export default class StockService {
    async searchAll(take: number, skip: number, orderBy: "asc" | "desc") {
        return await stockDb.serchAll(take, skip, orderBy);
    }
}