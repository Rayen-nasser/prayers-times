import { TestBed } from '@angular/core/testing';

import { ApiTimePraysService } from './api-time-prays.service';

describe('ApiTimePraysService', () => {
  let service: ApiTimePraysService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiTimePraysService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
