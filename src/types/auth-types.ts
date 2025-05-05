export type LoginRequest = {
    email: string,
    password: string
};
export type RegisterRequest = {
    email: string,
    password: string,
    cpf: string,
    name: string,
    role: number,
    updateAt: Date,
    active: boolean
};