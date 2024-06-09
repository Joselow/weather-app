import { API_KEY } from '../constants/index.js'

const ENPOINT = 'https://api.openweathermap.org/data/2.5'
const fetchWeather = async (url) => { 
  try {
    const res = await fetch(url)
    const data = await res.json()
    if (!res.ok) {
      if (data.cod === '404') {
        throw new Error('not found location')
      }
      throw new Error('some error')
    }

    return {
      success: true,
      data
    };

  } catch (error) {
    if (error.message == 'not found location') {
      return {
        success: false,
        message: 'Ubicación inexistente'
      }
    }else{
      return {
        success: false,
        message: 'Ups, ocurrió un error lo sentimos'
      }
    }
  }
}

export const getWheatherByNames = async ({ city = '', country = '', scale = 'metric'}) => {
  const queryLocation = country && city ? `${city},${country}` :  country
  const url = `${ENPOINT}/weather?q=${queryLocation}&appid=${API_KEY}&units=${scale}&lang=es`
  return await fetchWeather(url)
}

export const getWheatherByCoord = async ({ lat = '', lon = '', scale = 'metric'}) => {
  const url = `${ENPOINT}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${scale}&lang=es`
  return await fetchWeather(url)
}