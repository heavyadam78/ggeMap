
***

# 🗺️ ggeMap - Interaktywna Mapa Sojuszu

**ggeMap** to lekkie, szybkie i interaktywne narzędzie webowe do wizualizacji pozycji graczy na mapie świata gry (GGE). Projekt wykorzystuje **HTML5 Canvas** do renderowania mapy, co zapewnia wysoką wydajność nawet przy dużej liczbie obiektów.

![Status projektu](https://img.shields.io/badge/Status-Aktywny-success)
![Technologia](https://img.shields.io/badge/Tech-HTML5_Canvas-orange)
![Licencja](https://img.shields.io/badge/Licencja-MIT-blue)

## ✨ Główne Funkcjonalności

*   **Obsługa 4 Królestw:** Wielkie Cesarstwo, Kraina Wiecznych Lodów, Płonące Piaski, Ogniste Szczyty.
*   **Wysoka wydajność:** Płynne przybliżanie (zoom) i przesuwanie (pan) dzięki Canvas API.
*   **Wyszukiwarka:** Szybkie szukanie graczy po nicku, nazwie obiektu lub współrzędnych (X:Y).
*   **Filtrowanie:** Możliwość włączania/wyłączania widoczności posterunków, laboratoriów, wiosek i monumentów.
*   **Lista Graczy:** Boczny panel z drzewiastą strukturą sojuszu (Podział na rangi).
*   **Tryb Ikon/Obrazów:** Przełączanie między uproszczonymi ikonami a grafikami budynków (LOD).
*   **Responsywność:** Dostosowany interfejs (zwijane panele boczne).
*   **Zapis ustawień:** Zapamiętywanie pozycji kamery, filtrów i wybranego królestwa (LocalStorage).

## 🚀 Jak uruchomić?

Projekt jest stroną statyczną, nie wymaga instalacji żadnych zależności (npm/node).

1.  Sklonuj repozytorium:
    ```bash
    git clone https://github.com/heavyadam78/ggeMap.git
    ```
2.  Otwórz plik `index.html` w dowolnej nowoczesnej przeglądarce (Chrome, Edge, Firefox).

> **Wskazówka:** Aby udostępnić mapę sojuszowi, najlepiej włączyć **GitHub Pages** w ustawieniach repozytorium.

## ⚙️ Konfiguracja Danych

Wszystkie dane graczy znajdują się w pliku `js/data.js`. Dane są podzielone na królestwa.

### Struktura `WORLD_DATA`

```javascript
const WORLD_DATA = {
    // 1. Wielkie Cesarstwo (Zieleń)
    "default": [
        {
            name: "NickGracza",
            rank: "leader", // Rangi: leader, deputy, warmarshal, general, sargent, member, novice
            castle: { name: "Nazwa Zamku", x: 500, y: 500 },
            outposts: [
                { name: "Post 1", x: 502, y: 502 },
                { name: "Post 2", x: 505, y: 505 }
            ],
            labs: [],      // Opcjonalne
            monuments: []  // Opcjonalne
        }
    ],
    
    // 2. Kraina Wiecznych Lodów
    "lodzik": [
        {
            name: "NickGracza",
            rank: "leader",
            castle: { name: "Zamek Zimowy", x: 200, y: 200 },
            villages: [    // Wioski surowcowe
                { name: "Wioska Węgla", x: 205, y: 205 }
            ]
        }
    ],
    
    // 3. Płonące Piaski
    "piasek": [ ... ],
    
    // 4. Ogniste Szczyty
    "szczyty": [ ... ]
};
```

### Dostępne typy obiektów
*   `castle` (Zamek główny - wymagany)
*   `ruin` (Ruiny - alternatywa dla zamku)
*   `outposts` (Posterunki)
*   `villages` (Wioski surowcowe - na krainach żywiołowych)
*   `labs` (Laboratoria)
*   `monuments` (Monumenty)

## 🎨 Personalizacja (`config.js`)

W pliku `js/config.js` możesz dostosować wygląd mapy:
*   Kolory tła dla poszczególnych królestw (`kingdomBackgrounds`).
*   Kolory linii i znaczników.
*   Ścieżki do ikon i grafik (`images`).
*   Rozmiary obiektów na mapie.

## 🎮 Sterowanie

*   **LPM + Przesunięcie:** Przesuwanie mapy.
*   **Rolka myszy:** Przybliżanie / Oddalanie (Zoom).
*   **Kliknięcie (LPM):** Zaznaczenie gracza/obiektu.
*   **Panel Prawy:** Lista graczy (kliknij, aby wycentrować mapę na obiekcie).
*   **Panel Lewy:** Wyszukiwarka i filtry widoczności.

## 🛠️ Technologie

*   HTML5
*   CSS3 (Flexbox, CSS Variables)
*   JavaScript (ES6+)
*   Font Awesome 6 (Ikony)

---
*Projekt stworzony dla celów edukacyjnych i hobbystycznych.*

***
