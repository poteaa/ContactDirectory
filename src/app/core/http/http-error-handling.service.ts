import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlingService {

  constructor(private router: Router) { }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Client error
      console.log('Client error.');
      console.error(error);
    } else {
      // Server error
      console.log('Server error.');
      switch (error.status) {
        case 401: // Unauthorized
        case 403:
          // TODO: action to implement when the token has expired
          // this.router.navigate(['login']);
          break;
      }
    }
    return throwError(error);
  }
}
