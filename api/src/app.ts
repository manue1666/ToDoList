import express, { Application, Request, Response } from "express";
import cors from "cors"
import { login, registerUsers } from "./Controllers/UsersController";

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




export default app;