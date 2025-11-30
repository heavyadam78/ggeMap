To świetny pomysł. Rozbudowa mapy o obsługę wielu królestw (Kraina Wiecznych Lodów, Płonące Piaski, Ogniste Szczyty) wymaga kilku zmian systemowych:

1.  **Zmiana struktury danych (`data.js`)** – musimy przechowywać dane dla każdego królestwa osobno.
2.  **Obsługa "Wiosek"** – to nowy typ obiektu specyficzny dla królestw żywiołowych.
3.  **Logika przełączania** – czyszczenie mapy i ładowanie nowych danych po zmianie w dropdownie.
4.  **Dostosowanie wyglądu** – inne tło dla każdego królestwa.

Oto gotowe zmiany w plikach.

### 1. Zmiana struktury danych (`js/data.js`)

Obecnie `GAME_DATA` to jedna tablica. Musimy zmienić ją w **obiekt**, który zawiera tablice dla każdego królestwa. Klucze w obiekcie (`default`, `dark`, `satellite`, `terrain`) muszą odpowiadać wartościom `value` w Twoim `<select>` w pliku HTML.

Zastąp zawartość `js/data.js` taką strukturą:

```javascript
// js/data.js

// Struktura przechowująca dane dla wszystkich światów
const WORLD_DATA = {
    // Wielkie Cesarstwo (Zieleń)
    "default": [
        {
            name: "BOSS",
            rank: "leader",
            castle: { name: "Główny", x: 526, y: 442 },
            outposts: [
                { name: "Post 1", x: 539, y: 450 },
                { name: "Post 2", x: 533, y: 431 }
            ],
            // Zieleń ma laby i monumenty
            labs: [],
            monuments: []
        }
        // ... więcej graczy z zieleni
    ],

    // Kraina Wiecznych Lodów (Zima)
    "dark": [
        {
            name: "BOSS",
            rank: "leader",
            castle: { name: "Zamek Lodowy", x: 200, y: 300 },
            // Zima/Piach/Ogień mają Wioski (villages) zamiast posterunków
            villages: [
                { name: "Wioska Żarcia", x: 205, y: 305 },
                { name: "Wioska Węgla", x: 210, y: 310 }
            ],
            labs: [
                { name: "Lab Lodu", x: 199, y: 299}
            ]
        }
    ],

    // Płonące Piaski
    "satellite": [
        // ... dane dla piasku
    ],

    // Ogniste Szczyty
    "terrain": [
        // ... dane dla ognia
    ]
};
```

---

### 2. Aktualizacja konfiguracji (`js/config.js`)

Dodajmy definicje dla **wiosek** oraz kolory tła dla poszczególnych królestw.

```javascript
// js/config.js

const CONFIG = {
    mapWidth: 1286,
    mapHeight: 1286,
    fontFamily: "'Cinzel', sans-serif",
    
    // Tła dla poszczególnych królestw (klucze zgodne z select w HTML)
    kingdomBackgrounds: {
        default: '#1b6b26ff',   // Zieleń
        dark: '#ddeef0',        // Lód (jasny błękit/biel)
        satellite: '#e6c288',   // Piasek (beżowy)
        terrain: '#2c0808'      // Ogień (ciemny czerwony/czarny)
    },

    colors: {
        // Domyślne tło (fallback)
        background: '#1b6b26ff', 
        castle: '#f1c40f',
        outpost: '#e67e22',
        village: '#16a085',      // <--- NOWY KOLOR DLA WIOSEK
        ruin: '#7f8c8d',
        lab: '#8e44ad',
        monument: '#2980b9',
        
        lineNormal: 'rgba(255, 255, 255, 0.3)', // Nieco jaśniejsze linie
        lineSelected: '#e74c3c',
        // ... reszta bez zmian
        text: '#ffffff',
        highlight: 'rgba(231, 76, 60, 0.4)',
        selectionRing: '#ffffff',
        textFill: '#ffffff',
        textStroke: '#000000',
        playerName: '#f7e499ff',
        textBackground: 'rgba(0, 0, 0, 0.5)'
    },

    images: {
        // ... istniejące obrazy
        castle: './img/castle.png',
        iconcastle: './img/iconcastle.png',
        // ...
        
        // Dodaj obsługę wiosek (możesz użyć tej samej ikony co outpost lub nowej)
        village: './img/village.png',       // <--- UPEWNIJ SIĘ ŻE MASZ TEN PLIK lub użyj outpost
        iconvillage: './img/iconoutpost.png', // Fallback na ikonę posterunku
        
        // ... rangi bez zmian
        leader: './img/iconleader.png',
        // ...
    },

    objSizes: {
        castle: 1.5,
        outpost: 0.8,
        village: 0.7,    // <--- ROZMIAR WIOSKI
        ruin: 1.0,
        lab: 0.8,
        monument: 0.8
    },
};
```

