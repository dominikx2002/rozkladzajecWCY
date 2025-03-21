document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var eventInfoBox = document.getElementById('event-info');
    var eventTitle = document.getElementById('event-title');
    var eventDescription = document.getElementById('event-description');
    var groupSelect = document.getElementById("group-select");

    async function loadGroups() {
        try {
            const response = await fetch("data/calendars/WCY/groups.txt");
            const text = await response.text();
            const groups = text.split("\n").map(g => g.trim()).filter(g => g !== "");

            let select = document.getElementById("group-select");
            groups.forEach(group => {
                let option = document.createElement("option");
                option.value = group;
                option.textContent = group;
                select.appendChild(option);
            });
        } catch (error) {
            console.error("Błąd ładowania grup:", error);
        }
    }

    function downloadICS() {
        let selectedGroup = document.getElementById("group-select").value;
        if (!selectedGroup) {
            alert("Wybierz grupę!");
            return;
        }

        // Zamiana gwiazdek * na podłogi _
        let fixedGroupName = selectedGroup.replace(/\*/g, "_"); 

        let icsFileUrl = `data/calendars/WCY/calendar_ics/${encodeURIComponent(fixedGroupName)}.ics`;
        console.log("Pobieranie:", icsFileUrl);
        window.location.href = icsFileUrl;
    }


    window.onload = loadGroups;

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
        initialView: 'timeGridWeek',
        locale: 'pl',
        timeZone: 'local',
        height: 'auto',
        expandRows: true,

        headerToolbar: {
            left: 'prev,next today download',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek'
        },

        customButtons: {
            download: {
                text: '',
                click: function() {
                    alert("Najpierw wybierz grupę!");
                }
            }
        },

        events: [],
        
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

    async function loadGroups() {
        try {
            const response = await fetch("data/calendars/WCY/groups.txt");
            const text = await response.text();
            const groups = text.split("\n").map(g => g.trim()).filter(g => g !== "");

            let select = document.getElementById("group-select");

            let defaultOption = document.createElement("option");
            defaultOption.value = "";
            defaultOption.disabled = true;
            defaultOption.selected = true;
            select.appendChild(defaultOption);

            groups.forEach(group => {
                let option = document.createElement("option");
                option.value = group;
                option.textContent = group;
                groupSelect.appendChild(option);
            });

        } catch (error) {
            console.error("Błąd ładowania grup:", error);
        }
    }

    // 🔄 **Funkcja aktualizująca kalendarz po zmianie grupy**
    function updateCalendar(selectedGroup) {
        if (!selectedGroup) return;

        let fixedGroupName = selectedGroup.replace(/\*/g, "_");
        console.log(`📅 Aktualizacja kalendarza dla: ${fixedGroupName}`);

        let calendarTitle = document.querySelector(".calendar-title");
        calendarTitle.innerText = fixedGroupName;
        calendarTitle.style.display = "block";

        document.querySelector(".calendar-title").innerText = fixedGroupName;

        // 🛠 **Usunięcie starych eventów**
        calendar.removeAllEventSources();

        // 📂 **Dodanie nowego źródła eventów**
        let jsonPath = `data/calendars/WCY/calendar_json/${encodeURIComponent(fixedGroupName)}.json`;
        console.log(`📂 Ładowanie: ${jsonPath}`);
        calendar.addEventSource(jsonPath);

        // 🛠 **Aktualizacja przycisku pobierania**
        calendar.setOption('customButtons', {
            download: {
                text: '',
                click: function() {
                    const icsPath = `data/calendars/WCY/calendar_ics/${encodeURIComponent(fixedGroupName)}.ics`;
                    console.log("⬇ Pobieranie:", icsPath);
                    window.location.href = icsPath;
                }
            }
        });

        // 📌 **Zapamiętaj wybór grupy**
        localStorage.setItem("selectedGroup", selectedGroup);

        // 🔄 **Naprawa ikony pobierania**
        setTimeout(() => {
            const downloadBtn = document.querySelector('.fc-download-button');
            if (downloadBtn) {
                downloadBtn.innerHTML = `<img src="data/png/icons/download_icon.png" alt="Pobierz kalendarz" width="20" height="20" style="vertical-align: middle;">`;
            }
        }, 100);
    }

    // 🔄 **Obsługa zmiany grupy**
    groupSelect.addEventListener("change", function() {
        let selectedGroup = this.value;
        updateCalendar(selectedGroup);
    });

    loadGroups();

});

