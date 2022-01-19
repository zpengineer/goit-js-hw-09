import flatpickr from 'flatpickr';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'flatpickr/dist/flatpickr.min.css';


let callbackTime = 0;
let intervalId = null;

const refs = {
    startBtn: document.querySelector('[data-start]'),
    resetBtn: document.querySelector('[data-reset]'),
    spanDataDays: document.querySelector('[data-days]'),
    spanDataHours: document.querySelector('[data-hours]'),
    spanDataMinutes: document.querySelector('[data-minutes]'),
    spanDataSeconds: document.querySelector('[data-seconds]'),
};

refs.startBtn.disabled = true;
refs.startBtn.addEventListener('click', start);
refs.resetBtn.addEventListener('click', reset);

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
  
    onClose(selectedDates) {

        if (selectedDates[0] < options.defaultDate) {
            return Notify.failure("Please choose a date in the future");    
        }

        refs.startBtn.disabled = false;

        callbackTime = selectedDates[0].getTime();

        let deltaTime = callbackTime - Date.now();

        const { days, hours, minutes, seconds } = convertMs(deltaTime);

        updateTimer({ days, hours, minutes, seconds });

  },
};

const calendar = flatpickr('#datetime-picker', options);

function start() {
    let deltaTime = 0;

    intervalId = setInterval(() => {
       
        deltaTime = callbackTime - Date.now();

        if (deltaTime > 0) {

            const { days, hours, minutes, seconds } = convertMs(deltaTime);

            updateTimer({ days, hours, minutes, seconds });
       
        }else{
            clearInterval(intervalId);
        }
            
   }, 1000);
    
}

function reset() {

        refs.startBtn.disabled = true;

        const time = convertMs(0);

        clearInterval(intervalId);

        updateTimer(time);

        calendar.setDate(Date.now());
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

    return { days, hours, minutes, seconds };
    
    console.log({ days, hours, minutes, seconds });
}

function addLeadingZero(value){
    return String(value).padStart(2, '0');
}

function updateTimer({ days, hours, minutes, seconds }) {
    refs.spanDataDays.textContent = `${ days }`;
    refs.spanDataHours.textContent = `${ hours }`;
    refs.spanDataMinutes.textContent = `${ minutes }`;
    refs.spanDataSeconds.textContent = `${ seconds }`;
}
