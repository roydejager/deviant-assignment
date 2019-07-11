import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { combineLatest, Observable, of, Subject, BehaviorSubject } from 'rxjs';
import { Question } from '../../../../models/question';
import { AssignmentSetUserAnswer } from 'src/app/store/actions/assignment.actions';
import { LocalStorageService } from 'src/app/modules/shared/services/local-storage.service';
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
    private store: Store<{ assignment }>,
    private localstorage: LocalStorageService
  ) {
    this.assignment$ = this.store.select((state) => state.assignment);
  }

  ngOnInit() {
    combineLatest([this.route.params, this.route.parent.params, this.assignment$])
      .subscribe(([params, parentParams, assignment]: any) => {
        this.questionNumber$ = of(parseInt(params.questionNumber, 10));
        this.params$ = of({ ...params, ...parentParams });
        this.params = { ...params, ...parentParams };
        if (params.questionNumber >= 0 && assignment.payload.introText) {
          this.currentQuestion = assignment.payload.questions[params.questionNumber - 1];
          this.currentQuestion$ = of(assignment.payload.questions[params.questionNumber - 1]);
        }
      });

    const assignments = this.localstorage.getItem(this.params.subject);
    if (assignments) {
      const currentAssignment = assignments.find((assignment) => assignment.assignment === parseInt(this.params.assignmentId, 10));
      this.setProgression(currentAssignment.answers.length);
    }
    // if (assignments) {

    // }

    // if ( !assignments) {
    //   this.router.navigate(['/maatschappijleer/1/introductie']);
    // }
    // if (localProgress < ) {
    //   this.router.navigate(['/vraag', parseInt(localProgress, 10) + 1]);
    // }


    // combineLatest([this.assignment$, this.questionNumber$]).pipe(take(1)).subscribe(([assignment, questionNumber]: any) => {
    //   if (questionNumber > assignment.payload.questions.length || questionNumber <= 0) {
    //     this.router.navigate(['/maatschappijleer/1/introductie']);
    //   }
    // });
  }

  onSubmit(value: number) {
    const assignments = this.localstorage.getItem(this.params.subject);
    const { questionId, userAnswer } = this.currentQuestion;
    const parsedAssignmentId = parseInt(this.params.assignmentId, 10);

    if (assignments) {
      const currentAssignment = assignments.find((assignment) => assignment.assignment === parsedAssignmentId);
      const currentAssignmentIndex = assignments.findIndex((assignment) => assignment.assignment === parsedAssignmentId);
      const currentAnswerIndex = currentAssignment.answers.findIndex((answer) => answer.questionId === this.currentQuestion.questionId);

      if (currentAnswerIndex === -1) {
        currentAssignment.answers = [...currentAssignment.answers, { questionId, userAnswer }];
        assignments[currentAssignmentIndex] = currentAssignment;
      } else {
        currentAssignment.answers[currentAnswerIndex] = { questionId, userAnswer };
      }

      assignments[currentAssignmentIndex] = currentAssignment;
      this.localstorage.setItem(this.params.subject, assignments);

      this.setProgression(currentAssignment.answers.length);

    } else {
      this.localstorage.setItem(this.params.subject, [{
            assignment: parsedAssignmentId,
            answers: [
              {
                questionId,
                userAnswer
              }
            ]
          }
        ]
      );
      this.setProgression(1);
    }

  }

  setProgression(progress: number) {
    this.progression$.next(progress);
  }


}
