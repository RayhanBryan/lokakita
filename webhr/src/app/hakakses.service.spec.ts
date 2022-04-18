import { TestBed } from '@angular/core/testing';

import { HakaksesService } from './hakakses.service';

describe('HakaksesService', () => {
  let service: HakaksesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HakaksesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
