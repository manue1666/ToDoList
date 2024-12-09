
import { useState } from "react";
import { Button, Form } from "react-bootstrap"
import { useNavigate } from "react-router";
import axios from "axios"
import Swal from 'sweetalert2'

export const CreateTask = ()=>{

    const navigate = useNavigate();

    const[task, setTask]= useState({
        title:"",
        description:"",
        finDate:"2024-01-01T00:00",
        userId: JSON.parse(localStorage.user)._id,
        estado:"inProcess"
    });

    const onChangeTitle = (e)=>{
        e.preventDefault()
        const data = task
        data.title = e.target.value
        setTask({...data})
    };

    const onChangeDescription = (e)=>{
        e.preventDefault()
        const data = task
        data.description = e.target.value
        setTask({...data})
    };

    const onChangeDate=(e)=>{
        e.preventDefault()
        const data= task
        data.finDate = e.target.value
        setTask({...data})
    };

    const onSubmit= async ()=>{
        try {
            if(task.title===""||task.description===""){
                Swal.fire({
                    icon: "error",
                    title: "datos incompletos",
                    showConfirmButton: false,
                    timer: 1500,
                    willClose: ()=> { window.location.reload() }
                  });
            }else{
                await axios.post("http://localhost:4000/task/create",task)
                Swal.fire({
                    icon: "success",
                    title: "tarea creada con exito",
                    showConfirmButton: false,
                    timer: 1500,
                    willClose: ()=> { window.location.reload() }
                })            
            }
 

        } catch (error) {
            console.log(error)
            alert("error en el cach")
        }
        console.log(task)
    }


    return(
        <>
        <Form>
            <Form.Group className="mb-3">
                <Form.Label>Titulo</Form.Label>
                <Form.Control value={task.title} onChange={onChangeTitle} placeholder="ingresa un titulo"></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Descripcion</Form.Label>
                <Form.Control value={task.description} onChange={onChangeDescription} placeholder="ingresa una descripcion"></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Ingresa la fecha de vencimiento:</Form.Label>
                <Form.Control value={task.finDate} onChange={onChangeDate} type="datetime-local"></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
                <Button variant="success" onClick={()=>onSubmit()}><i class="bi bi-plus-square"></i> Crear</Button>
            </Form.Group>
        </Form>
        </>
    )
}


