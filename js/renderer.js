function draw() {
    const bg =
        CONFIG.kingdomBackgrounds[state.currentKingdom] || CONFIG.colors.background;
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawGrid();
    const tl = worldToScreen(0, 0);
    const br = worldToScreen(CONFIG.mapWidth, CONFIG.mapHeight);
    ctx.strokeStyle = "#34495e";
    ctx.lineWidth = 2;
    ctx.strokeRect(tl.x, tl.y, br.x - tl.x, br.y - tl.y);
    state.players.forEach((player) => {
        const isPlayerSelected = player.id === state.selectedPlayerId;
        ctx.strokeStyle = isPlayerSelected
            ? CONFIG.colors.lineSelected
            : CONFIG.colors.lineNormal;
        ctx.lineWidth = isPlayerSelected ? 2 : 1;
        const cPos = worldToScreen(player.castle.x + 0.5, player.castle.y + 0.5);
        const drawLineTo = (obj) => {
            const pPos = worldToScreen(obj.x + 0.5, obj.y + 0.5);
            ctx.beginPath();
            ctx.moveTo(cPos.x, cPos.y);
            ctx.lineTo(pPos.x, pPos.y);
            ctx.stroke();
        };
        if (state.isPostsVisible) {
            player.outposts.forEach((post) => drawLineTo(post));
            player.villages.forEach((vil) => drawLineTo(vil));
        }
        if (state.isLabsVisible) {
            player.labs.forEach((lab) => drawLineTo(lab));
            player.monuments.forEach((mon) => drawLineTo(mon));
        }
        if (state.isLabsVisible) {
            player.labs.forEach((lab) =>
                drawObject(
                    lab,
                    CONFIG.colors.lab,
                    isPlayerSelected,
                    lab.id === state.selectedObjectId,
                    null
                )
            );
            player.monuments.forEach((mon) =>
                drawObject(
                    mon,
                    CONFIG.colors.monument,
                    isPlayerSelected,
                    mon.id === state.selectedObjectId,
                    null
                )
            );
        }
        if (state.isPostsVisible) {
            player.outposts.forEach((post) =>
                drawObject(
                    post,
                    CONFIG.colors.outpost,
                    isPlayerSelected,
                    post.id === state.selectedObjectId,
                    null
                )
            );
            player.villages.forEach((vil) =>
                drawObject(
                    vil,
                    CONFIG.colors.village,
                    isPlayerSelected,
                    vil.id === state.selectedObjectId,
                    null
                )
            );
        }
        drawObject(
            player.castle,
            CONFIG.colors[player.castle.type] || CONFIG.colors.castle,
            isPlayerSelected,
            player.castle.id === state.selectedObjectId,
            player.name
        );
    });
}
function drawGrid() {
    if (state.camera.zoom < 5) return;
    const topLeft = screenToWorld(0, 0);
    const bottomRight = screenToWorld(canvas.width, canvas.height);
    const startX = Math.max(0, Math.floor(topLeft.x));
    const endX = Math.min(CONFIG.mapWidth, Math.ceil(bottomRight.x));
    const startY = Math.max(0, Math.floor(topLeft.y));
    const endY = Math.min(CONFIG.mapHeight, Math.ceil(bottomRight.y));
    ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
    ctx.lineWidth = 1;
    const showCoords = state.camera.zoom > 15;
    if (showCoords) {
        ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
        ctx.font = "10px Arial";
    }
    ctx.beginPath();
    for (let x = startX; x <= endX; x++) {
        const screenX = (x - state.camera.x) * state.camera.zoom + canvas.width / 2;
        ctx.moveTo(screenX, 0);
        ctx.lineTo(screenX, canvas.height);
        if (showCoords) {
            ctx.textAlign = "center";
            ctx.fillText(x, screenX + state.camera.zoom * 0.5, 15);
        }
    }
    for (let y = startY; y <= endY; y++) {
        const screenY =
            (y - state.camera.y) * state.camera.zoom + canvas.height / 2;
        ctx.moveTo(0, screenY);
        ctx.lineTo(canvas.width, screenY);
        if (showCoords) {
            ctx.textAlign = "left";
            ctx.textBaseline = "middle";
            ctx.fillText(y, 5, screenY + state.camera.zoom * 0.5);
        }
    }
    ctx.stroke();
    ctx.textBaseline = "alphabetic";
}
function drawObject(
    obj,
    color,
    isPlayerSelected,
    isObjectSelected,
    playerName
) {
    const pos = worldToScreen(obj.x + 0.5, obj.y + 0.5);
    if (
        pos.x < -200 ||
        pos.x > canvas.width + 200 ||
        pos.y < -200 ||
        pos.y > canvas.height + 200
    )
        return;
    const tzoom = state.camera.zoomLevelInt;
    let imgKey = obj.type;
    if (!state.displayingImages) imgKey = `icon` + imgKey;
    let img = loadedImages[imgKey];
    const worldWidth = CONFIG.objSizes[obj.type] || 1.0;
    const aspectRatio = img.height / img.width;
    let drawW = 0;
    let dotSize = 5;
    let labelUp = (labelDown = true);
    if (obj.type == "castle" || obj.type == "ruin") {
        dotSize = 5;
        if (tzoom < 30) labelDown = false;
        if (tzoom < 65) img = null;
    } else if (
        obj.type == "outpost" ||
        obj.type == "lab" ||
        obj.type == "monument" ||
        obj.type == "village"
    ) {
        if (tzoom < 50) {
            dotSize = 4;
            labelDown = false;
        }
        if (tzoom < 30) dotSize = 3;
        if (tzoom < 80) img = null;
    }
    drawW = worldWidth * state.camera.zoom;
    const drawH = drawW * aspectRatio;
    const ellipseSize = (state.camera.maxZoom - state.camera.zoom) / 5.5;
    ctx.globalAlpha = 1.0;
    if (isPlayerSelected && img) {
        ctx.beginPath();
        ctx.ellipse(
            pos.x,
            pos.y + drawH / 4,
            drawW * 0.6,
            drawW * 0.3,
            0,
            0,
            Math.PI * 2
        );
        ctx.fillStyle = CONFIG.colors.highlight;
        ctx.fill();
    }
    if (isObjectSelected) {
        ctx.beginPath();
        ctx.ellipse(
            pos.x,
            pos.y,
            drawW * 0.6 + ellipseSize,
            drawH * 0.6 + ellipseSize,
            0,
            0,
            Math.PI * 2
        );
        ctx.strokeStyle = CONFIG.colors.selectionRing;
        ctx.lineWidth = 2;
        ctx.stroke();
    }
    if (img) {
        ctx.drawImage(img, pos.x - drawW / 2, pos.y - drawH / 2, drawW, drawH);
    } else {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, dotSize, 0, Math.PI * 2);
        ctx.fill();
        if (!loadedImages[imgKey]) {
            const s = 1 * state.camera.zoom;
            ctx.fillStyle = color;
            ctx.fillRect(pos.x - s / 2, pos.y - s / 2, s, s);
        }
    }
    if (labelUp && state.isNickVisible) {
        if (playerName) {
            const topY = pos.y - drawH / 2 - 17;
            drawLabel(ctx, playerName, pos.x, topY, {
                fontSize: Math.max(15, Math.min(35, 0.5 * state.camera.zoom)),
                fontFamily: CONFIG.fontFamily,
                color: CONFIG.colors.playerName,
                bg: { color: CONFIG.colors.textBackground },
            });
        }
    }
    if (labelDown && state.isLabelVisible) {
        let bottomY = pos.y + drawH / 2 + 12;
        if (!img) bottomY += 7;
        drawLabel(ctx, obj.name, pos.x, bottomY, {
            fontSize: Math.max(15, Math.min(30, 0.4 * state.camera.zoom)),
            fontFamily: CONFIG.fontFamily,
            fontWeight: isObjectSelected ? "bold" : "normal",
            bg: { enabled: false },
        });
    }
}
