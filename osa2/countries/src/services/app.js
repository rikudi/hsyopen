import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather'
const weatherApiKey = import.meta.env.VITE_WEATHER_API_KEY

const getCountries = async (query) => {
  if (!query || query.length < 3) return []
  
  try {
    const response = await axios.get(`${baseUrl}/all`)
    const countries = response.data
    const filtered = countries.filter(country => 
      country.name.common.toLowerCase().includes(query.toLowerCase())
    )
    console.log('Filtered Countries:', filtered)
    return filtered
  } catch (error) {
    console.error('Error fetching countries:', error)
    return []
  }
}

const getCountry = async (name) => {
  try {
    const response = await axios.get(`${baseUrl}/name/${name}`)
    const country = response.data[0]
    return country
  } catch (error) {
    console.error('Error fetching country:', error)
    return null
  }
}

const getWeather = async (lat, lon) => {
  try {
    const response = await axios.get(weatherUrl, {
      params: {
        lat,
        lon,
        appid: weatherApiKey,
        units: 'metric' 
      }
    })
    return response.data
  } catch (error) {
    console.error('Error fetching weather:', error)
    return null
  }
}

export default { getCountries, getCountry, getWeather }