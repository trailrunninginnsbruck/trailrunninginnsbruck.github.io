/*patscherkofel trail */

// patscherkofel
let patscherkofel = {
   lat:47.208611,
    lng:11.460556,
};

// Karte initialisieren
let map = L.map("map", {
    fullscreenControl: true,
}).setView([patscherkofel.lat, patscherkofel.lng], 11);

// overlays definieren
let overlays = {
    Brunnen: L.featureGroup().addTo(map)
};


// / Layer control mit eGrundkarte Tirol und Standardlayern
L.control.layers({
    "OpenStreetMap": L.tileLayer.provider("OpenStreetMap.Mapnik"),
    "Esri WorldImagery": L.tileLayer.provider("Esri.WorldImagery").addTo(map)
}, {
    "Brunnen": overlays.Brunnen
}).addTo(map);

// Maßstab
L.control.scale({
    imperial: false,
}).addTo(map);

// Brunnen GeoJSON laden und ins Overlay einfügen
async function loadTrinkbrunnen(url, overlay) {
    console.log(url);
    let response = await fetch(url);
    let geojson = await response.json();
    console.log(geojson);

    L.geoJSON(geojson, {
        attribution: "Datenquelle: <a href='#'>Stadt Innsbruck</a>",
        pointToLayer: function (feature, latlng) {
             return L.marker(latlng, {
        icon: L.divIcon({
            html: '<i class="fa-solid fa-droplet" style="font-size:1rem;color:#007bff"></i>',
            iconSize: [10, 10],
            className: 'my-fa-icon'
        })
    });
},
        onEachFeature: function (feature, layer) {
            layer.bindPopup(`
                <h4><i class="fa-solid fa-faucet"></i> ${feature.properties.name}</h4>
                <p>Koordinaten: ${feature.geometry.coordinates[1]}, ${feature.geometry.coordinates[0]}</p>
            `);
        }
    }).addTo(overlay);
}

// Instantiate elevation control
const controlElevation = L.control.elevation({
    theme: "bike-tirol",
    time: false,
    elevationDiv: "#profile",
    height: 300,
    //slope: true,
}).addTo(map);


// Load track 
controlElevation.load("data/gpx/pk_kurz.gpx");

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
}).setView([patscherkofel.lat, patscherkofel.lng], 11);

// overlays definieren
let overlays2 = {
    Brunnen: L.featureGroup().addTo(map2)
};


// / Layer control mit eGrundkarte Tirol und Standardlayern
L.control.layers({

    "OpenStreetMap": L.tileLayer.provider("OpenStreetMap.Mapnik"),
    "Esri WorldImagery": L.tileLayer.provider("Esri.WorldImagery").addTo(map2)
}, {
    "Brunnen": overlays2.Brunnen
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


// Load track 
controlElevation2.load("data/gpx/pk_mittel.gpx");

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
}).setView([patscherkofel.lat, patscherkofel.lng], 11);

// overlays definieren
let overlays3 = {
    Brunnen: L.featureGroup().addTo(map3)
};

// / Layer control mit eGrundkarte Tirol und Standardlayern
L.control.layers({

    "OpenStreetMap": L.tileLayer.provider("OpenStreetMap.Mapnik"),
    "Esri WorldImagery": L.tileLayer.provider("Esri.WorldImagery").addTo(map3)
}, {
    "Brunnen": overlays3.Brunnen
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


// Load track 
controlElevation3.load("data/gpx/pk_lang.gpx");

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

        // load BRunnen
loadTrinkbrunnen("../data/geojson/trinkbrunnen.geojson", overlays.Brunnen);
loadTrinkbrunnen("../data/geojson/trinkbrunnen.geojson", overlays2.Brunnen);
loadTrinkbrunnen("../data/geojson/trinkbrunnen.geojson", overlays3.Brunnen);