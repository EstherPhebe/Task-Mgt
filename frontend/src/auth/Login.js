import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useRef } from "react";
import Tasks from "../tasks/Tasks";
import { Navigate } from "react-router-dom";

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const res = await axios.post(
        `http://localhost:4040/auth/login`,
        {
          email: emailRef.current.value,
          password: passwordRef.current.value,
        },
        {
          withCredentials: true,
        }
      );
      console.log(emailRef.current.value);

      if (res.status === 200) {
        console.log(`Login successful`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1>Login to Continue</h1>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            ref={emailRef}
            // onChange={(event) => (data.current.email = event.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            ref={passwordRef}
          />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={handleLogin}>
          Login
        </Button>
      </Form>
    </>
  );
}

export default Login;
