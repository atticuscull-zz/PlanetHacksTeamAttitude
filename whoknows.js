heatmap = new HeatmapOverlay(map, {
    "maxOpacity": .8
});

datapoints = {
    max: 1,
    data: []
};

var addDataPoint = function(latitude, longitude) {
    datapoints.data.push({lat:latitude, lng:longitude, count:1});
}

var updateMap = function() {
    heatmap.setData(datapoints);
}

