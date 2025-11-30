
function prepareData(rawData) {
    if (!rawData) return [];

    const validPlayers = rawData.filter(p => p.castle || p.ruin);

    return validPlayers.map((player, pIndex) => {
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

            villages: (player.villages || []).map((vil, vIndex) => ({
                ...vil,
                id: `p${pIndex}-vil${vIndex}`,
                type: 'village'
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
        filterlabs: state.isLabsVisible, iconsimages: state.displayingImages, filtervillages: state.isVillagesVisible,
        filterNick: state.isNickVisible, filterlabel: state.isLabelVisible,
        leftPanelCollapsed: uiElements.searchPanel.classList.contains('collapsed'),
        rightPanelCollapsed: uiElements.panel.classList.contains('collapsed')};
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
            if (!isNaN(s.filtervillages)){ state.isVillagesVisible = s.filtervillages; uiElements.filterVillagesChkbox.checked = s.filtervillages;
                } else { uiElements.filterVillagesChkbox.checked = state.isVillagesVisible; }
            if (!isNaN(s.filterNick)){ state.isNickVisible = s.filterNick; uiElements.filterNickChkbox.checked = s.filterNick;
                } else { uiElements.filterNickChkbox.checked = state.isNickVisible; }
            if (!isNaN(s.filterlabel)){ state.isLabelVisible = s.filterlabel; uiElements.filterLabelChkbox.checked = s.filterlabel;
                } else { uiElements.filterLabelChkbox.checked = state.isLabelVisible; }
            if (!isNaN(s.iconsimages)) { state.displayingImages = s.iconsimages; uiElements.iconsimagesChkbox.checked = s.iconsimages;
                } else { uiElements.iconsimagesChkbox.checked = state.displayingImages; }
            // Prawy Panel
            if (s.rightPanelCollapsed) {
                uiElements.panel.classList.add('collapsed');
                uiElements.toggleBtn.querySelector('i').className = 'fa-solid fa-list';
            } else {
                uiElements.panel.classList.remove('collapsed');
                uiElements.toggleBtn.querySelector('i').className = 'fa-solid fa-chevron-right';
            }
            // Lewy Panel
            if (s.leftPanelCollapsed) {
                uiElements.searchPanel.classList.add('collapsed');
                uiElements.toggleSearchBtn.querySelector('i').className = 'fa-solid fa-gear';
            } else {
                uiElements.searchPanel.classList.remove('collapsed');
                uiElements.toggleSearchBtn.querySelector('i').className = 'fa-solid fa-chevron-left';
            }
        } catch (e) { console.error(e); }
    }
}


async function init() {
    await document.fonts.load("20px 'Cinzel'");
    await document.fonts.load("bold 20px 'Cinzel'");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    if (typeof WORLD_DATA !== 'undefined') {

        let initialKingdom = 'default';
        /*
        const saved = JSON.parse(localStorage.getItem('gge_map_settings') || '{}');
        if(saved.kingdom && WORLD_DATA[saved.kingdom]) initialKingdom = saved.kingdom;
        */
        
        const mapThemeSelect = document.getElementById('map-theme');
        if(mapThemeSelect) mapThemeSelect.value = initialKingdom;

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

// jedziem z koksem :P
init();
