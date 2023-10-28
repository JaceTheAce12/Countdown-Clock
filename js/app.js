const eventTitleInput = document.querySelector('#event-title'); 
const eventDatetimeInput = document.querySelector('#event-datetime');
const eventTimezoneInput = document.querySelector('#event-timezone');
const startCountdownBtn = document.querySelector('#start-countdown');
const pauseCountdownBtn = document.querySelector('#pause-countdown');
const cancelCountdownBtn = document.querySelector('#cancel-countdown');
const titleElement = document.querySelector('#countdown-title');
const daysSpan = document.querySelector('#days');
const hoursSpan = document.querySelector('#hours');
const minutesSpan = document.querySelector('#minutes');
const secondsSpan = document.querySelector('#seconds');

let countdownInterval;

// Function to update the countdown
function updateCountdown() {
    clearInterval(countdownInterval);

    const eventDateTime = moment.tz(eventDatetimeInput.value, eventTimezoneInput.value).toDate();

    function calculateTimeDifference() {
        const now = moment.tz('America/Denver').toDate(); 
        const timeDifference = eventDateTime - now;

        if (timeDifference > 0) {
            const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

            daysSpan.textContent = String(days).padStart(2, '0');
            hoursSpan.textContent = String(hours).padStart(2, '0');
            minutesSpan.textContent = String(minutes).padStart(2, '0');
            secondsSpan.textContent = String(seconds).padStart(2, '0');
        } else {
            clearInterval(countdownInterval); 
            daysSpan.textContent = '00';
            hoursSpan.textContent = '00';
            minutesSpan.textContent = '00';
            secondsSpan.textContent = '00';

            // Trigger the confetti animation 
        confetti({
            particleCount: 150, 
            spread: 180, 
        });
        }
    }

    calculateTimeDifference(); 

    countdownInterval = setInterval(calculateTimeDifference, 1000); 

    titleElement.textContent = eventTitleInput.value;
}

function cancelCountdown() {
    clearInterval(countdownInterval);

    daysSpan.textContent = '00';
    hoursSpan.textContent = '00';
    minutesSpan.textContent = '00';
    secondsSpan.textContent = '00';

    eventTitleInput.value = '';
    eventDatetimeInput.value = '';

    titleElement.textContent = 'Countdown Timer';
}

function pauseCountdown() {
    clearInterval(countdownInterval);
}

// Start Countdown
startCountdownBtn.addEventListener('click', updateCountdown);

// Pause Countdown
pauseCountdownBtn.addEventListener('click', pauseCountdown);

// Cancel Countdown
cancelCountdownBtn.addEventListener('click', cancelCountdown);