import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Country } from './country.model';
import * as emojiFlag from 'emoji-flags';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountryService implements OnInit {
  coordinatesSubject = new Subject<any>();
  countryList: Country[] = [];
  selectedCountry: Country;
  countryURL: string =
    'https://restcountries.eu/rest/v2/all?fields=name;population;capital;region;currencies;languages;nativeName;flag;borders;alpha3Code;alpha2Code';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  fetchCountries() {
    this.http.get<Country[]>(this.countryURL).subscribe(
      (res) => (this.countryList = res),
      (err) => console.log(err)
    );
  }

  // This request gets the capital name as a parameter, sends a request to an API that converts it
  // to Latitude and Longtitude
  getLonLatForCapital(capitalName: string) {
    this.http
      .get<any>(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          capitalName
        )}.json?access_token=pk.eyJ1Ijoib2ZpcjU1NTEiLCJhIjoiY2s2M29lcWEzMDk0aDNmcGJrMmtoaGc3YSJ9.UmjEMYvkM3C-U2vZ4PQAPQ&limit=1`
      )
      .subscribe(
        (res) => {
          const latitude = res.features[0].center[1];
          const longtitude = res.features[0].center[0];

          this.coordinatesSubject.next({ latitude, longtitude });
        },
        (err) => console.log(err)
      );
  }

  setSelectedCountry(name) {
    this.selectedCountry = this.countryList.find(
      (country) => country.name === name
    );

    // This part converts the selectedCountry.borders array from Alpha3Code text to 'country name - emoji'
    this.selectedCountry.borders.forEach((borderAlpha3Code, i) => {
      const border = this.countryList.find(
        (country) => country.alpha3Code === borderAlpha3Code
      );
      this.selectedCountry.borders[i] = `${border.name} - ${
        emojiFlag.countryCode(border.alpha2Code).emoji
      }`;
    });
  }
}