---

### 3. Logika przetwarzania danych (`js/utils.js`)

Musimy zaktualizować `prepareData` aby obsługiwała wioski oraz `init` aby ładowała odpowiednie dane.

```javascript
// js/utils.js

function prepareData(rawData) {
    if (!rawData) return [];
    return rawData.map((player, pIndex) => {
        const rawMainBase = player.ruin || player.castle;
        const baseType = player.ruin ? 'ruin' : 'castle';

        return {
            ...player,
            id: pIndex,
            
            castle: {
                ...rawMainBase,
                id: `p${pIndex}-main`,
                type: baseType
            },
            
            outposts: (player.outposts || []).map((post, oIndex) => ({
                ...post,
                id: `p${pIndex}-post${oIndex}`,
                type: 'outpost'
            })),

            // --- NOWE: Obsługa wiosek ---
            villages: (player.villages || []).map((vil, vIndex) => ({
                ...vil,
                id: `p${pIndex}-vil${vIndex}`,
                type: 'village'
            })),
            // ---------------------------

            labs: (player.labs || []).map((lab, lIndex) => ({
                ...lab,
                id: `p${pIndex}-lab${lIndex}`,
                type: 'lab'
            })),

            monuments: (player.monuments || []).map((mon, mIndex) => ({
                ...mon,
                id: `p${pIndex}-mon${mIndex}`,
                type: 'monument'
            }))
        };
    });
}

// ... funkcje preloadImages, saveMapSettings, loadMapSettings bez zmian ...

async function init() {
    await document.fonts.load("20px 'Cinzel'");
    await document.fonts.load("bold 20px 'Cinzel'");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    if (typeof WORLD_DATA !== 'undefined') {
        // Domyślnie ładujemy "default" (Zieleń) lub to co było zapisane
        // (można rozbudować loadMapSettings o zapisywanie wybranego królestwa)
        
        let initialKingdom = 'default';
        // Proste sprawdzenie czy mamy zapisane ustawienia (opcjonalne)
        /*
        const saved = JSON.parse(localStorage.getItem('gge_map_settings') || '{}');
        if(saved.kingdom && WORLD_DATA[saved.kingdom]) initialKingdom = saved.kingdom;
        */
        
        // Ustawiamy select w HTML na odpowiednią wartość
        const mapThemeSelect = document.getElementById('map-theme');
        if(mapThemeSelect) mapThemeSelect.value = initialKingdom;

        // Ładujemy dane
        state.currentKingdom = initialKingdom;
        state.players = prepareData(WORLD_DATA[initialKingdom]);
        
        buildTreeView(state.players);
        checkConsent();
        loadMapSettings();
        if (!localStorage.getItem('gge_map_settings')) updateZoomInt();

        preloadImages(() => {
            console.log("Start aplikacji.");
            draw();
        });
    } else {
        alert("Brak danych (WORLD_DATA) w data.js!");
    }
}

init();
```

---

### 4. Obsługa zdarzeń i przełączania (`js/events.js`)

Tutaj dodajemy obsługę zmiany selecta i klikania w wioski.

