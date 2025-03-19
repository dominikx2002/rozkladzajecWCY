document.addEventListener('DOMContentLoaded', function () {
    var calendarEl = document.getElementById('calendar');

    fetch('WCY22KC2S0.json')  // Wczytaj statyczny JSON z wydarzeniami
        .then(response => response.json())
        .then(events => {
            var calendar = new FullCalendar.Calendar(calendarEl, {
                initialView: 'dayGridMonth',
                locale: 'pl',
                events: events // Dodanie wydarzeń z JSON
            });
            calendar.render();
        })
        .catch(error => console.error('Błąd wczytywania JSON:', error));
});
