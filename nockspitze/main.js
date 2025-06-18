/*nockspitze trail */

// nockspitze
let nockspitze = {
    lat: 47.191944,
    lng:  11.325
};
// WMTS Hintergrundlayer der eGrundkarte Tirol
const eGrundkarteTirol = {
    sommer: L.tileLayer("https://wmts.kartetirol.at/gdi_summer/{z}/{x}/{y}.png", {
        attribution: `Datenquelle: <a href="https://www.data.gv.at/katalog/dataset/land-tirol_elektronischekartetirol">eGrundkarte Tirol</a>`
    }),
    winter: L.tileLayer(
        "https://wmts.kartetirol.at/gdi_winter/{z}/{x}/{y}.png", {
        attribution: `Datenquelle: <a href="https://www.data.gv.at/katalog/dataset/land-tirol_elektronischekartetirol">eGrundkarte Tirol</a>`
    }),
    ortho: L.tileLayer("https://wmts.kartetirol.at/gdi_ortho/{z}/{x}/{y}.png", {
        attribution: `Datenquelle: <a href="https://www.data.gv.at/katalog/dataset/land-tirol_elektronischekartetirol">eGrundkarte Tirol</a>`
    }
    ),
    nomenklatur: L.tileLayer("https://wmts.kartetirol.at/gdi_nomenklatur/{z}/{x}/{y}.png", {
        attribution: `Datenquelle: <a href="https://www.data.gv.at/katalog/dataset/land-tirol_elektronischekartetirol">eGrundkarte Tirol</a>`,
        pane: "overlayPane",
    })
}

// Karte initialisieren
let map = L.map("map", {
    fullscreenControl: true,
}).setView([nockspitze.lat, nockspitze.lng], 11);



// / Layer control mit eGrundkarte Tirol und Standardlayern
L.control.layers({
    "eGrundkarte Tirol Sommer": L.layerGroup([
        eGrundkarteTirol.sommer,
        eGrundkarteTirol.nomenklatur
    ]).addTo(map),
    "eGrundkarte Tirol Winter": L.layerGroup([
        eGrundkarteTirol.winter,
        eGrundkarteTirol.nomenklatur
    ]),
    "eGrundkarte Tirol Orthofoto": L.layerGroup([
        eGrundkarteTirol.ortho,
        eGrundkarteTirol.nomenklatur,
    ]),
    "OpenStreetMap": L.tileLayer.provider("OpenStreetMap.Mapnik"),
    "Esri WorldImagery": L.tileLayer.provider("Esri.WorldImagery"),
}).addTo(map);

// Maßstab
L.control.scale({
    imperial: false,
}).addTo(map);

// Etappennavigation über Pulldownmenü
//console.log(ETAPPEN)
//let pulldown = document.querySelector("#pulldown");
//console.log(pulldown);
//for (let etappe of ETAPPEN) {
    //console.log(etappe);
    //console.log(etappe.user);
    //let selected = "";
    //if (etappe.nr == 10) {
      //  selected = "selected";
    //}
   // pulldown.innerHTML += `
    //<option ${selected} value="${etappe.user}"> Etappe ${etappe.nr}: ${etappe.titel}</option>
    //`;

//}

//auf Wechsel in Pulldown reagieren
//pulldown.onchange = function (evt) {
  //  console.log(evt.target.value);
   // window.location.href = `https://${evt.target.value}.github.io/biketirol`;
//}

// Instantiate elevation control
const controlElevation = L.control.elevation({
    theme: "bike-tirol",
    time: false,
    elevationDiv: "#profile",
    height: 300,
    //slope: true,
}).addTo(map);


// Load track from url (allowed data types: "*.geojson", "*.gpx", "*.tcx")
controlElevation.load("data/gpx/test.gpx");

//Minnimap
var gkTirol = new L.tileLayer("https://wmts.kartetirol.at/gdi_summer/{z}/{x}/{y}.png");
var miniMap = new L.Control.MiniMap(gkTirol, {
    toggleDisplay: true, 

}).addTo(map);

//fullscreen



// Zweite map

// Karte initialisieren
let map2 = L.map("map2", {
    fullscreenControl: true,
}).setView([nockspitze.lat, nockspitze.lng], 11);


// / Layer control mit eGrundkarte Tirol und Standardlayern
L.control.layers({
    "eGrundkarte Tirol Sommer": L.layerGroup([
        eGrundkarteTirol.sommer2,
        eGrundkarteTirol.nomenklatur2,
    ]).addTo(map2),
    "eGrundkarte Tirol Winter": L.layerGroup([
        eGrundkarteTirol.winter2,
        eGrundkarteTirol.nomenklatur2,
    ]),
    "eGrundkarte Tirol Orthofoto": L.layerGroup([
        eGrundkarteTirol.ortho2,
        eGrundkarteTirol.nomenklatur2,
    ]),
    "OpenStreetMap": L.tileLayer.provider("OpenStreetMap.Mapnik"),
    "Esri WorldImagery": L.tileLayer.provider("Esri.WorldImagery"),
}).addTo(map2);

// Maßstab
L.control.scale({
    imperial: false,
}).addTo(map2);

// Etappennavigation über Pulldownmenü
//console.log(ETAPPEN)
//let pulldown = document.querySelector("#pulldown");
//console.log(pulldown);
//for (let etappe of ETAPPEN) {
    //console.log(etappe);
    //console.log(etappe.user);
    //let selected = "";
    //if (etappe.nr == 10) {
      //  selected = "selected";
    //}
   // pulldown.innerHTML += `
    //<option ${selected} value="${etappe.user}"> Etappe ${etappe.nr}: ${etappe.titel}</option>
    //`;

//}

//auf Wechsel in Pulldown reagieren
//pulldown.onchange = function (evt) {
  //  console.log(evt.target.value);
   // window.location.href = `https://${evt.target.value}.github.io/biketirol`;
//}

// Instantiate elevation control
const controlElevation2 = L.control.elevation({
    theme: "bike-tirol",
    time: false,
    elevationDiv: "#profile2",
    height: 300,
    //slope: true,
}).addTo(map2);


// Load track from url (allowed data types: "*.geojson", "*.gpx", "*.tcx")
controlElevation2.load("data/gpx/test.gpx");

//Minnimap
var gkTirol2 = new L.tileLayer("https://wmts.kartetirol.at/gdi_summer/{z}/{x}/{y}.png");
var miniMap2 = new L.Control.MiniMap(gkTirol2, {
    toggleDisplay: true, 

}).addTo(map2);

//fullscreen