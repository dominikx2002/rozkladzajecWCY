window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const parallaxSpeed = 0.2; // im mniejsze, tym subtelniejszy efekt

    const background = document.querySelector(".background");
    background.style.transform = `translateY(${scrollY * parallaxSpeed}px)`;
});