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

    async validateCategory(name: string) {
        const category = await categoryDb.getByName(name);
        if (category) {
            throw new Error("Categoria já cadastrada");
        }
        return true;
    }

    async updateCategory(id: string, name: string) {
        const category = await categoryDb.getById(id);
        if (!category) {
            throw new Error("Categoria não encontrada");
        }
        const updatedCategory = await categoryDb.updateCategory(id, name);
        if (!updatedCategory) {
            throw new Error("Erro ao atualizar categoria");
        }
        return updatedCategory;
    }
}