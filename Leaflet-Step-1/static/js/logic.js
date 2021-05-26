var myMap = L.map("map", {
    center: [40.7608, -111.8910],
    zoom: 5
});
  
// Adding tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
}).addTo(myMap);
  
var eQuake_url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

d3.json(eQuake_url).then(function(response) {

    console.log(response.features[0]);

    for (var i = 0; i < 150; i++) {
        var location = response.features[i];

        // Conditionals for countries points
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
        //L.marker([location.geometry.coordinates[1], location.geometry.coordinates[0]]).addTo(myMap);
        L.circle([location.geometry.coordinates[1], location.geometry.coordinates[0]], {
            fillOpacity: 0.9,
            color: "black",
            weight: 1,
            fillColor: color,
            // Adjust radius
            radius: location.properties.mag *15000
        }).bindPopup(`<h3> Type: ${location.properties.type} <hr> Place: ${location.properties.place}<br> Magnitude: ${location.properties.mag}<br> Depth: ${location.geometry.coordinates[2]}</h3>`).addTo(myMap);
        }
    }

});
  