import CountryLanguages from './CountryLanguages'
import Image from '../common/Image'

const CountryData = ({ country }) => {
  const name = country.name.common
  const capital = country.capital
  const area = country.area
  const languages = Object.values(country.languages)
  const flag = {
    src: country.flags.png,
    alt: country.flags.alt,
  }

  return (
    <div>
      <h1>{name}</h1>
      <p>Capital: {capital}</p>
      <p>Area: {area} km²</p>
      <p>Languages: </p>
      <CountryLanguages languages={languages} />
      <Image src={flag.src} alt={flag.alt} border />
    </div>
  )
}

export default CountryData
