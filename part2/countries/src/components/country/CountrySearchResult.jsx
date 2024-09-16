import { useState, useEffect } from 'react'
import CountryData from './CountryData'
import CountryList from './CountryList'
import Notification from '../common/Notification'

const CountrySearchResult = ({ countries, query }) => {
  const [selectedCountry, setSelectedCountry] = useState(null)

  useEffect(() => {
    setSelectedCountry(null)
  }, [query])

  if (selectedCountry) {
    return (
      <CountryData
        country={selectedCountry}
        onBack={() => setSelectedCountry(null)}
      />
    )
  }

  if (query === '') {
    return <Notification message="Please enter a search term" />
  }

  if (query !== '' && countries.length === 0) {
    return <Notification message="No countries found" />
  }

  if (countries.length > 10) {
    return <Notification message="Too many matches, please be more specific" />
  }

  if (countries.length > 1 && countries.length <= 10) {
    return (
      <CountryList countries={countries} onSelectCountry={setSelectedCountry} />
    )
  }

  if (countries.length === 1) {
    return <CountryData country={countries[0]} />
  }

  return null
}

export default CountrySearchResult
