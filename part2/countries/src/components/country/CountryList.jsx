import CountryItem from './CountryItem'

const CountryList = ({ countries }) => {
  return (
    <ul>
      {countries.map((country) => (
        <CountryItem key={country.cca3} country={country} />
      ))}
    </ul>
  )
}

export default CountryList
