import { SyntheticEvent, useState } from "react";
import { Button, Form, Row } from "react-bootstrap";
import { Register } from "../services/authservice";

type RegisterProps = {
  setShowLogin: (c: boolean) => void;
  setshowRegister: (c: boolean) => void;
};
function RegisterForm({ setShowLogin, setshowRegister }: RegisterProps) {
  const [username, setusername] = useState<string>("");
  const [password, setpassword] = useState<string>("");
  const [email, setemail] = useState<string>("");
  const [validated, setValidated] = useState<boolean>(false);

  function handleSubmit(event: SyntheticEvent | any) {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      event.stopPropagation();
      Register({ email, username, password })
        .then((res) => {
          if (res.ok) {
            alert("Uspesna registracija!")
            setshowRegister(false);
            setShowLogin(true);
          } else {
            alert("Greska prilikom registracije");
          }
        })
        .catch((err) => console.log(err));
    }
    setValidated(true);
  }
  return (
    <>
      <h2 className="text-center">Registracija korisnika</h2>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="justify-content-center">
          <Form.Group className="mb-3 col-lg-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              required
            />
            <Form.Control.Feedback type="invalid">
              Unesite validan email
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
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
