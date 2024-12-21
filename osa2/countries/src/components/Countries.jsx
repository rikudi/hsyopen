import { useState, useEffect } from 'react'
import Weather from './Weather'
import apiService from '../services/app.js'

const Countries = ({ countries, onSelectCountry }) => {
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    if (countries.length === 1) {
      const country = countries[0]
      if (country.latlng && country.latlng.length >= 2) {
        const [lat, lon] = country.latlng
        apiService.getWeather(lat, lon)
          .then(weatherData => setWeather(weatherData))
          .catch(error => console.error('Error fetching weather:', error))
      }
    }
  }, [countries])

  if (!Array.isArray(countries) || countries.length === 0) {
    return <p>No countries found</p>
  }

  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>
  }

  if (countries.length === 1) {
    const country = countries[0]
    return (
      <div>
        <h2>{country.name.common}</h2>
        <p>Capital: {country.capital}</p>
        <p>Area: {country.area}</p>
        <h3>Languages:</h3>
        <ul>
          {Object.values(country.languages || {}).map(language => 
            <li key={language}>{language}</li>
          )}
        </ul>
        <img 
          src={country.flags.png} 
          alt={`Flag of ${country.name.common}`}
          width="150"
        />
        <Weather weather={weather} capital={country.capital[0]} />
      </div>
    )
  }

  return (
    <ul>
      {countries.map(country => (
        <li key={country.cca3}>
          {country.name.common}
          <button onClick={() => onSelectCountry(country.name.common)}>
            show
          </button>
        </li>
      ))}
    </ul>
  )
}

export default Countries