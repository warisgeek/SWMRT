import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-geo-map',
  templateUrl: './geo-map.component.html',
  styleUrls: ['./geo-map.component.scss']
})
export class GeoMapComponent implements OnInit {
  locmap: google.maps.Map;
  myOptions;
  geocoder;
  constructor() { }

  ngOnInit(): void {
    this.myOptions = {
      zoom: 12,
      center: new google.maps.LatLng(0, 0),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.locmap = new google.maps.Map(document.getElementById('map'), this.myOptions);
    this.geocoder = new google.maps.Geocoder();
    this.setMapCenter();
  }

  setMapCenter() {
    const location = 'Bangalore';
    this.geocoder.geocode({ address: location }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        this.locmap.setCenter(results[0].geometry.location);
        const marker = new google.maps.Marker({ position: results[0].geometry.location });
        marker.setMap(this.locmap);
        const data = [{ lat: 12.915477, lng: 77.600858 }, { lat: 12.915259, lng: 77.614755 }, { lat: 12.905387, lng: 77.612178 },
        { lat: 12.906726, lng: 77.602043 }];
        const poly1 = new google.maps.Polygon({
          paths: data,
          strokeColor: 'blue',
          strokeOpacity: 0.50,
          strokeWeight: 1,
          fillColor: 'blue',
          fillOpacity: 0.50
        });
        poly1.setMap(this.locmap);
        const data1 = [{ lat: 12.915744, lng: 77.599140 }, { lat: 12.916280, lng: 77.575310 }, { lat: 12.907361, lng: 77.574588 },
        { lat: 12.907696, lng: 77.598551 }];
        const poly2 = new google.maps.Polygon({
          paths: data1,
          strokeColor: 'red',
          strokeOpacity: 0.50,
          strokeWeight: 1,
          fillColor: 'red',
          fillOpacity: 0.50
        });
        poly2.setMap(this.locmap);
      } else {
        alert('Could not find location: ' + location);
      }
    });
  }
}
