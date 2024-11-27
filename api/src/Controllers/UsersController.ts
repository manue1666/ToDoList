import { Request, Response } from "express";
import { UserModel } from "../Models/UsersModel";


export const registerUsers = async(req:Request, res: Response): Promise<void> => {
    try {
        const name= req.body.name
        const email= req.body.email
        const password= req.body.password
        const rol= req.body.rol
    
        //admin no puede crear client
        // if(req.user?.rol === "admin" && rol==="client"){
        //     res.status(400).json({
        //         msg: "los admins no pueden crear clientes"
        //     })
        //     return
        // }
        //valida que los datos esten completos
        if(!name||!email||!password||!rol){
            res.status(400).json({
                msg:"datos incompletos"
            })
            return
        }
        // //si no eres admin no puedes crear un admin
        // if(rol==="admin" && req.user?.rol !="admin"){
        //     res.status(400).json({
        //         msg:"debes ser admin para crear admin"
        //     })
        //     return
        // }
    
        const user= await UserModel.create({
            name,
            email,
            password,
            rol
        })
        res.status(200).json({
            msg:"usuario creado con exito", user
        })
        return
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:"hubo un error al crear el usuario"
        })
        return
    }
}

export const login = async(req:Request, res:Response):Promise<void> => {
    try {
        const user = await UserModel.findOne({email:req.body.email, password:req.body.password})
        //verifica que el usuario existe
        if(!user){
            res.status(400).json({
                msg:"el usuario no existe"
            })
            return
        }
        res.status(200).json({
            msg:"exito al iniciar sesion" , user
        })
        return
    } catch (error) {
       res.status(400).json({
        msg:"ups un errorsito"
       }) 
       return
    }
}