getLocation();
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}
function showPosition(position) {
  var latlon = {
    lat: position.coords.latitude,
    lng: position.coords.longitude
  };
  var locations;
  console.log(latlon);
  map.setCenter(latlon);
  $.ajax({
    url: "/rest/location",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(latlon),
    success: function() {
      console.log("saved location");
      console.log(JSON.stringify(latlon));
    }
  });
  //simulatePoints(300);
  //makeHeatMap();
  $.get("/rest/locations").done(function(_locations) {
    locations = _locations;
    console.log(locations);
  });
  return latlon;
}
