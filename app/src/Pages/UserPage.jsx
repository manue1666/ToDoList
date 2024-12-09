import { Button, Container, Modal } from "react-bootstrap"
import { BarraUser } from "../Components/Barra";
import { useState } from "react";
import { CreateTask } from "../Components/CreateTask";
import { UserTasks } from "../Components/UserTasks";

const UserPage = ()=> {
    const [showCT, setShowCT] = useState(false);
    const handleCloseCT = () => setShowCT(false);
    const handleShowCT = () => setShowCT(true);


    return(
        <>
        <BarraUser/>
        <Container className="mt-3">
        </Container>
        <Container className="d-grid gap-2">
            <Button variant="outline-success" size="lg" onClick={handleShowCT}><i class="bi bi-plus-square"></i> Crear Tarea</Button>
        </Container>
        <Container className="mt-3">
            <UserTasks/>
        </Container>

        <Modal show={showCT}
            onHide={handleCloseCT}
            backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title> Crear Tarea</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <CreateTask/>
            </Modal.Body>
        </Modal>
        </>
    )
}

export default UserPage;