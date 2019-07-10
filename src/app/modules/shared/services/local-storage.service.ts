import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  checkLocalStorage() {
    if (typeof window === 'undefined' || !window.localStorage) { return false; }

    localStorage.setItem('test', 'test');

    if (localStorage.getItem('test')) {
      localStorage.removeItem('test');
      return true;
    }

    return false;
  }

  setLocalStorageItem(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  getLocalStorageItem(key: string) {
    return localStorage.getItem(key);
  }

}
