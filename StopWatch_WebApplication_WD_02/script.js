let startTime;
let lapStartTime;
let running = false;
const display = document.querySelector('.stopwatch-timer-display');
const lapDisplay = document.querySelector('.lap-times-display');
let laps = [];

let intervalId; // Declare interval variable

function startTimer() {
    if (!running) {
        startTime = new Date().getTime();
        lapStartTime = startTime;
        intervalId = setInterval(getShowTime, 1); // Assign interval ID
        running = true;
    }
}

function pauseTimer() {
    if (running) {
        clearInterval(intervalId); // Clear using the interval ID
        running = false;
    }
}

function resetTimer() {
    clearInterval(intervalId);
    running = false;
    display.textContent = '00:00:00:000';
    lapDisplay.innerHTML = ''; // Clear lap times display
    laps = [];
    startTime = null;
    lapStartTime = null; // Reset lap start time
}

function getShowTime() {
    const updatedTime = new Date().getTime();
    const difference = updatedTime - startTime;

    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((difference % 1000));

    const formattedTime = `${(hours < 10 ? '0' : '') + hours}:${(minutes < 10 ? '0' : '') + minutes}:${(seconds < 10 ? '0' : '') + seconds}:${(milliseconds < 100 ? '0' : '') + (milliseconds < 10 ? '00' : '') + milliseconds}`;
    display.textContent = formattedTime;
}

function restartTimer() {
    if (!running) {
        // Resume timer from where it was paused
        intervalId = setInterval(getShowTime, 1);
        running = true;
    } else {
        // Pause the running timer
        clearInterval(intervalId);
        running = false;
    }
}

function lapTimer() {
    if (running) {
        const lapTime = new Date().getTime() - lapStartTime;
        laps.push(lapTime);

        const lapHours = Math.floor((lapTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const lapMinutes = Math.floor((lapTime % (1000 * 60 * 60)) / (1000 * 60));
        const lapSeconds = Math.floor((lapTime % (1000 * 60)) / 1000);
        const lapMilliseconds = Math.floor((lapTime % 1000));

        const formattedLapTime = `${(lapHours < 10 ? '0' : '') + lapHours}:${(lapMinutes < 10 ? '0' : '') + lapMinutes}:${(lapSeconds < 10 ? '0' : '') + lapSeconds}:${(lapMilliseconds < 100 ? '0' : '') + (lapMilliseconds < 10 ? '00' : '') + lapMilliseconds}`;
        
        // Display lap time
        lapDisplay.innerHTML += `<div>Lap ${laps.length}: ${formattedLapTime}</div>`;
        
        // Update lapStartTime to the current time
        lapStartTime = new Date().getTime();
    }
}

function resetLapTimer() {
    laps = [];
    lapDisplay.textContent = '';
}

// Event listeners for buttons
document.getElementById('start-timer-button').addEventListener('click', startTimer);
document.getElementById('pause-timer-button').addEventListener('click', pauseTimer);
document.getElementById('reset-timer-button').addEventListener('click', resetTimer);
document.getElementById('restart-timer-button').addEventListener('click', restartTimer);
document.getElementById('lap-timer-button').addEventListener('click', lapTimer);
document.getElementById('reset-lap-timer-button').addEventListener('click', resetLapTimer);
