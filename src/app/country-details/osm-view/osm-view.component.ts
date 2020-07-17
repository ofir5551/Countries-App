import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';

import Map from 'ol/Map';
import View from 'ol/View';
import OSM from 'ol/source/OSM';
import * as olProj from 'ol/proj';
import TileLayer from 'ol/layer/Tile';

import { CountryService } from 'src/app/shared/country.service';

@Component({
  selector: 'app-osm-view',
  templateUrl: './osm-view.component.html',
  styleUrls: ['./osm-view.component.css'],
})
export class OsmViewComponent implements OnInit, OnDestroy {
  map: any;
  @Input() centeredCapital: string;
  coordinatesSubscription: Subscription;

  longtitude: number;
  latitude: number;

  constructor(private countryService: CountryService) {}

  ngOnInit() {
    this.coordinatesSubscription = this.countryService
      .getLatLonForCapital(this.centeredCapital)
      .subscribe((data) => {
        this.latitude = data.features[0].center[1];
        this.longtitude = data.features[0].center[0];
      });

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
          zoom: 7,
        }),
      });
    }, 1000); // TODO - Fix this so setTimeout isn't needed for this.longtitude, this.latitude to be defined.
  }

  ngOnDestroy() {
    this.coordinatesSubscription.unsubscribe();
  }
}
