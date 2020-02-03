import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { catchError, map } from 'rxjs/operators';
import { HttpErrorHandlingService } from '../http-error-handling.service';

@Injectable({
  providedIn: 'root'
})
export class IdentificationSystemService {

  serviceUrl = environment.identificationServiceUrl;

  constructor(private httpClient: HttpClient, private httpErrorHandling: HttpErrorHandlingService) {
  }

    /**
   * Creates a generic get request. T: responseType
   * @param url: url without the base url
   * @returns: an observable for the request
   */
  get<T>(url: string) {
    return this.httpClient
      .get<T>(`${this.serviceUrl}${url}`)
      .pipe(map(u => {
        console.log('User from identification server: ', u)
        return u;
      }), catchError((err: HttpErrorResponse) => this.httpErrorHandling.handleError(err)));
  }
}
