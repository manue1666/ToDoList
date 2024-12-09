import { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Card, ButtonGroup, Button, Modal } from 'react-bootstrap';
import { EditTask } from './EditTask';
import Swal from 'sweetalert2'

export const UserTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showET, setShowET] = useState(false);

  const handleCloseET = () => setShowET(false);
  const handleShowET = (task) => {
    setSelectedTask(task);
    setShowET(true);
  };

  useEffect(() => {
    getUserTasks();
  }, []);

  const getUserTasks = async () => {
    const userId = JSON.parse(localStorage.user)._id;
    try {
      const res = await axios.post('http://localhost:4000/usertask/get', { userId });
      const sortedTasks = res.data.userTasks.sort((a, b) => new Date(a.finDate) - new Date(b.finDate));
      setTasks(sortedTasks);
    } catch (error) {
      console.log('No se pudo obtener las tareas');
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete('http://localhost:4000/task/delete', { data: { _id: taskId } });
      setTasks(tasks.filter(task => task._id !== taskId));
      Swal.fire({
        icon: "success",
        title: "tarea eliminada con exito",
        showConfirmButton: false,
        timer: 1500,
        willClose: ()=> { window.location.reload() }
      });
    } catch (error) {
      console.log('No se pudo eliminar la tarea chale', error);
    }
  }
  const completedTask = async (task) => {
    try {
      await axios.put('http://localhost:4000/task/update', {
        _id: task._id,
        title: task.title,
        description: task.description,
        finDate: task.finDate,
        estado: 'completed'
      })
      getUserTasks();
      Swal.fire({
        icon: "success",
        title: "Tarea marcada como completada",
        showConfirmButton: false,
        timer: 1500,
        willClose: ()=> { window.location.reload() }
      })
    } catch (error) {
      console.log('No se pudo actualizar la tarea', error);
      Swal.fire({
        icon: "error",
        title: "Error al actualizar la tarea",
        showConfirmButton: false,
        timer: 1500
      });
    }
  }
  

  return (
    <>
      <Container>
        {tasks.map(({ _id, title, description, finDate, estado }) => (
          <Card key={_id} className="mb-3">
            <Card.Body>
              <Card.Title>{title}</Card.Title>
              <Card.Text>{description}</Card.Text>
              <Card.Text>fecha de vencimiento:<br />{new Date(finDate).toLocaleString()}</Card.Text>
              <Card.Text>{estado}</Card.Text>
            </Card.Body>
            <Card.Body className="d-flex align-items-center">
              <Button variant="success" onClick={() => completedTask({ _id, title, description, finDate, estado })}><i class="bi bi-check"></i> Completada</Button>
              <ButtonGroup className="ms-auto">
                <Button variant="outline-info" onClick={() => handleShowET({_id, title, description, finDate, estado})}> <i class="bi bi-pencil"></i> Editar</Button>
                <Button variant="outline-danger" onClick={() => deleteTask(_id)}><i class="bi bi-trash"></i> Eliminar</Button>
              </ButtonGroup>
            </Card.Body>
          </Card>
        ))}
      </Container>
      {selectedTask && (
        <Modal show={showET}
          onHide={handleCloseET}
          backdrop="static">
          <Modal.Header closeButton>
            <Modal.Title>Editar Tarea</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <EditTask task={selectedTask} onUpdate={getUserTasks} onClose={handleCloseET} />
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};
