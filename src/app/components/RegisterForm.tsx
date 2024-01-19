import { useState } from "react";
import { Button, Form, Row } from "react-bootstrap";

type RegisterProps = {
    setShowLogin: (c: boolean) => void;
    setshowRegister:(c:boolean) => void
  };
function RegisterForm({setShowLogin,setshowRegister} : RegisterProps) {
    const [username, setusername] = useState<string>("");
    const [password, setpassword] = useState<string>("");
    function handleRegister()
    {
        
    }
  return (
    <>
      <h2 className="text-center">Registracija korisnika</h2>
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
        <Button variant="success" type="button" onClick={handleRegister} className="col-lg-2">
          Registruj se
        </Button>
        <br />
        <Button
          variant="primary"
          type="button"
          className="mt-2 col-lg-2"
          onClick={() => setshowRegister(false)}
        >
          Odustani
        </Button>
        </div>
      </Form>
    </>
  );
}

export default RegisterForm;
