var Spread = .8;
var collectionPoints = 40;
var random;

var zoom = 5;

var kansass = [38.706, -98.149];
var rockridge = [37.840, -122.248];
var sanfransisco = [37.787, -122.442];
var centerp = rockridge;
var latmin = centerp[0] - 0.011 * zoom;
var latmax = centerp[0] + 0.011 * zoom;
var lngmin = centerp[1] - 0.021 * zoom;
var lngmax = centerp[1] + 0.021 * zoom;
var attractPoints = [];

random = function(minimum, maximum) {
  return minimum + (maximum - minimum) * Math.random();
};
for (var i = 0; i < collectionPoints; i++) {
  attractPoints.push([random(latmin, latmax), random(lngmin, lngmax)]);
}

var genPoint = function() {
  var centerpoint =
    attractPoints[Math.floor(attractPoints.length * Math.random())];
  var angle = random(0, 2 * Math.PI);
  var dist = 0.003 * zoom * Math.pow(Math.random(), Spread);
  return [
    centerpoint[0] + Math.cos(angle) * dist,
    centerpoint[1] + Math.sin(angle) * dist
  ];
};

clusterPoints = function() {
  if(!(currentZoom in clusterPoints)){
    var distance = distancesPerZoom[currentZoom] / 1000;
    var latrange = [currentCenter.lat() - .011 * distance, currentCenter.lat() + .011 * distance];
    var lngrange = [currentCenter.lng() - .021 * distance, currentCenter.lng() + .021 * distance];
    var currheight = latrange[1] - latrange[0];
    var currwidth = lngrange[1] - lngrange[0];

    var newpoints = [];
    for (var i = 0; i < 30 * 40; i++) {
      newpoints.push(0);
    }
    for (var i = 0; i < datapoints.length; i++) {
      var gridsquare = [Math.floor(datapoints[i].lat/currheight), Math.floor(datapoints[i].lng/currwidth) ];
      if(gridsquare[0] > -1 && gridsquare[0] < 30 && gridsquare[1] > -1 && gridsquare[1] < 40) {
        newpoints[gridsquare[0] + 30 * gridsquare[1]] += 1;
      }
      
    }
    
    for (var i = 0; i < 30 * 40; i++) {
      newpoints[i] = {
        lat: latrange[0] + (i % 30 + .5) * (distance / 30),
        lng: lngrange[0] + (Math.floor(i/40) + .5) * (distance / 40),
        weight: newpoints[i]
      };
    }
    clusterPoints[currentZoom] = newpoints;
  }

  //refreshHeatMap();
  
}