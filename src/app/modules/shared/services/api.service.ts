import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Assignment } from '../../../models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getAssignment(id: number): Observable<Assignment> {
    return this.http.get<Assignment>(`${environment}/assignment/${id}`);
  }
}
