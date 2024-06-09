export const showError = (error) => {
	let msg =  document.querySelector('.message')
			msg.textContent =  error
			msg.style =  "display:block"
      setTimeout(() => {
        msg.style.animation = "msgDown 1s forwards"
      }, 2500);
}