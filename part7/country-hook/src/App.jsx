import { useState } from 'react'
import useCountry from './hooks/useCountry'
import useField from './hooks/useField'
import Country from './components/Country'
import CountryForm from './components/CountryForm'

const App = () => {
  const [name, setName] = useState('')

  const nameInput = useField('text')
  const country = useCountry(name)

  const handleFetchCountryData = (event) => {
    event.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <CountryForm
        nameInput={nameInput}
        handleFetchCountryData={handleFetchCountryData}
      />
      <Country country={country} />
    </div>
  )
}

export default App
