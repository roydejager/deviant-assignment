import { Answer } from './../../../../models/answer';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Store } from '@ngrx/store';

import { combineLatest, BehaviorSubject, Subscription, Observable } from 'rxjs';

import { AssignmentStorageService, StoredAnswer, StoredAssignment } from './../../services/assignment-storage.service';
import { Question } from '../../../../models/question';
import { State } from '../../../../store/reducers';
import { AssignmentSetUserAnswer } from './../../../../store/actions/assignment.actions';
import { AssignmentReducerState } from './../../../../store/reducers/assignment.reducer';

interface Params {
  questionNumber: number;
  subject: string;
  assignmentType: string;
  assignmentId: number;
}

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit, OnDestroy {
  private assignment$: Observable<AssignmentReducerState>;
  public progression$: BehaviorSubject<number> = new BehaviorSubject(0);
  public currentQuestion: Question;
  public params: Params;
  public turnedIn: boolean;
  private subscriptions: Subscription = new Subscription();

  constructor(
    public route: ActivatedRoute,
    private router: Router,
    private store: Store<{ assignment: AssignmentReducerState }>,
    private storage: AssignmentStorageService
  ) {
    this.assignment$ = this.store.select((state: State) => state.assignment);
  }

  ngOnInit(): void {
    // Listen to parameter changes and assignment changes to update the params and current question
    this.subscriptions.add(
      combineLatest([this.route.params, this.route.parent.params, this.assignment$])
        .subscribe(([params, parentParams, assignment]: any) => {
          const questionNumber = parseInt(params.questionNumber, 10);
          const assignmentId = parseInt(parentParams.assignmentId, 10);
          this.params = { ...params, ...parentParams, questionNumber, assignmentId };

          // Get the current question the user is on
          if (assignment.payload.id) {
            this.currentQuestion = assignment.payload.questions[params.questionNumber - 1];
          }
        })
    );

    this.checkIfUserBelongs();

    // Check if the user has submitted the question
    this.subscriptions.add(
      this.route.params.subscribe(() => {
        const assignments = this.storage.getCurrentSubject(this.params.subject);

        if (assignments) {
          const currentAssignment = assignments.find((assignment) => assignment.assignmentId === this.params.assignmentId);
          const currentQuestion = currentAssignment.answers.find((question) => question.questionId === this.params.questionNumber);

          // If a user has the current question in localstorage return its submitted value
          if (currentQuestion) {
            this.turnedIn = currentQuestion.submitted;
          } else {
            this.turnedIn = false;
          }
        }
      })
    );

    this.setProgression();
  }

  public onChange(value: string, submit: boolean): void {
    console.log(value)
    this.store.dispatch(new AssignmentSetUserAnswer({ value, questionId: this.currentQuestion.questionId }));
    let assignments = this.storage.getCurrentSubject(this.params.subject);
    const parsedAssignmentId = this.params.assignmentId;

    // If it has the current subject with assignments set the answer to the current assignment
    // Otherwise set a new subject with the current assignment and answer
    if (assignments) {
      const currentAssignmentIndex = this.storage.getCurrentAssignmentIndex(this.params.subject, parsedAssignmentId);

      assignments[currentAssignmentIndex] = this.setLocalStorageAnswer(value, submit);
    } else {
      assignments = this.setNewLocalStorage(value);
    }

    this.storage.setCurrentSubject(this.params.subject, assignments);

    this.turnedIn = submit;
    if (submit) {
      this.setProgression();
    }
  }

  private setLocalStorageAnswer(value: string, submitted): StoredAssignment {
    const { questionId } = this.currentQuestion;

    const currentAssignment = this.storage.getCurrentAssignment(this.params.subject, this.params.assignmentId);
    const currentAnswerIndex = this.storage.getCurrentAnswerIndex(this.params.subject, this.params.assignmentId, questionId);

    // If the answer doesn't exist, add a new item
    // Otherwise modify the existing answer
    if (currentAnswerIndex === -1) {
      currentAssignment.answers = [...currentAssignment.answers, { questionId, userAnswer: value, submitted }];
    } else {
      currentAssignment.answers[currentAnswerIndex] = { questionId, userAnswer: value, submitted };
    }

    return currentAssignment;
  }

  private setNewLocalStorage(value: string): StoredAssignment[] {
    return [
      {
        assignmentId: this.params.assignmentId,
        answers: [
          {
            questionId: this.currentQuestion.questionId,
            userAnswer: value,
            submitted: false
          }
        ]
      }
    ];
  }

  // Set the progression equal to the number of submitted questions
  private setProgression(): void {
    const assignment = this.storage.getCurrentAssignment(this.params.subject, this.params.assignmentId);

    if (assignment) {
      const submittedAnswers = assignment.answers.filter((answer: StoredAnswer) => answer.submitted);
      this.progression$.next(submittedAnswers.length);
    }
  }

  // Finds the answer that is the same as the user answer and returns if it's correct
  public validateAnswer(userAnswer: string): boolean {
    return this.currentQuestion.answers.find((answer: Answer) => answer.answer === userAnswer).isCorrect;
  }

  // Check if the user attempts to go to a question beyond their progression
  private checkIfUserBelongs() {
    const currentAssignment = this.storage.getCurrentAssignment(this.params.subject, this.params.assignmentId);

    // If a user goes to a question higher than their progression
    // it will redirect the user to the last unfilled question
    if (
      currentAssignment &&
      this.params.questionNumber > currentAssignment.answers.length + 1
    ) {
      const routerLink = [
        this.params.subject,
        this.params.assignmentType,
        this.params.assignmentId,
        'vraag',
        currentAssignment.answers.length + 1
      ];

      this.router.navigate(routerLink);
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
