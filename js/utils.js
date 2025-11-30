function screenToWorld(sx, sy) {
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    return {
        x: (sx - cx) / state.camera.zoom + state.camera.x,
        y: (sy - cy) / state.camera.zoom + state.camera.y
    };
}

function worldToScreen(wx, wy) {
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    return {
        x: (wx - state.camera.x) * state.camera.zoom + cx,
        y: (wy - state.camera.y) * state.camera.zoom + cy
    };
}

function dist(p1, p2) {
    return Math.sqrt((p1.x - p2.x)**2 + (p1.y - p2.y)**2);
}

function updateZoomInt() {
    const cam = state.camera;
    const maxLevels = 100;

    const logMin = Math.log(cam.minZoom);
    const logMax = Math.log(cam.maxZoom);
    const logCur = Math.log(cam.zoom);

    const progress = (logCur - logMin) / (logMax - logMin);
    let level = progress * maxLevels;
    
    level = Math.round(level);
    cam.zoomLevelInt = Math.max(0, Math.min(maxLevels, level));
}

function centerMapOn(x, y) {
    state.camera.x = x + 0.5;
    state.camera.y = y + 0.5;
    draw();
}

function drawLabel(ctx, text, x, y, options = {}) {
    ctx.save();

    const settings = {
        fontFamily: options.fontFamily || 'Arial, sans-serif',
        fontSize: options.fontSize || 12,
        fontWeight: options.fontWeight || 'normal',
        
        color: options.color || 'white',
        
        stroke: {
            enabled: options.stroke?.enabled ?? true,
            color: options.stroke?.color || 'black',
            width: options.stroke?.width || 3
        },
        
        bg: {
            enabled: options.bg?.enabled ?? true,
            color: options.bg?.color || 'rgba(0, 0, 0, 0.6)',
            paddingX: options.bg?.paddingX || 6,
            paddingY: options.bg?.paddingY || 4,
            radius: options.bg?.radius || 4
        }
    };

    ctx.font = `${settings.fontWeight} ${settings.fontSize}px ${settings.fontFamily}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    if (settings.bg.enabled) {
        const metrics = ctx.measureText(text);
        
        const width = metrics.width + (settings.bg.paddingX * 2);

        const height = settings.fontSize + (settings.bg.paddingY * 2);

        const rectX = x - (width / 2);
        const rectY = y - (height / 2);

        ctx.fillStyle = settings.bg.color;
        
        ctx.beginPath();
        if (ctx.roundRect) {
            ctx.roundRect(rectX, rectY, width, height, settings.bg.radius);
        } else {
            ctx.rect(rectX, rectY, width, height);
        }
        ctx.fill();
    }

    const textY = y + (settings.fontSize * 0.1); 

    if (settings.stroke.enabled) {
        ctx.strokeStyle = settings.stroke.color;
        ctx.lineWidth = settings.stroke.width;
        ctx.lineJoin = 'round';
        ctx.strokeText(text, x, textY);
    }

    ctx.fillStyle = settings.color;
    ctx.fillText(text, x, textY);

    ctx.restore();
}
