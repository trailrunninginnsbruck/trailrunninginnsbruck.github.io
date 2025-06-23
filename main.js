/*
Skript fuer die trailrunning Innsbruck Startseite
*/

let stop ={
    nr: 1,
    title: "Innsbruck",
    user: "innsbruck",
    lat: 47.267222,
    lng: 11.392778,
    zoom: 10,
};

const STOPS = [
    {
        lat: 47.3,
        lng: 11.35,
        zoom: 13,
        title: "Nordkette",
        user: "nordkette",
        nr: 4,
        runde_1: "Nordkette 25,7 km - 1856 Hm",
        runde_2: "Nordkette 19,1 km - 1.218 Hm",
        runde_3: "Nordkette 8,8 km - 422 Hm",
    },
    {
        nr: 2,
        title: "Patscherkofel",
        user: "patscherkofel",
        lat:47.208611,
        lng:11.460556,
        zoom:11,
        runde_1: "Patscherkofel 23,9 km - 1.460 Hm",
        runde_2: "Patscherkofel 14,9 km - 949 Hm",
        runde_3: "Patscherkofel 8,8 km - 594 Hm",
    },
    {
        nr: 3,
        title: "Nockspitze",
        user: "nockspitze",
        lat: 47.191944,
        lng:  11.325,
        zoom: 13,
        runde_1: "Nockspitze 24,1 km - 1485 Hm",
        runde_2: "Nockspitze 16,3 km - 1.010 Hm",
        runde_3: "Nockspitze 8,4 km - 452 Hm",
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
    "OpenStreetMap.Mapnik": L.tileLayer.provider('OpenStreetMap.Mapnik'),
    "OpenTopoMap": L.tileLayer.provider('OpenTopoMap').addTo(map),
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
}
    //auf alle Regionen zoomen
    map.setView([stop.lat, stop.lng], stop.zoom);


//ab hier map 2
 /* Wind & Wetter Beispiel */

// Innsbruck
let ibk = {
    lat: 47.267222,
    lng: 11.392778,
    zoom: 10,
};

// Karte initialisieren
let map2 = L.map("map2").setView([ibk.lat, ibk.lng], 5);

// thematische Layer
let overlays2 = {
    forecast: L.featureGroup().addTo(map2),
    wind: L.featureGroup().addTo(map2),
    marker: L.featureGroup().addTo(map2),
}

// Layer Control
let layerControl = L.control.layers({
    "Openstreetmap": L.tileLayer.provider("OpenStreetMap.Mapnik"),
    "Esri WorldTopoMap": L.tileLayer.provider("Esri.WorldTopoMap"),
    "Esri WorldImagery": L.tileLayer.provider("Esri.WorldImagery").addTo(map2)
}, {
    "Wettervorhersage MET Norway": overlays2.forecast,
    "ECMWF Windvorhersage": overlays2.wind,
}).addTo(map2);

// Maßstab
L.control.scale({
    imperial: false,
}).addTo(map2);

//Ort über openStreetmap GEOCODING bestimmen
async function getPlaceName(url) {
    let response = await fetch(url);
    let jsondata = await response.json();
    console.log(jsondata)
    return jsondata.display_name;
}


//MET Norway Vorhersage visualisieren
async function showForecast(latlng) {
    console.log("Popup erzeugen bei:", latlng);
    let url = `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${latlng.lat}&lon=${latlng.lng}`;
    let osmUrl = `https://nominatim.openstreetmap.org/reverse?lat=${latlng.lat}&lon=${latlng.lng}&zoom=15&format=jsonv2`;
    let placeName = await getPlaceName(osmUrl);
    //console.log(url);
    let response = await fetch(url);
    let jsondata = await response.json();
    // console.log(jsondata);

    //popup erzeugen
    let details = jsondata.properties.timeseries[0].data.instant.details;
    let timestamp = new Date(jsondata.properties.meta.updated_at);

    let markup = `
    <h3>Wettervorhersage für ${timestamp.toLocaleDateString()}</h3>
    <small>Ort: ${placeName}</small>
        <ul>
            <li>Luftdruck (hPa): ${details.air_pressure_at_sea_level}</li>
            <li>Lufttemperatur (celsius): ${details.air_temperature}</li>
            <li>Bewölkungsgrad (%) ${details.cloud_area_fraction}</li>
            <li>Luftfeuchtigkeit (%) ${details.relative_humidity}</li>
            <li>Windrichtung(°): ${details.wind_from_direction}</li>
            <li>Windgeschwindigkeit (km/h): ${details.wind_speed}</li>
        </ul>
        `;

    //wettericons für die nächsten 24 h in 3h schritten
    for (let i = 0; i <= 24; i += 3) {
        let symbol = jsondata.properties.timeseries[i].data.next_1_hours.summary.symbol_code;
        let time = new Date(jsondata.properties.timeseries[i].time);
        markup += `<img src="data/icons/${symbol}.svg" style="width:32px"
            title="${time.toLocaleString()}">`;
    }

    //Links zu den JsonDaten
    markup += `
    <p>
    <a href="${url}" target="forecast"> Daten downloaden</a> | "-" |
    <a href="${osmUrl}" target="forecast"> OSM Details zum Ort </a>
    </p>`;

    L.popup([
        latlng.lat, latlng.lng
    ], {
        content: markup
    }).openOn(overlays2.forecast)

}
map2.setView([stop.lat, stop.lng], stop.zoom);

//auf Kartenklick reagieren
map2.on("click", function (evt) {
    //console.log(evt, evt.latlng);
    showForecast(evt.latlng);
})

//Klick auf Innsbruck simulieren

map2.fire("click", {
    latlng: {
        lat: ibk.lat,
        lng: ibk.lng,
        zoom: ibk.zoom,

    }
})

// Windpfeile
async function loadWind(url) {
    let response = await fetch(url);
    let jsondata = await response.json();
    //console.log(jsondata[0].header.refTime);
    //onsole.log(jsondata[0].header.forecastTime);
    let forecastDate = new Date(jsondata[0].header.refTime);
    forecastDate.setHours(forecastDate.getHours() + jsondata[0].header.forecastTime);
    //console.log(forecastDate);

    let forecastSpan = document.querySelector("#forecast-link");
    //console.log(forecastSpan);
    forecastSpan.innerHTML = `
            <a href="${url}" target="met.no">${forecastDate.toLocaleString()}</a>)
    `;
    L.velocityLayer({
        displayValues: true,
        displayOptions: {
            // label prefix
            velocityType: "",

            // leaflet control position
            position: "bottomright",

            // no data at cursor
            emptyString: "No velocity data",

            //  one of: ['ms', 'k/h', 'mph', 'kt']
            speedUnit: "km/h",

            // direction label prefix
            directionString: "Windrichtung",

            // speed label prefix
            speedString: "Windgeschwindigkeit",
        },
        data: jsondata,
    }).addTo(overlays2.wind);
}

loadWind("https://geographie.uibk.ac.at/data/ecmwf/data/wind-10u-10v-europe.json");