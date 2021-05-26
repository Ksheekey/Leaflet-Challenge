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

    console.log(response.features[1000]);

    for (var i = 0; i < 50; i++) {
        var location = response.features[i];

        if (location) {
        //L.marker([location.geometry.coordinates[1], location.geometry.coordinates[0]]).addTo(myMap);
        L.circle([location.geometry.coordinates[1], location.geometry.coordinates[0]], {
            fillOpacity: 0.75,
            color: "orange",
            fillColor: "orange",
            // Adjust radius
            radius: location.properties.mag *50000
        }).bindPopup("<h1>" + "yea" + "</h1> <hr> <h3>Points: " + "yea" + "</h3>").addTo(myMap);
        }
    }

});
  