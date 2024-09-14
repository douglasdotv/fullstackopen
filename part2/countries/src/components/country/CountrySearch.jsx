import { useEffect, useState } from 'react'
import countryService from '../../services/countries'
import CountrySearchInput from './CountrySearchInput'
import CountrySearchResult from './CountrySearchResult'
import Title from '../common/Title'
import Notification from '../common/Notification'
import Spinner from '../common/Spinner'

const CountrySearch = () => {
  const [allCountries, setAllCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    setError(null)

    countryService
      .getAll()
      .then((initialCountries) => {
        setAllCountries(initialCountries)
        setLoading(false)
      })
      .catch((error) => {
        setError(`Failed to fetch countries: ${error.message}`)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    setFilteredCountries(
      allCountries.filter((country) =>
        country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
      )
    )
  }, [allCountries, searchQuery])

  return (
    <div>
      <Title text="Data for Countries" />

      {loading && (
        <div>
          <Spinner />
          <Notification message="Loading, please wait..." />{' '}
        </div>
      )}

      {error && <Notification message={error} type="error" />}

      {!loading && !error && (
        <>
          <CountrySearchInput value={searchQuery} onChange={setSearchQuery} />
          <CountrySearchResult
            countries={filteredCountries}
            query={searchQuery}
          />
        </>
      )}
    </div>
  )
}

export default CountrySearch
