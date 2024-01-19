"use client";

import { Manufacturer } from "@/app/models/Manufacturer";
import { Phone } from "@/app/models/Phone";
import GetManufacturers from "@/app/services/manufacturerservice";
import { GetPhone, PutPhone } from "@/app/services/phoneservice";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Form, Row, Button } from "react-bootstrap";

function Edit({ params }: { params: { id: string } }) {
  const [id, setid] = useState<number>(0);
  const [model, setmodel] = useState<string>("");
  const [operatingSystem, setOperatingSystem] = useState<string>("");
  const [size, setsize] = useState<number>(0);
  const [price, setprice] = useState<number>(0);
  const [manufacturerId, setmanufacturerId] = useState<number>(0);
  const [manufacturers,setManufacturers] = useState<Manufacturer[]>([]);
  const router = useRouter();
  useEffect(() => {
    GetPhone(+params.id)
    .then((res) =>{
      if(res.ok)
      {
        res.json()
        .then((phone:Phone) => {
          setid(phone.id)
          setmodel(phone.model)
          setOperatingSystem(phone.operatingSystem)
          setsize(phone.size)
          setprice(phone.price)
        })
      }
      else
      {
        alert("Greska prilikom dobavljanja telefona")
      }
    }).catch((err) => console.log(err))
    GetManufacturers()
      .then((res) =>{
        if(res.ok)
        {
          res.json().then(setManufacturers);
        }
        else
        {
          alert("Greska prilikom ucitavanja proizvodjaca!")
        }
      }).catch((err) => console.log(err));
  });
  function handleSubmit()
  {
      console.log({model,operatingSystem,size,price,manufacturerId,id})
      PutPhone({model,operatingSystem,size,price,manufacturerId,id})
      .then((res) =>{
          if(res.ok)
          {
              router.push("/")
          }
          else
          {
              alert("Greska prilikom izmene telefona!")
          }
      }).catch((err) => console.log(err))
  }
  return (
    <>
     <>
      <h2 className="text-center">Izmena telefona</h2>
      <Form>
        <input type="text" value={id} hidden/>
        <Row className="justify-content-center">
          <Form.Group className="mb-3 col-lg-3" controlId="model">
            <Form.Label>Model</Form.Label>
            <Form.Control
              type="text"
              placeholder="Model"
              value={model}
              onChange={(e) => setmodel(e.target.value)}
            />
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
            />
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
        </Row>
        <Row className="justify-content-center">
          <Form.Group className="mb-3 col-lg-3" controlId="cena">
            <Form.Label>Cena</Form.Label>
            <Form.Control
              type="number"
              placeholder="Cena"
              value={price}
              onChange={(e) => setprice(+e.target.value)}
            />
          </Form.Group>
        </Row>
        <Row className="justify-content-center">
          <Form.Group className="mb-3 col-lg-3">
            <Form.Label htmlFor="manufacturer">Proizvodjac</Form.Label>
            <Form.Select
              id="manufacturer"
              value={manufacturerId}
              onChange={(e) => setmanufacturerId(+e.currentTarget.value)}
            >
              <option>Izaberi</option>
              {manufacturers.map((manufacturer) => {
                return (
                  <option key={manufacturer.id} value={manufacturer.id}>
                    {manufacturer.name}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Group>
        </Row>
        <div className="text-center">
          <Button
            variant="success"
            type="button"
            className="col-lg-2"
            onClick={handleSubmit}
          >
            Izmeni
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

