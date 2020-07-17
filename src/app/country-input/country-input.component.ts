import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Country } from '../shared/country.model';

@Component({
  selector: 'app-country-input',
  templateUrl: './country-input.component.html',
  styleUrls: ['./country-input.component.css'],
})
export class CountryInputComponent implements OnInit {
  @Input() countryList: Country[];
  @Output() countrySelected = new EventEmitter<Country>();

  constructor() {}

  ngOnInit(): void {}

  onSelectCountry(name) {
    this.countrySelected.emit(name);
  }
}
