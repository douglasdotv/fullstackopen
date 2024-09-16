import axios from 'axios'

const apiKey = import.meta.env.VITE_WEATHER_API_KEY

const getWeatherByCoordinates = (lat, lon) => {
  const url = 'https://api.openweathermap.org/data/2.5/weather'
  const params = {
    lat,
    lon,
    units: 'metric',
    appid: apiKey,
  }

  return axios.get(url, { params }).then((response) => response.data)
}

export default { getWeatherByCoordinates }
