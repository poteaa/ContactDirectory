import { TestBed, inject } from '@angular/core/testing';

import { IdentificationSystemService } from './identification-system.service';

describe('IdentificationSystemService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IdentificationSystemService]
    });
  });

  it('should be created', inject([IdentificationSystemService], (service: IdentificationSystemService) => {
    expect(service).toBeTruthy();
  }));
});
