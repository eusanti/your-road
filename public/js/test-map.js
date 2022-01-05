// function initMap() {
//   const map = new google.maps.Map(document.querySelector("#map"), {
//     zoom: 16,
//     center: {lat: 40.392499, lng: -3.698214},
//   });
//   navigator.geolocation.getCurrentPosition(
//     (positionObj) => centerMap(positionObj, map),
//     (error) => console.log("FRACASO! Esto es lo que ha pasado", error)
//   );
//   getPlaces(map);
// }
// function centerMap(positionObj, map) {
//   const position = {lat: positionObj.coords.latitude, lng: positionObj.coords.longitude};
//   map.setCenter(position);
// }
// function getPlaces(map) {
//   axios
//     .get("/places/api")
//     .then((response) => {
//       placePlaces(response.data.places, map);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// }
// function placePlaces(places, map) {
//   let markers = [];
//   places.forEach((place) => {
//     const center = {
//       lng: place.location.coordinates[1],
//       lat: place.location.coordinates[0],
//     };
//     console.log(center);
//     const pin = new google.maps.Marker({
//       position: center,
//       map: map,
//       title: place.name,
//     });
//     console.log(pin);
//     markers.push(pin);
//   });
//   return markers;
// }
