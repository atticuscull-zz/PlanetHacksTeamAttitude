Weight = 1;

datapoints = [];

var addDatapoint = function(latitude, longitude, heaviness = Weight) {
    datapoints.push({location: new google.maps.LatLng(latitude, longitude), weight: heaviness});
}


addDatapoint(37.787, -122.407);
addDatapoint(37.798, -122.428);
addDatapoint(37.776, -122.386);
addDatapoint(37.776, -122.428);
addDatapoint(37.798, -122.386);

for(var i = 0; i < 300; i++) {
    addDatapoint(...genPoint());
}



var heatmap = new google.maps.visualization.HeatmapLayer({
    data: datapoints,
    maxIntensity: 5,
    radius: 30
});

heatmap.setMap(map);
