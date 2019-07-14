import { Observable, of } from 'rxjs';
import { ProgressBarComponent } from './../../../shared/components/progress-bar/progress-bar.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { QuestionComponent } from './question.component';
import { ClarityModule } from '@clr/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { CalculateTotalPercentagePipe } from '../../../shared/pipes/delta-calculations.pipe';
import { StoreModule } from '@ngrx/store';
import { reducers } from '../../../../store/reducers';
import { ActivatedRoute, Data } from '@angular/router';
import { By } from '@angular/platform-browser'

describe('QuestionComponent', () => {
  let component: QuestionComponent;
  let fixture: ComponentFixture<QuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ClarityModule,
        RouterTestingModule,
        StoreModule.forRoot(reducers),
      ],
      declarations: [
        QuestionComponent,
        CalculateTotalPercentagePipe,
        ProgressBarComponent
      ],
      providers: [
        CalculateTotalPercentagePipe,
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ questionNumber: 1 }),
            parent: {
              params: of({
                subject: 'maatschappijleer',
                assignmentType: 'opdrachten',
                assignmentId: 1
              })
            }
          }
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render answers', () => {
    component.currentQuestion = {
      questionId: 1,
      question: 'question',
      questionType: 'open_question',
      userAnswer: 'answer'
    };
    component.turnedIn = true;

    fixture.detectChanges();

    const userAnswer = fixture.debugElement
    .query(By.css('.user-answers-container'));

    expect(userAnswer).toBeTruthy();
  });

  it('should disable the button', () => {
    component.currentQuestion = {
      questionId: 1,
      question: 'question',
      questionType: 'open_question',
      userAnswer: null
    };

    fixture.detectChanges();

    const disabledButton = fixture.nativeElement.querySelector('button').disabled;

    expect(disabledButton).toBeTruthy();
  });
});
