import { useState, useEffect } from 'react'
import Countries from './components/Countries'
import apiService from './services/app.js'

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')

  const handleOnChange = (event) => {
    const query = event.target.value
    setSearch(query)
    
    if (query.length >= 3) {
      apiService.getCountries(query)
        .then(fetchedCountries => {
          setCountries(fetchedCountries)
        })
        .catch(error => {
          console.error('Error:', error)
          setCountries([])
        })
    } else {
      setCountries([])
    }
  }

  const handleCountrySelect = (name) => {
    apiService.getCountry(name)
      .then(country => {
        console.log('Country:', country)
        setCountries([country])
      })
      .catch(error => {
        console.error('Error fetching country:', error)
      })
  }

  return (
    <div>
      <p>find countries</p>
      <input 
        value={search} 
        onChange={handleOnChange} 
        placeholder="Type at least 3 characters"
      />
      <Countries 
        countries={countries} 
        onSelectCountry={handleCountrySelect}
      />
    </div>
  )
}

export default App
