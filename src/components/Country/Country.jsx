import { useEffect, useState } from "react";
import { Image, ListGroup, ListGroupItem } from "react-bootstrap";

import axios from "axios";

/**
 * Component to display detailed information about a single country.
 * 
 * If there is exactly one country in the `filteringCountries` array, it fetches the current weather data
 * for the country's capital city using the OpenWeatherMap API and displays it along with the country's
 * flag, name, capital, area, and languages.
 * 
 * @param {Object[]} filteringCountries - Array containing a single country object with details to display.
 * @returns {ReactElement|null} A component displaying the country and weather details, or null if no country is selected.
 */
const Country = ({ filteringCountries }) => {
  const [weatherCity, setWeatherCity] = useState("");
  const country = filteringCountries[0];
  const api_key = import.meta.env.VITE_SOME_KEY;

  useEffect(() => {
    if (filteringCountries.length === 1) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${api_key}&units=metric`
        )
        .then((response) => setWeatherCity(response.data));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteringCountries, api_key]);

  if (filteringCountries.length === 1) {
    const flag = country.flags.png;
    const icon = weatherCity && weatherCity.weather[0].icon;
    const codeIcon = `https://openweathermap.org/img/wn/${icon}@2x.png`;

    return (
      <div>
        <h1>{country.name.common}</h1>
        <p>
          <strong>Capital:</strong> {country.capital}
        </p>
        <p>
          <strong>Area:</strong> {country.area}
        </p>
        <h3>Languages: </h3>
        <ListGroup variant="flush" style={{ border: "none" }}>
          {Object.values(country.languages).map((language) => (
            <ListGroupItem key={language} style={{ border: "none" }}>
              <i className="bi bi-translate"></i> {language}
            </ListGroupItem>
          ))}
        </ListGroup>
        <Image rounded src={flag} width="250" />
        <h2 className="mt-3">Weather in {country.capital}</h2>
        <p>
          <strong>
            <i className="bi bi-thermometer-low"></i> Temperature:
          </strong>{" "}
          {weatherCity && weatherCity.main.temp} Celcius
        </p>
        <Image rounded src={codeIcon} alt="" width="250" />
        <p>
          <strong>
            <i className="bi bi-cloud-haze2-fill"></i> Wind:
          </strong>{" "}
          {weatherCity && weatherCity.wind.speed} m/s
        </p>
      </div>
    );
  }
};

export default Country;
