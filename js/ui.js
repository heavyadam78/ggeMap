// Budowanie drzewa
function buildTreeView(players) {
    uiElements.treeList.innerHTML = '';
    
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

        // 3. Laboratoria (NOWE)
        player.labs.forEach(lab => {
            ulChildren.appendChild(createObjectNode(lab, 'lab', player.id));
        });

        // 4. Monumenty (NOWE)
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
    let icon = `<img src="${CONFIG.images[type]}" width="24" alt="${type}">`;
   if (type === 'castle') icon = `<img src="${CONFIG.images.iconcastle}" width="24" alt="${type}">`;
   else if (type === 'ruin') icon = `<img src="${CONFIG.images.iconruin}" width="24" alt="${type}">`;
   else if (type === 'outpost') icon = `<img src="${CONFIG.images.iconoutpost}" width="24" alt="${type}">`;
   else if (type === 'lab') icon = `<img src="${CONFIG.images.iconlab}" width="24" alt="${type}">`;
   else if (type === 'monument') icon = `<img src="${CONFIG.images.iconmonument}" width="24" alt="${type}">`;
    
    li.innerHTML = `${icon} <nick>${obj.name}</nick> <small>[${obj.x}:${obj.y}]</small>`;


    li.onclick = (e) => {
        e.stopPropagation();
        handleSelection(playerId, obj.id, true);
    };
    return li;
}

// Logika wyboru
function handleSelection(playerId, objectId, shouldCenter) {
    if (uiElements.panel.classList.contains('collapsed')) {
        togglePanel(true);
    }

    state.selectedPlayerId = playerId;
    state.selectedObjectId = objectId;

    updateTreeUI();

    if (shouldCenter && objectId) {
        const player = state.players.find(p => p.id === playerId);
        
        // Szukamy obiektu w każdej z tablic
        let target = null;
        if (player.castle.id === objectId) target = player.castle;
        else target = player.outposts.find(o => o.id === objectId);
        
        // --- NOWE ---
        if (!target) target = player.labs.find(l => l.id === objectId);
        if (!target) target = player.monuments.find(m => m.id === objectId);
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
        icon.className = 'fa-solid fa-chevron-left';
    }
}

// Obsługa przycisków paneli
uiElements.toggleBtn.onclick = () => togglePanel();

uiElements.toggleSearchBtn.onclick = () => {
    uiElements.searchPanel.classList.toggle('collapsed');
    const icon = uiElements.toggleSearchBtn.querySelector('i');
    icon.className = uiElements.searchPanel.classList.contains('collapsed') 
        ? 'fa-solid fa-bug' : 'fa-solid fa-chevron-left';
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
