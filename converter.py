import json
import colorsys

# Wczytaj plik JSON
with open("WCY22KC2S0.json", "r", encoding="utf-8") as file:
    events = json.load(file)

# Funkcja generująca kontrastowe kolory (rozłożone w przestrzeni HSV)
def generate_color(index, total):
    hue = (index * 360 / total) % 360  # Rozkłada kolory równomiernie w kole barw
    rgb = colorsys.hsv_to_rgb(hue / 360, 0.85, 0.85)  # Wysokie nasycenie i jasność
    return "#{:02X}{:02X}{:02X}".format(int(rgb[0] * 255), int(rgb[1] * 255), int(rgb[2] * 255))

# Tworzymy mapę kolorów
color_map = {}

# Pobranie wszystkich unikalnych przedmiotów
subjects = list(set(event["title"].split(" ")[0] for event in events))

# Przypisanie kolorów
for index, subject in enumerate(subjects):
    color_map[subject] = generate_color(index, len(subjects))

# Przypisanie kolorów do wydarzeń
for event in events:
    event["allDay"] = False
    event["start"] = event["start"].split("+")[0]
    event["end"] = event["end"].split("+")[0]
    subject = event["title"].split(" ")[0]  # Pierwsze słowo w tytule jako klucz
    event["color"] = color_map[subject]

# Zapisz poprawiony JSON
with open("WCY22KC2S0.json", "w", encoding="utf-8") as file:
    json.dump(events, file, indent=4, ensure_ascii=False)

print("Plik JSON został poprawiony i zapisany jako WCY22KC2S0.json")
