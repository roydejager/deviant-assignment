import { AssignmentResetUserAnswers } from './../../../../store/actions/assignment.actions';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';

import { Subscription } from 'rxjs';

import { StoredAssignment, StoredAnswer, AssignmentStorageService } from '../../services/assignment-storage.service';


@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.scss']
})
export class IntroductionComponent implements OnInit, OnDestroy {
  public assignment$;
  public progression = 0;
  private subscriptions: Subscription = new Subscription();
  private params;

  constructor(
    private readonly store: Store<{ assignment }>,
    public route: ActivatedRoute,
    private assignmentStorage: AssignmentStorageService
  ) {
    this.assignment$ = this.store.select((state) => state.assignment);
  }

  ngOnInit() {
    this.setProgression();
  }

  // Sets the progress equal to the amount of submitted questions
  private setProgression(): void {
    this.subscriptions.add(
      this.route.parent.params.subscribe((params) => {
        const currentSubject = this.assignmentStorage.getCurrentSubject(params.subject);
        const assignmentId = parseInt(params.assignmentId, 10);
        this.params = { ...params, assignmentId };

        if (currentSubject) {
          const currentAssignment = currentSubject.find((assignment: StoredAssignment) => {
            return assignment.assignmentId === parseInt(params.assignmentId, 10);
          });
          const submittedAnswers = currentAssignment.answers.filter((answer: StoredAnswer) => answer.submitted);
          if (currentAssignment) {
            this.progression = submittedAnswers.length;
          }
        }
      })
    );
  }

  // Remove the current assignment from the subject that is stored
  // If no assignments are left remove the subject from localstorage
  clearAssignment(): void {
    this.store.dispatch(new AssignmentResetUserAnswers());
    this.assignmentStorage.removeAssignment(this.params.subject, this.params.assignmentId);

    const subject = this.assignmentStorage.getCurrentSubject(this.params.subject);

    if (!subject.length) {
      this.assignmentStorage.removeCurrentSubject(this.params.subject);
    }
  }

  ngOnDestroy() {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
  }
}
