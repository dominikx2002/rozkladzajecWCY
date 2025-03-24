function showSection(id) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

function toggleSidebar() {
    document.querySelector('.sidebar').classList.toggle('open');
}

function showSection(id, element) {
    // Ukryj wszystkie sekcje
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });

    // Pokaż aktywną sekcję
    document.getElementById(id).classList.add('active');

    // Odznacz wszystkie przyciski
    document.querySelectorAll('.menu-item').forEach(btn => {
        btn.classList.remove('active');
    });

    // Podświetl kliknięty przycisk
    element.classList.add('active');
}
