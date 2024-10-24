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
      <h3>{name.common}</h3>
      <div>Capital: {capital[0]}</div>
      <div>Population: {population}</div>
      <img src={flags.png} alt={`Flag of ${name.common}`} height="100" />
    </div>
  )
}

export default Country
