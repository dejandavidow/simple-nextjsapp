"use client";
import { Button, Form, Row } from "react-bootstrap";
import Login from "../services/authservice";
import {useState } from "react";
type LoginProps = {
  setShowLogin: (c: boolean) => void
  setIsLogged:(c:boolean) => void
};
function LoginForm({ setShowLogin,setIsLogged}: LoginProps) {
  const [username, setusername] = useState<string>("");
  const [password, setpassword] = useState<string>("");
  function handleLogin() {
    if(username && password)
    {
        Login({username,password})
    .then((res) => {
        if(res.ok)
        {
            res.json()
            .then((data) =>{
                localStorage.setItem("jwt",data.token);
                localStorage.setItem("user",data.username);
                setShowLogin(false);
                setIsLogged(true)
            })
        }
        else
        {
            alert("Pogresno ime ili lozinka!")
            setusername("");
            setpassword("");
        }
    }).catch((err) => console.log(err))
    }
    else
    {
        alert("Unesite korisnicko ime i lozinku!")
    }
  }
  return (
    <>
      <h2 className="text-center">Prijava korisnika</h2>
      <Form>
        <Row className="justify-content-center">
          <Form.Group className="mb-3 col-lg-3" controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setusername(e.target.value)}
            />
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
            />
          </Form.Group>
        </Row>
        <div className="text-center">
        <Button variant="success" type="button" onClick={handleLogin} className="col-lg-2">
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
