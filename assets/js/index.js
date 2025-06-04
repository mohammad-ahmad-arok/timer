let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;
const MAX_DURATION = 60 * 1000;

const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const millisecondsEl = document.getElementById('milliseconds');

const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const tickSound = document.getElementById('tickSound');

function playTickingSound(shouldPlay) {
    if (shouldPlay) {
        if (tickSound.paused) {
            tickSound.play();
        }
    } else {
        tickSound.pause();
        tickSound.currentTime = 0;
    }
}


function displayTime(ms) {
    let milliseconds = Math.floor((ms % 1000) / 10);
    let seconds = Math.floor((ms / 1000) % 60);
    let minutes = Math.floor((ms / (1000 * 60)) % 60);

    minutesEl.textContent = String(minutes).padStart(2, '0');
    secondsEl.textContent = String(seconds).padStart(2, '0');
    millisecondsEl.textContent = String(milliseconds).padStart(2, '0');
}

function handleCountdownEffects(remainingTime) {
    if (remainingTime <= 10000) {
        document.querySelector('.timer').style.color = 'red';
        playTickingSound(true);
    } else {
        document.querySelector('.timer').style.color = '';
        playTickingSound(false);
    }
}


function updateTimer() {
    elapsedTime = Date.now() - startTime;
    let remainingTime = MAX_DURATION - elapsedTime;

    if (remainingTime <= 0) {
        clearInterval(timerInterval);
        displayTime(0);
        isRunning = false;
        startStopBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
        playTickingSound(false);
        return;
    }

    displayTime(remainingTime);
    handleCountdownEffects(remainingTime);
}


startStopBtn.onclick = function () {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateTimer, 10);
        isRunning = true;
        startStopBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
    } else {
        clearInterval(timerInterval);
        isRunning = false;
        startStopBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
    }
};

resetBtn.onclick = function () {
    clearInterval(timerInterval);
    elapsedTime = 0;
    displayTime(MAX_DURATION);
    isRunning = false;
    startStopBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
    document.querySelector('.timer').style.color = '';
    playTickingSound(false);
};

