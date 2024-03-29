import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';

import { environment } from '../../../environments/environment';
import * as Assignment from './assignment.reducer';

export interface State {
  assignment: Assignment.AssignmentReducerState;
}

export const reducers: ActionReducerMap<State> = {
  assignment: Assignment.reducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
