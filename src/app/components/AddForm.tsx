import { Form, Row, Button } from "react-bootstrap";
import { Manufacturer } from "../models/Manufacturer";
import { SyntheticEvent, useState } from "react";
import { PostPhone } from "../services/phoneservice";
type FormProps = {
  manufacturers: Manufacturer[];
  setphoneAdded: (c: boolean) => void;
};
function AddForm({ manufacturers, setphoneAdded }: FormProps) {
  const [id, setid] = useState<number>(0);
  const [model, setmodel] = useState<string>("");
  const [operatingSystem, setOperatingSystem] = useState<string>("");
  const [size, setsize] = useState<number>(0);
  const [price, setprice] = useState<number>(0);
  const [manufacturerId, setmanufacturerId] = useState<number>(0);
  const [validated, setValidated] = useState<boolean>(false);
  function handleSubmit(event: SyntheticEvent & any) {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      event.stopPropagation();
      PostPhone({ model, operatingSystem, size, price, manufacturerId, id })
        .then((res) => {
          if (res.ok) {
            setphoneAdded(true);
            ResetForm();
            setValidated(false);
          } else {
            alert("Greska prilikom dodavanja telefona!");
          }
        })
        .catch((err) => console.log(err));
    }
    setValidated(true);
  }
  function ResetForm() {
    setid(0);
    setmodel("");
    setOperatingSystem("");
    setprice(0);
    setmanufacturerId(0);
    setsize(0);
    setValidated(false)
  }
  return (
    <>
      <h2 className="text-center">Dodavanje novog telefona</h2>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="justify-content-center">
          <Form.Group className="mb-3 col-lg-3" controlId="model">
            <Form.Label>Model</Form.Label>
            <Form.Control
              type="text"
              placeholder="Model"
              value={model}
              onChange={(e) => setmodel(e.target.value)}
              required
            />
            <Form.Control.Feedback type="invalid">
              Unesite model telefona
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="justify-content-center">
          <Form.Group className="mb-3 col-lg-3" controlId="OS">
            <Form.Label>Operativni sistem</Form.Label>
            <Form.Control
              type="text"
              placeholder="Operativni sistem"
              value={operatingSystem}
              onChange={(e) => setOperatingSystem(e.target.value)}
              required
            />
            <Form.Control.Feedback type="invalid">
              Unesite operativni sistem telefona
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="justify-content-center">
          <Form.Group className="mb-3 col-lg-3" controlId="kolicina">
            <Form.Label>Kolicina</Form.Label>
            <Form.Control
              type="number"
              placeholder="Kolicina"
              value={size}
              onChange={(e) => setsize(+e.target.value)}
            />
          </Form.Group>
          <Form.Control.Feedback type="invalid">
            Unesite kolicinu telefona
          </Form.Control.Feedback>
        </Row>
        <Row className="justify-content-center">
          <Form.Group className="mb-3 col-lg-3" controlId="cena">
            <Form.Label>Cena</Form.Label>
            <Form.Control
              type="number"
              placeholder="Cena"
              value={price}
              onChange={(e) => setprice(+e.target.value)}
              required
              min={1}
            />
            <Form.Control.Feedback type="invalid">
              Cena mora biti veca od nule
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="justify-content-center">
          <Form.Group className="mb-3 col-lg-3">
            <Form.Label htmlFor="manufacturer">Proizvodjac</Form.Label>
            <Form.Select
              id="manufacturer"
              onChange={(e) => setmanufacturerId(+e.currentTarget.value)}
              required
              value={manufacturerId}            >
              <option value={""}>Izaberi</option>
              {manufacturers.map((manufacturer) => {
                return (
                  <option key={manufacturer.id} value={manufacturer.id}>
                    {manufacturer.name}
                  </option>
                );
              })}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Izaberite proizvodjaca telefona
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <div className="text-center">
          <Button variant="success" type="submit" className="col-lg-2">
            Dodaj
          </Button>
          <br />
          <Button
            variant="primary"
            type="button"
            className="mt-2 col-lg-2"
            onClick={ResetForm}
          >
            Odustani
          </Button>
        </div>
      </Form>
    </>
  );
}

export default AddForm;
