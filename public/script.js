
getLocation = function() {
  console.log("bruhbruhbruh")
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}


showPosition = function(position) {
  var currentTime = new Date();

  if(cookieId == ""){
    setCookie("id", create_UUID());
  }
  var latlon = {
    lat: position.coords.latitude,
    lng: position.coords.longitude
  };

  var userData = {
    id: cookieId,
    lat: position.coords.latitude,
    lng: position.coords.longitude,
    time: currentTime.getTime()
  }
  console.log(userData);
  map.setCenter(latlon);
  $.ajax({
    url: "/rest/location",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(userData),
    success: function() {
      console.log("saved location");
      console.log(JSON.stringify(userData));
     }
  });
  myLocation = latlon;
  //console.log(myLocation, latlon);
  myLocationMarker = new google.maps.Marker({map: map, position: latlon, title: 'You'});
  return latlon;
}
getLocation();