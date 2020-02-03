import { TestBed, inject } from '@angular/core/testing';

import { HttpBackendService } from './http-backend.service';

describe('HttpBackendService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpBackendService]
    });
  });

  it('should be created', inject([HttpBackendService], (service: HttpBackendService) => {
    expect(service).toBeTruthy();
  }));
});
