function initMap() {
    let map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 43.8525872, lng: -12.8611109},
      zoom: 12
    });
    let input = document.getElementById('searchInput');

    let autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo('bounds', map);

    let infowindow = new google.maps.InfoWindow();
    let marker = new google.maps.Marker({
        map: map,
        anchorPoint: new google.maps.Point(0, -29)
    });


    const geocoder = new google.maps.Geocoder()

    function codeAddress() {

    const mapTest = document.getElementById('map')
    console.log(mapTest)
    const destination = mapTest.className
    const points = mapTest.dataset.points.split('/')
    points.pop()

    geocoder.geocode( { 'address': destination}, function(results, status) {
        if (status == 'OK') {
            
            map.setCenter(results[0].geometry.location);
            let marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location,
                title: "Centro"
            });
            
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });

    points.forEach(point => {
        
        setTimeout(() => {
            
            
                    const contentString =`<div id="content">${point}</div>`;
            
                     const infowindow = new google.maps.InfoWindow({
                        content: contentString,
                      });
            
                      console.log(point)
            
                    geocoder.geocode( { 'address': point}, function(results, status) {
                    if (status == 'OK') {
                    console.log(results[0])
            
                        map.setCenter(results[0].geometry.location);
                        let marker = new google.maps.Marker({
                            map: map,
                            position: results[0].geometry.location,
                            title: results[0].formatted_address
                    });
            
                      marker.addListener("click", () => {
                        infowindow.open({
                            anchor: marker,
                            map,
                            shouldFocus: false,
                        });
                    })
                    
                  } else {
                    alert('Geocode was not successful for the following reasona: ' + status);
                  }
                });
        }, 300);
    })
  }

  google.maps.event.addListenerOnce(map, 'idle', function(){
   codeAddress()
});


    autocomplete.addListener('place_changed', function() {
        infowindow.close();
        marker.setVisible(false);
        let place = autocomplete.getPlace();
        if (!place.geometry) {
            window.alert("Autocomplete's returned place contains no geometry");
            return;
        }
  
        // If the place has a geometry, then present it on a map.
        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);
        }
        marker.setIcon(({
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(35, 35)
        }));
        marker.setPosition(place.geometry.location);
        marker.setVisible(true);
    
        let address = '';
        if (place.address_components) {
            address = [
              (place.address_components[0] && place.address_components[0].short_name || ''),
              (place.address_components[1] && place.address_components[1].short_name || ''),
              (place.address_components[2] && place.address_components[2].short_name || '')
            ].join(' ');
        }
    
        infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
        infowindow.open(map, marker);
      
        // Location details
        for (let i = 0; i < place.address_components.length; i++) {
            if(place.address_components[i].types[0] == 'postal_code'){
                document.getElementById('postal_code').innerHTML = place.address_components[i].long_name;
            }
            if(place.address_components[i].types[0] == 'country'){
                document.getElementById('country').innerHTML = place.address_components[i].long_name;
            }
        }
        document.getElementById('location').innerHTML = place.formatted_address;
        document.getElementById('lat').innerHTML = place.geometry.location.lat();
        document.getElementById('lon').innerHTML = place.geometry.location.lng();
    });
}