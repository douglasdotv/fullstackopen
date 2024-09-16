import CountryLanguages from './CountryLanguages'
import Image from '../common/Image'
import Button from '../common/Button'
import Weather from './Weather'

const CountryData = ({ country, onBack }) => {
  const name = country.name.common
  const area = country.area
  const languages = Object.values(country.languages)
  const flag = {
    src: country.flags.png,
    alt: country.flags.alt,
  }
  const capital = {
    name: country.capital,
    coordinates: country.capitalInfo ? country.capitalInfo.latlng : null,
  }

  return (
    <div>
      <h1>{name}</h1>
      <p>Capital: {capital.name}</p>
      <p>Area: {area} km²</p>
      <p>Languages: </p>
      <CountryLanguages languages={languages} />
      <Image src={flag.src} alt={flag.alt} border />
      <Weather coordinates={capital.coordinates} locationName={capital.name} />
      <div>
        {onBack && <Button onClick={onBack}>Back to country list</Button>}
      </div>
    </div>
  )
}

export default CountryData
