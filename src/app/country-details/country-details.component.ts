import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';

import { Country } from '../shared/country.model';

@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.css'],
})
export class CountryDetailsComponent implements OnInit {
  @ViewChild('map') myMap: ElementRef;
  @ViewChild('toggleMapBtn') toggleMapBtn: ElementRef;
  showMap: boolean = false;
  @Input() selectedCountry: Country;

  constructor() {}

  ngOnInit(): void {}

  onToggleMap() {
    setTimeout(
      // TODO - Figure out how to get rid of setTimeout without breaking the scrolling
      () => this.myMap.nativeElement.scrollIntoView({ behavior: 'smooth' }),
      0
    );

    this.showMap = !this.showMap;
  }
}
