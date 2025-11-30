const WORLD_DATA = {
    // 1. ZIELEŃ (Wszyscy tu są)
    "default": [
        {
            name: "WETERAN",
            rank: "leader",
            castle: { name: "Zamek Główny", x: 500, y: 500 },
            outposts: [{ name: "Post 1", x: 502, y: 502 }] 
        },
        {
            name: "NOWICJUSZ",
            rank: "novice",
            castle: { name: "Mały Zamek", x: 600, y: 600 }
            // Nie ma posterunków, labów, wiosek -> OK, kod to obsłuży
        }
    ],

    // 2. LÓD (Tylko Weteran)
    "dark": [
        {
            name: "WETERAN",
            rank: "leader",
            castle: { name: "Zamek Zimowy", x: 200, y: 200 },
            // Brak wiosek na lodzie? -> OK, po prostu nie wpisujemy klucza 'villages'
            labs: [{ name: "Lab", x: 205, y: 205 }]
        }
        // NOWICJUSZA tu nie wpisujemy w ogóle.
    ],

    // 3. PIASEK (Tylko Weteran)
    "satellite": [
        {
            name: "WETERAN",
            rank: "leader",
            castle: { name: "Zamek Pustynny", x: 100, y: 100 },
            villages: [
                { name: "Wioska jedzenia", x: 102, y: 102 }
            ]
        }
    ],

    // 4. OGIEŃ (Pusto lub Weteran)
    "terrain": [
        // Jeśli tu nikogo nie ma, zostawiamy pustą tablicę
    ]
};