const canvas = document.getElementById("game-map");
const ctx = canvas.getContext("2d");
const state = {
    players: [],
    selectedPlayerId: null,
    selectedObjectId: null,
    isPostsVisible: true,
    isLabsVisible: true,
    isVillagesVisible: true,
    isNickVisible: true,
    isLabelVisible: true,
    displayingImages: false,
    camera: {
        x: CONFIG.mapWidth / 2,
        y: CONFIG.mapHeight / 2,
        zoom: 0.5,
        minZoom: 0.5,
        maxZoom: 55,
        zoomLevelInt: 0,
    },
    mouse: {
        isDown: false,
        startX: 0,
        startY: 0,
        dragDistance: 0,
        posX: 0,
        posY: 0,
    },
};
const loadedImages = {};
const uiElements = {
    treeList: document.getElementById("alliance-tree"),
    searchInput: document.getElementById("player-search"),
    panel: document.getElementById("info-panel"),
    toggleBtn: document.getElementById("toggle-panel-btn"),
    searchPanel: document.getElementById("search-panel"),
    toggleSearchBtn: document.getElementById("toggle-search-btn"),
    filterPostsChkbox: document.getElementById("filter-posts-chkbox"),
    filterLabsChkbox: document.getElementById("filter-labs-chkbox"),
    filterVillagesChkbox: document.getElementById("filter-villages-chkbox"),
    filterNickChkbox: document.getElementById("filter-nick-chkbox"),
    filterLabelChkbox: document.getElementById("filter-label-chkbox"),
    iconsimagesChkbox: document.getElementById("icons-images"),
    mouseX: document.getElementById("MouseX"),
    mouseY: document.getElementById("MouseY"),
    alliancename: document.getElementById("alliance-name"),
};
