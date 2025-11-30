// Budowanie drzewa
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

// Logika wyboru
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

function updateTreeUI() {
    document.querySelectorAll('.player-node.active').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.object-node.active-object').forEach(el => el.classList.remove('active-object'));

    if (state.selectedPlayerId === null) return;

    const pLi = document.getElementById(`player-li-${state.selectedPlayerId}`);
    const pChildren = document.getElementById(`player-children-${state.selectedPlayerId}`);
    
    if (pLi) {
        if (pChildren) pChildren.classList.add('expanded');
    }

    if (state.selectedObjectId) {
        const oLi = document.getElementById(`obj-li-${state.selectedObjectId}`);
        if (oLi) {
            oLi.classList.add('active-object');
            setTimeout(() => oLi.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 300);
        }
    }
}

function togglePanel(forceOpen = false) {
    const isCollapsed = uiElements.panel.classList.contains('collapsed');
    const icon = uiElements.toggleBtn.querySelector('i');

    if (forceOpen || isCollapsed) {
        uiElements.panel.classList.remove('collapsed');
        icon.className = 'fa-solid fa-chevron-right';
    } else {
        uiElements.panel.classList.add('collapsed');
        icon.className = 'fa-solid fa-list';
    }
    saveMapSettings();
}

// Obsługa przycisków paneli
uiElements.toggleBtn.onclick = () => togglePanel();

uiElements.toggleSearchBtn.onclick = () => {
    uiElements.searchPanel.classList.toggle('collapsed');
    const icon = uiElements.toggleSearchBtn.querySelector('i');
    icon.className = uiElements.searchPanel.classList.contains('collapsed') 
        ? 'fa-solid fa-gear' : 'fa-solid fa-chevron-left';

    saveMapSettings();
};


const consentUI = {
    modal: document.getElementById('consent-modal'),
    btn: document.getElementById('accept-consent-btn')
};

function checkConsent() {
    const hasConsent = localStorage.getItem('gge_consent');
    if (!hasConsent) {
        consentUI.modal.classList.remove('hidden');
    }
}

consentUI.btn.onclick = () => {
    localStorage.setItem('gge_consent', 'true');
    
    consentUI.modal.style.opacity = '0';
    setTimeout(() => {
        consentUI.modal.classList.add('hidden');
    }, 300);
};
