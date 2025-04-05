window.addEventListener("DOMContentLoaded", () => {
    const elements = document.querySelectorAll(".decrypt-text");
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";

    elements.forEach((el) => {
        const originalText = el.dataset.original;
        const targetText = el.dataset.target;
        let interval = null;

        function animateDecrypt(fromText, toText) {
            clearInterval(interval);
            let iterations = 0;
            const revealDelay = 40;

            interval = setInterval(() => {
                const result = toText
                    .split("")
                    .map((char, i) => {
                        if (char === " ") return " ";
                        if (iterations > i) return toText[i];
                        return characters[Math.floor(Math.random() * characters.length)];
                    })
                    .join("");

                el.textContent = result;
                iterations++;

                if (iterations > toText.length) {
                    clearInterval(interval);
                    el.textContent = toText;
                }
            }, revealDelay);
        }

        el.addEventListener("mouseenter", () => {
            if (el.textContent !== targetText) {
                animateDecrypt(originalText, targetText);
            }
        });

        el.addEventListener("mouseleave", () => {
            if (el.textContent !== originalText) {
                animateDecrypt(targetText, originalText);
            }
        });
    });
});

function decodeHTMLEntities(str) {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = str;
    return textarea.value;
}

function createWaveText(element) {
    const htmlParts = element.innerHTML
        .split(/(<[^>]+>)/g)
        .filter(Boolean);

    const decodeHTMLEntities = (str) => {
        const textarea = document.createElement("textarea");
        textarea.innerHTML = str;
        return textarea.value;
    };

    element.innerHTML = htmlParts.map(part => {
        if (part.startsWith("<")) return part;

        const decoded = decodeHTMLEntities(part);

        return [...decoded].map(char => {
            if (char === " ") {
                return `<span class="space">&nbsp;</span>`;
            }
            const x = (Math.random() * 2 - 1) * 10;
            const r = (Math.random() * 2 - 1) * 15;
            return `<span class="char" style="--randomX: ${x}px; --randomR: ${r}deg;">${char}</span>`;
        }).join("");
    }).join("");

    // dynamiczna fala za kursorem
    const spans = element.querySelectorAll(".char");

    document.addEventListener("mousemove", (e) => {
        spans.forEach((span) => {
            const rect = span.getBoundingClientRect();
            const dx = e.clientX - (rect.left + rect.width / 2);
            const dy = e.clientY - (rect.top + rect.height / 2);
            const dist = Math.sqrt(dx * dx + dy * dy);

            const range = 50; // zasiêg "fali"
            if (dist < range) {
                span.style.transform = `translateY(-12px) translateX(${span.style.getPropertyValue("--randomX")}) rotate(${span.style.getPropertyValue("--randomR")})`;
            } else {
                span.style.transform = "translateY(0) translateX(0) rotate(0)";
            }
        });
    });
}

window.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".wave-text").forEach(createWaveText);
});
