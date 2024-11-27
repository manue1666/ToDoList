import mongoose from "mongoose";
import app from "./app";


async function main() {
    try {
        await mongoose.connect("mongodb://localhost:27017/tododb");
        console.log("Aplicacion conectada a la base de datos");
        app.listen(4000, ()=>{
            console.log("Aplicacion corriendo perron")
        })
    } catch (error) {
        console.log("algo salio mal con la base de datos")
    }
}
main()