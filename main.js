const  max = 60; 
const min = 1;
const initialSessionMins = 25;
const initialBreakMins = 5;
const sessionStr = 'Session';
const breakStr = 'Break';
const redStr = 'red';
const btnClick = 'click';

const breakLength = document.getElementById('break-length');
const sessionLength = document.getElementById('session-length');
const timeLeft = document.getElementById('time-left');
const timerLabel = document.getElementById('timer-label');
const timer = document.getElementById('timer');
const beep = document.getElementById('beep');
const reset = document.getElementById('reset');
const startStop = document.getElementById('start_stop');
const breakDecrement = document.getElementById('break-decrement');
const breakIncrement = document.getElementById('break-increment');
const sessionDecrement = document.getElementById('session-decrement');
const sessionIncrement = document.getElementById('session-increment');

const decrementValue = number => {
    number -= min;
    if (number < min) return min;
    return number;
}

const incrementValue = number => {
    number += min;
    if (number > max) return max;
    return number;
}

const calculateCountdown = number => number * max; 

const adjustDisplay = () => {
    sessionLength.innerHTML = sessionMins;
    breakLength.innerHTML = breakMins;

    if (inSession) {
        countdownSecs = calculateCountdown(sessionMins);
        timeLeft.innerHTML = `${formatNumber(sessionMins)}:00`;
        timerLabel.innerHTML = sessionStr;
    }

    if (!inSession) {
        countdownSecs = calculateCountdown(breakMins);
        timeLeft.innerHTML = `${formatNumber(breakMins)}:00`;
        timerLabel.innerHTML = breakStr;
    }
}

const formatNumber = num => num < 10 ? '0' + num : num.toString();

const startTimer = () => {
    running = true;

    intervalId = setInterval(() => {
        countdownSecs -= min
        const present = timer.classList.contains(redStr);
        if (countdownSecs < max) {
            if (!present) {
                timer.classList.toggle(redStr);
            } 
        } else {
            if (present) {
                timer.classList.toggle(redStr);
            }
        }       

        const minutes = Math.floor(countdownSecs / max);
        const seconds = countdownSecs % max;

        const minStr = formatNumber(minutes);
        const secStr = formatNumber(seconds);
        timeLeft.innerHTML = `${minStr}:${secStr}`;

        const text = inSession ? sessionStr : breakStr;
        timerLabel.innerHTML = text;

        if (countdownSecs === 0) {
            beep.play();
            countdownSecs = inSession ? calculateCountdown(breakMins) + min : calculateCountdown(sessionMins) + min;
            inSession = !inSession;
        }   
    }, 1000);
}

const stopTimer = () => clearInterval(intervalId);

let sessionMins = initialSessionMins;
let breakMins = initialBreakMins;

let countdownSecs = calculateCountdown(sessionMins); 
let running = false;
let intervalId = 0;
let inSession = true;

reset.addEventListener(btnClick, () => {
    running = false;
    inSession = true;
    stopTimer();
    beep.pause();
    beep.currentTime  = 0;
    timer.classList.remove(redStr);

    sessionMins = initialSessionMins;
    breakMins = initialBreakMins;

    adjustDisplay();
})

startStop.addEventListener(btnClick, () => {
    if (running) {
        running = false;
        stopTimer();
        return;
    }
    startTimer();
})

breakDecrement.addEventListener(btnClick, () => {
    if (running) return;

    breakMins = decrementValue(breakMins);
    adjustDisplay();
})

breakIncrement.addEventListener(btnClick, () => {
    if (running) return;

    breakMins = incrementValue(breakMins);
    adjustDisplay();
})

sessionDecrement.addEventListener(btnClick, () => {
    if (running) return;

    sessionMins = decrementValue(sessionMins);
    adjustDisplay()
})

sessionIncrement.addEventListener(btnClick, () => {
    if (running) return;

    sessionMins = incrementValue(sessionMins);
    adjustDisplay();
})
