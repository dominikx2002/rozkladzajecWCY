//animacja decrypt
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
            const revealDelay = 60;

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


//animacja falującego tekstu
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

    const spans = element.querySelectorAll(".char");

    document.addEventListener("mousemove", (e) => {
        spans.forEach((span) => {
            const rect = span.getBoundingClientRect();
            const dx = e.clientX - (rect.left + rect.width / 2);
            const dy = e.clientY - (rect.top + rect.height / 2);
            const dist = Math.sqrt(dx * dx + dy * dy);

            const range = 50; 
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

function revealWaveWordsOnScroll() {
    const wave = document.querySelector('.wave-text');
    if (!wave) return;

    const spans = Array.from(wave.querySelectorAll('span'));
    const words = [];
    let currentWord = [];

    spans.forEach(span => {
        if (span.innerHTML === '&nbsp;' || span.textContent.trim() === '') {
            if (currentWord.length) words.push(currentWord);
            currentWord = [];
        } else {
            currentWord.push(span);
        }
    });
    if (currentWord.length) words.push(currentWord);

    const observer = new IntersectionObserver(([entry], obs) => {
        if (entry.isIntersecting) {
            words.forEach((wordSpans, i) => {
                setTimeout(() => {
                    wordSpans.forEach(span => span.classList.add('visible'));
                }, i * 250); 
            });
            obs.unobserve(entry.target);
        }
    }, { threshold: 0.1 });

    observer.observe(wave);
}

window.addEventListener("DOMContentLoaded", () => {
    const wave = document.querySelector('.wave-text');
    if (wave) {
        createWaveText(wave);
        setTimeout(() => {
            revealWaveWordsOnScroll();
        }, 2400);
    }
});


// animacja fade
function triggerFadeup() {
    const target = document.querySelector('.fade');
    if (!target) return;

    const observer = new IntersectionObserver(([entry], obs) => {
        if (entry.isIntersecting) {
            target.classList.add('visible');
            obs.unobserve(target);
        }
    }, { threshold: 0.2 });

    observer.observe(target);
}

window.addEventListener('DOMContentLoaded', () => {
    triggerFadeup();
});


// animacja wjezdzania do gory
function animateWatCalendar() {
    const el = document.querySelector('.watcalendar-animation');
    if (!el) return;

    const originalText = el.textContent.trim(); 
    el.textContent = ''; 

    const groups = [
        { indexes: [4, 5, 6, 7], group: 1 }, 
        { indexes: [2], group: 2 },    
        { indexes: [8, 9], group: 2 },   
        { indexes: [0, 1], group: 3 },    
        { indexes: [10, 11], group: 3 },   
    ];

    const chars = originalText.split('');

    chars.forEach((char, i) => {
        const span = document.createElement('span');

        if (char === ' ') {
            span.innerHTML = '&nbsp;';
            span.classList.add('space');
        } else {
            span.textContent = char;

            const group = groups.find(g => g.indexes.includes(i));
            if (group) {
                span.setAttribute('data-group', group.group);
            } else {
                span.setAttribute('data-group', '0');
                span.style.opacity = '1';
            }
        }

        el.appendChild(span);
    });

    setTimeout(() => {
        el.classList.add('visible');
    }, 1250);
}

window.addEventListener('DOMContentLoaded', () => {
    animateWatCalendar();
});