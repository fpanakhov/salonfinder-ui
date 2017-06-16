import { TestBed, inject } from '@angular/core/testing';

import { SalonsService } from './salons.service';

describe('SalonsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SalonsService]
    });
  });

  it('should be created', inject([SalonsService], (service: SalonsService) => {
    expect(service).toBeTruthy();
  }));
});
