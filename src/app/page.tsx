"use client";
import { useEffect, useState } from "react";
import PhonesTable from "./components/PhonesTable";
import GetPhones from "./services/phoneservice";
import { Phone } from "./models/Phone";
import { Button, Row } from "react-bootstrap";
import LoginForm from "./components/LoginForm";
import Userinfo from "./components/Userinfo";

export default function Home() {
  const [phones, setPhones] = useState<Phone[]>([]);
  const [showLogin, setShowLogin] = useState<boolean>(false);
  const [isLogged, setIsLogged] = useState<boolean>(false);
  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      setIsLogged(true);
    }
    GetPhones()
      .then((res) => {
        if (res.ok) {
          res.json().then(setPhones);
        } else {
          alert("Desila se greska prilokom ucitavanja telefona!");
        }
      })
      .catch((err) => console.log(err));
  }, [isLogged]);
  return (
    <>
      {isLogged ? (
        <Userinfo setIsLogged={setIsLogged} />
      ) : (
        !showLogin && (
          <h2 className="text-center">Korisnik nije prijavljen na sistem</h2>
        )
      )}
      {!showLogin && !isLogged && (
        <div>
          <Row className="justify-content-center">
            <Button className="col-lg-2" onClick={() => setShowLogin(true)}>
              Prijava
            </Button>
          </Row>
          <Row className="justify-content-center">
            <Button variant="secondary" className="col-lg-2 mt-1">
              Registracija
            </Button>
          </Row>
        </div>
      )}
      {showLogin && (
        <LoginForm setShowLogin={setShowLogin} setIsLogged={setIsLogged} />
      )}
      <PhonesTable phones={phones} isLogged={isLogged} />
    </>
  );
}
