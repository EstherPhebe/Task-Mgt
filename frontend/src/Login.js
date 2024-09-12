import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from "axios"
import { useState } from "react"

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')



  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const res = await axios.post(`http://localhost:4040/api/login`, {
        email: email,
        password: password
      });
      if (res.status === 200) {
        console.log(`Login successful`, res.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={(event) => { setEmail(event.target.value) }} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Enter password" onChange={(event) => { setPassword(event.target.value) }} />
      </Form.Group>
      <Button variant="primary" type="submit" onClick={handleLogin}>
        Login
      </Button>
    </Form>
  );
}

export default Login;