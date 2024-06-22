import { units, unitsMap } from '../constants/units.js'
import { currentHour } from '../utils/time.js'
import { tempValue, icon, located, description, windS, windG, meteor, humidity, scaleC, scaleF, scaleK } from '../constants/htmlElements.js'
import { meteorInSpanish } from '../constants/units.js'

export const putCorrectIconWeather = (meteoro) => {
  const hour = currentHour().hour;
  const isNight = hour < 6 || hour >= 18;
  let iconPath;

  const meteorIcons = {
    Clear: isNight ? 'animated/night.svg' : 'animated/day.svg',
    Clouds: isNight ? 'animated/cloudy-night-1.svg' : 'animated/cloudy.svg',
    Snow: 'animated/snowy-5.svg',
    Rain: 'animated/rainy-5.svg',
    Drizzle: 'animated/rainy-7.svg',
    Thunderstorm: 'animated/thunder.svg',
    Atmosphere: isNight ? 'animated/cloudy-night-3.svg' : 'animated/cloudy-day-3.svg',
    Fog: 'animated/snowy-6..svg',
    Mist: 'animated/snowy-6.svg',
  };

  if (meteorIcons[meteoro]) {
    meteor.textContent = meteorInSpanish[meteoro];
    iconPath = meteorIcons[meteoro];
  } else {
    meteor.textContent = meteorInSpanish['Unknown'];
    iconPath = 'animated/default.svg';
  }

  icon.src = iconPath;
};

export const renderData = (weatherData, scale) => {
  if (!weatherData) return 

  const temperature = Math.round(weatherData.main.temp)
  const location = weatherData.name
  let observation = weatherData.weather[ 0 ].description
  observation = observation.charAt(0).toUpperCase() + observation.slice(1);  
  const windSpeed = Math.round(weatherData.wind.speed * 3.6 ) 
  const windGust = Math.round(weatherData.wind.gust * 3.6 )
  const humidityData = weatherData.main.humidity
  
  const currentUnits = unitsMap[scale] || unitsMap.default;

  tempValue.textContent = `${temperature} ${currentUnits.tempUnit}`;
  windG.textContent = `${windGust ? windGust + ' ' + currentUnits.windUnit : '...'}`;
  windS.textContent = `${windSpeed} ${currentUnits.windUnit}`;

  located.textContent = location
  description.textContent = observation
  humidity.textContent = `${humidityData} %`
}

export function changeBg ( hour) {  
  if ( hour > 17 ) {
    document.body.style = 'background-image: url("static/night.webp")'
  }else if ( hour > 12 ) {
    document.body.style = 'background-image: url("static/afternoon.webp")'
  }else{
    document.body.style = 'background-image: url("static/morning.webp");color:#000'
  }
}


export function setActiveScale(activeScale) {
  const scales = [ 
    { name: 'celcius', element: scaleC  }, 
    { name: 'fahrenheit', element: scaleF }, 
    { name: 'kelvin', element: scaleK}
  ];
  
  scales.forEach(scale => {
    const element = scale.element
    if (scale.name === activeScale) {
      if(activeScale === units.celcius.name) {
        element.classList.add('bg-yellow-500')
      } else if (activeScale === units.fahrenheit.name) {
        element.classList.add('bg-gray-200', 'text-gray-950')
      }
      else {
        element.classList.add('bg-purple-800')
      }
    } else {
      if(scale.name === units.celcius.name) {
        element.classList.remove('bg-yellow-500')
      } else if (scale.name === units.fahrenheit.name) {
        element.classList.remove('bg-gray-200', 'text-gray-950')
      }
      else {
        element.classList.remove('bg-purple-800')
      }
    }
  });
}
