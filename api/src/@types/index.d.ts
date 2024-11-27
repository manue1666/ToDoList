
interface IUser{
    _id:string;
    name:string;
    email:string;
    password:string;
    rol:"admin" | "client";
}

declare namespace Express{
    export interface Request{
        user?:IUser
    }
}