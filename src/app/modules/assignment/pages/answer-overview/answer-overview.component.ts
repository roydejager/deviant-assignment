import { Assignment } from './../../../../models/assignment';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Store } from '@ngrx/store';

import { Observable, Subscription } from 'rxjs';

import { AssignmentReducerState } from './../../../../store/reducers/assignment.reducer';
import { State } from './../../../../store/reducers/index';
import { take } from 'rxjs/operators';

interface Params {
  assignmentType: string;
  subject: string;
  assignmentId: number | string;
}

interface StoredAssignment {
  assignmentId: number;
  answers: [
    {
      id: number;
      answer: string;
    }
  ];
}

@Component({
  selector: 'app-answer-overview',
  templateUrl: './answer-overview.component.html',
  styleUrls: ['./answer-overview.component.scss']
})
export class AnswerOverviewComponent implements OnInit, OnDestroy {
  public assignment$: Observable<AssignmentReducerState>;
  private paramsSubcription: Subscription;
  private assignmentSubscription: Subscription;
  public params: Params;
  constructor(
    private readonly store: Store<{ assignment }>,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.assignment$ = this.store.select((state: State) => state.assignment);
  }

  ngOnInit() {
    this.paramsSubcription = this.route.parent.params.subscribe((parentParams: any) => {
      const assignmentId = parseInt(parentParams.assignmentId, 10);

      this.params = { ...parentParams, assignmentId };
    });

    this.assignmentSubscription = this.assignment$.subscribe((assignment) => {
      const assignments = JSON.parse(localStorage.getItem(this.params.subject));
      const navigationRoute = [this.params.subject, this.params.assignmentType, this.params.assignmentId, 'introductie'];

      if (!assignments) {
        this.router.navigate(navigationRoute);
      } else {
        const currentStoredAssignment = assignments.find((storedAssignment: StoredAssignment) => {
          return storedAssignment.assignmentId === this.params.assignmentId;
        });
        if (currentStoredAssignment.answers.length < assignment.payload.questions.length) {
          this.router.navigate(navigationRoute);
        }
      }
    });
  }

  clearAssignment() {
    const assignments = JSON.parse(localStorage.getItem(this.params.subject));

    const filteredAssignments = assignments.filter((assignment: StoredAssignment) => {
      return assignment.assignmentId !== this.params.assignmentId;
    });

    if (!filteredAssignments.length) {
      localStorage.removeItem(this.params.subject);
    } else {
      localStorage.setItem(this.params.subject, filteredAssignments);
    }
  }

  validateAnswers(answers, userAnswer) {
    return answers.find((answer) => answer.answer === userAnswer).isCorrect;
  }

  ngOnDestroy() {
    this.paramsSubcription.unsubscribe();
    this.assignmentSubscription.unsubscribe();
  }
}
