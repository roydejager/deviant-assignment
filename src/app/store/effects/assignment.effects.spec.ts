import { initialState } from './../reducers/assignment.reducer';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable, of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { AssignmentEffects } from './assignment.effects';
import { AssignmentFetch } from '../actions/assignment.actions';

describe('AssignmentEffects', () => {
  let actions$: Observable<any>;
  let effects: AssignmentEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
      providers: [
        AssignmentEffects,
        provideMockStore({ initialState }),
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(AssignmentEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('should feth data', (done) => {
    const action = new AssignmentFetch({ id: 1 });

    actions$ = of(action);

    effects.fetchAssignment$.subscribe((data) => {
      expect(data).toBeFalsy();
      done();
    });
  });
});
