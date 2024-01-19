"use client";
import { Button, Table } from "react-bootstrap";
import { Phone } from "../models/Phone";
import { SyntheticEvent } from "react";
import { DeletePhone } from "../services/phoneservice";
import { useRouter } from "next/navigation";
type Tableprops = {
  phones: Phone[];
  isLogged: boolean;
  setphoneAdded: (c: boolean) => void;
};
function PhonesTable({ phones, isLogged, setphoneAdded }: Tableprops) {
  const router = useRouter();
  function handleDelete(e: SyntheticEvent) {
    DeletePhone(+e.currentTarget.id)
      .then((res) => {
        if (res.ok) {
          setphoneAdded(true);
        } else {
          alert("Greska prilikom brisanja telefona!");
        }
      })
      .catch((err) => console.log(err));
  }
  return (
    <>
      <h2 className="mt-5 text-center">Telefoni</h2>
      <Table bordered size="sm" className="mt-2 text-center">
        <thead className="table-success">
          <tr>
            <th>Proizvodjac</th>
            <th>Model</th>
            <th>Cena (din)</th>
            <th>Kolicina</th>
            {isLogged ? <th>OS</th> : null}
            {isLogged ? <th>Akcija</th> : null}
          </tr>
        </thead>
        <tbody>
          {phones.map((phone) => {
            return (
              <tr key={phone.id}>
                <td>{phone.manufacturerName}</td>
                <td>{phone.model}</td>
                <td>{phone.price}</td>
                <td>{phone.size}</td>
                {isLogged && <td>{phone.operatingSystem}</td>}
                {isLogged && (
                  <td>
                    <Button
                      id={phone.id.toString()}
                      variant="danger"
                      onClick={handleDelete}
                    >
                      Obrisi
                    </Button>
                    <Button
                      id={phone.id.toString()}
                      variant="warning"
                      className="mx-1"
                      onClick={(e) => router.push(`/edit/${e.currentTarget.id}`)}
                    >
                      Izmeni
                    </Button>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}

export default PhonesTable;
