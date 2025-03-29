const cardGrid = document.querySelector('.card-grid');
const cards = document.querySelectorAll('.card');

let hoverTimeout = null;

cards.forEach(card => {
    const bg = card.querySelector('.card-background');

    bg.addEventListener('mouseenter', () => {
        clearTimeout(hoverTimeout);
        cards.forEach(c => c.classList.remove('hovering'));
        card.classList.add('hovering');
        cardGrid.classList.add('hovering');
    });

    bg.addEventListener('mouseleave', () => {
        hoverTimeout = setTimeout(() => {
            card.classList.remove('hovering');
            cardGrid.classList.remove('hovering');
        }, 100); 
    });
});
