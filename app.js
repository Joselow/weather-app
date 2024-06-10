import { timeElement, inputCountry, inputCity, wheaterForm, optionScales } from './constants/htmlElements.js'
import { units, countryCodes, countriesWithExceptions } from './constants/units.js'
import { showError } from './helpers/showError.js'
import { updateTime } from './utils/time.js'
import { getWheatherByCoord, getWheatherByNames } from './services/wheatherService.js'
import { replaceAccents } from './utils/index.js'
import { putCorrectIconWeather, renderData, changeBg, setActiveScale } from './helpers/index.js'
import { getLatitude, getLongitude, getScale, setLatitude, setLongitude, setScale } from './helpers/sessionStores.js'

"use strict"

let scales

addEventListener( 'load', async(e) =>  {
  handleTime()
  changeBg(new Date().getHours())

  const { code = '', name = '' } = getScale() || {  code: units.celcius.code, name: units.celcius.name }

  scales = code;
  setActiveScale(name)

  if(navigator.geolocation && (!sessionStorage.getItem("latitude") || !sessionStorage.getItem("latitude") ) ){
    const location = navigator.geolocation // ubicacion
    const error = (err) => {
      console.log(error)
    }
    const position = async (pos) => {
      console.log(pos) 
  
      const lon = pos.coords.longitude 
      const lat = pos.coords.latitude 

      setLatitude(lat)
      setLongitude(lon)
  
      const res = await getWheatherByCoord({ lat, lon, scale: scales })
      if (!res.success) {
        showError(res.message)
        return
      }
  
      renderData(res.data, scales)
      putCorrectIconWeather(res.data.weather[0]?.main)
  
      // const url = 	urlS(API_KEY, '', '', lat, lon, scales)
  
      // getData(url)
      // weatherInterval( url )
    }
  
    location.getCurrentPosition(position)
  
  } else if(navigator.geolocation && (sessionStorage.getItem("latitude") && sessionStorage.getItem("latitude"))){
    
      const lon = getLongitude()
      const lat = getLatitude()
  
      const res = await getWheatherByCoord({ lat, lon, scale: scales })
      if (!res.success) {
        showError(res.message)
      }
      else{
        renderData(res.data, scales)
        putCorrectIconWeather(res.data.weather[0]?.main)
      }
  }
})


wheaterForm.addEventListener('submit', async (e) => {
  e.preventDefault()

  const form = e.target
  const formData = new FormData(form) 
  const { country } = Object.fromEntries(formData)

  if (!country) {
    showError('Por favor ingrese el pais')
    return
  }

  handleGetWheatherByScale(scales)
})

optionScales.addEventListener('click', (e) => {
  const elementClicked = e.target
  let scaleName
  if (elementClicked.classList.contains('scale-c')) {
    scales = units.celcius.code
    scaleName = units.celcius.name
  }
  else if (elementClicked.classList.contains('scale-f')) {
    scales = units.fahrenheit.code
    scaleName = units.fahrenheit.name
  }
  else if (elementClicked.classList.contains('scale-k')) {
    scales = units.kelvin.code
    scaleName = units.kelvin.name
  }

  setScale({ code: scales, name: scaleName})
  setActiveScale(scaleName)

  if (inputCountry.value) {
    handleGetWheatherByScale(scales)
    return
  }
  handleGetWheatherByCoord()
})

inputCity.addEventListener( 'keydown', async(e) => {
  const isKeyEnter = e.keyCode === 13 || e.which === 13

	if (isKeyEnter && !inputCountry.value) { 
		showError('Porfavor, Ingresa el pais')
		return
	}
  else if(isKeyEnter && inputCountry.value && inputCity.value){
    const countryName = countryCodes[replaceAccents(country.toLowerCase())] ?? country
  
    const res = await getWheatherByNames({ city, country: countryName, scale: scales })
    if (!res.success) {
      showError(res.message)
      return
    }
  
    renderData(res.data, scales)
    putCorrectIconWeather(res.data.weather[0]?.main)
  }
})

inputCountry.addEventListener( 'keydown', async (e) => {
  const isKeyEnter = e.keyCode === 13 || e.which === 13

	if(isKeyEnter && !inputCountry.value){
		showError('Porfavor, ingresa el pais')
		return
	}
	else if (isKeyEnter && !(inputCity.value) ){
    const countryName = countriesWithExceptions[country] ?? country
  
    const res = await getWheatherByNames({ city, country: countryName, scale: scales })
    if (!res.success) {
      showError(res.message)
      return
    }
  
    renderData(res.data, scales)
    putCorrectIconWeather(res.data.weather[0]?.main)
	}
	else if (isKeyEnter && (inputCity.value) ){
    const countryName = countryCodes[replaceAccents(country.toLowerCase())] ?? country
  
    const res = await getWheatherByNames({ city, country: countryName, scale: scales })
    if (!res.success) {
      showError(res.message)
      return
    }
  
    renderData(res.data, scales)
    putCorrectIconWeather(res.data.weather[0]?.main)
	}
})



async function handleGetWheatherByScale (scale) {
  let countryName
  if (!inputCity.value) {
    countryName = countriesWithExceptions[inputCountry.value] ?? inputCountry.value
  }
  else{
    countryName = countryCodes[replaceAccents(inputCountry.value.toLowerCase())] ?? inputCountry.value
  }

  const res = await getWheatherByNames({ city: inputCity.value, country: countryName, scale })
  if (!res.success) {
    showError(res.message)
    return
  }

  renderData(res.data, scale)
  putCorrectIconWeather(res.data.weather[0]?.main)
}

async function handleGetWheatherByCoord () {
  const lat = getLatitude() 
  const lon = getLongitude() 

  if (lon && lat) {
    const res = await getWheatherByCoord({ lat, lon, scale: scales })
    if (!res.success) {
      showError(res.message)
    }
    else{
      renderData(res.data, scales)
      putCorrectIconWeather(res.data.weather[0]?.main)
    }
    return
  }
  else if (!inputCity.value || !inputCountry.value) {
    showError('Ingresa el pais')
    return
  }
}

const handleTime = () => {
  const hour = updateTime();

  requestAnimationFrame(handleTime);
  timeElement.textContent = hour
}



