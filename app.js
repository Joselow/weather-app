import { time, entryCo, entryCi, scaleC, scaleF, scaleK, wheaterForm, } from './constants/htmlElements.js'
import { units, countryCodes, countriesWithExceptions } from './constants/units.js'
import { showError } from './helpers/showError.js'
import { currentHour } from './utils/time.js'
import { getWheatherByCoord, getWheatherByNames } from './services/wheatherService.js'
import { replaceAccents } from './utils/index.js'
import { putCorrectIconWeather, renderData } from './helpers/index.js'

"use strict"

let scales
addEventListener( 'load', async(e) =>  {
  scales = units.celcius;
  scaleC.style = "background:#d4f"
  if(navigator.geolocation && (!sessionStorage.getItem("latitude") || !sessionStorage.getItem("latitude") ) ){
    const location = navigator.geolocation // ubicacion
    const error = (err) => {
      console.log(error)
    }
    const position = async (pos) => {
      console.log(pos) 
  
      const lon = pos.coords.longitude 
      const lat = pos.coords.latitude 
      sessionStorage.setItem("latitude", lat); 
      sessionStorage.setItem("longitude", lon)
  
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
    
      const lon = sessionStorage.getItem( 'longitude' ) 
      const lat = sessionStorage.getItem( 'latitude' ) 
  
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
  const { city, country } = Object.fromEntries(formData)

  if (!country) {
    showError('Por favor ingrese el pais')
    return
  }

  let countryName
  if (!city) {
    countryName = countriesWithExceptions[country] ?? country
  }
  else{
    countryName = countryCodes[replaceAccents(country.toLowerCase())] ?? country
  }

  const res = await getWheatherByNames({ city, country: countryName, scale: scales })
  if (!res.success) {
    showError(res.message)
    return
  }

  renderData(res.data, scales)
  putCorrectIconWeather(res.data.weather[0]?.main)
})

scaleC.addEventListener( 'click', async (e) => {
	scales = units.celcius

	scaleC.style = "background:#d4f"
	scaleK.style = "background:#fff"
	scaleF.style = "background:#fff"

  if (entryCo.value) {
    let countryName
    if (!entryCi.value) {
      countryName = countriesWithExceptions[entryCo.value] ?? entryCo.value
    }
    else{
      countryName = countryCodes[replaceAccents(entryCo.value.toLowerCase())] ?? entryCo.value
    }
  
    const res = await getWheatherByNames({ city: entryCi.value, country: countryName, scale: scales })
    if (!res.success) {
      showError(res.message)
      return
    }
  
    renderData(res.data, scales)
    putCorrectIconWeather(res.data.weather[0]?.main)
    return
  }

  const lon = sessionStorage.getItem( 'longitude' ) 
  const lat = sessionStorage.getItem( 'latitude' ) 

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
  else if (!entryCi.value || !entryCo.value) {
    showError('Ingresa el pais')
    return
  }

} )

scaleF.addEventListener( 'click', async(e) => {
	scales = units.fahrenheit
	scaleF.style = "background:#d4f"
	scaleC.style = "background:#fff"
	scaleK.style = "background:#fff"

  if (entryCo.value) {
    let countryName
    if (!entryCi.value) {
      countryName = countriesWithExceptions[entryCo.value] ?? entryCo.value
    }
    else{
      countryName = countryCodes[replaceAccents(entryCo.value.toLowerCase())] ?? entryCo.value
    }
  
    const res = await getWheatherByNames({ city: entryCi.value, country: countryName, scale: scales })
    if (!res.success) {
      showError(res.message)
      return
    }
  
    renderData(res.data, scales)
    putCorrectIconWeather(res.data.weather[0]?.main)
    return
  }

  const lon = sessionStorage.getItem( 'longitude' ) 
  const lat = sessionStorage.getItem( 'latitude' ) 

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
  else if (!entryCi.value || !entryCo.value) {
    showError('Ingresa el pais')
    return
  }
})

scaleK.addEventListener( 'click', async(e) => {
	scales = units["kelvin"]
		scaleK.style = "background:#d4f"
		scaleC.style = "background:#fff"
		scaleF.style = "background:#fff"

    if (entryCo.value) {
      let countryName
      if (!entryCi.value) {
        countryName = countriesWithExceptions[entryCo.value] ?? entryCo.value
      }
      else{
        countryName = countryCodes[replaceAccents(entryCo.value.toLowerCase())] ?? entryCo.value
      }
    
      const res = await getWheatherByNames({ city: entryCi.value, country: countryName, scale: scales })
      if (!res.success) {
        showError(res.message)
        return
      }
    
      renderData(res.data, scales)
      putCorrectIconWeather(res.data.weather[0]?.main)
      return
    }
  
    const lon = sessionStorage.getItem( 'longitude' ) 
    const lat = sessionStorage.getItem( 'latitude' ) 
  
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
    else if (!entryCi.value || !entryCo.value) {
      showError('Ingresa el pais')
      return
    }

} )

entryCi.addEventListener( 'keydown', async(e) => {
  const isKeyEnter = e.keyCode === 13 || e.which === 13

	if (isKeyEnter && !entryCo.value) { 
		showError('Porfavor, Ingresa el pais')
		return
	}
  else if(isKeyEnter && entryCo.value && entryCi.value){
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

entryCo.addEventListener( 'keydown', async (e) => {
  const isKeyEnter = e.keyCode === 13 || e.which === 13

	if(isKeyEnter && !entryCo.value){
		showError('Porfavor, ingresa el pais')
		return
	}
	else if (isKeyEnter && !(entryCi.value) ){
    const countryName = countriesWithExceptions[country] ?? country
  
    const res = await getWheatherByNames({ city, country: countryName, scale: scales })
    if (!res.success) {
      showError(res.message)
      return
    }
  
    renderData(res.data, scales)
    putCorrectIconWeather(res.data.weather[0]?.main)
	}
	else if (isKeyEnter && (entryCi.value) ){
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

const changeBg = ( hour) => {
		if ( hour > 17 ) {
			document.body.style = 'background-image: url("static/night.jpg")'
		}else if ( hour > 12 ) {
			document.body.style = 'background-image: url("static/afternoon.jpg")'
		}else{
			document.body.style = 'background-image: url("static/morning.jpg");color:#000'
		}
}

const getTime = () => {
	let amPmIndicator = ''
	let h = currentHour().hour
	let min = currentHour().mins  

	let hour = h  // para mostrar la hora 12h

	String(min).length < 2 ? min = `0${min}` : min
	String(hour).length < 2 ? hour = `0${hour}` : hour

	
	amPmIndicator = hour >= 12 ? 'PM' : 'AM'
	hour = hour % 12 || 12	// convertimos a formato de 12 hora(hour % 12 ), y si la h da 0(false) que sea 12(por el ||).
	hour = String(hour).padStart(2,'0')

	// h=16 // cambiar hora sin alterar la hora que se muestra

	var realHour = `${hour}:${min} ${amPmIndicator}`
	time.textContent = realHour
	changeBg(h)
  // requestAnimationFrame(getTime);
}

// getTime()

requestAnimationFrame(getTime);
// setInterval( getTime, 60000 )



