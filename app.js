"use strict"

addEventListener( 'load', (e) =>  {
		scaleC.style = "background:#d4f"

})

let lon, lat;
const units = { 
		'celcius' : 'metric', 'fahrenheit' : 'imperial', 'kelvin' :''
	}
const lang = "es"
const API_KEY = '2bdd0e1404654c945c712b75c0985f2d'

const meteorologic = {
			'Clear' : "Despejado",
			'Clouds' : "Con nubes",
			'Snow' : "Cae nieve",
			'Rain' : "Cae lluvia",
			'Drizzle' : "Cae llovizna",
			'Thunderstorm' : "Hay tormenta",
			'Atmosphere' : "Atmosfera",
			'Fog' : "Con niebla",
			'Mist' : "Con neblina",
		}
const countryCodes = {
  // Latinoamérica
  'argentina': 'AR',
  'bolivia': 'BO',
  'brasil': 'BR',
  'chile': 'CL',
  'colombia': 'CO',
  'costa rica': 'CR',
  'cuba': 'CU',
  'ecuador': 'EC',
  'el salvador': 'SV',
  'guatemala': 'GT',
  'honduras': 'HN',
  'mexico': 'MX',
  'nicaragua': 'NI',
  'panama': 'PA',
  'paraguay': 'PY',
  'peru': 'PE',

  'accents' : {
  	'peru': 'perú',
    'perú': 'perú',
    'japón': 'japon',
    'china': 'pekin',
    'pekín': 'pekin'
  },

  'puerto rico': 'PR',
  'republica dominicana': 'DO',
  'uruguay': 'UY',
  'venezuela': 'VE',
  
  // Otros países
  'australia': 'AU',
  'canada': 'CA',
  'china': 'CN',
  'dinamarca': 'DK',
  'egipto': 'EG',
  'francia': 'FR',
  'alemania': 'DE',
  'grecia': 'GR',
  'india': 'IN',
  'japon': 'JP',

  'kenia': 'KE',
  'malasia': 'MY',
  'nueva zelanda': 'NZ',
  'rusia': 'RU',
  'sudafrica': 'ZA',
  'corea del sur': 'KR',
  'suiza': 'CH',
  'tailandia': 'TH',
  'turquia': 'TR',
  'reino unido': 'GB',
  'estados unidos': 'US',
};



let tempValue = document.querySelector('.temperature-value')
let icon = document.querySelector('.icon')
let time = document.querySelector('.time')
let located = document.querySelector('.location')
let description = document.querySelector('.observation')
let windS = document.querySelector('.wind-speed')
let windG = document.querySelector('.wind-gust')
let meteor = document.querySelector('.meteor')
let humidity = document.querySelector('.humidity')
let entryCo = document.querySelector('.search-co')
let entryCi = document.querySelector('.search-ci')
let scaleC = document.querySelector( '.scale-c' )
let scaleF = document.querySelector( '.scale-f' )
let scaleK = document.querySelector( '.scale-k' )
// let scalesTs = document.getElementsByName('scales')  // -- radio

let scales;
scaleC.addEventListener( 'click', (e) => {
	alert("Siguientes consultas  en 'celcius'")
	scales = units["celcius"]
	scaleC.style = "background:#d4f"
	scaleK.style = "background:#fff"
	scaleF.style = "background:#fff"
} )
scaleF.addEventListener( 'click', (e) => {
	alert("Siguientes consultas  en 'fahrenheit'")
	scales = units["fahrenheit"]
	scaleF.style = "background:#d4f"
	scaleC.style = "background:#fff"
	scaleK.style = "background:#fff"

} )
scaleK.addEventListener( 'click', (e) => {
	alert("Siguientes consultas  en 'kelvin'")
	scales = units["kelvin"]
		scaleK.style = "background:#d4f"
		scaleC.style = "background:#fff"
		scaleF.style = "background:#fff"

} )

//realtime
// scalesTs.forEach(function(radio) {
//   radio.addEventListener('click', function() {
//  if (radio.checked) {
 
//     let seletcScaleT = radio.value;
//     console.log(`Seleccionaste ${seletcScaleT}`);

//     scales =  units[seletcScaleT]
    
//     console.log( scales )

//   	}   
//   });
// });

const showError = (error) => {
	let msg =  document.querySelector('.message')
			msg.textContent =  error
			msg.style =  "display:block"
			 setTimeout(() => {
			 		msg.style.animation = "msgDown 1s forwards"
			  }, 2500);
}

