import { Component, OnInit, OnDestroy } from '@angular/core';

import Map from 'ol/Map';
import View from 'ol/View';
import OSM from 'ol/source/OSM';
import * as olProj from 'ol/proj';
import TileLayer from 'ol/layer/Tile';

import { CountryService } from 'src/app/shared/country.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-osm-view',
  templateUrl: './osm-view.component.html',
  styleUrls: ['./osm-view.component.css'],
})
export class OsmViewComponent implements OnInit, OnDestroy {
  map: any;
  centeredCountry: string;
  coordinatesSubscription: Subscription;

  longtitude: number;
  latitude: number;

  constructor(private countryService: CountryService) {}

  ngOnInit() {
    this.centeredCountry = this.countryService.selectedCountry.name;

    this.coordinatesSubscription = this.countryService.coordinatesSubject.subscribe(
      (data) => {
        this.longtitude = data.longtitude;
        this.latitude = data.latitude;
      },
      (err) => console.log(err)
    );

    this.countryService.getLonLatForCapital(this.centeredCountry);

    setTimeout(() => {
      this.map = new Map({
        target: 'map',
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
        ],
        view: new View({
          center: olProj.fromLonLat([this.longtitude, this.latitude]),
          zoom: 5,
        }),
      });
    }, 1000)    // Fix this so setTimeout isn't necessary for this.longtitude, this.latitude to be defined.

  }

  ngOnDestroy() {
    this.coordinatesSubscription.unsubscribe();
  }

}
