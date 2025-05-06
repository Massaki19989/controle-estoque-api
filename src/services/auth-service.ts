import AuthRepository from "../repository/auth-repository";
import { RegisterRequest } from "../types/auth-types";
import { hash, genSalt, compare } from "bcrypt";
import jwt from "jsonwebtoken";

const authDb = new AuthRepository();

export default class AuthService {

    async login(email: string, password: string) {
        const user = await authDb.findUserByEmail(email);
        if (!user) {
            throw new Error("Este email não está cadastrado!");
        }

        const validatePassword = await compare(password, user.password);

        if (!validatePassword) {
            throw new Error("Senha incorreta!");
        }

        if(user.active === false) {
            throw new Error("Este usuário não está ativo!");
        }

        
        user.password = "";

        const secret = process.env.SECRET_KEY;

        if(!secret) {
            throw new Error("Chave secreta não encontrada!");
        }
        
        const token = jwt.sign(user, secret, {expiresIn: "2d" });

        return token    	;
    }
    
    async register(data: RegisterRequest) {
        const existingUser = await authDb.findUserByEmail(data.email);
        const existingUserCpf = await authDb.findUserByCpf(data.cpf);

        if (existingUserCpf) {
            throw new Error("Este CPF já está em uso!");
        }

        if (existingUser) {
            throw new Error("Este email já está em uso!");
        }

        const salt = await genSalt(10);
        const hashedPassword = await hash(data.password, salt);

        data.password = hashedPassword;

        const newUser = await authDb.createUser(data);
        newUser.password = "";
        return newUser;
    }

}