document.addEventListener("DOMContentLoaded", () => {
    const header = document.getElementById("topbar");

    let lastScroll = 0;
    let currentTranslate = 0;
    const maxTranslate = 100;
    const scrollSpeedFactor = 0.5;

    const updateHeader = (scrollY) => {
        const delta = scrollY - lastScroll;

        if (delta > 0 && scrollY > 50) {
            currentTranslate = Math.min(currentTranslate + delta * scrollSpeedFactor, maxTranslate);
        }

        if (delta < 0) {
            currentTranslate = Math.max(currentTranslate + delta * scrollSpeedFactor, 0);
        }

        header.style.transform = `translateY(-${currentTranslate}px)`;

        const factor = currentTranslate / maxTranslate;

        const topbarTop = 0 - (40 * factor);
        header.style.top = `${topbarTop}px`;

        lastScroll = scrollY;
    };

    const waitForLoco = setInterval(() => {
        if (window.locoScroll && typeof window.locoScroll.on === 'function') {
            clearInterval(waitForLoco);

            window.locoScroll.on("scroll", (obj) => {
                updateHeader(obj.scroll.y);
            });

            updateHeader(0);
        }
    }, 100);
});
