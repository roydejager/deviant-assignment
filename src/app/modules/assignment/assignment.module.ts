// Angular
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

// Modules
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AssignmentRoutingModule } from './assignment-routing.module';
import { ClarityModule } from '@clr/angular';

// Services
import { AssignmentStorageService } from './services/assignment-storage.service';

// Components
import { AssignmentComponent } from './assignment.component';
import { QuestionComponent } from './pages/question/question.component';
import { IntroductionComponent } from './pages/introduction/introduction.component';
import { AnswerOverviewComponent } from './pages/answer-overview/answer-overview.component';


@NgModule({
  declarations: [
    AssignmentComponent,
    QuestionComponent,
    IntroductionComponent,
    AnswerOverviewComponent,
  ],
  imports: [
    AssignmentRoutingModule,
    CommonModule,
    SharedModule,
    ClarityModule,
    FormsModule
  ],
  providers: [
    AssignmentStorageService
  ]
})
export class AssignmentModule { }
