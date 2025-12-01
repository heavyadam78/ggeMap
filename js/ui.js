function buildTreeView(players) {
    uiElements.treeList.innerHTML = "";
    if (!players || players.length === 0) {
        uiElements.treeList.innerHTML =
            `<li style="padding:10px; text-align:center; color:#888;">${t('no_data_kingdom')}</li>`;
        return;
    }
    players.forEach((player) => {
        const li = document.createElement("li");
        li.id = `player-li-${player.id}`;
        const header = document.createElement("div");
        header.className = "player-node";
        header.innerHTML = `<span>${player.name}</span> <img src="${CONFIG.images[player.rank]
            }" width="24" alt="${player.rank}">`;
        header.onclick = (e) => {
            e.stopPropagation();
            const children = document.getElementById(`player-children-${player.id}`);
            if (children) children.classList.toggle("expanded");
        };
        const ulChildren = document.createElement("ul");
        ulChildren.className = "tree-children";
        ulChildren.id = `player-children-${player.id}`;
        ulChildren.appendChild(
            createObjectNode(player.castle, player.castle.type, player.id)
        );
        player.outposts.forEach((post) => {
            ulChildren.appendChild(createObjectNode(post, "outpost", player.id));
        });
        player.villages.forEach((vil) => {
            ulChildren.appendChild(createObjectNode(vil, "village", player.id));
        });
        player.labs.forEach((lab) => {
            ulChildren.appendChild(createObjectNode(lab, "lab", player.id));
        });
        player.monuments.forEach((mon) => {
            ulChildren.appendChild(createObjectNode(mon, "monument", player.id));
        });
        li.appendChild(header);
        li.appendChild(ulChildren);
        uiElements.treeList.appendChild(li);
    });
}
function createObjectNode(obj, type, playerId) {
    const li = document.createElement("li");
    li.className = "object-node";
    li.id = `obj-li-${obj.id}`;
    let iconSrc = CONFIG.images[type] || CONFIG.images["icon" + type];
    if (type === "village")
        iconSrc = CONFIG.images.iconvillage || CONFIG.images.iconoutpost;
    if (type === "castle") iconSrc = CONFIG.images.iconcastle;
    if (type === "ruin") iconSrc = CONFIG.images.iconruin;
    if (type === "outpost") iconSrc = CONFIG.images.iconoutpost;
    if (type === "lab") iconSrc = CONFIG.images.iconlab;
    if (type === "monument") iconSrc = CONFIG.images.iconmonument;
    const icon = `<img src="${iconSrc}" width="24" alt="${type}">`;
    li.innerHTML = `${icon} <nick>${obj.name}</nick> <small>[${obj.x}:${obj.y}]</small>`;
    li.onclick = (e) => {
        e.stopPropagation();
        handleSelection(playerId, obj.id, true);
    };
    return li;
}
function handleSelection(playerId, objectId, shouldCenter) {
    if (uiElements.panel.classList.contains("collapsed")) {
        togglePanel(true);
    }
    state.selectedPlayerId = playerId;
    state.selectedObjectId = objectId;
    updateTreeUI();
    if (shouldCenter && objectId) {
        const player = state.players.find((p) => p.id === playerId);
        let target = null;
        if (player.castle.id === objectId) target = player.castle;
        else target = player.outposts.find((o) => o.id === objectId);
        if (!target) target = player.labs.find((l) => l.id === objectId);
        if (!target) target = player.monuments.find((m) => m.id === objectId);
        if (!target) target = player.villages.find((v) => v.id === objectId);
        if (target) centerMapOn(target.x, target.y);
    } else {
        draw();
    }
}
function updateTreeUI() {
    document
        .querySelectorAll(".player-node.active")
        .forEach((el) => el.classList.remove("active"));
    document
        .querySelectorAll(".object-node.active-object")
        .forEach((el) => el.classList.remove("active-object"));
    if (state.selectedPlayerId === null) return;
    const pLi = document.getElementById(`player-li-${state.selectedPlayerId}`);
    const pChildren = document.getElementById(
        `player-children-${state.selectedPlayerId}`
    );
    if (pLi) {
        if (pChildren) pChildren.classList.add("expanded");
    }
    if (state.selectedObjectId) {
        const oLi = document.getElementById(`obj-li-${state.selectedObjectId}`);
        if (oLi) {
            oLi.classList.add("active-object");
            setTimeout(
                () => oLi.scrollIntoView({ behavior: "smooth", block: "nearest" }),
                300
            );
        }
    }
}
function togglePanel(forceOpen = false) {
    const isCollapsed = uiElements.panel.classList.contains("collapsed");
    const icon = uiElements.toggleBtn.querySelector("i");
    if (forceOpen || isCollapsed) {
        uiElements.panel.classList.remove("collapsed");
        icon.className = "fa-solid fa-chevron-right";
    } else {
        uiElements.panel.classList.add("collapsed");
        icon.className = "fa-solid fa-list";
    }
    saveMapSettings();
}
uiElements.toggleBtn.onclick = () => togglePanel();
uiElements.toggleSearchBtn.onclick = () => {
    uiElements.searchPanel.classList.toggle("collapsed");
    const icon = uiElements.toggleSearchBtn.querySelector("i");
    const isCollapsed = uiElements.searchPanel.classList.contains("collapsed");
    if (isCollapsed) {
        icon.className = "fa-solid fa-gear";
    } else {
        icon.className = "fa-solid fa-chevron-left";
    }
    const hoverBox = document.getElementById("hover-info-box");
    if (hoverBox) {
        if (isCollapsed) {
            hoverBox.classList.add("panel-collapsed");
        } else {
            hoverBox.classList.remove("panel-collapsed");
        }
    }
    saveMapSettings();
};
const consentUI = {
    modal: document.getElementById("consent-modal"),
    btn: document.getElementById("accept-consent-btn"),
};
function checkConsent() {
    const hasConsent = localStorage.getItem("gge_consent");
    if (!hasConsent) {
        consentUI.modal.classList.remove("hidden");
    }
}
consentUI.btn.onclick = () => {
    localStorage.setItem("gge_consent", "true");
    consentUI.modal.style.opacity = "0";
    setTimeout(() => {
        consentUI.modal.classList.add("hidden");
    }, 300);
};
const hoverBox = document.getElementById("hover-info-box");
const hoverTitle = document.getElementById("hover-title");
const hoverDesc = document.getElementById("hover-desc");
function checkHover(mouseX, mouseY) {
    const mousePos = screenToWorld(mouseX, mouseY);
    const tolerance = Math.max(0.6, 5 / state.camera.zoom);
    let foundObj = null;
    let foundPlayer = null;
    for (const player of state.players) {
        const check = (obj) => {
            const dist = Math.sqrt(
                (mousePos.x - (obj.x + 0.5)) ** 2 + (mousePos.y - (obj.y + 0.5)) ** 2
            );
            return dist < tolerance;
        };
        if (check(player.castle)) {
            foundObj = player.castle;
            foundPlayer = player;
            break;
        }
        if (state.isPostsVisible) {
            const post = player.outposts.find(check);
            if (post) {
                foundObj = post;
                foundPlayer = player;
                break;
            }
            const vil = player.villages.find(check);
            if (vil) {
                foundObj = vil;
                foundPlayer = player;
                break;
            }
        }
        if (state.isLabsVisible) {
            const lab = player.labs.find(check);
            if (lab) {
                foundObj = lab;
                foundPlayer = player;
                break;
            }
            const mon = player.monuments.find(check);
            if (mon) {
                foundObj = mon;
                foundPlayer = player;
                break;
            }
        }
    }
    if (foundObj) {
        canvas.style.cursor = "pointer";
        hoverBox.style.display = "block";
        hoverTitle.innerText = foundObj.name;

        // Tłumaczenie typu obiektu
        // Klucze w lang.js to np. 'type_castle'
        const typeTranslated = t('type_' + foundObj.type);

        // Tłumaczenie rangi
        // Klucze w lang.js to np. 'rank_leader'
        const rankTranslated = t('rank_' + foundPlayer.rank);

        hoverDesc.innerHTML = `
            ${t('label_player')}: <strong>${foundPlayer.name}</strong><br>
            ${t('label_rank')}: ${rankTranslated}<br>
            ${t('label_type')}: ${typeTranslated}<br>
            ${t('label_coords')}: ${foundObj.x}:${foundObj.y}
        `;
    } else {
        canvas.style.cursor = "default";
        hoverBox.style.display = "none";
    }
}
