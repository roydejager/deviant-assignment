import { TestBed } from '@angular/core/testing';

import { AssignmentStorageService } from './assignment-storage.service';

describe('AssignmentStorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AssignmentStorageService = TestBed.get(AssignmentStorageService);
    expect(service).toBeTruthy();
  });
});
