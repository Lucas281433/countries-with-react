import { Button, Card } from "react-bootstrap";

import funnyCountries from "../../assets/funnyCountries.jpg";

/**
 * Component to display a list of countries based on the number of matches.
 * 
 * If there are more than 10 countries, a message is displayed asking to specify another filter.
 * If the number of countries is between 2 and 10, it displays each country with a button to select it.
 * 
 * @param {Object[]} filteringCountries - Array of country objects to be filtered and displayed.
 * @param {Function} handlerSelect - Function to handle the selection of a country.
 * 
 * @returns {ReactElement|null} A Card component or a list of countries with a button, or null.
 */
const Countries = ({ filteringCountries, handlerSelect }) => {
  if (filteringCountries.length > 10) {
    return (
    <Card border="primary">
      <Card.Body>
        <p className="text-center mb-0">Too many matches, specify anoter filter</p>
      </Card.Body>
        <Card.Img src={funnyCountries}/>
    </Card>
  );
  }

  if (filteringCountries.length < 10 && filteringCountries.length > 1) {
    return (
      <div>
        {filteringCountries.map((countries) => (
          <div className="mb-2" key={countries.name.common}>
            {countries.name.common}
            {""}{" "}
            <Button
              variant="outline-primary"
              size="sm"
              onClick={() => handlerSelect(countries.name.common)}
            >
              Show
            </Button>
          </div>
        ))}
      </div>
    );
  }

  return null;
};

export default Countries;