const getData = async ( url ) => {

	try{

		let request = await fetch(url)
		if ( !(request.ok) ) {
			showError( "Ubicación inexistente" )
			console.log("No existe ")
			return "Request Failed"
		}
		let response = await request.json()
		console.log(response)

		let temp = Math.round(response.main.temp)
		let position = response.name
		let observation = response.weather[ 0 ].description
		observation = observation.charAt(0).toUpperCase() + observation.slice(1);
		let windSpeed = Math.round( response.wind.speed * 3.6 )  //(para covertirlos de m/s a km/h)
		let windGust = Math.round( response.wind.gust * 3.6 )
		let meteoro = response.weather[ 0 ].main
		let moisture = response.main.humidity
		
		url.includes('metric') ? (tempValue.textContent = `${temp} °C`, windG.textContent = `${windGust ? windGust + ' km/s' : '...'}`, windS.textContent = `${windSpeed} km/s`) 
: url.includes('imperial') ? (tempValue.textContent = `${temp} °F`, windG.textContent = `${windGust ? windGust + ' mi/h' : '...'}`, windS.textContent = `${windSpeed} mi/h`)
: (tempValue.textContent = `${temp} °K`, windG.textContent = `${windGust ? windGust + ' km/h' : '...'}`, windS.textContent = `${windSpeed} km/h`)

		located.textContent = position
		description.textContent = observation
		humidity.textContent = `${moisture} %`


		correctIcons( meteoro )

	}catch (error) {
  console.log("The API death :C \n", error);
  showError("No pudimos acceder a los datos")
 
}
}
const correctIcons = ( meteoro ) => {
			let hour = currentHour()[0]
			// hour = 5
	switch (meteoro){
			case 'Clear':

				( hour < 6 || hour >= 18) ? (meteor.textContent = meteorologic[meteoro], icon.src = 'animated/night.svg')
										 							: (meteor.textContent = meteorologic[meteoro], icon.src = 'animated/day.svg')
				break
			case 'Clouds':
				( hour < 6 || hour >= 18) ? (meteor.textContent = meteorologic[meteoro], icon.src = 'animated/cloudy-night-1.svg')
									 								: (meteor.textContent = meteorologic[meteoro], icon.src = 'animated/cloudy.svg')
				break
			case 'Snow':
				meteor.textContent = meteorologic[meteoro]
				icon.src = 'animated/snowy-5.svg'
				break
			case 'Rain':
				meteor.textContent = meteorologic[meteoro]
				icon.src = 'animated/rainy-5.svg'
				break
			case 'Drizzle':
				( hour < 6 || hour >= 18) ? (meteor.textContent = meteorologic[meteoro], icon.src = 'animated/night.svg' )
																	: (meteor.textContent = meteorologic[meteoro], icon.src = 'animated/day.svg' )
				break
			case 'Thunderstorm':
				meteor.textContent = meteorologic[meteoro]
				icon.src = 'animated/thunder.svg'
				break
			case 'Atmosphere':
				( hour < 6 || hour >= 18) ? (meteor.textContent = meteorologic[meteoro], icon.src = 'animated/cloudy-night-3.svg')
									 								: (meteor.textContent = meteorologic[meteoro], icon.src = 'animated/cloudy-day-3.svg')
				break			
			case 'Fog':
				meteor.textContent = meteorologic[meteoro]
				icon.src = 'animated/snowy-6..svg'
				break
			case 'Mist':
				meteor.textContent = meteorologic[meteoro]
				icon.src = 'animated/snowy-6.svg'
				break
			default:

		}

}
const currentHour = () => {
		let date =  new Date;
		let hour = date.getHours()
		let minuts = date.getMinutes()

		return [hour, minuts]
}

const  weatherInterval= ( url ) => {  // recupérar info cada 20 min
	console.log("uwu")
	setInterval( () => {
		getData(url)
	}, 14400000 ) //cada 4 horas
}
const urlS = (API_KEY, city = '', country = '', lat = '', lon = '', scale = 'metric') => { //URL
	if (city == ''){
			const url = `https://api.openweathermap.org/data/2.5/weather?&lat=${lat}&lon=${lon}&q=${city}&appid=${API_KEY}&units=${scale}&lang=${lang}`
			return	url			
	}

	const url = `https://api.openweathermap.org/data/2.5/weather?&lat=${lat}&lon=${lon}&q=${city},${country}&appid=${API_KEY}&units=${scale}&lang=${lang}`
	return url
}

