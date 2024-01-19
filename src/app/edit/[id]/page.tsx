"use client";

import { Manufacturer } from "@/app/models/Manufacturer";
import { Phone } from "@/app/models/Phone";
import GetManufacturers from "@/app/services/manufacturerservice";
import { GetPhone, PutPhone } from "@/app/services/phoneservice";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useEffect, useState } from "react";
import { Form, Row, Button } from "react-bootstrap";

function Edit({ params }: { params: { id: string } }) {
  const [id, setid] = useState<number>(0);
  const [model, setmodel] = useState<string>("");
  const [operatingSystem, setOperatingSystem] = useState<string>("");
  const [size, setsize] = useState<number>(0);
  const [price, setprice] = useState<number>(0);
  const [manufacturerId, setmanufacturerId] = useState<number>(0);
  const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);
  const [validated, setValidated] = useState<boolean>(false);

  const router = useRouter();
  useEffect(() => {
    GetPhone(+params.id)
      .then((res) => {
        if (res.ok) {
          res.json().then((phone: Phone) => {
            setid(phone.id);
            setmodel(phone.model);
            setOperatingSystem(phone.operatingSystem);
            setsize(phone.size);
            setprice(phone.price);
          });
        } else {
          alert("Greska prilikom dobavljanja telefona");
        }
      })
      .catch((err) => console.log(err));
    GetManufacturers()
      .then((res) => {
        if (res.ok) {
          res.json().then(setManufacturers);
        } else {
          alert("Greska prilikom ucitavanja proizvodjaca!");
        }
      })
      .catch((err) => console.log(err));
  }, []);
  function handleSubmit(event: SyntheticEvent | any) {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      event.stopPropagation();
      PutPhone({ model, operatingSystem, size, price, manufacturerId, id })
        .then((res) => {
          if (res.ok) {
            router.push("/");
          } else {
            alert("Greska prilikom izmene telefona!");
          }
        })
        .catch((err) => console.log(err));
    }
    setValidated(true)
  }
  return (
    <>
      <>
        <h2 className="text-center">Izmena telefona</h2>
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
                value={manufacturerId}
              >
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
              onClick={() => router.push("/")}
            >
              Odustani
            </Button>
          </div>
        </Form>
      </>
    </>
  );
}

export default Edit;
