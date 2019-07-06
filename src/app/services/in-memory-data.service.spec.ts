import { TestBed } from '@angular/core/testing';

import { InMememoryDataService } from './in-memory-data.service';

describe('InMememoryDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InMememoryDataService = TestBed.get(InMememoryDataService);
    expect(service).toBeTruthy();
  });
});
