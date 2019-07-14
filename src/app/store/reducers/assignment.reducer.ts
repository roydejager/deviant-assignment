import { Question } from './../../models/question';
import { ActionTypes } from '../actions/assignment.actions';

import { Assignment, ActionPayload } from '../../models';

export interface AssignmentReducerState {
  loading: boolean;
  error: boolean;
  errorMessage: string;
  payload: Assignment;
}

export const initialState: AssignmentReducerState = {
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

export function reducer(state = initialState, action: ActionPayload): AssignmentReducerState {
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
      console.log(action.payload)
      const updateAnswer = state.payload.questions.map((question: Question, index) => {
        if (question.questionId !== action.payload.questionId) {
          return question;
        }

        return { ...question, userAnswer: action.payload.value };
      });

      return { ...state, payload: { ...state.payload, questions: updateAnswer }};

    case ActionTypes.ASSIGNMENT_USER_ANSWERS_RESET:
      const resetQuestions = state.payload.questions.map((question) => {
        return { ...question, userAnswer: null };
      });

      return { ...state, payload: { ...state.payload, questions: resetQuestions }};

    default:
      return initialState;
  }
}
