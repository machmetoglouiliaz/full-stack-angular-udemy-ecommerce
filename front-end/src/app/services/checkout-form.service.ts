import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Country } from '../common/country';
import { map } from 'rxjs/operators';
import { State } from '../common/state';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CheckoutFormService {

  private endPoint = environment.demoAngularEcommerceUrl;
  private countriesUrl: string = this.endPoint + '/countries';
  private statesUrl: string = this.endPoint + '/states';

  constructor(private httpClient: HttpClient) { }


  getCountries(): Observable<Country[]> {

    return this.httpClient.get<GetResponseCountries>(this.countriesUrl).pipe(
      map(response => response._embedded.countries)
    );
  }


  getStates(countryCode: string): Observable<State[]> {

    const searchStateUrl: string = `${this.statesUrl}/search/findByCountryCode?code=${countryCode}`;

    console.log(`CHECKOUT SERVICE: COUNTRY: ${countryCode}`);
    console.log(`CHECKOUT SERVICE: URL: ${searchStateUrl}`);

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
