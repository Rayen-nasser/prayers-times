import { TestBed } from '@angular/core/testing';

import { ApiAthkarAfterPrayService } from './api-athkar-after-pray.service';

describe('ApiAthkarAfterPrayService', () => {
  let service: ApiAthkarAfterPrayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiAthkarAfterPrayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
