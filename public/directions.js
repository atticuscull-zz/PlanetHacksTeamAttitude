function calcRoute(thisLocation) {
    currentCenter = map.getCenter();
    var HSquares = 10;
    var VSquares = 5;
    var distance = distancesPerZoom[currentZoom] / 1000;
    var latrange = [currentCenter.lat() - .011 * distance, currentCenter.lat() + .011 * distance];
    var lngrange = [currentCenter.lng() - .021 * distance, currentCenter.lng() + .021 * distance];
    var currheight = latrange[1] - latrange[0];
    var currwidth = lngrange[1] - lngrange[0];

    var newpoints = [];
    for (var i = 0; i < VSquares*HSquares; i++) {
        newpoints.push(0);
    }
    for (var i = 0; i < datapoints.length; i++) {
        var gridsquare = [Math.floor((datapoints[i].location.lat() - latrange[0])/ (currheight/VSquares)), Math.floor((datapoints[i].location.lng() - lngrange[0])/ (currwidth/HSquares))];
        if (gridsquare[0] > -1 && gridsquare[0] < VSquares && gridsquare[1] > -1 && gridsquare[1] < HSquares) {
            newpoints[gridsquare[0] + VSquares * gridsquare[1]] += 1;
        }

    }

    var minindex = 0;
    var mindistance = 0;
    var indexToLocation = function(i) {
        return [latrange[0] + (i % VSquares + .5) * (currheight / VSquares), lngrange[0] + (Math.floor(i / HSquares) + .5) * (currwidth / HSquares)];
    }
    for (var i = 0; i < VSquares*HSquares; i++) {
        var thisPoint = indexToLocation(i);
        var distanceToMe = Math.sqrt(Math.pow(thisPoint[0] - thisLocation.lat, 2) + Math.pow(thisPoint[1] - thisLocation.lng, 2))
        //if ((newpoints[i] < newpoints[minindex]) || (newpoints[i] == newpoints[minindex] && distanceToMe > mindistance) ) {
        if ((newpoints[i] < newpoints[minindex])) {
            minindex = i;
            mindistance = distanceToMe;
        }
    }
    var destination = {
        lat: latrange[0] + (minindex % VSquares + .5) * (currheight / VSquares),
        lng: lngrange[0] + (Math.floor(minindex / HSquares) + .5) * (currwidth / HSquares)
    };
    var request = {
        origin: thisLocation,
        destination: destination,
        travelMode: 'DRIVING'
    };
    directionsService.route(request, function (result, status) {
        if (status == 'OK') {
            directionsRenderer.setDirections(result);
        }
    });
}