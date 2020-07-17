import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { CountryService } from '../shared/country.service';
import { Country } from '../shared/country.model';

@Component({
  selector: 'app-country-input',
  templateUrl: './country-input.component.html',
  styleUrls: ['./country-input.component.css'],
})
export class CountryInputComponent implements OnInit {
  public selectedCountry: Country;
  @Input() countryList: Country[];

  @Output() countrySelected = new EventEmitter<Country>();

  constructor(private countryService: CountryService) {}

  ngOnInit(): void {}

  onSelectCountry(name) {
    // this.countryService.setSelectedCountry(name)

    this.countrySelected.emit(name);
  }
}
