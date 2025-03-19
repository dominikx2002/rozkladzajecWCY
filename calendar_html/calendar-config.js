document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var eventInfoBox = document.getElementById('event-info');
    var eventTitle = document.getElementById('event-title');
    var eventDescription = document.getElementById('event-description');

    function isMobile() {
        return window.innerWidth < 768;
    }

    function moveTooltip(event) {
        if (isMobile()) return;
        let offsetX = 20;
        let offsetY = 20;
        let tooltipWidth = eventInfoBox.offsetWidth;
        let tooltipHeight = eventInfoBox.offsetHeight;
        let windowWidth = window.innerWidth;
        let windowHeight = window.innerHeight;

        let posX = event.pageX + offsetX;
        let posY = event.pageY + offsetY;

        if (posX + tooltipWidth > windowWidth) {
            posX = event.pageX - tooltipWidth - offsetX;
        }
        if (posY + tooltipHeight > windowHeight) {
            posY = event.pageY - tooltipHeight - offsetY;
        }

        eventInfoBox.style.left = `${posX}px`;
        eventInfoBox.style.top = `${posY}px`;
    }

    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        locale: 'pl',
        timeZone: 'local',
        height: 'auto',
        expandRows: true,

        headerToolbar: {
            left: 'prev,next today download',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },

        customButtons: {
            download: {
                text: '',
                click: function() {
                    window.location.href = "data/calendars/calendar_ics/WCY22KC2S0.ics"
                }
            }
        },

        events: "data/calendars/calendar_json/WCY22KC2S0.json", 
        
        eventTimeFormat: {
            hour: '2-digit',
            minute: '2-digit',
            meridiem: false 
        },

        allDaySlot: false,
        slotMinTime: "07:00:00",
        slotMaxTime: "22:00:00",

        dateClick: function(info) {
            calendar.changeView('timeGridDay', info.dateStr);
        },

        eventMouseEnter: function(info) {
            if (isMobile()) return;
            eventTitle.innerText = info.event.title;
            eventDescription.innerText = info.event.extendedProps.description || "None";
            eventInfoBox.style.display = "block";
            eventInfoBox.style.width = "auto";
            eventInfoBox.style.height = "auto";
            let computedWidth = eventInfoBox.offsetWidth;
            let computedHeight = eventInfoBox.offsetHeight;
            if (computedWidth > 300) {
                eventInfoBox.style.width = "300px";
            }
            if (computedHeight > 200) {
                eventInfoBox.style.height = "200px";
                eventInfoBox.style.overflowY = "auto"; 
            }
        
            document.addEventListener('mousemove', moveTooltip);
        },        

        eventMouseLeave: function() {
            if(isMobile()) return;
            eventInfoBox.style.display = "none";
            document.removeEventListener('mousemove', moveTooltip);
        },

        eventClick: function(info) {
            if(!isMobile()) return;
            eventTitle.innerText = info.event.title;
            eventDescription.innerText = info.event.extendedProps.description || "None"
            eventInfoBox.style.display = "block";
            eventInfoBox.style.position = "absolute";
            let eventReact = info.el.getBoundingClientRect();
            let scrollY = window.scrollY || document.documentElement.scrollTop;
            eventInfoBox.style.left = `${eventReact.left}px`;
            eventInfoBox.style.top = `${eventReact.bottom + scrollY + 5}px`;
            document.addEventListener("click", function hideTooltip(e){
                if(!info.el.contains(e.target) && !eventInfoBox.contains(e.target)) {
                    eventInfoBox.style.display = "none";
                    document.removeEventListener("click", hideTooltip);
                }
            });
        }
    });

    setTimeout(() => {
        const downloadBtn = document.querySelector('.fc-download-button');
        if (downloadBtn) {
            downloadBtn.innerHTML = `<img src="data/png/icons/download_icon.png" alt="Pobierz kalendarz " width="20" height="20" style="vertical-align: middle;">`;
        }
    }, 100);
    
    function insertDownloadText() {
        setTimeout(() => {
            const toolbar = document.querySelector('.fc-toolbar-chunk:first-child'); // Pobranie paska narzędzi
            if (toolbar) {
                let textSpan = document.createElement('span');
                textSpan.innerText = "Pobierz kalendarz na telefon:";
                textSpan.style.color = "#fff"; // Kolor tekstu
                textSpan.style.fontSize = "14px"; // Rozmiar czcionki
                toolbar.insertBefore(textSpan, toolbar.querySelector('.fc-download-button'));
            }
        }, 100);
    }

    calendar.render();
    insertDownloadText();
});