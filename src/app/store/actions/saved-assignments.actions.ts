import { StoredAssignment } from './../../modules/assignment/services/assignment-storage.service';
import { Action } from '@ngrx/store';

import { Assignment } from '../../models';

export enum ActionTypes {
  SAVED_ASSIGNMENTS_SET = '[Saved assignments] set',
  SAVED_ASSIGNMENTS_GET = '[saved assignments] get'
}

export class SavedAssignmentsSet implements Action {
  readonly type = ActionTypes.SAVED_ASSIGNMENTS_GET;

  constructor(public payload: StoredAssignment) { }
}

export type AssignmentActions = ActionTypes;
