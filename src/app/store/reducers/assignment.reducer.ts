import { ActionTypes } from '../actions/assignment.actions';

import { Assignment, ActionPayload } from '../../models';

export interface State {
  loading: boolean;
  error: boolean;
  errorMessage: string;
  payload: Assignment;
}

export const initialState: State = {
  loading: false,
  error: false,
  errorMessage: '',
  payload: {
    name: '',
    id: 0,
    introText: '',
    questions: [
      {
        questionId: 0,
        question: '',
        questionType: 'open_question',
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
      return { ...state, loading: false, error: true, errorMessage: action.payload.body.error };

    case ActionTypes.ASSIGNMENT_FETCH_CANCEL:
      return { ...state, loading: false, error: false };

    case ActionTypes.ASSINGMENT_SET_USER_ANSWER:
      return { ...state, payload: { ...state.payload, questions: action.payload }};

    default:
      return initialState;
  }
}
