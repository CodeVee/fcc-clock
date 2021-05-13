const initialSessionMins = 25;
const initialBreakMins = 5;

let sessionMins = initialSessionMins;
let breakMins = initialBreakMins;

let countdownSecs = sessionMins * 60; 
let running = false;
let intervalId = 0;
let inSession = true;

const  max = 60; 
const min = 1;

const breakLength = document.getElementById('break-length');
const sessionLength = document.getElementById('session-length');
const timeLeft = document.getElementById('time-left');
const timerLabel = document.getElementById('timer-label');
const timer = document.getElementById('timer');

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

const formatNumber = num => num < 10 ? '0' + num : num.toString();

const startTimer = () => {
    running = true;

    intervalId = setInterval(() => {
        countdownSecs -= 1
        if (countdownSecs === 0) {
            countdownSecs = inSession ? breakMins * 60 : sessionMins * 60;
            inSession = !inSession;
        }

        const present = timer.classList.contains('red');
        if (countdownSecs < 60) {
            if (!present) {
                timer.classList.toggle('red');
            } 
        } else {
            if (present) {
                timer.classList.toggle('red');
            }
        }

        const min = Math.floor(countdownSecs / 60);
        const sec = countdownSecs % 60;

        const minStr = formatNumber(min);
        const secStr = formatNumber(sec);

        const text = inSession ? 'Session' : 'Break';
        timerLabel.innerHTML = text;

        timeLeft.innerHTML = `${minStr}:${secStr}`;

    }, 1000);
}

const stopTimer = () => clearInterval(intervalId);

document.getElementById('reset').addEventListener('click', () => {
    running = false;
    stopTimer();
    timer.classList.remove('red');

    sessionMins = initialSessionMins;
    sessionLength.innerHTML = sessionMins;

    breakMins = initialBreakMins;
    breakLength.innerHTML = breakMins;

    countdownSecs = sessionMins * 60;
    timeLeft.innerHTML = '25:00';
    timerLabel.innerHTML = 'Session';
})

document.getElementById('start_stop').addEventListener('click', () => {
    if (running) {
        running = false;
        stopTimer();
        return;
    }
    startTimer();
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
    countdownSecs = sessionMins * 60;
    sessionLength.innerHTML = sessionMins;
    timeLeft.innerHTML = `${formatNumber(sessionMins)}:00`
})

document.getElementById('session-increment').addEventListener('click', () => {
    if (running) {
        return;
    }
    sessionMins = incrementValue(sessionMins);
    countdownSecs = sessionMins * 60;
    sessionLength.innerHTML = sessionMins;
    timeLeft.innerHTML = `${formatNumber(sessionMins)}:00`
})
