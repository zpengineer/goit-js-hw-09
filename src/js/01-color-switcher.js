const refs = {
    startBtn: document.querySelector("[data-start]"),
    stopBtn: document.querySelector("[data-stop]"),
    bgRef: document.body,
}
const SWITCHER_DELAY = 1000;
const btnDisable = false;
let timerId = null;

refs.startBtn.addEventListener('click', () => {
    startColorSwitcher();
});
refs.stopBtn.addEventListener('click', stopColorSwitcher);


function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function startColorSwitcher() {

    if (refs.startBtn.disabled === btnDisable) {
        refs.startBtn.disabled = true;
    }

    timerId = setInterval(() => {
        refs.bgRef.style.backgroundColor = getRandomHexColor();
    }, SWITCHER_DELAY);
}

function stopColorSwitcher() {
    clearInterval(timerId);
    refs.startBtn.disabled = btnDisable;
}