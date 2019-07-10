import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { combineLatest, Observable, of, Subject, BehaviorSubject } from 'rxjs';
import { Question } from '../../../../models/question';
import { AssignmentSetUserAnswer } from 'src/app/store/actions/assignment.actions';

interface LocalStorageSaved {
  assignment: number;
  answers: [
    {
      id: number;
      answer: string;
    }
  ];
}

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  private assignment$;
  public questionNumber$: Observable<number>;
  public currentQuestion$: Observable<Question>;
  public progression$: BehaviorSubject<number> = new BehaviorSubject(0);
  public params$: Observable<object>;
  public userAnswer: string;
  params;
  currentQuestion;

  constructor(
    public route: ActivatedRoute,
    private router: Router,
    private store: Store<{ assignment }>
  ) {
    this.assignment$ = this.store.select((state) => state.assignment);
  }

  ngOnInit() {
    const localProgress = localStorage.getItem('progression');
    if (!localProgress) {
      this.router.navigate(['/maatschappijleer/1/introductie']);
    }

    this.progression$.next(parseInt(localProgress, 10));

    // if (localProgress < ) {
    //   this.router.navigate(['/vraag', parseInt(localProgress, 10) + 1]);
    // }

    combineLatest([this.route.params, this.assignment$])
      .subscribe(([params, assignment]: any) => {
        this.questionNumber$ = of(parseInt(params.questionNumber, 10));
        this.params$ = params;
        this.params = params;
        if (params.questionNumber >= 0 && assignment.payload.introText) {
          this.currentQuestion = assignment.payload.questions[params.questionNumber - 1];
          this.currentQuestion$ = of(assignment.payload.questions[params.questionNumber - 1]);
        }
      });

    combineLatest([this.assignment$, this.questionNumber$]).pipe(take(1)).subscribe(([assignment, questionNumber]: any) => {
      if (questionNumber > assignment.payload.questions.length || questionNumber <= 0) {
        this.router.navigate(['/maatschappijleer/1/introductie']);
      }
    });
  }

  onSubmit(value: number) {
    const currentProgression = localStorage.getItem('progression');
    const assignments = JSON.parse(localStorage.getItem(this.params.subject));
    const { questionId, userAnswer } = this.currentQuestion;

    if (assignments) {
      const currentAssignment = assignments.find((assignment) => assignment.assignment === parseInt(this.params.assignment, 10));
      const currentAssignmentIndex = assignments.findIndex((assignment) => assignment.assignment === parseInt(this.params.assignment, 10));
      const currentAnswerIndex = currentAssignment.answers.findIndex((answer) => answer.questionId === this.currentQuestion.questionId);


      if (currentAnswerIndex === -1) {
        currentAssignment.answers = [...currentAssignment.answers, { questionId, userAnswer }];
        assignments[currentAssignmentIndex] = currentAssignment;

        localStorage.setItem(this.params.subject, JSON.stringify(assignments));
      } else {
        currentAssignment.answers[currentAnswerIndex] = { questionId, userAnswer };
        assignments[currentAssignmentIndex] = currentAssignment;

        localStorage.setItem(this.params.subject, JSON.stringify(assignments));
      }
    } else {
      localStorage.setItem(this.params.subject, JSON.stringify(
        [
          {
            assignment: parseInt(this.params.assignment, 10),
            answers: [
              {
                questionId,
                userAnswer
              }
            ]
          }
        ]
      ));
    }


    combineLatest([this.currentQuestion$, this.assignment$]).pipe(
      take(1)
    ).subscribe(([currentQuestion, assignment]: any) => {
      const f = assignment.payload.questions.map((question) => {
        if (currentQuestion.questionId === question.questionId) {
          return currentQuestion;
        }

        return question;
      });

      this.store.dispatch(new AssignmentSetUserAnswer(f));
    });
    if (value > parseInt(currentProgression, 10)) {
      this.progression$.next(value);
      this.setLocalstorageProgression(value);
    }
  }

  setLocalstorageProgression(value: number) {
    const currentProgression = localStorage.getItem('progression');
    const stringValue = value.toString();

    if (!currentProgression) {
      return localStorage.setItem('progression', stringValue);
    }

    if (value > parseInt(currentProgression, 10)) {
      return localStorage.setItem('progression', stringValue);
    }
  }

  onChange($event) {
  }

  test($event) {
  }
}
