// Store our API endpoint inside queryUrl
var earthquakes_url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"
var tetonicPlates_url = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json"

// =============================================================================================================================
var earthquakes = L.layerGroup();

// Perform a GET request to the query URL
d3.json(earthquakes_url, function(earthquake_json) {
  console.log(earthquake_json);
  // Once we get a response, send the data.features object to the createFeatures function
  createFeatures(earthquake_json.features);
});

function createFeatures(earthquakeData) {
  // Create a GeoJSON layer containing the features array on the earthquakeData object
  // Run the onEachFeature function once for each piece of data in the array
  createMap(earthquakes, tetonicPlates);

  // Conditionals for magnitude size by color
  function magColor(mag) {
    if (mag >= 5.0) {
      return "brown";
    } else if (mag >= 4.0) {
      return "red";
    } else if (mag >= 3.0) {
      return "orange";
    } else if (mag >= 2.0) {
      return "yellow";
    } else if (mag >= 1.0) {
      return "green";
    } else {
      return "lightgreen";
    }
  }

  // Loop through earthquakeData
  for (var i = 0; i < earthquakeData.length; i++) {
    // Set the data location property to a variable
    var location = earthquakeData[i].geometry;
    // Add a new marker to the cluster group and bind a pop-up
    var circle = L.circle([location.coordinates[1], location.coordinates[0]],{
      fillOpacity: 0.75,
      weight: 1,
      color: "black",
      fillColor: magColor(earthquakeData[i].properties.mag),
      radius: earthquakeData[i].properties.mag * 30000,
      // onEachFeature: onEachFeature
    }).bindPopup("<h3>" + earthquakeData[i].properties.place 
    + "<hr> Magnitude: " + earthquakeData[i].properties.mag + "</h3><hr><p>"
    + new Date(earthquakeData[i].properties.time) + "</p>")
    .addTo(earthquakes)
  };
};


// ============================================================================================================================
var tetonicPlates = L.layerGroup();

// Perform a GET request to the query URL
d3.json(tetonicPlates_url, function(tetonicPlates_JSON) {
  console.log(tetonicPlates_JSON);
  // Once we get a response, send the data.features object to the createFeatures function
  L.geoJson(tetonicPlates_JSON, {
    style: {
      color: "orange",
    }
  }).addTo(tetonicPlates);
});

// ============================================================================================================================
// Map Creation:
function createMap(earthquakes, tetonicPlates) {
  // Define the several map design layers
  var satellitemap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.satellite",
    accessToken: API_KEY
  });
  var streetsmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  });
  var outdoorsmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.outdoors",
    accessToken: API_KEY
  });

  // Define a baseMaps object to hold our base layers
  var baseMaps = {
    "Satellite Map": satellitemap,
    "Street Map": streetsmap,
    "Outdoors Map": outdoorsmap,
  };

  // Create overlay object to hold our overlay layer
  var overlayMaps = {
    "Earthquakes": earthquakes,
    "Tetonic Plates": tetonicPlates
  };

  // Create our map, giving it the display map, earthquakes, and tetonicPlates layers to display on load
  var myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [satellitemap, earthquakes, tetonicPlates]
  });

  // Create a layer control. Pass in our baseMaps and overlayMaps. Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);

  // Set up the legend
var legend = L.control({ position: "bottomright" });
legend.onAdd = function() {
  var div = L.DomUtil.create("div", "info legend");
  var limits = ["0-1","1-2","2-3","3-4","4-5","5+"];
  var colors = ["brown","red","orange","yellow","green","lightgreen"];
  var labels = [];

  div.innerHTML = "<h1>Earthquake magnitude</h1>";

  limits.forEach(function(limit, index) {
    labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
  });

  div.innerHTML += "<ul>" + labels.join("") + "</ul>";
  return div;
};

// Adding legend to the map
legend.addTo(myMap);
}




