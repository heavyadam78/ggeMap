
const TRANSLATIONS = {
    pl: {
        settings_title: "Ustawienia",
        search_placeholder: "Nick, obiekt lub X:Y...",
        filter_posts: "Posterunki",
        filter_labs: "Laby/Montki",
        filter_villages: "Wioski",
        filter_nick: "Nazwa gracza",
        filter_label: "Nazwa obiektu",
        label_icons: "Ikony",
        label_images: "Obrazy",
        panel_members: "Członkowie Sojuszu",
        label_kingdoms: "Królestwa",
        kingdom_default: "Wielkie Cesarstwo",
        kingdom_ice: "Kraina Wiecznych Lodów",
        kingdom_sands: "Płonące Piaski",
        kingdom_fire: "Ogniste Szczyty",
        modal_header: "Informacja",
        modal_text: "Ta strona wykorzystuje <strong>Pamięć Przeglądarki (LocalStorage)</strong>, aby zapamiętywać Twoje ustawienia:",
        modal_li_1: "Pozycję i przybliżenie mapy",
        modal_li_2: "Stan paneli bocznych",
        modal_li_3: "Filtrowanie obiektów",
        modal_footer: "Żadne dane nie są wysyłane na zewnętrzne serwery. Wszystko zostaje na Twoim urządzeniu.",
        btn_accept: "Rozumiem i Akceptuję",
        type_castle: "Zamek",
        type_ruin: "Ruiny",
        type_outpost: "Posterunek",
        type_village: "Wioska",
        type_lab: "Laboratorium",
        type_monument: "Monument",
        rank_leader: "Przywódca",
        rank_deputy: "Zastępca",
        rank_warmarshal: "Marszałek",
        rank_general: "Generał",
        rank_sargent: "Sierżant",
        rank_member: "Członek",
        rank_novice: "Nowicjusz",
        label_player: "Gracz",
        label_rank: "Ranga",
        label_type: "Typ",
        label_coords: "Kordy",
        no_data_kingdom: "Brak danych dla tego królestwa",
        coords_error: "Współrzędne poza mapą!",
        alliance_prefix: "Sojusz: "
    },
    en: {
        settings_title: "Settings",
        search_placeholder: "Nick, object or X:Y...",
        filter_posts: "Outposts",
        filter_labs: "Labs/Monuments",
        filter_villages: "Villages",
        filter_nick: "Player Name",
        filter_label: "Object Name",
        label_icons: "Icons",
        label_images: "Images",
        panel_members: "Alliance Members",
        label_kingdoms: "Kingdoms",
        kingdom_default: "Great Empire",
        kingdom_ice: "Everwinter Glacier",
        kingdom_sands: "Burning Sands",
        kingdom_fire: "Fire Peaks",
        modal_header: "Information",
        modal_text: "This site uses <strong>Browser Storage (LocalStorage)</strong> to remember your settings:",
        modal_li_1: "Map position and zoom level",
        modal_li_2: "Sidebar state",
        modal_li_3: "Object filtering",
        modal_footer: "No data is sent to external servers. Everything stays on your device.",
        btn_accept: "I Understand & Accept",
        type_castle: "Castle",
        type_ruin: "Ruins",
        type_outpost: "Outpost",
        type_village: "Resource Village",
        type_lab: "Laboratory",
        type_monument: "Monument",
        rank_leader: "Leader",
        rank_deputy: "Deputy",
        rank_warmarshal: "War Marshal",
        rank_general: "General",
        rank_sargent: "Sergeant",
        rank_member: "Member",
        rank_novice: "Novice",
        label_player: "Player",
        label_rank: "Rank",
        label_type: "Type",
        label_coords: "Coords",
        no_data_kingdom: "No data for this kingdom",
        coords_error: "Coordinates out of bounds!",
        alliance_prefix: "Alliance: "
    }
};
const urlParams = new URLSearchParams(window.location.search);
const urlLang = urlParams.get('lang');
const navLang = navigator.language || navigator.userLanguage;
let detectedLang = 'en';
if (urlLang === 'pl' || urlLang === 'en') {
    detectedLang = urlLang;
} else if (navLang.startsWith('pl')) {
    detectedLang = 'pl';
}
const CURRENT_LANG = detectedLang;
function t(key) {
    return TRANSLATIONS[CURRENT_LANG][key] || key;
}
function applyTranslations() {
    const elements = document.querySelectorAll('[data-lang]');
    elements.forEach(el => {
        const key = el.getAttribute('data-lang');
        const text = t(key);
        if (el.tagName === 'INPUT' && el.getAttribute('placeholder')) {
            el.placeholder = text;
        } else {
            el.innerHTML = text;
        }
    });
}