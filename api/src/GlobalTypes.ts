import { Schema } from "mongoose";

export interface IUser{
    _id:string;
    name:string;
    email:string;
    password:string;
    rol:"admin" | "client";
}

export interface ITask{
    title:string;
    description:string;
    finDate:Date;
    userId:Schema.Types.ObjectId;
    estado: "inProcess" | "completed";

}