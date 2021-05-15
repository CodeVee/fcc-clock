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

document.getElementById('reset').addEventListener(btnClick, () => {
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

document.getElementById('start_stop').addEventListener(btnClick, () => {
    if (running) {
        running = false;
        stopTimer();
        return;
    }
    startTimer();
})

document.getElementById('break-decrement').addEventListener(btnClick, () => {
    if (running) return;

    breakMins = decrementValue(breakMins);
    adjustDisplay();
})

document.getElementById('break-increment').addEventListener(btnClick, () => {
    if (running) return;

    breakMins = incrementValue(breakMins);
    adjustDisplay();
})

document.getElementById('session-decrement').addEventListener(btnClick, () => {
    if (running) return;

    sessionMins = decrementValue(sessionMins);
    adjustDisplay()
})

document.getElementById('session-increment').addEventListener(btnClick, () => {
    if (running) return;

    sessionMins = incrementValue(sessionMins);
    adjustDisplay();
})
