import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Country } from './country.model';

@Injectable({
  providedIn: 'root',
})
export class CountryService implements OnInit {
  countryList: Country[] = [];
  selectedCountry: Country;
  url: string =
    'https://restcountries.eu/rest/v2/all?fields=name;population;capital;region;currencies;languages;nativeName;flag';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  fetchCountries() {
    this.http.get<Country[]>(this.url).subscribe(
      (res) => {
        this.countryList = res;
      },
      (err) => console.log(err)
    );
  }

  getCountryByName(name) {
    this.selectedCountry = this.countryList.find((country) => country.name == name);
  }
}
