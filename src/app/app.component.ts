import { Component, OnInit } from '@angular/core';
import { CountryService } from './shared/country.service';
import { Country } from './shared/country.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  countryList: Country[];
  selectedCountry: Country;

  title = 'Countries-App';

  constructor(private countryService: CountryService) {}

  ngOnInit() {
    this.countryService
      .fetchCountries()
      .subscribe((res) => (this.countryList = res));
  }

  countrySelected(countryName) {
    this.selectedCountry = this.countryService.setSelectedCountry(
      countryName,
      this.countryList
    );
  }
}
