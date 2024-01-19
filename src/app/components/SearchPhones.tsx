import { useState } from "react";
import { Form, Row, Button } from "react-bootstrap";
import { Phone } from "../models/Phone";
import { SearchPhones } from "../services/phoneservice";
type SearchFormProps = {
    setPhones:(phones:Phone[]) => void
}
function SearchPhonesForm({setPhones}:SearchFormProps) {
    const [min, setmin] = useState<number>(0);
    const [max, setmax] = useState<number>(0);
    function handleSearch()
    {
        SearchPhones({min,max})
        .then((res) =>{
            if(res.ok)
            {
                res.json()
                .then(setPhones)
            }
            else
            {
                alert("Greska prilikom pretrage!")
            }
        }).catch((err) => console.log(err))
    }
  return (
    <>
      <Form>
        <Row className="justify-content-center">
          <Form.Group className="mb-3 col-lg-3" controlId="min">
            <Form.Label>Najmanje</Form.Label>
            <Form.Control
              type="number"
              placeholder="Min"
              value={min}
              onChange={(e) => setmin(+e.target.value)}
            />
          </Form.Group>
        </Row>
        <Row className="justify-content-center">
          <Form.Group className="mb-3 col-lg-3" controlId="max">
            <Form.Label>Najvise</Form.Label>
            <Form.Control
              type="number"
              placeholder="Max"
              value={max}
              onChange={(e) => setmax(+e.target.value)}
            />
          </Form.Group>
        </Row>
        <div className="text-center">
          <Button
            variant="success"
            type="button"
            className="col-lg-2"
            onClick={handleSearch}
          >
            Pretrazi
          </Button>
        </div>
      </Form>
    </>
  );
}

export default SearchPhonesForm;
