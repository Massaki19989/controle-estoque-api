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

    async deactive(id: string) {
        const user = await userRepository.getUserById(id);
        if (!user) {
            throw new Error("O usário não foi encontrado!");
        }
        const deactivatedUser = await userRepository.deactive(id);
        return deactivatedUser;
    }
}