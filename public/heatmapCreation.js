var Weight = 1;

var datapoints = [];

var addDatapoint = function(latitude, longitude, heaviness = Weight) {
  datapoints.push({
    location: new google.maps.LatLng(latitude, longitude),
    weight: heaviness
  });
};

addDatapoint(37.787, -122.407);
addDatapoint(37.786, -122.402);
addDatapoint(37.776, -122.428);
addDatapoint(37.798, -122.386);

var heatmap = new google.maps.visualization.HeatmapLayer({
  data: datapoints,
  maxIntensity: 5,
  radius: 30
});

heatmap.setMap(map);
