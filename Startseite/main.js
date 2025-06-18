/*
Skript fuer die Neuseelandreise
*/

let stop ={
    nr: 1,
    title: "Innsbruck",
    user: "innsbruck",
    lat: 47.267222,
    lng: 11.392778,
    zoom: 13,
};

const STOPS = [
    {
        lat: 47.3,
        lng: 11.35,
        zoom: 13,
        title: "Nordkette",
        user: "nordkette",
        nr: 4,
        runde_1: "Nordkette Runde 1",
        runde_2: "Nordkette Runde 2",
        runde_3: "Nordkette Runde 3",
    },
    {
        nr: 2,
        title: "Patscherkofel",
        user: "patscherkofel",
        lat:47.208611,
        lng:11.460556,
        zoom:11,
        runde_1: "Patscherkofel Runde 1",
        runde_2: "Patscherkofel Runde 2",
        runde_3: "Patscherkofel Runde 3",
    },
    {
        nr: 3,
        title: "Nockspitze",
        user: "nockspitze",
        lat: 47.191944,
        lng:  11.325,
        zoom: 13,
        runde_1: "Nockspitze Runde 1",
        runde_2: "Nockspitze Runde 2",
        runde_3: "Nockspitze Runde 3",
    },
    {
         nr: 1,
    title: "Innsbruck",
    user: "innsbruck",
    lat: 47.267222,
    lng: 11.392778,
    zoom: 10,
    },
];

console.log(STOPS)

//Karte inititlaisieren
let map = L.map('map');

//Overlays definieren
let overlays = {
   marker: L.featureGroup().addTo(map),
   
}

//Layercontrol
L.control.layers({
    "OpenStreetMap.Mapnik": L.tileLayer.provider('OpenStreetMap.Mapnik').addTo(map),
    "OpenTopoMap": L.tileLayer.provider('OpenTopoMap'),
    "Esri.WorldImagery": L.tileLayer.provider('Esri.WorldImagery'),
}, {
    "Etappen": overlays.marker,
}).addTo(map);

//Massstab
L.control.scale({
    imperial: false,
}).addTo(map);

// loop ueber Etappen
for (let i=0; i<STOPS.length; i++) {console.log(i, STOPS[i].title);

    //Marker zeichnen
    let marker = L.marker([STOPS[i].lat, STOPS[i].lng]).addTo(map);
    marker.addTo(overlays.marker)

    //Popup definieren 
    marker.bindPopup(`
    <h2>${STOPS[i].title}</h2>
        <ul>
            <li>${STOPS[i].runde_1}</li>
            <li>${STOPS[i].runde_2}</li>
            <li>${STOPS[i].runde_3}</li>
        </ul>
    `);

    //auf eigene Etappe Blicken und Popup öffnen
if (STOPS[i].user == "innsbruck") {
    console.log("meine Etappe :-)")
    map.setView([STOPS[i].lat, STOPS[i].lng], STOPS[i].zoom);
    marker .openPopup();
    }

    //Pulldownmenü befüllen
    let option =  document.createElement("option");
    option.value = STOPS[i].user;
    option.text = STOPS[i].title;
    if (STOPS[i].user == "innsbruck") {
        option.selected = true;
    }
    document.querySelector("#pulldown select").appendChild(option);
}

//auf Änderungen beim Pulldown reagieren
document.querySelector("#pulldown select").onchange = function(evt) {
    let url = `https://${evt.target.value}.github.io/nz`;
    //console.log(url);
    //console.log(evt.target.value);
    window.location = url;
}