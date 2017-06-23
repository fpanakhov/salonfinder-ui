import { TestBed, inject } from '@angular/core/testing';

import { RegisterSalonService } from './register-salon.service';

describe('RegisterSalonService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RegisterSalonService]
    });
  });

  it('should be created', inject([RegisterSalonService], (service: RegisterSalonService) => {
    expect(service).toBeTruthy();
  }));
});
