var Spread = .8;
var collectionPoints = 20;
var random;

//console.log("hi" + toString(myLocation));
var centerp = [37.787, -122.422];
var latmin = centerp[0] - .011; var latmax = centerp[0] + .011;
var lngmin = centerp[1] - .021; var lngmax = centerp[1] + .021;
var attractPoints = [];

random = function(minimum, maximum) {
  return minimum + (maximum - minimum)*Math.random();
}
for(var i = 0; i < collectionPoints; i++) {
  attractPoints.push([random(latmin, latmax), random(lngmin, lngmax)]);
}

var genPoint = function() {
  centerpoint = attractPoints[Math.floor(attractPoints.length*Math.random())];
    angle = random(0, 2*Math.PI);
    dist = .002*Math.pow(Math.random(),Spread);
    return [centerpoint[0] + Math.cos(angle)*dist, centerpoint[1] + Math.sin(angle)*dist];

  }