```javascript
// js/events.js

// ... obsługa myszy (mousedown, mousemove, mouseup) bez zmian ...

canvas.addEventListener('click', (e) => {
    if (state.mouse.dragDistance > 5) return;

    const mousePos = screenToWorld(e.clientX, e.clientY);
    const tolerance = 15 / state.camera.zoom;
    
    let foundPlayerId = null;
    let foundObjectId = null;

    for (const player of state.players) {
        const checkHit = (obj) => {
            const center = { x: obj.x + 0.5, y: obj.y + 0.5 };
            if (dist(mousePos, center) < tolerance) {
                foundPlayerId = player.id;
                foundObjectId = obj.id;
                return true;
            }
            return false;
        };

        if (checkHit(player.castle)) break;
        
        if (state.isPostsVisible) {
            if (player.outposts.some(checkHit)) break;
            // --- NOWE: Sprawdzanie wiosek ---
            if (player.villages.some(checkHit)) break;
        }

        if (state.isLabsVisible) {
            if (player.labs.some(checkHit)) break;
            if (player.monuments.some(checkHit)) break;
        }
    }

    if (foundPlayerId !== null) {
        handleSelection(foundPlayerId, foundObjectId, false);
    } else {
        state.selectedPlayerId = null;
        state.selectedObjectId = null;
        updateTreeUI();
        draw();
    }
});

// ... wheel, zoom controls bez zmian ...

// --- NOWE: Obsługa zmiany królestwa ---
const mapThemeSelect = document.getElementById('map-theme');
if (mapThemeSelect) {
    mapThemeSelect.addEventListener('change', (e) => {
        const selectedKingdom = e.target.value;
        
        // 1. Aktualizuj stan
        state.currentKingdom = selectedKingdom;
        
        // 2. Pobierz nowe dane
        if (WORLD_DATA[selectedKingdom]) {
            state.players = prepareData(WORLD_DATA[selectedKingdom]);
        } else {
            state.players = []; // Pusta mapa jeśli brak danych
        }

        // 3. Reset widoku (opcjonalne, ale zalecane przy zmianie mapy)
        state.selectedPlayerId = null;
        state.selectedObjectId = null;
        
        // 4. Przebuduj drzewo graczy
        buildTreeView(state.players);
        
        // 5. Przerysuj
        draw();
    });
}

// ... reszta checkboxów (filterLabs, iconsImages) bez zmian ...

// Aktualizacja filtra posterunków, aby obejmował też wioski (opcjonalnie zmień nazwę zmiennej w state)
uiElements.filterPostsChkbox.addEventListener('change', (event) => {
    state.isPostsVisible = event.currentTarget.checked; // To teraz steruje też wioskami
    draw();
});
```

---

### 5. Rysowanie (`js/renderer.js`)

Aktualizacja funkcji `draw` i `drawObject` o tła i wioski.

