export interface Currency {
  code: string;
  name: string;
  symbol: string;
}

export interface Language {
  name: string;
  nativeName: string;
}

export interface Country {
  name: string;
  capital: string;
  population: number;
  region: string;
  nativeName: string;
  flag: string;
  currencies: Currency[];
  languages: Language[];
  borders: string[];
  alpha2Code: string; // Israel - 'IL'
  alpha3Code: string; // Israel - 'ISR'
}
