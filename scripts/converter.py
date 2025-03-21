from ics import Calendar
import json
import colorsys
import os

ics_dir = "data/calendars/WCY/calendar_ics"
json_dir = "data/calendars/WCY/calendar_json"

def generate_color(index, total):
    hue = (index * 360 / total) % 360
    rgb = colorsys.hsv_to_rgb(hue / 360, 0.6, 0.7)
    return "#{:02X}{:02X}{:02X}".format(int(rgb[0] * 255), int(rgb[1] * 255), int(rgb[2] * 255))

for filename in os.listdir(ics_dir):
    if filename.endswith(".ics"):
        ics_path = os.path.join(ics_dir, filename)
        json_filename = filename.replace(".ics", ".json")
        json_path = os.path.join(json_dir, json_filename)

    with open(ics_path, "r", encoding="utf-8") as file:
        calendar = Calendar(file.read())

    events = []
    for event in calendar.events:
        events.append({
            "title": event.name,
            "start": event.begin.isoformat(),
            "end": event.end.isoformat() if event.end else event.begin.isoformat(),
            "description": event.description
        })

    existing_colors = {}
    if os.path.exists(json_path):
        with open(json_path, "r", encoding="utf=8") as  f:
            try:
                existing_events = json.load(f)
                for e in existing_events:
                    if "color" in e:
                        existing_colors[e["title"].split(" ")[0]]  = e["color"]
            except json.JSONDecodeError:
                print("Error: Blad odczytu JSON - nadpisanie pliku.")


    subjects = list(set(event["title"].split(" ")[0] for event in events))

    color_map = existing_colors.copy()

    new_subjects = [s for s in subjects if s not in color_map]

    for index, subject in enumerate(new_subjects):
        color_map[subject] = generate_color(index, len(subjects))

    for event in events:
        event["allDay"] = False
        event["start"] = event["start"].split("+")[0]
        event["end"] = event["end"].split("+")[0]
        subject = event["title"].split(" ")[0]  
        event["color"] = color_map[subject]

    with open(json_path, "w", encoding="utf-8") as json_file:
        json.dump(events, json_file, indent=4, ensure_ascii=False)

    print(f"Plik JSON został zapisany: {json_path}")