import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Country } from '../common/country';
import { map } from 'rxjs/operators';
import { State } from '../common/state';

@Injectable({
  providedIn: 'root'
})
export class CheckoutFormService {

  private countriesUrl: string = 'http://localhost:8080/api/countries';
  private statesUrl: string = 'http://localhost:8080/api/states';

  constructor(private httpClient: HttpClient) { }


  getCountries(): Observable<Country[]> {

    return this.httpClient.get<GetResponseCountries>(this.countriesUrl).pipe(
      map(response => response._embedded.countries)
    );
  }


  getStates(countryCode: string): Observable<State[]> {

    const searchStateUrl: string = `${this.statesUrl}/search/findByCountryCode?${countryCode}`;

    return this.httpClient.get<GetResponseStates>(searchStateUrl).pipe(
      map(response => response._embedded.states)
    );
  }


  getCreditCardMonths(startMonth: number): Observable<number[]> {

    
    let data: number[] = [];

    for (let month = startMonth; month <= 12; month++) {
      data.push(month);
    }

    return of(data);
  }


  getCreditCardYears(): Observable<number[]> {

    let data: number[] = [];

    const startYear: number = new Date().getFullYear();
    const endYear: number = startYear + 10;

    for (let year = startYear; year <= endYear; year++) {
      data.push(year);
    }

    return of(data);
  }

}


interface GetResponseCountries {
  _embedded: {
    countries: Country[];
  }
}


interface GetResponseStates {
  _embedded: {
    states: State[];
  }
}
