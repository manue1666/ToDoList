import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import axios from 'axios';
import Swal from 'sweetalert2'

export const EditTask = ({ task, onUpdate, onClose }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [finDate, setFinDate] = useState(task.finDate);
  const [estado, setEstado] = useState(task.estado);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put('http://localhost:4000/task/update', {
        _id: task._id,
        title,
        description,
        finDate,
        estado
      });
      onUpdate();
      onClose();
      Swal.fire({
        icon: "success",
        title: "tarea actualizada con exito",
        showConfirmButton: false,
        timer: 1500,
        willClose: ()=> { window.location.reload() }
      });
    } catch (error) {
      console.log('No se pudo actualizar la tarea', error);
      Swal.fire({
        icon: "error",
        title: "error al actualizar",
        showConfirmButton: false,
        timer: 1500,
        willClose: ()=> { window.location.reload() }
      });
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Nuevo título</Form.Label>
          <Form.Control value={title} onChange={(e) => setTitle(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Nueva descripción</Form.Label>
          <Form.Control value={description} onChange={(e) => setDescription(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Nueva fecha de vencimiento</Form.Label>
          <Form.Control type="datetime-local" value={finDate} onChange={(e) => setFinDate(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group className="mt-3">
          <Button type="submit">Ok</Button>
        </Form.Group>
      </Form>
    </Container>
  );
};
