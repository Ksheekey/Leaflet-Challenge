//setting map
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

var info = L.control({
    position: "bottomleft"
});

info.onAdd = function() {
    var div = L.DomUtil.create("div", "legend");
    return div;
};

// Add the info legend to the map
info.addTo(myMap);
  
//putting site into a variable to call
var eQuake_url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

//reading json
d3.json(eQuake_url).then(function(response) {

    //console.log(response.features);

    //loop through the data
    for (var i = 0; i < response.features.length; i++) {
        var location = response.features[i];

        //append colors to cooresponding info
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

        //setting points and popup info
        if (location) {
        L.circle([location.geometry.coordinates[1], location.geometry.coordinates[0]], {
            fillOpacity: 0.9,
            color: "black",
            weight: 1,
            fillColor: color,
            radius: location.properties.mag *15000
        }).bindPopup(`<h3> Type: ${location.properties.type} <hr> Place: ${location.properties.place}<br> Magnitude: ${location.properties.mag}<br> Depth: ${location.geometry.coordinates[2]}</h3>`).addTo(myMap);
        }
        
        //legend
        document.querySelector(".legend").innerHTML = [
            "<p class='one'>Depth: -10 - 9</p>",
            "<p class='two'>Depth: 10 - 29</p>",
            "<p class='three'>Depth: 30 - 49</p>",
            "<p class='four'>Depth: 50 - 69</p>",
            "<p class='five'>Depth: 70 - 89</p>",
            "<p class='six'>Depth: 90+</p>"
          ].join("");
    }
    

});
  