```javascript
// js/renderer.js

function draw() {
    // 1. Tło dynamiczne zależne od królestwa
    const bg = CONFIG.kingdomBackgrounds[state.currentKingdom] || CONFIG.colors.background;
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 2. Siatka (bez zmian)
    drawGrid();

    // 3. Granice mapy (bez zmian)
    const tl = worldToScreen(0, 0);
    const br = worldToScreen(CONFIG.mapWidth, CONFIG.mapHeight);
    ctx.strokeStyle = '#34495e';
    ctx.lineWidth = 2;
    ctx.strokeRect(tl.x, tl.y, br.x - tl.x, br.y - tl.y);

    // 4. Gracze i obiekty
    state.players.forEach(player => {
        const isPlayerSelected = (player.id === state.selectedPlayerId);
        
        ctx.strokeStyle = isPlayerSelected ? CONFIG.colors.lineSelected : CONFIG.colors.lineNormal;
        ctx.lineWidth = isPlayerSelected ? 2 : 1;
        
        const cPos = worldToScreen(player.castle.x + 0.5, player.castle.y + 0.5);

        const drawLineTo = (obj) => {
            const pPos = worldToScreen(obj.x + 0.5, obj.y + 0.5);
            ctx.beginPath(); ctx.moveTo(cPos.x, cPos.y); ctx.lineTo(pPos.x, pPos.y); ctx.stroke();
        };

        // Linie
        if (state.isPostsVisible) {
            player.outposts.forEach(post => drawLineTo(post));
            // --- NOWE: Linie do wiosek ---
            player.villages.forEach(vil => drawLineTo(vil));
        }
        if (state.isLabsVisible) {
            player.labs.forEach(lab => drawLineTo(lab));
            player.monuments.forEach(mon => drawLineTo(mon));
        }

        // Rysowanie obiektów
        if (state.isLabsVisible) {
            player.labs.forEach(lab => drawObject(lab, CONFIG.colors.lab, isPlayerSelected, lab.id === state.selectedObjectId, null));
            player.monuments.forEach(mon => drawObject(mon, CONFIG.colors.monument, isPlayerSelected, mon.id === state.selectedObjectId, null));
        }

        if (state.isPostsVisible) {
            player.outposts.forEach(post => drawObject(post, CONFIG.colors.outpost, isPlayerSelected, post.id === state.selectedObjectId, null));
            // --- NOWE: Rysowanie wiosek ---
            player.villages.forEach(vil => drawObject(vil, CONFIG.colors.village, isPlayerSelected, vil.id === state.selectedObjectId, null));
        }

        // Zamek
        drawObject(player.castle, CONFIG.colors[player.castle.type] || CONFIG.colors.castle, isPlayerSelected, player.castle.id === state.selectedObjectId, player.name);
    });
}

// Zaktualizowana funkcja drawObject (lekko uproszczona sygnatura, usunąłem 'size' bo bierzemy z configu)
function drawObject(obj, color, isPlayerSelected, isObjectSelected, playerName) {
    const pos = worldToScreen(obj.x + 0.5, obj.y + 0.5);
    // Optymalizacja: nie rysuj poza ekranem
    if (pos.x < -200 || pos.x > canvas.width + 200 || pos.y < -200 || pos.y > canvas.height + 200) return;

    const tzoom = state.camera.zoomLevelInt;
    let imgKey = obj.type;
    if (!state.displayingImages) imgKey = `icon` + imgKey;
    
    // Fallback dla wiosek jeśli nie ma ikony, użyj outpost
    if (obj.type === 'village' && !loadedImages[imgKey]) {
        imgKey = state.displayingImages ? 'outpost' : 'iconoutpost';
    }

    let img = loadedImages[imgKey];
    const worldWidth = CONFIG.objSizes[obj.type] || 1.0;
    
    // Jeśli brak obrazka, rysuj kropkę
    if (!img) {
        const s = Math.max(3, 5 * (state.camera.zoom / 10)); // Skalowanie kropki
        ctx.fillStyle = color;
        ctx.beginPath(); ctx.arc(pos.x, pos.y, s, 0, Math.PI*2); ctx.fill();
        return; 
    }

    const aspectRatio = img.height / img.width;
    
    // Logika kropek vs ikon (LOD)
    let drawImg = true;
    let dotSize = 4;

    if (obj.type === 'castle' || obj.type === 'ruin') {
        if (tzoom < 75) drawImg = false;
    } else {
        // Outpost, village, lab...
        if (tzoom < 80) drawImg = false;
    }

    if (!drawImg) {
        ctx.fillStyle = color;
        ctx.beginPath(); ctx.arc(pos.x, pos.y, dotSize, 0, Math.PI*2); ctx.fill();
    } else {
        const drawW = worldWidth * state.camera.zoom;
        const drawH = drawW * aspectRatio;

        if (isPlayerSelected) {
            ctx.beginPath();
            ctx.ellipse(pos.x, pos.y + drawH/4, drawW * 0.6, drawW * 0.3, 0, 0, Math.PI * 2);
            ctx.fillStyle = CONFIG.colors.highlight;
            ctx.fill();
        }

        if (isObjectSelected) {
            ctx.beginPath();
            ctx.ellipse(pos.x, pos.y, drawW * 0.6, drawH * 0.6, 0, 0, Math.PI * 2);
            ctx.strokeStyle = CONFIG.colors.selectionRing;
            ctx.lineWidth = 2;
            ctx.stroke();
        }

        ctx.drawImage(img, pos.x - drawW / 2, pos.y - drawH / 2, drawW, drawH);
        
        // Etykiety
        if (playerName) {
             const topY = pos.y - (drawH / 2) - 15;
             drawLabel(ctx, playerName, pos.x, topY, {
                fontSize: Math.max(12, Math.min(35, 0.5 * state.camera.zoom)),
                fontFamily: CONFIG.fontFamily,
                color: CONFIG.colors.playerName,
                bg: { color: CONFIG.colors.textBackground }
            });
        }
        
        // Dolna etykieta (nazwa obiektu)
        const bottomY = pos.y + (drawH / 2) + 12;
        drawLabel(ctx, obj.name, pos.x, bottomY, {
            fontSize: Math.max(10, Math.min(30, 0.4 * state.camera.zoom)),
            fontFamily: CONFIG.fontFamily,
            fontWeight: isObjectSelected ? 'bold' : 'normal',
            bg: { enabled: false }
        });
    }
}
```

### 6. Aktualizacja UI (`js/ui.js`)

Na koniec dodajemy wyświetlanie wiosek w prawym panelu bocznym.

