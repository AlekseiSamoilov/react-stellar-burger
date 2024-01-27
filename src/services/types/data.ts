
export type TUserData = {
    email: string;
    password: string;
}

export interface IUserData {
    name?: string;
    email: string;
    password: string;
}

export interface IOrdersDetails {
    createdAt: string;
    ingredients: Array<number>;
    name: string;
    number: number;
    status: string;
    updateAt: string;
    _id: string;
    id: number;
}

export interface IRegisterUserData {
    user: IUserData;
    accessToken: string;
    refreshToken: string;
    name: string;
    password: string;
    email:string;
}