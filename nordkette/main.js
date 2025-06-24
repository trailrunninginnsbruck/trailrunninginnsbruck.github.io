// nordkette trail
let nordkette = {
    lat: 47.3,
    lng: 11.35,
};

// Karte initialisieren
let map = L.map("map", {
    fullscreenControl: true,
}).setView([nordkette.lat, nordkette.lng], 11);



// / Layer control mit eGrundkarte Tirol und Standardlayern
L.control.layers({
    "OpenStreetMap": L.tileLayer.provider("OpenStreetMap.Mapnik"),
    "Esri WorldImagery": L.tileLayer.provider("Esri.WorldImagery").addTo(map)
}).addTo(map);

// Maßstab
L.control.scale({
    imperial: false,
}).addTo(map);


// Instantiate elevation control
const controlElevation = L.control.elevation({
    theme: "bike-tirol",
    time: false,
    elevationDiv: "#profile",
    height: 300,
    //slope: true,
}).addTo(map);


// Load track from url (allowed data types: "*.geojson", "*.gpx", "*.tcx")
controlElevation.load("data/gpx/nk_kurz.gpx");

//Minnimap
var gkTirol = new L.tileLayer("https://wmts.kartetirol.at/gdi_summer/{z}/{x}/{y}.png");
var miniMap = new L.Control.MiniMap(gkTirol, {
    toggleDisplay: true, 

}).addTo(map);

 //LeaftletLocate Control
        L.control.locate({
        strings: {
                title: "Eigenen Standort anzeigen"
        },
        drawCircle: false

        }).addTo(map);



// Zweite map

// Karte initialisieren
let map2 = L.map("map2", {
    fullscreenControl: true,
}).setView([nordkette.lat, nordkette.lng], 11);


// / Layer control mit eGrundkarte Tirol und Standardlayern
L.control.layers({

    "OpenStreetMap": L.tileLayer.provider("OpenStreetMap.Mapnik"),
    "Esri WorldImagery": L.tileLayer.provider("Esri.WorldImagery").addTo(map2)
}).addTo(map2);

// Maßstab
L.control.scale({
    imperial: false,
}).addTo(map2);



// Instantiate elevation control
const controlElevation2 = L.control.elevation({
    theme: "bike-tirol",
    time: false,
    elevationDiv: "#profile2",
    height: 300,
    //slope: true,
}).addTo(map2);


// Load track from url (allowed data types: "*.geojson", "*.gpx", "*.tcx")
controlElevation2.load("data/gpx/nk_mittel.gpx");


//Minnimap
var gkTirol2 = new L.tileLayer("https://wmts.kartetirol.at/gdi_summer/{z}/{x}/{y}.png");
var miniMap2 = new L.Control.MiniMap(gkTirol2, {
    toggleDisplay: true, 

}).addTo(map2);

 //LeaftletLocate Control
        L.control.locate({
        strings: {
                title: "Eigenen Standort anzeigen"
        },
        drawCircle: false

        }).addTo(map2);

// Dritte map

// Karte initialisieren
let map3 = L.map("map3", {
    fullscreenControl: true,
}).setView([nordkette.lat, nordkette.lng], 11);


// / Layer control mit eGrundkarte Tirol und Standardlayern
L.control.layers({

    "OpenStreetMap": L.tileLayer.provider("OpenStreetMap.Mapnik"),
    "Esri WorldImagery": L.tileLayer.provider("Esri.WorldImagery").addTo(map3)
}).addTo(map3);

// Maßstab
L.control.scale({
    imperial: false,
}).addTo(map3);



// Instantiate elevation control
const controlElevation3 = L.control.elevation({
    theme: "bike-tirol",
    time: false,
    elevationDiv: "#profile3",
    height: 300,
    //slope: true,
}).addTo(map3);


// Load track from url (allowed data types: "*.geojson", "*.gpx", "*.tcx")
controlElevation3.load("data/gpx/nk_lang.gpx");

//Minnimap
var gkTirol3 = new L.tileLayer("https://wmts.kartetirol.at/gdi_summer/{z}/{x}/{y}.png");
var miniMap3 = new L.Control.MiniMap(gkTirol3, {
    toggleDisplay: true, 

}).addTo(map3);

 //LeaftletLocate Control
        L.control.locate({
        strings: {
                title: "Eigenen Standort anzeigen"
        },
        drawCircle: false

        }).addTo(map3);