```javascript
// js/ui.js

function buildTreeView(players) {
    uiElements.treeList.innerHTML = '';
    
    if (!players || players.length === 0) {
        uiElements.treeList.innerHTML = '<li style="padding:10px; text-align:center; color:#888;">Brak danych dla tego królestwa</li>';
        uiElements.playerCount.innerText = '0';
        return;
    }

    players.forEach(player => {
        const li = document.createElement('li');
        li.id = `player-li-${player.id}`;
        
        const header = document.createElement('div');
        header.className = 'player-node';
        header.innerHTML = `<span>${player.name}</span> <img src="${CONFIG.images[player.rank]}" width="24" alt="${player.rank}">`;
        
        header.onclick = (e) => {
            e.stopPropagation();
            const children = document.getElementById(`player-children-${player.id}`);
            if (children) children.classList.toggle('expanded');
        };
        
        const ulChildren = document.createElement('ul');
        ulChildren.className = 'tree-children';
        ulChildren.id = `player-children-${player.id}`;

        // 1. Zamek
        ulChildren.appendChild(createObjectNode(player.castle, player.castle.type, player.id));
        
        // 2. Posterunki
        player.outposts.forEach(post => {
            ulChildren.appendChild(createObjectNode(post, 'outpost', player.id));
        });

        // 3. Wioski (NOWE)
        player.villages.forEach(vil => {
            ulChildren.appendChild(createObjectNode(vil, 'village', player.id));
        });

        // 4. Laby i Monumenty
        player.labs.forEach(lab => {
            ulChildren.appendChild(createObjectNode(lab, 'lab', player.id));
        });
        player.monuments.forEach(mon => {
            ulChildren.appendChild(createObjectNode(mon, 'monument', player.id));
        });

        li.appendChild(header);
        li.appendChild(ulChildren);
        uiElements.treeList.appendChild(li);
    });
    
    uiElements.playerCount.innerText = players.length;
}

function createObjectNode(obj, type, playerId) {
    const li = document.createElement('li');
    li.className = 'object-node';
    li.id = `obj-li-${obj.id}`;
    
    let iconSrc = CONFIG.images[type] || CONFIG.images['icon' + type];
    // Fallbacki ikon
    if (type === 'village') iconSrc = CONFIG.images.iconvillage || CONFIG.images.iconoutpost;
    if (type === 'castle') iconSrc = CONFIG.images.iconcastle;
    if (type === 'ruin') iconSrc = CONFIG.images.iconruin;
    if (type === 'outpost') iconSrc = CONFIG.images.iconoutpost;
    if (type === 'lab') iconSrc = CONFIG.images.iconlab;
    if (type === 'monument') iconSrc = CONFIG.images.iconmonument;

    const icon = `<img src="${iconSrc}" width="24" alt="${type}">`;
    
    li.innerHTML = `${icon} <nick>${obj.name}</nick> <small>[${obj.x}:${obj.y}]</small>`;

    li.onclick = (e) => {
        e.stopPropagation();
        handleSelection(playerId, obj.id, true);
    };
    return li;
}

// Musisz też zaktualizować handleSelection w js/ui.js aby szukało wiosek przy centrowaniu
function handleSelection(playerId, objectId, shouldCenter) {
    if (uiElements.panel.classList.contains('collapsed')) {
        togglePanel(true);
    }

    state.selectedPlayerId = playerId;
    state.selectedObjectId = objectId;

    updateTreeUI();

    if (shouldCenter && objectId) {
        const player = state.players.find(p => p.id === playerId);
        
        let target = null;
        if (player.castle.id === objectId) target = player.castle;
        else target = player.outposts.find(o => o.id === objectId);
        
        if (!target) target = player.labs.find(l => l.id === objectId);
        if (!target) target = player.monuments.find(m => m.id === objectId);
        // --- NOWE ---
        if (!target) target = player.villages.find(v => v.id === objectId);
        // ------------

        if (target) centerMapOn(target.x, target.y);
    } else {
        draw();
    }
}
```

Po wprowadzeniu tych zmian Twoja mapa będzie obsługiwać wszystkie 4 królestwa, poprawnie wyświetlać wioski i zmieniać kolory tła! Pamiętaj tylko, aby w `data.js` faktycznie wpisać dane do odpowiednich tablic (`dark`, `satellite`, `terrain`).