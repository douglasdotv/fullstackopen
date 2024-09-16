import CountryItem from './CountryItem'

const CountryList = ({ countries, onSelectCountry }) => {
  return (
    <ul>
      {countries.map((country) => (
        <CountryItem
          key={country.cca3}
          country={country}
          onSelectCountry={onSelectCountry}
        />
      ))}
    </ul>
  )
}

export default CountryList
