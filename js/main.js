// Przygotowanie danych (ID i Typy)
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

function preloadImages(callback) {
    const sources = CONFIG.images;
    let loadedCount = 0;
    const totalImages = Object.keys(sources).length;

    if (totalImages === 0) { callback(); return; }

    for (const key in sources) {
        const img = new Image();
        img.src = sources[key];
        img.onload = () => {
            loadedImages[key] = img;
            loadedCount++;
            if (loadedCount === totalImages) callback();
        };
        img.onerror = () => {
            console.error(`Błąd ładowania: ${sources[key]}`);
            loadedCount++;
            if (loadedCount === totalImages) callback();
        };
    }
}

function saveMapSettings() {
    const settings = { x: state.camera.x, y: state.camera.y, zoom: state.camera.zoom, filterposts: state.isPostsVisible,
        filterlabs: state.isLabsVisible, iconsimages: state.displayingImages};

    localStorage.setItem('gge_map_settings', JSON.stringify(settings));
}

function loadMapSettings() {
    const saved = localStorage.getItem('gge_map_settings');
    if (saved) {
        try {
            const s = JSON.parse(saved);
            if (s.zoom) state.camera.zoom = Math.max(state.camera.minZoom, Math.min(state.camera.maxZoom, s.zoom));
            if (!isNaN(s.x)) state.camera.x = s.x;
            if (!isNaN(s.y)) state.camera.y = s.y;
            updateZoomInt();
            uiElements.zoomLevel.innerText = state.camera.zoomLevelInt;
            if (!isNaN(s.filterposts)){ state.isPostsVisible = s.filterposts; uiElements.filterPostsChkbox.checked = s.filterposts;
                } else { uiElements.filterPostsChkbox.checked = state.isPostsVisible; }
            if (!isNaN(s.filterlabs)){ state.isLabsVisible = s.filterlabs; uiElements.filterLabsChkbox.checked = s.filterlabs;
                } else { uiElements.filterLabsChkbox.checked = state.isLabsVisible; }
            if (!isNaN(s.iconsimages)) { state.displayingImages = s.iconsimages; uiElements.iconsimagesChkbox.checked = s.iconsimages;
            } else { uiElements.iconsimagesChkbox.checked = state.displayingImages; }
        } catch (e) { console.error(e); }
    }
}


async function init() {
    await document.fonts.load("20px 'Cinzel'");
    await document.fonts.load("bold 20px 'Cinzel'");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    if (typeof GAME_DATA !== 'undefined') {
        state.players = prepareData(GAME_DATA);
        buildTreeView(state.players);
        checkConsent();
        loadMapSettings();
        if (!localStorage.getItem('gge_map_settings')) updateZoomInt();

        preloadImages(() => {
            console.log("Start aplikacji.");

            draw();
        });
    } else {
        alert("Brak pliku data.js!");
    }
}

// Start
init();
