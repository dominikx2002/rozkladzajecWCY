document.addEventListener('DOMContentLoaded', function () {
    var calendarEl = document.getElementById('calendar');

    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        locale: 'pl', // Ustawienie języka polskiego
        events: 'WCY22KC2S0.json' // Wczytanie wydarzeń z pliku JSON
    });

    calendar.render();
});
