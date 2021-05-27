var myMap = L.map("map", {
    center: [40.7608, -111.8910],
    zoom: 1
});

  
// Adding tile layer
var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
}).addTo(myMap);


var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "dark-v10",
  accessToken: API_KEY
});

var info = L.control({
    position: "bottomleft"
});

info.onAdd = function() {
    var div = L.DomUtil.create("div", "legend");
    return div;
};

// Add the info legend to the map
info.addTo(myMap);
  
var eQuake_url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

d3.json(eQuake_url).then(function(response) {

    //console.log(response.features);
    var quakes = []

    for (var i = 0; i < response.features.length; i++) {
        var location = response.features[i];

        var color = "";
        if (location.geometry.coordinates[2] >= -10 && location.geometry.coordinates[2] < 10) {
            color = "#99FF00";
        }
        else if (location.geometry.coordinates[2] >= 10 && location.geometry.coordinates[2] < 30) {
            color = "#FFFF33";
        }
        else if (location.geometry.coordinates[2] >= 30 && location.geometry.coordinates[2] < 50) {
            color = "#FFCC00";
        }
        else if (location.geometry.coordinates[2] >= 50 && location.geometry.coordinates[2] < 70) {
            color = "#FF9900";
        }
        else if (location.geometry.coordinates[2] >= 70 && location.geometry.coordinates[2] < 90) {
            color = "#FF6600";
        }
        else if (location.geometry.coordinates[2] >= 90) {
            color = "#FF0000";
        }
        else {
            color = "black";
        }

        if (location) {
            quakes.push(
            L.circle([location.geometry.coordinates[1], location.geometry.coordinates[0]], {
            fillOpacity: 0.9,
            color: "black",
            weight: 1,
            fillColor: color,
            radius: location.properties.mag *15000
        }).bindPopup(`<h3> Type: ${location.properties.type} <hr> Place: ${location.properties.place}<br> Magnitude: ${location.properties.mag}<br> Depth: ${location.geometry.coordinates[2]}</h3>`).addTo(myMap));
        }
        document.querySelector(".legend").innerHTML = [
            "<p class='one'>Depth: -10 - 9</p>",
            "<p class='two'>Depth: 10 - 29</p>",
            "<p class='three'>Depth: 30 - 49</p>",
            "<p class='four'>Depth: 50 - 69</p>",
            "<p class='five'>Depth: 70 - 89</p>",
            "<p class='six'>Depth: 90+</p>"
          ].join("");
    }
    //console.log(quakes[0]._latlng.lat)

});

var baseMaps = {
    "Street Map":streetmap,
    "Dark Map":darkmap
};

// var overlayMaps = {
//     "Quakes": quakes,
// }

L.control.layers(baseMaps).addTo(myMap);

var plates_url = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json"

d3.json(plates_url).then(function(response) {

    console.log(response.features.length);
    var lines = []

    var wow = response.features[0].geometry.coordinates[0][0]
    console.log(wow)
    //wow.forEach(d=>lines.push(d))
    

    for (var t = 0;t<response.features.length;t++) {
        lines.push([response.features[t].geometry.coordinates[0][0],response.features[t].geometry.coordinates[0][1]])
    }

    
    console.log(lines)

    var line = [
    lines
    ];

    //POLYLINE
    L.polyline(line, {
    color: "grey"
    }).addTo(myMap);

});

// https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_plates.json