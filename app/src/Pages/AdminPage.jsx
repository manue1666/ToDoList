import { useState, useEffect } from "react";
import axios from "axios";
import { Card, Container } from "react-bootstrap";
import { BarraAdmin } from "../Components/Barra";

const AdminPage = () => {
  const [taskCount, setTaskCount] = useState(0);
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    taskNumber();
    usersNumber();
  }, []);

  const taskNumber = async () => {
    try {
      const res = await axios.get("http://localhost:4000/alltask/get")
      setTaskCount(res.data.allTasks.length)
    } catch (error) {
      console.error("No se pudo obtener la cantidad de tareas", error)
    }
  };

  const usersNumber = async () => {
    try {
      const res = await axios.get("http://localhost:4000/allusers/get")
      setUserCount(res.data.allUsers.length)
    } catch (error) {
      console.error("No se pudo obtener la cantidad de usuarios", error)
    }
  };

  return (
    <>
      <BarraAdmin />
      <Container className="mt-4">
        <Card>
          <Card.Header>
            <Card.Title><i class="bi bi-people"></i> Dashboard de Usuarios:</Card.Title>
          </Card.Header>
          <Card.Body>
            <h5>Total de Usuarios: {userCount}</h5>
          </Card.Body>
        </Card>
      </Container>
      <Container className="mt-4">
        <Card>
          <Card.Header>
            <Card.Title><i class="bi bi-list-task"></i> Dashboard de Tareas:</Card.Title>
          </Card.Header>
          <Card.Body>
            <h5>Total de Tareas: {taskCount}</h5>
          </Card.Body>
        </Card>
      </Container>
    </>
  )
}

export default AdminPage
