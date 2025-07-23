import UserRepository from "../repository/user-repository";

const userRepository = new UserRepository();

export default class UserService {
    async getUserById(id: string) {
        const user = await userRepository.getUserById(id);
        if (!user) {
            throw new Error("O usário não foi encontrado!");
        }
        return user;
    }

    async updateUser(id: string, data: any) {
        const user = await userRepository.getUserById(id);
        if (!user) {
            throw new Error("O usário não foi encontrado!");
        }
        const updatedUser = await userRepository.updateUser(id, data);
        return updatedUser;
    }

    async deactive(id: string, currentUserId: string) {
        const user = await userRepository.getUserById(id);
        const currentUser = await userRepository.getUserById(currentUserId);
        if (!currentUser) {
            throw new Error("Usuário atual não encontrado!");
        }
        if (currentUser.role !== 1 && currentUser.id !== id) {
            throw new Error("Você não tem permissão para desativar este usuário!");
        }
        if (!user) {
            throw new Error("O usário não foi encontrado!");
        }
        const deactivatedUser = await userRepository.deactive(id);
        return deactivatedUser;
    }

    async approveUser(id: string, currentUserId: string) {
        const user = await userRepository.getUserById(id);
        const currentUser = await userRepository.getUserById(currentUserId);
        if (!currentUser) {
            throw new Error("Usuário atual não encontrado!");
        }
        if(currentUser.role != 1){
            throw new Error("Você não tem permissão para aprovar usuários!");
        }
        if (!user) {
            throw new Error("Usuário não encontrado!");
        }

        const updatedUser = await userRepository.approveUser(id);
        return updatedUser;
    }
}