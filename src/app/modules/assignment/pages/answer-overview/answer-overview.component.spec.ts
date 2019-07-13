import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerOverviewComponent } from './answer-overview.component';

describe('AnswerOverviewComponent', () => {
  let component: AnswerOverviewComponent;
  let fixture: ComponentFixture<AnswerOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnswerOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnswerOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
