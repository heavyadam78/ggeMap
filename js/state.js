
const canvas = document.getElementById('game-map');
const ctx = canvas.getContext('2d');

const state = {
    players: [],
    selectedPlayerId: null,
    selectedObjectId: null,
    isPostsVisible: true,
    isLabsVisible: true,
    displayingImages: false,
    
    camera: {
        x: CONFIG.mapWidth / 2,
        y: CONFIG.mapHeight / 2,
        zoom: 10,
        minZoom: 0.5,
        maxZoom: 55,
        zoomLevelInt: 0
    },
    
    mouse: {
        isDown: false,
        startX: 0,
        startY: 0,
        dragDistance: 0
    }
};

const loadedImages = {};

const uiElements = {
    treeList: document.getElementById('alliance-tree'),
    playerCount: document.getElementById('player-count'),
    zoomLevel: document.getElementById('zoom-level'),
    searchInput: document.getElementById('player-search'),
    panel: document.getElementById('info-panel'),
    toggleBtn: document.getElementById('toggle-panel-btn'),
    searchPanel: document.getElementById('search-panel'),
    toggleSearchBtn: document.getElementById('toggle-search-btn'),
    filterPostsChkbox: document.getElementById('filter-posts-chkbox'),
    filterLabsChkbox: document.getElementById('filter-labs-chkbox'),
    iconsimagesChkbox: document.getElementById('icons-images')
};
