import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { CountryService } from '../shared/country.service';

@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.css'],
})
export class CountryDetailsComponent implements OnInit {
  @ViewChild('map') myMap: ElementRef;
  @ViewChild('toggleMapBtn') toggleMapBtn: ElementRef;
  showMap: boolean = false;

  constructor(private countryService: CountryService) {}

  ngOnInit(): void {}

  public get selectedCountry() {
    return this.countryService.selectedCountry;
  }

  onToggleMap() {
    setTimeout( // TODO - Figure out how to get rid of setTimeout without breaking the scrolling
      () => this.myMap.nativeElement.scrollIntoView({ behavior: 'smooth' }),
      0
    );

    this.showMap = !this.showMap;
    this.toggleMapBtn.nativeElement.innerHTML = this.showMap
      ? 'Close map'
      : 'Open map';
  }
}
