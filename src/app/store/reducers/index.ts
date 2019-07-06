import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import * as Assignment from './assignment.reducer';

export interface State {
  assignment: Assignment.State;
}

export const reducers: ActionReducerMap<State> = {
  assignment: Assignment.reducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
