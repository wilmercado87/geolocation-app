import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { CONSTANT } from '../constants/constant';
import { GeolocationInfo } from '../models/geolocation-info';


@Injectable({
  providedIn: 'root'
})
export class GeolocationMapService {

  constructor(private http: HttpClient) { }
 
  getIpAddress() : Observable<any> {
    return this.http
          .get<any>(CONSTANT.API_URL_IP_CURRENT)
          .pipe(
            catchError(this.handleError<any>('error getIpAddress'))
          );
  } 

   getGEOLocation(ip: string) : Observable<GeolocationInfo> {
  let url = CONSTANT.API_URL_IP_GEOLOCATION + '?apiKey=' + CONSTANT.API_KEY + '&ip=' +ip; 
    return this.http
          .get<GeolocationInfo>(url)
          .pipe(
            catchError(this.handleError<GeolocationInfo>('error getGEOLocation'))
          );
  } 

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
