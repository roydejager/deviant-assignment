import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { ApiService } from '../../services/api.service';
import { ActionTypes, AssignmentFetchSuccess, AssignmentFetch, AssignmentFetchError } from '../actions/assignment.actions';
import { switchMap, map, catchError, takeUntil } from 'rxjs/operators';
import { Assignment } from 'src/app/models';

@Injectable()
export class AssignmentEffects {
  constructor(
    private actions$: Actions,
    private http: ApiService
  ) { }

  @Effect()
  fetchAssignment$: Observable<Action> = this.actions$
    .pipe(
      ofType<AssignmentFetch>(ActionTypes.ASSIGNMENT_FETCH),
      switchMap(() => {
        return this.http.getAssignment();
      }),
      map((assignment: Assignment) => new AssignmentFetchSuccess(assignment)),
      catchError((error) => of(new AssignmentFetchError(error))),
      takeUntil(
        this.actions$.pipe(
          ofType(ActionTypes.ASSIGNMENT_FETCH_CANCEL)
        )
      )
    );
}
