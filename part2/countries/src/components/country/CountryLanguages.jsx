const CountryLanguages = ({ languages }) => {
  return (
    <ul>
      {languages.map((language) => (
        <li key={language}>{language}</li>
      ))}
    </ul>
  )
}

export default CountryLanguages
