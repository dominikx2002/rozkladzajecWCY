document.addEventListener('DOMContentLoaded', function () {
    var calendarEl = document.getElementById('calendar');

    fetch('kalendarz.json') // Pobiera statyczny JSON
        .then(response => response.json())
        .then(events => {
            var calendar = new FullCalendar.Calendar(calendarEl, {
                initialView: 'listWeek', // Styl listy podobny do iPhone Calendar
                locale: 'pl',
                headerToolbar: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,listWeek'
                },
                events: events,
                eventClick: function(info) { 
                    alert("Wydarzenie: " + info.event.title + "\nOpis: " + info.event.extendedProps.description);
                }
            });

            calendar.render();
        })
        .catch(error => console.error("Błąd:", error));
});
