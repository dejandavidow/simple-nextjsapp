"use client";
import { Button, Form, Row } from "react-bootstrap";
import {Login} from "../services/authservice";
import { SyntheticEvent, useState } from "react";
type LoginProps = {
  setShowLogin: (c: boolean) => void;
  setIsLogged: (c: boolean) => void;
};
function LoginForm({ setShowLogin, setIsLogged }: LoginProps) {
  const [username, setusername] = useState<string>("");
  const [password, setpassword] = useState<string>("");
  const [validated, setValidated] = useState<boolean>(false);
  function handleSubmit(event: SyntheticEvent | any) {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      Login({ username, password })
        .then((res) => {
          if (res.ok) {
            res.json().then((data) => {
              localStorage.setItem("jwt", data.token);
              localStorage.setItem("user", data.username);
              setShowLogin(false);
              setIsLogged(true);
            });
          } else {
            alert("Pogresno ime ili lozinka!");
            setusername("");
            setpassword("");
          }
        })
        .catch((err) => console.log(err));
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  }
  function handleLogin() {
    if (username && password) {
    } else {
      alert("Unesite korisnicko ime i lozinku!");
    }
  }
  return (
    <>
      <h2 className="text-center">Prijava korisnika</h2>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="justify-content-center">
          <Form.Group className="mb-3 col-lg-3" controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setusername(e.target.value)}
              required
            />
            <Form.Control.Feedback type="invalid">
              Unesite korisnicko ime
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="justify-content-center">
          <Form.Group className="mb-3 col-lg-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              required
            />
            <Form.Control.Feedback type="invalid">
              Unesite lozinku
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <div className="text-center">
          <Button variant="success" type="submit" className="col-lg-2">
            Uloguj se
          </Button>
          <br />
          <Button
            variant="primary"
            type="button"
            className="mt-2 col-lg-2"
            onClick={() => setShowLogin(false)}
          >
            Odustani
          </Button>
        </div>
      </Form>
    </>
  );
}

export default LoginForm;
