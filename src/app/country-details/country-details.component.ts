import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { CountryService } from '../shared/country.service';

@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.css'],
})
export class CountryDetailsComponent implements OnInit {
  @ViewChild('toggleMapBtn') toggleMapBtn: ElementRef;
  mapShowing: boolean = false;

  constructor(private countryService: CountryService) {}

  ngOnInit(): void {}

  public get selectedCountry() {
    return this.countryService.selectedCountry;
  }

  onToggleMap() {
    this.mapShowing = !this.mapShowing;
    this.toggleMapBtn.nativeElement.innerHTML = this.mapShowing
      ? 'Close map'
      : 'Show in map';
  }

}
