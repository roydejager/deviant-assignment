import { Action } from '@ngrx/store';
import { ActionTypes } from '../actions/assignment.actions';
import { Assignment } from '../../models';

export interface State {

}

export const initialState = {
  loading: false,
  error: false,
  assignment: {}
};

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {
    case ActionTypes.ASSIGNMENT_FETCH:
      return { ...state, loading: true, error: false };
    default:
      return state;
  }
}
