import { useState, useEffect } from 'react'
import axios from 'axios'

const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

  useEffect(() => {
    if (name) {
      const fetchCountry = async () => {
        try {
          const response = await axios.get(`${baseUrl}/name/${name}`)
          setCountry({ data: response.data, found: true })
        } catch (error) {
          setCountry({ found: false })
        }
      }
      fetchCountry()
    }
  }, [name])

  return country
}

export default useCountry
