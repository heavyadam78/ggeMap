const CONFIG = {
    mapWidth: 1286,
    mapHeight: 1286,
    fontFamily: "'Cinzel', sans-serif",
    // Definicje tła dla każdego królestwa
    kingdomBackgrounds: {
        default: '#1b6b26ff',   // Wielkie Cesarstwo
        lodzik: '#4b6584',        // Kraina Wiecznych Lodów
        piasek: '#c2a16dff',   // Płonące Piaski
        szczyty: '#2c0808'      // Ogniste Szczyty
    },
    colors: {
        background: '#1b6b26ff',        //#2c3e50',
        castle: '#f1c40f',
        outpost: '#e67e22',
        village: '#16a085',
        ruin: '#7f8c8d',
        lab: '#8e44ad',
        monument: '#2980b9',
        lineNormal: 'rgba(255, 255, 255, 0.3)',
        lineSelected: '#e74c3c',
        text: '#ffffff',
        highlight: 'rgba(231, 76, 60, 0.4)',
        selectionRing: '#ffffff',
        textFill: '#ffffff',
        textStroke: '#000000',
        playerName: '#f7e499ff',
        textBackground: 'rgba(0, 0, 0, 0.3)'
    },

    images: {
        castle: './img/castle.png',
        iconcastle: './img/iconcastle.png',
        outpost: './img/outpost.png',
        iconoutpost: './img/iconoutpost.png',
        ruin: './img/ruins.png',
        iconruin: './img/iconruins.png',
        lab: './img/labolatorium.png',
        iconlab: './img/iconlabolatorium.png',
        monument: './img/monument.png',
        iconmonument: './img/iconmonument.png',
        village: './img/village.png',
        iconvillage: './img/iconvillage.png',
        leader: './img/iconleader.png',
        deputy: './img/icondeputy.png',
        warmarshal: './img/iconwarmarshal.png',
        treasurer: './img/icontreasurer.png',
        diplomat: './img/icondiplomat.png',
        recruiter: './img/iconrecruiter.png',
        general: './img/icongeneral.png',
        sargent: './img/iconsargent.png',
        member: './img/iconmember.png',
        novice: './img/iconnovice.png'
    },

    objSizes: {
        castle: 1.5,
        outpost: 1.0,
        village: 1.0,
        ruin: 1.0,
        lab: 1.0,
        monument: 0.8
    }
};
