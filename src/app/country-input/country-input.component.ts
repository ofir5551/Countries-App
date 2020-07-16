import { Component, OnInit } from '@angular/core';

import { CountryService } from '../shared/country.service';
import { Country } from '../shared/country.model';

@Component({
  selector: 'app-country-input',
  templateUrl: './country-input.component.html',
  styleUrls: ['./country-input.component.css'],
})
export class CountryInputComponent implements OnInit {
  public selectedCountry: Country;

  constructor(private countryService: CountryService) {}

  ngOnInit(): void {
    this.countryService.fetchCountries();
  }

  public get countryList() {
    return this.countryService.countryList;
  }

  onSelectCountry(name) {
    this.countryService.setSelectedCountry(name)
  }
}
