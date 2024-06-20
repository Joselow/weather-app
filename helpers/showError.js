export const showError = (error) => {
  const msg = document.querySelector('.message');
  msg.textContent = error;

  msg.classList.remove('hidden');
  msg.classList.add('animate-msgUp');

  setTimeout(() => {
      msg.classList.remove('animate-msgUp');
      msg.classList.add('animate-msgDown');

      setTimeout(() => {
          msg.classList.add('hidden');
          msg.textContent = ''; 
          msg.classList.remove('animate-msgDown');
      }, 500);
  }, 2500); 
};
