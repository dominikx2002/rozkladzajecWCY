from ics import Calendar
import json

# Wczytaj plik ICS
with open("WCY22KC2S0.ics", "r", encoding="utf-8") as file:
    calendar = Calendar(file.read())

# Konwersja do listy wydarzeń JSON
events = []
for event in calendar.events:
    events.append({
        "title": event.name,
        "start": event.begin.isoformat(),
        "end": event.end.isoformat() if event.end else event.begin.isoformat(),
        "description": event.description
    })

# Zapisz jako plik JSON
with open("WCY22KC2S0.json", "w", encoding="utf-8") as json_file:
    json.dump(events, json_file, indent=4, ensure_ascii=False)

print("Konwersja zakończona! Plik kalendarz.json utworzony.")
