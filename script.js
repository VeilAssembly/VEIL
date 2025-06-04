document.addEventListener('DOMContentLoaded', () => {
    // --- Configuration ---
    // SET YOUR TARGET DATE AND TIME HERE!
    // Format: "Month Day, Year HH:MM:SS" (e.g., "December 31, 2025 23:59:59")
    const countdownUntil = "July 14, 2025 23:59:59"; // <--- CHANGE THIS!

    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    const countdownEl = document.getElementById('countdown');
    const iykykEl = document.getElementById('iykyk');

    let previousValues = { s: -1, m: -1, h: -1, d: -1 };

    function updateCountdown() {
        const targetDate = new Date(countdownUntil).getTime();
        const now = new Date().getTime();
        const timeLeft = targetDate - now;

        if (timeLeft < 0) {
            countdownEl.innerHTML = "THE VEIL HAS LIFTED";
            iykykEl.innerHTML = "WELCOME";
            if (document.querySelector('.veil-brand-mark')) {
                document.querySelector('.veil-brand-mark').style.opacity = '0.5'; // Keep brand mark subtly visible
            }
            clearInterval(timerInterval);
            return;
        }

        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        if (previousValues.s !== seconds) animateDigit(secondsEl, formatTime(seconds));
        if (previousValues.m !== minutes) animateDigit(minutesEl, formatTime(minutes));
        if (previousValues.h !== hours) animateDigit(hoursEl, formatTime(hours));
        if (previousValues.d !== days) animateDigit(daysEl, formatTime(days));
        
        previousValues = { s: seconds, m: minutes, h: hours, d: days };
    }

    function formatTime(time) {
        return time < 10 ? `0${time}` : String(time);
    }

    function animateDigit(element, value) {
        if (element.textContent !== value) {
            element.classList.remove('digit-change');
            void element.offsetHeight; // Trigger reflow
            element.textContent = value;
            element.classList.add('digit-change');
        } else {
             // Ensure initial display without animation if value is the same
            element.textContent = value;
        }
    }
    
    updateCountdown(); // Initial call to set values
    const timerInterval = setInterval(updateCountdown, 1000);
});
