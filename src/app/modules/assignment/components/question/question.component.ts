import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { } from 'rxjs/operators';
import { combineLatest, Observable, of } from 'rxjs';
import { Question } from '../../../../models/question';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  @Input() question;
  private assignment$;
  questionNumber$;
  public currentQuestion$: Observable<Question>;

  constructor(
    private route: ActivatedRoute,
    private store: Store<{ assignment }>
  ) {
    this.assignment$ = this.store.select((state) => state.assignment);
  }

  ngOnInit() {
    combineLatest([this.route.params, this.assignment$])
      .subscribe(([param, assignment]: any) => {
        this.questionNumber$ = of(parseInt(param.number, 10));

        if (param.number >= 0 && assignment.payload.introText) {
          this.currentQuestion$ = of(assignment.payload.questions[param.number]);
        }
      });


  }

}
