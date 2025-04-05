window.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('[data-scroll-container]');
    if (!container) {
        console.error('Brakuje [data-scroll-container] w HTML!');
        return;
    }

    const scroll = new LocomotiveScroll({
        el: container,
        smooth: true,
        lerp: 0.03
    });
});
