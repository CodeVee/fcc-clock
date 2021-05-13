const initialSessionMins = 25;
const initialBreakMins = 5;

let sessionMins = initialSessionMins;
let breakMins = initialBreakMins;

let countdownSecs = sessionMins * 60; 
let running = false;

const  max = 60; 
const min = 1;

const breakLength = document.getElementById('break-length');
const sessionLength = document.getElementById('session-length');
const timeLeft = document.getElementById('time-left');
const timerLabel = document.getElementById('timer-label');

const decrementValue = number => {
    number -= 1;
    if (number < min) {
        return min;
    }
    return number;
}

const incrementValue = number => {
    number += 1;
    if (number > max) {
        return max;
    }
    return number;
}

document.getElementById('reset').addEventListener('click', () => {
    running = false;
    sessionMins = initialSessionMins;
    breakMins = initialBreakMins;
    countdownSecs = sessionMins * 60;
    timeLeft.innerHTML = '25:00';
    timerLabel.innerHTML = 'Session';
})

document.getElementById('start_stop').addEventListener('click', () => {
    
})

document.getElementById('break-decrement').addEventListener('click', () => {
    if (running) {
        return;
    }
    breakMins = decrementValue(breakMins);
    breakLength.innerHTML = breakMins;
})

document.getElementById('break-increment').addEventListener('click', () => {
    if (running) {
        return;
    }
    breakMins = incrementValue(breakMins);
    breakLength.innerHTML = breakMins;
})

document.getElementById('session-decrement').addEventListener('click', () => {
    if (running) {
        return;
    }
    sessionMins = decrementValue(sessionMins);
    sessionLength.innerHTML = sessionMins;
})

document.getElementById('session-increment').addEventListener('click', () => {
    if (running) {
        return;
    }
    sessionMins = incrementValue(sessionMins);
    sessionLength.innerHTML = sessionMins;
})
