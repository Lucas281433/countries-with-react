import { useEffect, useState } from "react";
import { Container, Form, InputGroup } from "react-bootstrap";

import countriesService from "./services/countries";
import Country from "./components/Country/Country";
import Countries from "./components/Countries/Countries";

  /**
   * Main App component.
   *
   * Contains the search input and a switch to choose between showing
   * one country or multiple countries.
   *
   * @return {ReactElement} The App component.
   */
  
const App = () => {
  const [countries, setCountries] = useState([]);
  const [countriesToFind, setCountriesToFind] = useState("");

  useEffect(() => {
    countriesService.getAll().then((returnedContries) => {
      setCountries(returnedContries);
    });
  }, []);

  /**
   * Handles the change event on the search input.
   * 
   * Sets the `countriesToFind` state to the value of the search input.
   * 
   * @param {React.ChangeEvent<HTMLInputElement>} event - The change event.
   */
  const handleChange = (event) => {
    setCountriesToFind(event.target.value);
  };

  const filteringCountries = countries.filter((country) =>
    country.name.common.toLowerCase().startsWith(countriesToFind.toLowerCase())
  );

  /**
   * Handles the select event of a country.
   *
   * Sets the `countriesToFind` state to the selected country.
   *
   * @param {string} selectedCountry - The selected country.
   */
  const handlerSelect = (selectedCountry) => {
    setCountriesToFind(selectedCountry);
  };

  return (
    <Container className="container">
      <div>
        <InputGroup className="input-style">
          <InputGroup.Text>
            <i className="bi bi-search fs-4 me-2" />
          </InputGroup.Text>
          <Form.Control
            placeholder="Find Countries"
            onChange={handleChange}
            size="small"
          />
        </InputGroup>

        <Countries
          filteringCountries={filteringCountries}
          handlerSelect={handlerSelect}
        />
        <Country filteringCountries={filteringCountries} />
      </div>
    </Container>
  );
};

export default App;
