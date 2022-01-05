document.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log("Your-Road JS imported successfully!");
  },
  false
);

var map;
var service;
var infowindow;

function initMap() {
  var sydney = new google.maps.LatLng(40.41905307386877, -3.7042642407523307);

  infowindow = new google.maps.InfoWindow();

  map = new google.maps.Map(
      document.getElementById('map'), {center: sydney, zoom: 15});

  var request = {
    query: 'Museum of Contemporary Art Australia',
    fields: ['name', 'geometry'],
  };

  var service = new google.maps.places.PlacesService(map);

  service.findPlaceFromQuery(request, function(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        createMarker(results[i]);
      }
      map.setCenter(results[0].geometry.location);
    }
  });
}