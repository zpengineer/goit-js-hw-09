import flatpickr from 'flatpickr';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'flatpickr/dist/flatpickr.min.css';


const refs = {
    startBtn: document.querySelector('[data-start]'),
    resetBtn: document.querySelector('[data-reset]'),
    spanDataDays: document.querySelector('[data-days]'),
    spanDataHours: document.querySelector('[data-hours]'),
    spanDataMinutes: document.querySelector('[data-minutes]'),
    spanDataSeconds: document.querySelector('[data-seconds]'),
};

refs.startBtn.disabled = true;

class Timer{
    constructor() {
        this.selectDate = null;
        this.intervalId = null;
        this.deltaTime = null;
    }

    init() {

        this.selectDate = calendar.selectedDates[0].getTime();
        let currentTime = Date.now();

        this.deltaTime = this.selectDate - currentTime;
        const time = this.convertMs(this.deltaTime);
        
        this.updateTimer(time);
    }

    start() {

        this.intervalId = setInterval(() => {

            let currentTime = Date.now();

            this.deltaTime = this.selectDate - currentTime;

            if (this.deltaTime > 0) {

                const time = this.convertMs(this.deltaTime);
            
                this.updateTimer(time);

            } else {
                clearInterval(this.intervalId);
            }
            
        }, 1000);

    }

    reset() {

        refs.startBtn.disabled = true;

        const time = this.convertMs(0);

        clearInterval(this.intervalId);

        this.updateTimer(time);

        calendar.setDate(Date.now());
    }

    convertMs(time) {

        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;

        // Remaining days
        const days = this.addLeadingZero(Math.floor(time / day));
        // Remaining hours
        const hours = this.addLeadingZero(Math.floor((time % day) / hour));
        // Remaining minutes
        const minutes = this.addLeadingZero(Math.floor(((time % day) % hour) / minute));
        // Remaining seconds
        const seconds = this.addLeadingZero(Math.floor((((time % day) % hour) % minute) / second));

        return { days, hours, minutes, seconds };
    }

    addLeadingZero(value){
        return String(value).padStart(2, '0');
    }

    updateTimer({ days, hours, minutes, seconds }) {
        refs.spanDataDays.textContent = `${ days }`;
        refs.spanDataHours.textContent = `${ hours }`;
        refs.spanDataMinutes.textContent = `${ minutes }`;
        refs.spanDataSeconds.textContent = `${ seconds }`;
    }

}

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
  
    onClose(selectedDates) {

        if (selectedDates[0] < options.defaultDate) {
            return Notify.failure("Please choose a date in the future");   
        }

        Notify.success('Date selected!');
        refs.startBtn.disabled = false;

        timer.init();
  },
};

let calendar = flatpickr('#datetime-picker', options);

const timer = new Timer();

refs.startBtn.addEventListener('click', timer.start.bind(timer));
refs.resetBtn.addEventListener('click', timer.reset.bind(timer));