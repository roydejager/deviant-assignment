import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { Observable, of } from 'rxjs';
import { switchMap, map, catchError, takeUntil } from 'rxjs/operators';

import { Assignment } from '../../../app/models';

import { ApiService } from '../../modules/shared/services/api.service';

import { ActionTypes, AssignmentFetchSuccess, AssignmentFetch, AssignmentFetchError } from '../actions/assignment.actions';

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
      switchMap((action) => {
        return  this.http.getAssignment(action.payload.id);
      }),
      map((assignment: Assignment) => {
        const currentSubject = JSON.parse(localStorage.getItem('maatschappijleer'));

        if (currentSubject) {
          const currentAssignment = currentSubject.find((curr) => curr.assignment === assignment.id);

          assignment.questions.forEach((question) => {
            const answer = currentAssignment.answers.find((userAnswer) => userAnswer.questionId === question.questionId);
            if (answer) {
              question.userAnswer = answer.userAnswer;
            }
          });
        }

        return new AssignmentFetchSuccess(assignment);
      }),
      catchError((error) => of(new AssignmentFetchError(error))),
      takeUntil(
        this.actions$.pipe(
          ofType(ActionTypes.ASSIGNMENT_FETCH_CANCEL)
        )
      )
    );
}
