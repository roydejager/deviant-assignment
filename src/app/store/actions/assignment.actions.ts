import { Action } from '@ngrx/store';
import { Assignment } from '../../models';

export enum ActionTypes {
  ASSIGNMENT_FETCH = 'Assignment fetch',
  ASSIGNMENT_FETCH_SUCCESS = 'Assignment fetch success',
  ASSIGNMENT_FETCH_ERROR = 'Assignment fetch error'
}

export class FetchAssignment implements Action {
  readonly type = ActionTypes.ASSIGNMENT_FETCH;
}

export class FetchAssignmentSuccess implements Action {
  readonly type = ActionTypes.ASSIGNMENT_FETCH_SUCCESS;

  constructor(public payload: Assignment) { }
}

export class FetchAssignmentError implements Action {
  readonly type = ActionTypes.ASSIGNMENT_FETCH_ERROR;
}

export type AssignmentActions = ActionTypes;
