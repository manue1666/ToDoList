import {Container, Nav,Navbar} from "react-bootstrap"
import { useNavigate } from "react-router"

export const Barra = ()=>{
    return(
        <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/"><i class="bi bi-card-checklist"></i> ToDoList</Navbar.Brand>
          <Nav className="me-auto">
          </Nav>
        </Container>
      </Navbar>
        </>
    )
}

export const BarraUser = () => {

  const user= JSON.parse(localStorage.user)
  const navigate = useNavigate()

  const logout =()=>{
    localStorage.clear()
    navigate("/")
  }

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/user"><i class="bi bi-card-checklist"></i> ToDoList</Navbar.Brand>
          <Nav className="me-auto">
            <Navbar.Text>Bienvenido: {user.name}</Navbar.Text>
          </Nav>
          <Nav className="ms-auto">
            <Nav.Link onClick={()=>logout()}><i class="bi bi-box-arrow-right"></i> Logout</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  )
}

export const BarraAdmin = ()=>{
  const user= JSON.parse(localStorage.user)
  const navigate = useNavigate()

  const logout =()=>{
    localStorage.clear()
    navigate("/")
  }
  return(
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/user"><i class="bi bi-card-checklist"></i> ToDoList</Navbar.Brand>
          <Nav className="me-auto">
            <Navbar.Text>Bienvenido admin: {user.name}</Navbar.Text>
          </Nav>
          <Nav className="ms-auto">
            <Nav.Link onClick={()=>logout()}><i class="bi bi-box-arrow-right"></i> Logout</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  )
}


