canvas.addEventListener("mousedown", (e) => {
    state.mouse.isDown = true;
    state.mouse.startX = e.clientX;
    state.mouse.startY = e.clientY;
    state.mouse.dragDistance = 0;
});
let lastCheckTime = 0;
window.addEventListener("mousemove", (e) => {
    if (state.mouse.isDown) {
        const dx = e.clientX - state.mouse.startX;
        const dy = e.clientY - state.mouse.startY;
        state.mouse.dragDistance += Math.abs(dx) + Math.abs(dy);
        state.camera.x -= dx / state.camera.zoom;
        state.camera.y -= dy / state.camera.zoom;
        state.mouse.startX = e.clientX;
        state.mouse.startY = e.clientY;
        draw();
        return;
    }
    if (e.target.id !== "game-map") {
        const hoverBox = document.getElementById("hover-info-box");
        if (hoverBox) hoverBox.style.display = "none";
        canvas.style.cursor = "default";
        return;
    }
    const now = Date.now();
    if (now - lastCheckTime > 50) {
        checkHover(e.clientX, e.clientY);
        lastCheckTime = now;
    }
});
window.addEventListener("mouseup", () => {
    state.mouse.isDown = false;
});
canvas.addEventListener("click", (e) => {
    if (state.mouse.dragDistance > 5) return;
    const mousePos = screenToWorld(e.clientX, e.clientY);
    const tolerance = Math.max(0.6, 5 / state.camera.zoom);
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
canvas.addEventListener("wheel", (e) => {
    e.preventDefault();
    const zoomFactor = 1.1;
    const direction = e.deltaY > 0 ? 1 / zoomFactor : zoomFactor;
    const mouseBefore = screenToWorld(e.clientX, e.clientY);
    state.camera.zoom = Math.max(
        state.camera.minZoom,
        Math.min(state.camera.maxZoom, state.camera.zoom * direction)
    );
    const mouseAfter = screenToWorld(e.clientX, e.clientY);
    state.camera.x += mouseBefore.x - mouseAfter.x;
    state.camera.y += mouseBefore.y - mouseAfter.y;
    updateZoomInt();
    draw();
});
const COORD_REGEX = /^(\d{1,4})[:\s\/;,-](\d{1,4})$/;
uiElements.searchInput.addEventListener("input", (e) => {
    const term = e.target.value.toLowerCase().trim();
    if (COORD_REGEX.test(term)) {
        state.players.forEach((p) => {
            const li = document.getElementById(`player-li-${p.id}`);
            if (li) li.style.display = "block";
        });
        return;
    }
    state.players.forEach((player) => {
        const li = document.getElementById(`player-li-${player.id}`);
        const matchPlayer = player.name.toLowerCase().includes(term);
        const matchObj =
            player.outposts.some((o) => o.name.toLowerCase().includes(term)) ||
            player.castle.name.toLowerCase().includes(term);
        li.style.display =
            term === "" || matchPlayer || matchObj ? "block" : "none";
    });
});
uiElements.searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        const val = uiElements.searchInput.value.trim();
        const coordMatch = val.match(COORD_REGEX);
        if (coordMatch) {
            const tx = parseInt(coordMatch[1], 10);
            const ty = parseInt(coordMatch[2], 10);
            if (
                tx >= 0 &&
                tx <= CONFIG.mapWidth &&
                ty >= 0 &&
                ty <= CONFIG.mapHeight
            ) {
                centerMapOn(tx, ty);
            } else {
                alert(t('coords_error')); // Zamiast "Współrzędne poza mapą!"
            }
        }
    }
});
document.getElementById("zoom-in").onclick = () => {
    state.camera.zoom = Math.min(state.camera.maxZoom, state.camera.zoom * 1.2);
    updateZoomInt();
};
document.getElementById("zoom-out").onclick = () => {
    state.camera.zoom = Math.max(state.camera.minZoom, state.camera.zoom / 1.2);
    updateZoomInt();
};
document.getElementById("reset-view").onclick = () => {
    centerMapOn(CONFIG.mapWidth / 2, CONFIG.mapHeight / 2);
    state.camera.zoom = 1;
    updateZoomInt();
};
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    draw();
});
window.addEventListener("beforeunload", () => {
    saveMapSettings();
});
const mapThemeSelect = document.getElementById("map-theme");
if (mapThemeSelect) {
    mapThemeSelect.addEventListener("change", (e) => {
        const selectedKingdom = e.target.value;
        state.currentKingdom = selectedKingdom;
        const rawKingdomData = extractKingdomData(ALL_PLAYERS, selectedKingdom);
        state.players = prepareData(rawKingdomData);
        state.selectedPlayerId = null;
        state.selectedObjectId = null;
        buildTreeView(state.players);
        draw();
        saveMapSettings();
    });
}
uiElements.iconsimagesChkbox.addEventListener("change", (event) => {
    state.displayingImages = event.currentTarget.checked;
    draw();
});
uiElements.filterLabsChkbox.addEventListener("change", (event) => {
    state.isLabsVisible = event.currentTarget.checked;
    draw();
});
uiElements.filterPostsChkbox.addEventListener("change", (event) => {
    state.isPostsVisible = event.currentTarget.checked;
    draw();
});
uiElements.filterVillagesChkbox.addEventListener("change", (event) => {
    state.isVillagesVisible = event.currentTarget.checked;
    draw();
});
uiElements.filterNickChkbox.addEventListener("change", (event) => {
    state.isNickVisible = event.currentTarget.checked;
    draw();
});
uiElements.filterLabelChkbox.addEventListener("change", (event) => {
    state.isLabelVisible = event.currentTarget.checked;
    draw();
});
