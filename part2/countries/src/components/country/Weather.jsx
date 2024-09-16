import { useState, useEffect } from 'react'
import weatherService from '../../services/weather'
import Image from '../common/Image'
import Spinner from '../common/Spinner'
import Notification from '../common/Notification'

const Weather = ({ coordinates, locationName }) => {
  const [weather, setWeather] = useState(null)
  const [weatherError, setWeatherError] = useState(null)
  const [weatherLoading, setWeatherLoading] = useState(false)

  useEffect(() => {
    if (coordinates) {
      setWeatherLoading(true)
      setWeatherError(null)

      const [lat, lon] = coordinates

      weatherService
        .getWeatherByCoordinates(lat, lon)
        .then((data) => {
          setWeather(data)
          setWeatherLoading(false)
        })
        .catch((error) => {
          console.error('Error fetching weather data:', error)
          setWeatherError('Failed to fetch weather data')
          setWeatherLoading(false)
        })
    } else {
      setWeatherError('No location data available for this capital')
    }
  }, [coordinates])

  const temperatureInCelsius = weather?.main?.temp || 0
  const temperatureInFahrenheit = (temperatureInCelsius * 9) / 5 + 32
  const weatherData = weather?.weather[0]
  const weatherIcon = weatherData?.icon
  const weatherIconUrl = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`
  const weatherDescription = weatherData?.description
  const windSpeed = weather?.wind?.speed || 0

  return (
    <div>
      <h2>Weather in {locationName}</h2>
      {weatherLoading && <Spinner />}
      {weatherError && <Notification message={weatherError} type="error" />}
      {weather && (
        <div>
          <p>
            Temperature: {temperatureInCelsius} °C ({temperatureInFahrenheit}{' '}
            °F)
          </p>
          <Image src={weatherIconUrl} alt={weatherDescription} />
          <p>Wind: {windSpeed} m/s</p>
          <p>Condition: {weatherDescription}</p>
        </div>
      )}
    </div>
  )
}

export default Weather
