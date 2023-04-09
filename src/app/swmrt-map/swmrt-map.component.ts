import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import * as firebase from 'firebase';
import { SwmrtMapService } from './swmrt-map.service';
import { Subject } from 'rxjs';
import { map, tap, takeUntil } from 'rxjs/operators';
import { LoaderService } from '../shared/services/loader.service';
@Component({
  selector: 'app-swmrt-map',
  templateUrl: './swmrt-map.component.html',
  styleUrls: ['./swmrt-map.component.scss']
})
export class SwmrtMapComponent implements OnInit, OnDestroy {
  locmap: google.maps.Map;
  geocoder;
  infowindow;
  markersArray = [];
  myOptions;
  delay = 100;
  bounds;
  latitude: number;
  private ngUnsubscribe: Subject<void> = new Subject();
  longitude: number;
  constructor(
    private swmrtMapService: SwmrtMapService,
    private loader: LoaderService) { }

  ngOnInit(): void {
    this.myOptions = {
      zoom: 12,
      center: new google.maps.LatLng(0, 0),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.locmap = new google.maps.Map(document.getElementById('map'), this.myOptions);
    this.geocoder = new google.maps.Geocoder();
    this.bounds = new google.maps.LatLngBounds();
    this.setMapCenter();
    this.loader.show();
    this.swmrtMapService.getSwmrtMap().pipe(takeUntil(this.ngUnsubscribe)).subscribe((result: any) => {
      // const sze = Object.keys(result).length;
      for (const a in result) {
        if (a) {
          this.createMarker(result[a]);
        }
      }
      this.loader.hide();
    });
  }
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  setMapCenter() {
    const location = 'Bangalore';
    this.geocoder.geocode({ address: location }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        this.locmap.setCenter(results[0].geometry.location);
      } else {
        alert('Could not find location: ' + location);
      }
    });
  }
  createMarker(element) {
    if (element.hasOwnProperty('lat') && element.hasOwnProperty('lang')) {
      let url = '../../assets/images/home.png';
      let size = new google.maps.Size(18, 18);
      if (element.apartmentcommunitylanehouseholdunit !== undefined && element.apartmentcommunitylanehouseholdunit !== null && element.apartmentcommunitylanehouseholdunit !== '' && element.apartmentcommunitylanehouseholdunit !== '1') {
        url = '../../assets/images/apt.png';
        size = new google.maps.Size(35, 35);
      }
      if (element.doyoucompostAns !== undefined && element.doyoucompostAns !== null && element.doyoucompostAns !== '' && element.doyoucompostAns.findIndex(x => x.text === 'In my office/ school /temple /organization') > -1) {
        url = '../../assets/images/sto.png';
        size = new google.maps.Size(30, 30);
      }
      const icon = {
        url,
        scaledSize: size, // scaled size
        origin: new google.maps.Point(0, 0), // origin
        anchor: new google.maps.Point(0, 0) // anchor
      };
      const marker = new google.maps.Marker({
        map: this.locmap,
        title: element.apartment === '' ? element.name : element.apartment,
        position: new google.maps.LatLng(element.lat, element.lang),
        icon
      });
      this.markersArray.push(marker);
      google.maps.event.addListener(marker, 'click', () => {
        if (this.infowindow) {
          this.infowindow.close();
        }
        this.infowindow = new google.maps.InfoWindow({
          content: `<label style="font-weight:bold">${element.name}</label>
                  <div class="address"> <div class="address-line full-width" >${ element.houseno} ${element.street}</div>
                  <div class="address-line full-width" >${element.area} ${element.pincode}</div>`,
        });
        this.infowindow.open(this.locmap, marker);
      });
      // this.bounds.extend(marker.getPosition);
    }
  }
  clearOverlays(obj) {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.markersArray.length; i++) {
      if (obj.lat === this.markersArray[i].position.lat() && obj.lang === this.markersArray[i].position.lng()) {
        this.markersArray[i].setMap(null);
      }
    }
  }
  setZoom(zoom) {
    this.locmap.setZoom(zoom);
  }
}
