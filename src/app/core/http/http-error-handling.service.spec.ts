import { TestBed, inject } from '@angular/core/testing';

import { HttpErrorHandlingService } from './http-error-handling.service';

describe('ErrorHandlingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpErrorHandlingService]
    });
  });

  it('should be created', inject([HttpErrorHandlingService], (service: HttpErrorHandlingService) => {
    expect(service).toBeTruthy();
  }));
});
