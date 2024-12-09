import React from 'react';
import { useState } from 'react';
import {Container,Card, Button, Modal} from "react-bootstrap"
import { Barra } from '../Components/Barra';
import { LoginForm } from '../Components/Login';
import { Regist } from '../Components/Regist';


const Home = ()=>{
    const [showL, setShowL] = useState(false);
    const handleCloseL = () => setShowL(false);
    const handleShowL = () => setShowL(true);

    const [showR, setShowR] = useState(false);
    const handleCloseR = () => setShowR(false);
    const handleShowR = () => setShowR(true);
  
    return(
        <>
        <Barra/>
        <Container className='mt-2'>
            <Card>
                <Card.Body className="d-grid gap-2">
                    <Card.Title>¡Hola! </Card.Title>
                    <Card.Text>inicia sesion para comenzar tu ToDoList o si no tienes cuenta puedes registrarte</Card.Text>
                    <Button size="lg" className='mt-3' variant='primary' onClick={handleShowL}><i class="bi bi-person"></i> Login</Button>
                    <Button  variant="outline-primary" onClick={handleShowR}><i class="bi bi-person-add"></i> Regist</Button>
                </Card.Body>
            </Card>
        </Container>

        <Modal show={showL} onHide={handleCloseL}>
            <Modal.Header closeButton>
                <Modal.Title>Inicia sesion</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <LoginForm/>
            </Modal.Body>
        </Modal>

        <Modal show={showR} onHide={handleCloseR}>
            <Modal.Header closeButton>
                <Modal.Title><i class="bi bi-pencil-square"></i> Registrate</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Regist/>
            </Modal.Body>
        </Modal>
        </>
    )
}

export default Home;

