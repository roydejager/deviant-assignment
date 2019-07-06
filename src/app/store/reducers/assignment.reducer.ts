import { Action } from '@ngrx/store';
import { ActionTypes } from '../actions/assignment.actions';
import { Assignment, ActionPayload } from '../../models';

export interface State {

}

export const initialState = {
  loading: false,
  error: false,
};

export function reducer(state = initialState, action: ActionPayload): State {
  switch (action.type) {
    case ActionTypes.ASSIGNMENT_FETCH:
      return { ...state, loading: true, error: false };

    case ActionTypes.ASSIGNMENT_FETCH_SUCCESS:
      return { ...state, payload: action.payload, loading: false, error: false };

    case ActionTypes.ASSIGNMENT_FETCH_ERROR:
      return { ...state, loading: false, error: true };

    case ActionTypes.ASSIGNMENT_FETCH_CANCEL:
      return { ...state, loading: false, error: false };
    default:
      return state;
  }
}
