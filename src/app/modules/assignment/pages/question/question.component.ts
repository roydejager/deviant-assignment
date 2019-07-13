import { Assignment } from './../../../../models/assignment';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Store } from '@ngrx/store';

import { combineLatest, BehaviorSubject } from 'rxjs';

import { AssignmentStorageService } from './../../services/assignment-storage.service';

import { Question } from '../../../../models/question';
import { State } from '../../../../store/reducers';

interface LocalStorageSaved {
  assignment: number;
  answers: [
    {
      id: number;
      answer: string;
    }
  ];
}

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
export class QuestionComponent implements OnInit {
  private assignment$;
  public progression$: BehaviorSubject<number> = new BehaviorSubject(0);
  public currentQuestion: Question;
  public params: Params;
  public turnedIn: boolean;

  constructor(
    public route: ActivatedRoute,
    private router: Router,
    private store: Store<{ assignment }>,
    private localstorage: AssignmentStorageService
  ) {
    this.assignment$ = this.store.select((state: State) => state.assignment);
  }

  ngOnInit() {
    combineLatest([this.route.params, this.route.parent.params, this.assignment$])
      .subscribe(([params, parentParams, assignment]: any) => {
        const questionNumber = parseInt(params.questionNumber, 10);
        const assignmentId = parseInt(parentParams.assignmentId, 10);

        this.params = { ...params, ...parentParams, questionNumber, assignmentId };

        if (params.questionNumber >= 0 && assignment.payload.introText) {
          this.currentQuestion = assignment.payload.questions[params.questionNumber - 1];
        }
      });

    this.route.params.subscribe(() => {
      const assignments = this.localstorage.getCurrentSubject(this.params.subject);
      if (assignments) {
        const currentAssignment = assignments.find((assignment) => assignment.assignmentId === this.params.assignmentId);
        const currentQuestion = currentAssignment.answers.find((question) => question.questionId === this.params.questionNumber);
        if (currentQuestion) {
          this.turnedIn = currentQuestion.submitted;
        } else {
          this.turnedIn = false;
        }
      }
    });

    this.setProgression();
  }

  onChange(value: string, submit: boolean) {
    let assignments = this.localstorage.getCurrentSubject(this.params.subject);
    const parsedAssignmentId = this.params.assignmentId;
    if (assignments) {
      const currentAssignmentIndex = this.localstorage.getCurrentAssignmentIndex(parsedAssignmentId);

      assignments[currentAssignmentIndex] = this.setLocalStorageAnswer(value, submit);

    } else {
      assignments = this.setNewLocalStorage(value);
    }
    this.localstorage.setCurrentSubject(this.params.subject, assignments);

    if (submit) {
      this.setProgression();
    }
  }

  setLocalStorageAnswer(value: string, submitted) {
    const { questionId } = this.currentQuestion;

    const currentAssignment = this.localstorage.getCurrentAssignment(this.params.assignmentId);
    const currentAnswerIndex = this.localstorage.getCurrentAnswerIndex(this.params.assignmentId, questionId);

    if (currentAnswerIndex === -1) {
      currentAssignment.answers = [...currentAssignment.answers, { questionId, userAnswer: value, submitted }];
    } else {
      currentAssignment.answers[currentAnswerIndex] = { questionId, userAnswer: value, submitted };
    }
    this.turnedIn = submitted;
    return currentAssignment;
  }

  setNewLocalStorage(value) {
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

  setProgression() {
    const assignment = this.localstorage.getCurrentAssignment(this.params.assignmentId);

    if (assignment) {
      const submittedAnswers = assignment.answers.filter(answer => answer.submitted);
      this.progression$.next(submittedAnswers.length);
    }
  }

  validateAnswer(userAnswer: string) {
    const currentAnswer = this.currentQuestion.answers.find((answer) => answer.answer === userAnswer);
    return currentAnswer.isCorrect;
  }
}
