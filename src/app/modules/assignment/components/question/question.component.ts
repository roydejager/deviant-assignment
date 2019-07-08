import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { } from 'rxjs/operators';
import { combineLatest, Observable, of, Subject, BehaviorSubject } from 'rxjs';
import { Question } from '../../../../models/question';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  @Input() question;
  private assignment$;
  public questionNumber$: Observable<number>;
  public currentQuestion$: Observable<Question>;
  public progression$: BehaviorSubject<number> = new BehaviorSubject(0);
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<{ assignment }>
  ) {
    this.assignment$ = this.store.select((state) => state.assignment);
  }

  ngOnInit() {
    const localProgress = localStorage.getItem('progression');
    if (!localProgress) {
      this.router.navigate(['/introductie']);
    }
    // if (localProgress) {
    //   this.router.navigate(['/vraag', parseInt(localProgress, 10) + 1]);
    // }

    this.progression$.next(parseInt(localProgress, 10));
    combineLatest([this.route.params, this.assignment$])
      .subscribe(([param, assignment]: any) => {
        this.questionNumber$ = of(parseInt(param.number, 10));

        if (param.number >= 0 && assignment.payload.introText) {
          this.currentQuestion$ = of(assignment.payload.questions[param.number - 1]);
        }
      });
  }

  onSubmit(value: number) {
    const currentProgression = localStorage.getItem('progression');
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
}
