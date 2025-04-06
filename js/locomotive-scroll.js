window.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('[data-scroll-container]');

    window.locoScroll = new LocomotiveScroll({
        el: container,
        smooth: true,
        lerp: 0.03
    });
});