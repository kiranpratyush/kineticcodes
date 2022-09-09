let darkMode = JSON.parse(localStorage.getItem('darkMode'));
const mainWrapper = document.querySelector('.main-wrapper');
const checkBox = document.querySelectorAll('.checkbox');
const ball = document.querySelectorAll('.ball');
console.log(checkBox, ball);
if (darkMode) {
  checkBox.checked = true;
  mainWrapper.classList.add('dark-mode');
  mainWrapper.classList.remove('light-mode');
  ball.forEach((b) => (b.style.transform = 'translateX(24px)'));
  console.log('I am running');
} else {
  checkBox.checked = false;
  mainWrapper.classList.add('light-mode');
  mainWrapper.classList.remove('dark-mode');
  ball.forEach((b) => (b.style.transform = 'translateX(0px)'));
}
function toggleDarkMode() {
  if (darkMode) {
    mainWrapper.classList.remove('dark-mode');
    mainWrapper.classList.add('light-mode');
    ball.forEach((b) => (b.style.transform = 'translateX(0px)'));
  } else {
    mainWrapper.classList.remove('light-mode');
    mainWrapper.classList.add('dark-mode');
    ball.forEach((b) => (b.style.transform = 'translateX(24px)'));
  }
  console.log(ball.style.transform);
}

checkBox.forEach((c) =>
  c.addEventListener('click', () => {
    darkMode = JSON.parse(localStorage.getItem('darkMode'));

    if (darkMode) {
      console.log(darkMode);
      localStorage.setItem('darkMode', JSON.stringify(false));
    } else {
      localStorage.setItem('darkMode', JSON.stringify(true));
    }

    toggleDarkMode();
  })
);
