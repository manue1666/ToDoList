import express, { Application, Request, Response } from "express";
import cors from "cors"
import { getAllUsers, login, registerUsers } from "./Controllers/UsersController";
import { createTask, deleteTask, getAllTasks, getTasks, updateTask } from "./Controllers/TasksControllers";

const app: Application = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/",(_req: Request, res: Response) => {
    res.send("hola desde el servidor TS")
});

//rutas para regist y login
app.post("/users/regist", registerUsers)
app.post("/users/login", login)

app.get("/allusers/get", getAllUsers)

// Crud tareas:
app.post("/task/create", createTask)
app.post("/usertask/get", getTasks)
app.get("/alltask/get", getAllTasks)
app.put("/task/update", updateTask)
app.delete("/task/delete", deleteTask)





export default app;