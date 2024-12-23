// Hide offcanvas when follow link
var links = document.getElementById("offcanvas").getElementsByTagName("a");
for (a of links) {
    a.onclick = () => bootstrap.Offcanvas.getInstance("#offcanvas").hide();
};

// Countdown timer
(() => {
const second = 1000,
    minute = second * 60,
    hour = minute * 60,
    day = hour * 24;

const eventDate = new Date("2025-04-17T00:00:00-03:00").getTime(),
    x = setInterval(function() {

        const now = new Date().getTime(),
            distance = eventDate - now;

        const countdown = document.getElementById("countdown");
        if (distance < 0 || !countdown) {
            if (distance < 0) bootstrap.Alert.getOrCreateInstance('#countdown').close();
            clearInterval(x);
            return;
        }

        document.getElementById("days").innerText = Math.floor(distance / (day)),
        document.getElementById("hours").innerText = Math.floor((distance % (day)) / (hour)),
        document.getElementById("minutes").innerText = Math.floor((distance % (hour)) / (minute)),
        document.getElementById("seconds").innerText = Math.floor((distance % (minute)) / second);
    }, 0);
})();

// Popover
const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl));

// Flip
const flipBoxes = [...document.getElementsByClassName("flip-box")].forEach(fb => {
    fb.addEventListener("click", () => {
        const fbi = fb.getElementsByClassName("flip-box-inner")[0];
        if (fbi.style.transform) fbi.style.transform = "";
        else fbi.style.transform = "rotateY(180deg)";
    });
});