window.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("rain");
    if (!container) return;

    const positions = [20, 40, 60, 80];
    const strips = [];
    const isBusy = [false, false, false, false]; 

    for (let i = 0; i < positions.length; i++) {
        const strip = document.createElement("div");
        strip.classList.add("rain-strip");
        strip.style.left = `calc(${positions[i]}% - 2px)`;
        container.appendChild(strip);
        strips.push(strip);
    }

    function createSmugaOn(i) {
        if (isBusy[i]) return;

        const glow = document.createElement("div");
        glow.classList.add("highlight");

        const duration = 5 + Math.random(); 
        glow.style.animationDuration = `${duration}s`;

        isBusy[i] = true;

        glow.addEventListener("animationend", () => {
            glow.remove();
            isBusy[i] = false;
        });

        strips[i].appendChild(glow);
    }

    function startSmugiWave() {
        const indexes = [...strips.keys()];

        for (let i = indexes.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [indexes[i], indexes[j]] = [indexes[j], indexes[i]];
        }

        indexes.forEach((idx, i) => {
            setTimeout(() => createSmugaOn(idx), i * 300); 
        });
    }

    setInterval(startSmugiWave, 5000);
    setTimeout(startSmugiWave, 1000);
});
