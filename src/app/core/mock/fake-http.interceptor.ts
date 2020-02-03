import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable, Observer } from 'rxjs';
import { IdentificationSystemUser } from 'src/app/shared/models/identification-system-user';
import { IdentificationSystemUsersMock, JudicialProblemUsers, RegisteredUsers } from './all-mocks';

@Injectable()
export class FakeHttpBackendInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return Observable.create((observer: Observer<any>) => {
      switch (request.method) {
        case 'GET':
          if (request.url.endsWith('/mocklocalhost/api/users')) {
            setTimeout(() => {
              observer.next(new HttpResponse({ status: 200, body: RegisteredUsers }));
            }, 500);
            setTimeout(() => {
              observer.complete();
            }, 600);
          } else if (request.url.match(/\/mocklocalhost\/api\/users\/\d+\/score$/)) {
            const score = Math.random()*100;
            setTimeout(() => {
              observer.next(new HttpResponse({ status: 200, body: score }));
            }, 500);
            setTimeout(() => {
              observer.complete();
            }, 600);
          } else if (request.url.match(/\/mockidentification\/api\/users\/\d+$/)) {
            const urlParts = request.url.split('/');
            const id = urlParts[urlParts.length - 1];
            const model = IdentificationSystemUsersMock.find(m => m.identificationNumber === id);
            setTimeout(() => {
              if (model) {
                observer.next(new HttpResponse({ status: 200, body: model }));
              } else {
                observer.error(new HttpResponse({ status: 404 }));
              }
            }, 500);
            setTimeout(() => {
              observer.complete();
            }, 600);
          } else if (request.url.match(/\/mockjudicial\/api\/users\/\d+$/)) {
            const urlParts = request.url.split('/');
            const id = urlParts[urlParts.length - 1];
            const model = JudicialProblemUsers.find(m => m.identificationNumber === id);
            setTimeout(() => {
              observer.next(new HttpResponse({ status: 200, body: model }));
            }, 500);
            setTimeout(() => {
              observer.complete();
            }, 600);
          }  else {
            return next.handle(request);
          }
          break;
        case 'POST':
          if (request.url.endsWith('/mocklocalhost/api/users')) {
            const body = JSON.parse(request.body);
            RegisteredUsers.push(body);
            setTimeout(() => {
              observer.next(new HttpResponse({ status: 200, body: body }));
            }, 500);
            setTimeout(() => {
              observer.complete();
            }, 600);
          }
          break;
        default: break;
      }
    });
  }
}

export let fakeHttpBackendProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: FakeHttpBackendInterceptor,
  multi: true
};
