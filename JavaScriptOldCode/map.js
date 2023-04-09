var map;
var geocoder;
var infowindow;
var markersArray = [];
var myOptions;
var delay = 100;
var bounds;

/*
  Google Maps - Basic Map Types
  ROADMAP (normal, default 2D map)
  SATELLITE (photographic map)
  HYBRID (photographic map + roads and city names)
  TERRAIN (map with mountains, rivers, etc.)
  */
function initMap() {

    myOptions = {
        zoom: 12,
        center: new google.maps.LatLng(0, 0),// Map center
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById('map'), myOptions);
    geocoder = new google.maps.Geocoder();
    bounds = new google.maps.LatLngBounds();

    getAddress();
    getZoom();
    setMapCenter();
}
function setZoom(zoom) {
    map.setZoom(zoom);
}
function setMapCenter() {
    var location = "Bangalore";
    geocoder.geocode({ 'address': location }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            map.setCenter(results[0].geometry.location);
        } else {
            alert("Could not find location: " + location);
        }
    });
}
/*
You can check about geocode
https://developers.google.com/maps/documentation/geocoding/start
address format for more accurate result: House Number, Street Direction, Street Name, Street Suffix, City, State, Zip, Country
*/

function setMarketByAddress() {
    firebase.ref('addresslist').on('child_added', function (address) {
        var obj = { id: address.key, street: address.val().street, pincode: address.val().pincode, area: address.val().area, houseno: address.val().houseno, apartment: address.val().apartment, email: address.val().email, name: address.val().name, country: address.val().country, city: address.val().city, lat: address.val().lat, lang: address.val().lang }
        createMarker(obj)
    });
    firebase.ref('addresslist').on('child_removed', function (address) {
        clearOverlays({ lat: address.val().lat, lang: address.val().lang });
    });
    firebase.ref('addresslist').on('child_changed', function (address) {
        clearOverlays({ lat: address.val().lat, lang: address.val().lang });
        var obj = { id: address.key, street: address.val().street, pincode: address.val().pincode, area: address.val().area, houseno: address.val().houseno, apartment: address.val().apartment, email: address.val().email, name: address.val().name, country: address.val().country, city: address.val().city, lat: address.val().lat, lang: address.val().lang }
        createMarker(obj)
    });
    //  setTimeout(() => {
    //     map.fitBounds(bounds);
    //  }, 2000);
}

// ======= Function to create a marker
function createMarker(element) {
    var icon = {
        url: "icon1.png", // url
        scaledSize: new google.maps.Size(25, 25), // scaled size
        origin: new google.maps.Point(0,0), // origin
        anchor: new google.maps.Point(0, 0) // anchor
    };
    var marker = new google.maps.Marker({
        map: map,
        animation: google.maps.Animation.DROP,
        title: element.apartment == '' ? element.name : element.apartment,
        position: new google.maps.LatLng(element.lat, element.lang),
        icon:icon
    });
    markersArray.push(marker)
    google.maps.event.addListener(marker, 'click', function () {
        if (infowindow) {
            infowindow.close();
        }
        infowindow = new google.maps.InfoWindow({
            content: `<label style="font-weight:bold">${element.name}</label> 
            <div class="address"> <div class="address-line full-width" >${ element.houseno} ${element.street}</div>
            <div class="address-line full-width" >${element.area} ${element.pincode}</div>`,
        });
        infowindow.open(map, marker);
    });
    bounds.extend(marker.position);
}
function clearOverlays(obj) {
    for (var i = 0; i < markersArray.length; i++) {
        if (obj.lat == markersArray[i].position.lat() && obj.lang == markersArray[i].position.lng()) {
            markersArray[i].setMap(null);
        }

    }
}