import { Component, OnInit } from '@angular/core';
import { Country } from '../shared/country.model';
import { CountryService } from '../shared/country.service';

@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.css'],
})
export class CountryDetailsComponent implements OnInit {
  constructor(private countryService: CountryService) {}

  ngOnInit(): void {}

  public get selectedCountry() {
    return this.countryService.selectedCountry;
  }
}
