from ics import Calendar
import json

# Wczytaj plik JSON
with open("WCY22KC2S0.json", "r", encoding="utf-8") as file:
    events = json.load(file)

# Popraw format daty i dodaj brakujące pola
for event in events:
    event["allDay"] = False  # Wymusza wydarzenia na konkretne godziny
    event["start"] = event["start"].split("+")[0]  # Usuwa strefę czasową
    event["end"] = event["end"].split("+")[0]  # Usuwa strefę czasową

# Zapisz poprawiony JSON
with open("WCY22KC2S0_fixed.json", "w", encoding="utf-8") as file:
    json.dump(events, file, indent=4, ensure_ascii=False)

print("Plik JSON został poprawiony i zapisany jako WCY22KC2S0_fixed.json")
