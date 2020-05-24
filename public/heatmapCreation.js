var Weight = 1;

var addDatapoint = function(latitude, longitude, heaviness = Weight) {
  datapoints.push({
    location: new google.maps.LatLng(latitude, longitude),
    weight: heaviness
  });
}

for(var i = 0; i < 1000; i++) {
  addDatapoint(...genPoint());
}

generateHeatMap = function(){
  for(var i = 0; i < locations.length; i++){
    addDatapoint(locations[i]["lat"], locations[i]["lng"]);
  }
  heatmap = new google.maps.visualization.HeatmapLayer({
    data: datapoints,
    maxIntensity: 2,
    radius: 50
  });
  
  heatmap.setMap(map);
};

$.get("/rest/locations").done(function(_locations) {
  locations = _locations
  generateHeatMap();
});


refreshHeatMap = function() {
  heatmap = new google.maps.visualization.HeatmapLayer({
    data: clusterPoints[currentZoom].forEach(function(e) {
      return ({
      location: new google.maps.LatLng(e.lat, e.lng), 
      weight: e.weight
      });
    }),
    maxIntensity: 2,
    radius: 50
  });
  //heatmap.setMap(map);
}
