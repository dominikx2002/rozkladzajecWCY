window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    const page = document.querySelector('.page-content');

    setTimeout(() => {
        loader.classList.add('hidden'); 
        setTimeout(() => loader.remove(), 600); 
        page.classList.remove('hidden');
        page.classList.add('show');
    }, 3200); 
});