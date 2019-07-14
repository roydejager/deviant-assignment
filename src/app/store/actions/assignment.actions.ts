import { Answer } from './../../models/answer';
import { Action } from '@ngrx/store';

import { Assignment } from '../../models';

export enum ActionTypes {
  ASSIGNMENT_FETCH = '[Assignment] fetch',
  ASSIGNMENT_FETCH_SUCCESS = '[Assignment] fetch success',
  ASSIGNMENT_FETCH_ERROR = '[Assignment] fetch error',
  ASSIGNMENT_FETCH_CANCEL = '[Assignment] fetch cancel',
  ASSINGMENT_SET_USER_ANSWER = '[Assignment] set user answer',
  ASSIGNMENT_USER_ANSWERS_RESET = '[Assignment] reset user answers'
}

export class AssignmentFetch implements Action {
  readonly type = ActionTypes.ASSIGNMENT_FETCH;

  constructor(public payload: { id: number }) { }
}

export class AssignmentFetchSuccess implements Action {
  readonly type = ActionTypes.ASSIGNMENT_FETCH_SUCCESS;

  constructor(public payload: Assignment) { }
}

export class AssignmentFetchError implements Action {
  readonly type = ActionTypes.ASSIGNMENT_FETCH_ERROR;

  constructor(public payload: { error: boolean, errorMessage: string }) { }
}

export class AssignmentFetchCancel implements Action {
  readonly type = ActionTypes.ASSIGNMENT_FETCH_CANCEL;
}

export class AssignmentSetUserAnswer implements Action {
  readonly type = ActionTypes.ASSINGMENT_SET_USER_ANSWER;

  constructor(public payload: { value: string, questionId: number }) { }
}

export class AssignmentResetUserAnswers implements Action {
  readonly type = ActionTypes.ASSIGNMENT_USER_ANSWERS_RESET;
}

export type AssignmentActions = ActionTypes;
