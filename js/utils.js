// Konwersja Ekran -> Świat
function screenToWorld(sx, sy) {
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    return {
        x: (sx - cx) / state.camera.zoom + state.camera.x,
        y: (sy - cy) / state.camera.zoom + state.camera.y
    };
}

// Konwersja Świat -> Ekran
function worldToScreen(wx, wy) {
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    return {
        x: (wx - state.camera.x) * state.camera.zoom + cx,
        y: (wy - state.camera.y) * state.camera.zoom + cy
    };
}

// Odległość między punktami
function dist(p1, p2) {
    return Math.sqrt((p1.x - p2.x)**2 + (p1.y - p2.y)**2);
}

// Obliczanie poziomu zoomu (LOD)
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

// Centrowanie mapy
function centerMapOn(x, y) {
    state.camera.x = x + 0.5;
    state.camera.y = y + 0.5;
    draw(); // Funkcja z renderer.js
}

/**
 * Rysuje etykietę tekstową wycentrowaną w punkcie (x, y).
 * 
 * @param {CanvasRenderingContext2D} ctx - Kontekst Canvasa
 * @param {string} text - Tekst do wyświetlenia
 * @param {number} x - Współrzędna X środka
 * @param {number} y - Współrzędna Y środka
 * @param {Object} options - Opcje konfiguracyjne (opcjonalne)
 */
function drawLabel(ctx, text, x, y, options = {}) {
    // 1. Zapisujemy stan Canvasa (żeby nie popsuć ustawień na zewnątrz)
    ctx.save();

    // 2. Domyślne ustawienia (merge z opcjami użytkownika)
    const settings = {
        fontFamily: options.fontFamily || 'Arial, sans-serif',
        fontSize: options.fontSize || 12,
        fontWeight: options.fontWeight || 'normal', // 'bold', 'normal', '600'
        
        color: options.color || 'white',
        
        // Obrys (Stroke)
        stroke: {
            enabled: options.stroke?.enabled ?? true, // Domyślnie włączony
            color: options.stroke?.color || 'black',
            width: options.stroke?.width || 3
        },
        
        // Tło (Background)
        bg: {
            enabled: options.bg?.enabled ?? true, // Domyślnie włączone
            color: options.bg?.color || 'rgba(0, 0, 0, 0.6)',
            paddingX: options.bg?.paddingX || 6,
            paddingY: options.bg?.paddingY || 4,
            radius: options.bg?.radius || 4
        }
    };

    // 3. Konfiguracja czcionki
    ctx.font = `${settings.fontWeight} ${settings.fontSize}px ${settings.fontFamily}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle'; // Kluczowe dla centrowania w pionie

    // 4. Rysowanie TŁA (jeśli włączone)
    if (settings.bg.enabled) {
        const metrics = ctx.measureText(text);
        
        // Obliczamy wymiary prostokąta
        // Szerokość = tekst + paddingi
        const width = metrics.width + (settings.bg.paddingX * 2);
        // Wysokość = font + paddingi (przybliżenie, bo measureText.height bywa kapryśne)
        const height = settings.fontSize + (settings.bg.paddingY * 2);

        // Obliczamy lewy górny róg (skoro x,y to środek)
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
    // --- KOREKTA PIONOWA TEKSTU ---
    // Przesuwamy tekst w dół o 10% wysokości czcionki.
    // Dzięki temu ląduje on optycznie na środku tła.
    const textY = y + (settings.fontSize * 0.1); 

    // 5. Rysowanie OBRYSU (jeśli włączony)
    // Rysujemy go PRZED wypełnieniem, żeby nie "zjadał" liter
    if (settings.stroke.enabled) {
        ctx.strokeStyle = settings.stroke.color;
        ctx.lineWidth = settings.stroke.width;
        ctx.lineJoin = 'round'; // Ładne, okrągłe rogi liter
        ctx.strokeText(text, x, textY);
    }

    // 6. Rysowanie TEKSTU (Wypełnienie)
    ctx.fillStyle = settings.color;
    ctx.fillText(text, x, textY);

    // 7. Przywracamy stan Canvasa
    ctx.restore();
}
