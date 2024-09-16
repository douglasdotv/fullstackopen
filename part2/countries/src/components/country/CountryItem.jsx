import Button from '../common/Button'

const CountryItem = ({ country, onSelectCountry }) => {
  return (
    <li>
      {country.name.common} {country.flag}{' '}
      <Button onClick={() => onSelectCountry(country)}>Show</Button>
    </li>
  )
}

export default CountryItem
