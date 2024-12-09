import { model, Schema } from "mongoose";
import { ITask } from "../GlobalTypes";

 
const TaskSchema = new Schema<ITask>({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    finDate:{
        type:Date,
        required:true
    },
    userId:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:"users"
    },
    estado:{
        type:String,
        enum:["inProcess","completed"],
        default:"inProcess"
    }
})

export const TaskModel = model("tasks", TaskSchema)