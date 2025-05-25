let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;
const MAX_DURATION = 60 * 1000;

const timerDisplay = document.getElementById('timer');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const winMessage = document.getElementById('winMessage');

function formatTime(ms) {
    let milliseconds = parseInt((ms % 1000) / 10);
    let seconds = Math.floor((ms / 1000) % 60);
    let minutes = Math.floor((ms / (1000 * 60)) % 60);
    let hours = Math.floor((ms / (1000 * 60 * 60)));

    return (
        String(hours).padStart(2, '0') + ':' +
        String(minutes).padStart(2, '0') + ':' +
        String(seconds).padStart(2, '0') + '.' +
        String(milliseconds).padStart(2, '0')
    );
}

function updateTimer() {
    elapsedTime = Date.now() - startTime;

    if (elapsedTime >= MAX_DURATION) {
        clearInterval(timerInterval);
        elapsedTime = MAX_DURATION;
        timerDisplay.textContent = formatTime(elapsedTime);
        isRunning = false;
        startStopBtn.textContent = '🎉';
        showWin();
        return;
    }

    timerDisplay.textContent = formatTime(elapsedTime);
}

startStopBtn.onclick = function () {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateTimer, 10);
        isRunning = true;
        startStopBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
        winMessage.style.display = 'none';
    } else {
        clearInterval(timerInterval);
        isRunning = false;
        startStopBtn.innerHTML = '<i class="fa-solid fa-play">';
    }
};

resetBtn.onclick = function () {
    clearInterval(timerInterval);
    elapsedTime = 0;
    timerDisplay.textContent = "00:00:00.00";
    isRunning = false;
    startStopBtn.innerHTML = '<i class="fa-solid fa-play">';
    winMessage.style.display = 'none';
};

function showWin() {
    winMessage.style.display = 'block';

    var count = 200;
    var defaults = {
        origin: { y: 0.7 }
    };

    function fire(particleRatio, opts) {
        confetti({
            ...defaults,
            ...opts,
            particleCount: Math.floor(count * particleRatio)
        });
    }

    fire(0.25, {
        spread: 26,
        startVelocity: 55,
    });

    fire(0.2, {
        spread: 60,
    });

    fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8
    });

    fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2
    });

    fire(0.1, {
        spread: 120,
        startVelocity: 45,
    });
}

