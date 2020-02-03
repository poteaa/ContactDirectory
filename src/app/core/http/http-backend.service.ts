import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError, map } from 'rxjs/operators';
import { HttpErrorHandlingService } from './http-error-handling.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpBackendService {

  serviceUrl = environment.backendUrl;

  constructor(private httpClient: HttpClient, private httpErrorHandling: HttpErrorHandlingService) { }

  /**
   * Creates a generic get request. T: responseType
   * @param url: url without the base url
   * @returns: an observable for the request
   */
  get<T>(url: string): Observable<T>  {
    return this.httpClient
      .get<T>(`${this.serviceUrl}${url}`)
      .pipe(map(s => {
        console.log('Score: ', s)
        return s;
      }), catchError((err: HttpErrorResponse) => this.httpErrorHandling.handleError(err)));
  }

  /**
   * Creates a generic post request. T: responseType, U: requestType
   * @param url: url without the base url
   * @returns: an observable for the request
   */
  post<T, U>(url: string, payload: U): Observable<T> {
    const body = JSON.stringify(payload);
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient
      .post<T>(`${this.serviceUrl}${url}`, body, {
        headers: headers
      })
      .pipe(catchError((err: HttpErrorResponse) => this.httpErrorHandling.handleError(err)));
  }
}
