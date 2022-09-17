import { useEffect, useState } from "react";
import axios from "axios";

const CountrySimple = ({name, keyName, setFilter}) => (
  <div>
    <span>{name}</span>
    <button onClick={() => setFilter(name)}>show</button>
  </div>
)

const CountryDetailed = ({country}) => {
  const [weather, setWeather] = useState({temp: '', wind: ''})
  const languages = Object.values(country.languages).map(language => <li key={language}>{language}</li>)
  useEffect(() => {
    getWeather(country.capitalInfo.latlng).then((res) => {
      if(res) {
        setWeather(
          {
            temp: res.data.main.temp,
            wind: res.data.wind.speed
          }
        )
      } else {
        setWeather(
          {
            temp: 'Error fetching data',
            wind: 'Error fetching data'
          }
        )
      }
    })
  }, [])
  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>Capital: {country.capital}</div>
      <div>Area: {country.area}</div>

      <h2>Languages</h2>
      <ul>
        {languages}
      </ul>

      <img src={country.flags.png} alt={country.name.common + '\'s Flag'}/>

      <h2>Weather in {country.capital}</h2>
      <div>Temperature: {weather.temp} Celcius</div>
      <div>Wind: {weather.wind} m/s</div>
    </div>
  )
}

const getWeather = (coord) => {
  let apiKey = process.env.REACT_APP_OPEN_WEATHER_API_KEY,
      lat = coord[0],
      long = coord[1],
      url = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${long}&appid=${apiKey}`
  return axios.get(url).then((res) => {
    console.log('getWeather res', res)
    return res
  }).catch((error) => {
    if (error.response) {
      console.log(error.response.data)
    } else if (error.request) {
      console.log(error.request)
    } else {
      console.log('Error', error.message)
    }
    console.log('Error', error.config);
  })
}

function App() {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState('')

  const handleInputChange = (event) => {
    setFilter(event.target.value)
  }

  const showCountry = (name) => {
    return name.toLowerCase().includes(filter.toLowerCase())
  }

  const countryData = () => {
    let filteredCountries = Object.values(countries).filter(countryName => showCountry(countryName.name.common))
    if (filter === '') {
      return 'Please specify a filter above'
    }
    if (filteredCountries.length > 10) {
      return 'Too many matches, specify another filter'
    }
    if (filteredCountries.length === 1) {
      let country = filteredCountries[0]
      return <CountryDetailed country={country} key={country.flag} />
    }
    return filteredCountries.map(country => (
      <div key={country.flag}>
        <CountrySimple name={country.name.common} setFilter={(name) => setFilter(name)} />
      </div>
    ))
  }

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        let countriesArray = response.data
        setCountries(countriesArray)
      })
  }, [])

  return (
    <div className="App">
      <div>Find Countries <input value={filter} onChange={handleInputChange} /></div>
      {countryData()}
    </div>
  );
}

export default App;
