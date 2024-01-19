const manufacturersapi ="https://localhost:44377/api/proizvodjaci";
export default function GetManufacturers()
{
    return fetch(manufacturersapi);
}