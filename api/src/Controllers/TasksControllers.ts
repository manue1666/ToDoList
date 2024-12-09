import { Request, Response } from "express";
import { TaskModel } from "../Models/TasksModel";



export const createTask = async (req:Request, res:Response):Promise<void> => {
    try {
        const title = req.body.title
        const description = req.body.description
        const finDate= req.body.finDate
        const userId= req.body.userId
        const estado= req.body.estado

        if(!title || !description || !finDate || !userId){
            res.status(400).json({msg:"Datos incompletos"})
            return
        }

        const task = await TaskModel.create({
            title,
            description,
            finDate,
            userId,
            estado
        })
        res.status(200).json({msg:"tarea creada con exito", task})
        return
        

    } catch (error) {
        console.log(error)
        res.status(500).json({msg:"error al crear tarea"})
        return
    }

}

export const getTasks = async(req:Request, res:Response):Promise<void> => {
    try {
        const userId = req.body.userId
        if(!userId){
            res.status(400).json({msg:"el usuario no existe"})
            return
        }
        const userTasks= await TaskModel.find({userId})

        if(userTasks.length === 0){
            res.status(400).json({msg:"este usuario no tiene tareas :("})
            return
        }

        res.status(200).json({msg:"tareas encontradas:", userTasks})
        return

    } catch (error) {
        console.log(error)
        res.status(500).json({msg:"no se pudo sorry"})
        return
    }
}

export const getAllTasks = async(req:Request, res:Response):Promise<void> => {
    try {
        const allTasks = await TaskModel.find()
        if(!allTasks){
            res.status(400).json({msg:"no hay tareas para mostrar"})
            return
        }
        res.status(200).json({msg:"aqui estan las tareas creadas:", allTasks})
    } catch (error) {
        res.status(500).json({msg:"un error al obtener tareas"})
    }
}

export const updateTask = async(req:Request, res:Response):Promise<void> => {
    try {
        const taskId = req.body._id
        if(!taskId){
            res.status(400).json({msg:"no existe a tarea"})
            return
        }
        const updatedTask = await TaskModel.findByIdAndUpdate(taskId, req.body, {new:true})
        res.status(200).json({msg:"tarea editada con exito", updatedTask})
        return
    } catch (error) {
       res.status(500).json({msg:"error al updatear"}) 
       return
    }
}

export const deleteTask = async(req:Request, res:Response):Promise<void> => {
    try {
        const taskId = req.body._id
        if (!taskId) {
            res.status(400).json({msg:"no se encontro la tarea"})
            return
        }
        const deletedTask = await TaskModel.findByIdAndDelete(taskId)
        res.status(200).json({msg:"se elimino la tarea con exito", deletedTask})
        return
        
    } catch (error) {
        res.status(500).json({msg:"error al eliminar tarea"})
        return
    }
}

