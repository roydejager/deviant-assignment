import { TestBed } from '@angular/core/testing';

import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
  beforeEach(() =>  {
    let store = {};
    TestBed.configureTestingModule({});
    spyOn(localStorage, 'getItem').and.callFake((key) => {
      return store[key];
    });
    spyOn(localStorage, 'setItem').and.callFake((key, value) => {
      return store[key] = value + '';
    });
    spyOn(localStorage, 'clear').and.callFake(() => {
      store = {};
    });
  });

  it('should be created', () => {
    const service: LocalStorageService = TestBed.get(LocalStorageService);
    expect(service).toBeTruthy();
  });

  it('should set item', () => {
    const service: LocalStorageService = TestBed.get(LocalStorageService);
  });

});
