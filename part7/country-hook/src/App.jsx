import { useState } from 'react'

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

const useCountry = () => {
  /* TODO */
}

const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if (!country.found) {
    return <div>Country not found</div>
  }

  return (
    <div>
      <h3>{country.data.name} </h3>
      <div>Capital: {country.data.capital} </div>
      <div>Population: {country.data.population}</div>
      <img
        src={country.data.flag}
        height="100"
        alt={`Flag of ${country.data.name}`}
      />
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
