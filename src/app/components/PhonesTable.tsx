"use client";
import { Button, Table } from "react-bootstrap";
import { Phone } from "../models/Phone";
type Tableprops = {
  phones: Phone[];
  isLogged:boolean
};
function PhonesTable({ phones,isLogged}: Tableprops) {
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
                    <Button variant="danger">Obrisi</Button>
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
