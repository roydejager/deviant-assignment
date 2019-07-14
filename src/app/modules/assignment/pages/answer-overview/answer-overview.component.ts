import { AssignmentResetUserAnswers } from './../../../../store/actions/assignment.actions';
import { AssignmentStorageService, StoredAnswer, StoredAssignment } from './../../services/assignment-storage.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Store } from '@ngrx/store';

import { Observable, Subscription } from 'rxjs';

import { AssignmentReducerState } from './../../../../store/reducers/assignment.reducer';
import { State } from './../../../../store/reducers';

interface Params {
  assignmentType: string;
  subject: string;
  assignmentId: number;
}


@Component({
  selector: 'app-answer-overview',
  templateUrl: './answer-overview.component.html',
  styleUrls: ['./answer-overview.component.scss']
})
export class AnswerOverviewComponent implements OnInit, OnDestroy {
  public assignment$: Observable<AssignmentReducerState>;
  private subscription: Subscription = new Subscription();
  public params: Params;

  constructor(
    private readonly store: Store<{ assignment }>,
    private route: ActivatedRoute,
    private router: Router,
    private assignmentStorage: AssignmentStorageService
  ) {
    this.assignment$ = this.store.select((state: State) => state.assignment);
  }

  ngOnInit() {
    this.subscription.add(
      this.route.parent.params.subscribe((parentParams: any) => {

        const assignmentId = parseInt(parentParams.assignmentId, 10);
        this.params = { ...parentParams, assignmentId };
      })
    );

    this.checkIfUserBelongs();
  }

  // This checks if the user should be on this page based on the users progression
  checkIfUserBelongs() {
    this.subscription.add(
      this.assignment$.subscribe((assignment) => {
        const assignments = this.assignmentStorage.getCurrentSubject(this.params.subject);
        const navigationRoute = [this.params.subject, this.params.assignmentType, this.params.assignmentId, 'introductie'];

        // If a user has no progression in this current subject, navigate to the introducgtion
        if (!assignments) {
          this.router.navigate(navigationRoute);
        } else {
          const currentStoredAssignment = this.assignmentStorage.getCurrentAssignment(this.params.subject, this.params.assignmentId);
          const submittedQuestions = currentStoredAssignment.answers.filter((answer: StoredAnswer) => answer.submitted);

          // If a user has less submitted answers than there are questions, navigate to the introduction
          if (submittedQuestions.length < assignment.payload.questions.length) {
            this.router.navigate(navigationRoute);
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

  public validateAnswers(answers, userAnswer): boolean {
    return answers.find((answer) => answer.answer === userAnswer).isCorrect;
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
