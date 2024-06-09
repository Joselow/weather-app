export const currentHour = () => {
  let date =  new Date;
  let hour = date.getHours()
  let mins = date.getMinutes()

  return { hour, mins}
}