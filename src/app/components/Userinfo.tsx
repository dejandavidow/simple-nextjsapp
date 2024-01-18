"use client";
import { Button } from "react-bootstrap";
type InfoProps = {
  setIsLogged: (c: boolean) => void;
};
function Userinfo({ setIsLogged }: InfoProps) {
  let username : string | null = localStorage.getItem("user");
  function handleLogOut() {
    setIsLogged(false);
    localStorage.clear();
  }
  return (
    <div className="text-center">
      <h4>Prijavljeni korisnik:{username}</h4>
      <Button variant="warning" onClick={handleLogOut}>
        Odjava
      </Button>
    </div>
  );
}

export default Userinfo;
