import CategoryRepository from "../repository/category-repository";

const categoryDb = new CategoryRepository();

export default class CategoryService {
    async allCategories() {
        const categories = await categoryDb.allCategories();
        if (!categories) {
            throw new Error("Nenhuma categoria encontrada");
        }
        return categories;
    }

    async createCategory(name: string) {
        const category = await categoryDb.createCategory(name);
        if (!category) {
            throw new Error("Erro ao cadastrar categoria");
        }
        return category;
    }
}