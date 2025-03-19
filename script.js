document.addEventListener('DOMContentLoaded', function () {
    var calendarEl = document.getElementById('calendar');

    fetch('WCY22KC2S0.json') // Upewnij się, że plik ma poprawną nazwę
        .then(response => response.json())
        .then(events => {
            console.log("Załadowane wydarzenia:", events); // Debugowanie w konsoli

            var calendar = new FullCalendar.Calendar(calendarEl, {
                initialView: 'dayGridMonth',
                locale: 'pl',
                events: events,
                eventClick: function(info) { 
                    alert("Wydarzenie: " + info.event.title + "\nOpis: " + info.event.extendedProps.description);
                }
            });

            calendar.render();
        })
        .catch(error => console.error("Błąd wczytywania JSON:", error));
});
