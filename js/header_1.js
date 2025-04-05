const header = document.querySelector('.header');
const logo = document.querySelector('.logo');
const logoImg = document.querySelector('.logo img');
const topbar = document.querySelector('.topbar');

let lastScroll = window.scrollY;
let currentTranslate = 0;
const maxTranslate = 100;
const scrollSpeedFactor = 0.5;

function updateHeaderOnScroll() {
    const scrollY = window.scrollY;
    const delta = scrollY - lastScroll;

    if (delta > 0 && scrollY > 50) {
        currentTranslate = Math.min(currentTranslate + delta * scrollSpeedFactor, maxTranslate);
    }

    if (delta < 0) {
        currentTranslate = Math.max(currentTranslate + delta * scrollSpeedFactor, 0);
    }

    header.style.transform = `translateY(-${currentTranslate}px)`;

    const factor = currentTranslate / maxTranslate;

    const headerPadding = 60 - (30 * factor);
    header.style.padding = `${headerPadding}px 40px`;

    const logoTop = 10 - (30 * factor);
    logo.style.top = `${logoTop}px`;

    const logoWidth = 80 - (40 * factor);
    logoImg.style.width = `${logoWidth}px`;

    const topbarTop = 55 - (40 * factor);
    topbar.style.top = `${topbarTop}px`;

    const topbarFontSize = 22 - (10 * factor);
    topbar.style.fontSize = `${topbarFontSize}px`;

    lastScroll = scrollY;
}

window.addEventListener('scroll', updateHeaderOnScroll);

window.addEventListener('DOMContentLoaded', updateHeaderOnScroll);