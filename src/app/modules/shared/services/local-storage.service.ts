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

  setItem(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getItem(key: string) {
    return JSON.parse(localStorage.getItem(key));
  }

}
