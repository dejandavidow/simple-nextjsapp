"use client";
import { useEffect, useState } from "react";
import PhonesTable from "./components/PhonesTable";
import {GetPhones} from "./services/phoneservice";
import { Phone } from "./models/Phone";
import { Button, Row } from "react-bootstrap";
import LoginForm from "./components/LoginForm";
import Userinfo from "./components/Userinfo";
import AddForm from "./components/AddForm";
import GetManufacturers from "./services/manufacturerservice";
import { Manufacturer } from "./models/Manufacturer";
import SearchPhonesForm from "./components/SearchPhones";
import RegisterForm from "./components/RegisterForm";

export default function Home() {
  const [phones, setPhones] = useState<Phone[]>([]);
  const [showLogin, setShowLogin] = useState<boolean>(false);
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [manufactures,setManufacturers] = useState<Manufacturer[]>([]);
  const [phoneAdded, setphoneAdded] = useState<boolean>(false);
  const [showRegister,setshowRegister] = useState<boolean>(false);
  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      setIsLogged(true);
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
    }
    GetPhones()
      .then((res) => {
        if (res.ok) {
          res.json().then(setPhones);
          setphoneAdded(false);
        } else {
          alert("Desila se greska prilokom ucitavanja telefona!");
        }
      })
      .catch((err) => console.log(err));
  }, [isLogged,phoneAdded]);
  return (
    <>
      {isLogged ? (
        <Userinfo setIsLogged={setIsLogged} />
      ) : (
        !showLogin && !showRegister && (
          <h2 className="text-center">Korisnik nije prijavljen na sistem</h2>
        )
      )}
      {!showLogin && !isLogged && !showRegister &&(
        <div>
          <Row className="justify-content-center">
            <Button className="col-lg-2" onClick={() => setShowLogin(true)}>
              Prijava
            </Button>
          </Row>
          <Row className="justify-content-center">
            <Button variant="secondary" className="col-lg-2 mt-1" onClick={() => setshowRegister(true)}>
              Registracija
            </Button>
          </Row>
        </div>
      )}
      {showLogin && (
        <LoginForm setShowLogin={setShowLogin} setIsLogged={setIsLogged} />
      )}
      {showRegister && <RegisterForm setShowLogin={setShowLogin} setshowRegister={setshowRegister}/>}
      {isLogged ? <SearchPhonesForm setPhones={setPhones}/> : null}
      <PhonesTable phones={phones} isLogged={isLogged} setphoneAdded={setphoneAdded}/>
      {isLogged ? <AddForm manufacturers={manufactures} setphoneAdded={setphoneAdded}/> : null}
    </>
  );
}
