import { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange,
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

  useEffect(() => {
    if (name) {
      const fetchCountry = async () => {
        try {
          const response = await axios.get(`${baseUrl}/name/${name}`)
          setCountry({ data: response.data, found: true })
        } catch (error) {
          setCountry({ found: false })
        }
      }
      fetchCountry()
    }
  }, [name])

  return country
}

const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if (!country.found) {
    return <div>Country not found</div>
  }

  const { name, capital, population, flags } = country.data

  return (
    <div>
      <h3>{name.common} </h3>
      <div>Capital: {capital[0]} </div>
      <div>Population: {population}</div>
      <img src={flags.png} height="100" alt={`Flag of ${name.common}`} />
    </div>
  )
}

const App = () => {
  const [name, setName] = useState('')

  const nameInput = useField('text')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input placeholder="Enter a country name" {...nameInput} />
        <button type="submit">Find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App
