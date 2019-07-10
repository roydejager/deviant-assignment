import { Action } from '@ngrx/store';
import { ActionTypes } from '../actions/assignment.actions';
import { Assignment, ActionPayload } from '../../models';

export interface State {

}

export const initialState = {
  loading: false,
  error: false,
  payload: {
    name: '',
    introText: '',
    questions: [
      {
        questionId: 0,
        question: '',
        questionType: '',
        userAnswer: null
      }
    ]
  }
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

    case ActionTypes.ASSINGMENT_SET_USER_ANSWER:
      return { ...state, payload: { ...state.payload, questions: action.payload }};

    default:
      return initialState;
  }
}
