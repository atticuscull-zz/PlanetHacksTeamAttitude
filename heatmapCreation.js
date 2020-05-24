Weight = 1;

datapoints = [];

var addDatapoint = function(latitude, longitude, heaviness = Weight) {
    datapoints.push({location: new google.maps.LatLng(latitude, longitude), weight: heaviness});
}
//datapoints.push(new google.maps.LatLng(37.787, -122.407));
//datapoints.push(new google.maps.LatLng(37.786, -122.402));
//datapoints.push(new google.maps.LatLng(37.780, -122.417));
//datapoints.push(new google.maps.LatLng(37.783, -122.406));

addDatapoint(37.787, -122.407);
addDatapoint(37.786, -122.402);
addDatapoint(37.780, -122.417);
addDatapoint(37.783, -122.406);



var heatmap = new google.maps.visualization.HeatmapLayer({
    data: datapoints,
    maxIntensity: 5,
    radius: 30
});

heatmap.setMap(map);