if(navigator.geolocation && (!sessionStorage.getItem("latitude") || !sessionStorage.getItem("latitude") ) ){
	const location = navigator.geolocation // ubicacion
	const error = (err) => {
		console.log(error)
	}
	const position = (pos) => {
		console.log(pos) 

		lon = pos.coords.longitude 
		lat = pos.coords.latitude 
		sessionStorage.setItem("latitude", lat); // definimos el sesion estorage en true
	sessionStorage.setItem("longitude", lon)

		const url = 	urlS(API_KEY, '', '', lat, lon, scales)

		getData(url)
	weatherInterval( url )

	}

location.getCurrentPosition( position )

}else if(navigator.geolocation && (sessionStorage.getItem("latitude") && sessionStorage.getItem("latitude"))){
	
		lon = sessionStorage.getItem( 'longitude' ) 
		lat = sessionStorage.getItem( 'latitude' ) 
		
		const url = 	urlS(API_KEY, '', '', lat, lon, scales)

		getData(url)
	weatherInterval( url )

	let valorAnterior = scales;

// function verificarCambio() {
// 	console.log("YA")
//   if (scales !== valorAnterior) {
//     valorAnterior = scales;
//     const url = 	urlS(API_KEY, '', '', lat, lon, scales)
//     	getData(url)
// 	 weatherInterval( url )
//   }
//     requestAnimationFrame(verificarCambio);

// }
//   requestAnimationFrame(verificarCambio);

// setInterval(verificarCambio, 1000); // Comprobar cada segundo



}

const convertCoCode = ( country, type) => {

	return type == 'coCi' ? countryCodes[country.toLowerCase().replace( /[áä]/g, 'a').replace(/[éë]/g, 'e').replace(/[íï]/g, 'i').replace(/[óö]/g, 'o').replace(/[úü]/g, 'u')].toUpperCase()  
												: type== "onlyC" ? countryCodes['accents'][country] ? countryCodes['accents'][country] 
												: country  
												:  console.log('Invalid case type.');
}

entryCi.addEventListener( 'keydown', (e) => {
	
	if ( (e.keyCode === 13 || e.which === 13) && (!(entryCo.value) || !(entryCi.value) ) ) { // solo si ambos campos estan llenos no cumple
		console.log("Y el pais?")
		return

	}else if((e.keyCode === 13 || e.which === 13) && (entryCo.value)){
		let country = entryCo.value

		country= convertCoCode(country, 'coCi' )
		let city = entryCi.value

		console.log("Key preseed")
		const url = 	urlS(API_KEY, city, country, '', '', scales)

		getData(url)
		weatherInterval(url)
}
	
})

entryCo.addEventListener( 'keydown', (e) => {
	if( (e.keyCode === 13 || e.which === 13) && !(entryCo.value)){

		console.log("y el pais?")
		return
	}
	else if ((e.keyCode === 13 || e.which === 13) && !(entryCi.value) ){
		let country = entryCo.value
		country= convertCoCode(country, 'onlyC' )

		console.log("Key preseed")
		const url = 	urlS(API_KEY, country, '', '', '',scales)

		getData(url)
		weatherInterval(url )


	}
	else if ((e.keyCode === 13 || e.which === 13) && (entryCi.value) ){
		let country = entryCo.value
		country= convertCoCode(country, 'coCi' )
		let city = entryCi.value

		console.log("Key preseed")

		const url = urlS(API_KEY, city, country, '', '', scales)
		getData(url)
		weatherInterval( url )

	}
} )



const amPm = {
	13 : 1,
	14 : 2,
	15 : 3,
	16 : 4,
	17 : 5,
	18 : 6,
	19 : 7,
	20 : 8,
	21 : 9,
	22 : 10,
	23 : 11,
	0 : 12
}

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
	let h = currentHour()[0] //obtenemos la hora

	let hour = h  // para mostrar la hora 12h

	let min = currentHour()[1]  //obtenemos el minuto

	String(min).length < 2 ? min = `0${min}` : min
	String(hour).length < 2 ? hour = `0${hour}` : hour

	
	amPmIndicator = hour >= 12 ? 'PM' : 'AM'
	hour = hour % 12 || 12	// convertimos a formato de 12 hora(hour % 12 ), y si la h da 0(false) que sea 12(por el ||).
	hour = String(hour).padStart(2,'0')

	// h=19 // cambiar hora sin alterar la hora que se muestra

	var realHour = `${hour}:${min} ${amPmIndicator}`
	time.textContent = realHour
	changeBg(h)
  requestAnimationFrame(getTime);

}

// getTime()

requestAnimationFrame(getTime);
// setInterval( getTime, 60000 )



