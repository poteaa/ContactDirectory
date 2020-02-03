import { TestBed, inject } from '@angular/core/testing';

import { JudicialSystemService } from './judicial-system.service';

describe('JudicialSystemService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JudicialSystemService]
    });
  });

  it('should be created', inject([JudicialSystemService], (service: JudicialSystemService) => {
    expect(service).toBeTruthy();
  }));
});
