export const currentHour = () => {
  const now = new Date();
  return {
      hour: now.getHours(),
      mins: now.getMinutes(),
      secs: now.getSeconds()
  };
}


export const updateTime = () => {
  const { hour: hoursIn24, mins: min, secs: sec } = currentHour();
  let hour = hoursIn24;

  const formattedMin = String(min).padStart(2, '0');
  const formattedSec = String(sec).padStart(2, '0');

  const amPmIndicator = hoursIn24 >= 12 ? 'PM' : 'AM';

  hour = hoursIn24 % 12 || 12;

  const formattedHour = String(hour).padStart(2, '0');
  return `${formattedHour}:${formattedMin}:${formattedSec} ${amPmIndicator}`;
};