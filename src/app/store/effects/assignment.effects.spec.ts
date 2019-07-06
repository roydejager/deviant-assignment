import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { AssignmentEffects } from './assignment.effects';

describe('AssignmentEffects', () => {
  let actions$: Observable<any>;
  let effects: AssignmentEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AssignmentEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(AssignmentEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
