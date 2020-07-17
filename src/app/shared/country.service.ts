import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Country } from './country.model';
import * as emojiFlag from 'emoji-flags';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountryService implements OnInit {
  coordinatesSubject = new Subject<any>();
  selectedCountry: Country;
  countryURL: string =
    'https://restcountries.eu/rest/v2/all?fields=name;population;capital;region;currencies;languages;nativeName;flag;borders;alpha3Code;alpha2Code';
  latLonAPIToken = '.json?access_token=pk.eyJ1Ijoib2ZpcjU1NTEiLCJhIjoiY2s2M29lcWEzMDk0aDNmcGJrMmtoaGc3YSJ9.UmjEMYvkM3C-U2vZ4PQAPQ&limit=1';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  fetchCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(this.countryURL);
  }

  // This request gets the capital name as a parameter, sends a request to an API that converts it
  // to Latitude and Longtitude
  getLatLonForCapital(capitalName: string) {
    this.http
      .get<any>(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          capitalName
        )}${this.latLonAPIToken}`
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

  setSelectedCountry(countryName: string, countryList: Country[]) {
    let selectedCountry = countryList.find(
      (country) => countryName === country.name
    );

    // This part converts the selectedCountry.borders array from Alpha3Code text to 'country name - emoji'
    this.manipulateBorders(selectedCountry, countryList);

    return selectedCountry;
  }

  private manipulateBorders(selectedCountry, countryList: Country[]) {
    selectedCountry.borders.forEach((borderAlpha3Code, i) => {
      const border = countryList.find(
        (country) => country.alpha3Code === borderAlpha3Code
      );

      selectedCountry.borders[i] = `${border.name} - ${emojiFlag.countryCode(border.alpha2Code).emoji}`;
    });
  }
}
