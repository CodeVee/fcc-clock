const  max = 60; 
const min = 1;
const initialSessionMins = 25;
const initialBreakMins = 5;

let sessionMins = initialSessionMins;
let breakMins = initialBreakMins;

let countdownSecs = sessionMins * max; 
let running = false;
let intervalId = 0;
let inSession = true;

const breakLength = document.getElementById('break-length');
const sessionLength = document.getElementById('session-length');
const timeLeft = document.getElementById('time-left');
const timerLabel = document.getElementById('timer-label');
const timer = document.getElementById('timer');
const beep = document.getElementById('beep');

const decrementValue = number => {
    number -= min;
    if (number < min) {
        return min;
    }
    return number;
}

const incrementValue = number => {
    number += min;
    if (number > max) {
        return max;
    }
    return number;
}

const adjustDisplay = () => {
    sessionLength.innerHTML = sessionMins;
    breakLength.innerHTML = breakMins;

    if (inSession) {
        countdownSecs = sessionMins * max;
        timeLeft.innerHTML = `${formatNumber(sessionMins)}:00`;
        timerLabel.innerHTML = 'Session';
    }

    if (!inSession) {
        countdownSecs = breakMins * max;
        timeLeft.innerHTML = `${formatNumber(breakMins)}:00`;
        timerLabel.innerHTML = 'Break';
    }
}

const formatNumber = num => num < 10 ? '0' + num : num.toString();

const startTimer = () => {
    running = true;

    intervalId = setInterval(() => {
        countdownSecs -= min
        const present = timer.classList.contains('red');
        if (countdownSecs < max) {
            if (!present) {
                timer.classList.toggle('red');
            } 
        } else {
            if (present) {
                timer.classList.toggle('red');
            }
        }

        

        const minutes = Math.floor(countdownSecs / max);
        const seconds = countdownSecs % max;

        const minStr = formatNumber(minutes);
        const secStr = formatNumber(seconds);

        const text = inSession ? 'Session' : 'Break';
        timerLabel.innerHTML = text;

        if (countdownSecs === 0) {
            beep.play();
            countdownSecs = inSession ? breakMins * max + min : sessionMins * max + min;
            inSession = !inSession;
        }

        timeLeft.innerHTML = `${minStr}:${secStr}`;
    }, 1000);
}

const stopTimer = () => clearInterval(intervalId);

document.getElementById('reset').addEventListener('click', () => {
    running = false;
    inSession = true;
    stopTimer();
    beep.pause();
    beep.currentTime  = 0;
    timer.classList.remove('red');

    sessionMins = initialSessionMins;
    breakMins = initialBreakMins;

    adjustDisplay();
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
    if (running) return;

    breakMins = decrementValue(breakMins);
    adjustDisplay();
})

document.getElementById('break-increment').addEventListener('click', () => {
    if (running) return;

    breakMins = incrementValue(breakMins);
    adjustDisplay();
})

document.getElementById('session-decrement').addEventListener('click', () => {
    if (running) return;

    sessionMins = decrementValue(sessionMins);
    adjustDisplay()
})

document.getElementById('session-increment').addEventListener('click', () => {
    if (running) return;

    sessionMins = incrementValue(sessionMins);
    adjustDisplay();
})
