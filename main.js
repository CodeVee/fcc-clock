const sessionMins = 25;
const breakMins = 5;

let initialSessionMins = sessionMins;
let initialBreakMins = breakMins;

const  max = 60; 
const min = 1;

const breakLength = document.getElementById('break-length');
const sessionLength = document.getElementById('session-length');
const timeLeft = document.getElementById('time-left');

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

})

document.getElementById('start_stop').addEventListener('click', () => {
    
})

document.getElementById('break-decrement').addEventListener('click', () => {
    
})

document.getElementById('break-increment').addEventListener('click', () => {
    
})

document.getElementById('session-decrement').addEventListener('click', () => {
    
})

document.getElementById('session-increment').addEventListener('click', () => {
    
})
