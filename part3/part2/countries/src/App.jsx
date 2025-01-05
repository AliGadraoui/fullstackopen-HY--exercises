import { useState, useEffect } from 'react';
import countriesService from './services/countries';

const Country = ({ country }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area} km²</p>
      <h3>Languages:</h3>
      <ul>
        {Object.values(country.languages).map(language => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt="Flag" width="200px" />
    </div>
  );
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    countriesService.getAll().then(data => setCountries(data));
  }, []);

  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleShow = (country) => {
    setSelectedCountry(country);
  };

  return (
    <div>
      <h2>Find Countries</h2>
      <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />

      {filteredCountries.length > 10 && <p>Too many matches, please specify another filter</p>}

      {filteredCountries.length <= 10 && filteredCountries.length > 1 && (
        <ul>
          {filteredCountries.map(country => (
            <li key={country.cca3}>
              {country.name.common} 
              <button onClick={() => handleShow(country)}>Show</button>
            </li>
          ))}
        </ul>
      )}

      {filteredCountries.length === 1 && <Country country={filteredCountries[0]} />}

      {selectedCountry && <Country country={selectedCountry} />}
    </div>
  );
};

export default App;
