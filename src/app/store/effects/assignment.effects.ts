import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { ApiService } from '../../services/api.service';
import { ActionTypes, FetchAssignmentSuccess } from '../actions/assignment.actions';
import { switchMap, map } from 'rxjs/operators';

@Injectable()
export class AssignmentEffects {
  constructor(
    private actions$: Actions,
    private http: ApiService
  ) {}

  @Effect()
  fetchAssignment$: Observable<Action> = this.actions$
    .pipe(
      ofType(ActionTypes.ASSIGNMENT_FETCH),
      switchMap((action: any) => {
        return this.http.getAssignment();
      }),
      map((f) => new FetchAssignmentSuccess(f))
    );
}
