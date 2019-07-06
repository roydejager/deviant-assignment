import { Action } from '@ngrx/store';

export interface ActionPayload extends Action {
  payload: any;
}
