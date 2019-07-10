// Angular
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

// Modules
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AssignmentRoutingModule } from './assignment-routing.module';
import { ClarityModule } from '@clr/angular';

// Components
import { AssignmentComponent } from './assignment.component';
import { QuestionComponent } from './pages/question/question.component';
import { IntroductionComponent } from './pages/introduction/introduction.component';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';


@NgModule({
  declarations: [
    AssignmentComponent,
    QuestionComponent,
    IntroductionComponent,
    ProgressBarComponent,
  ],
  imports: [
    AssignmentRoutingModule,
    CommonModule,
    SharedModule,
    ClarityModule,
    FormsModule
  ]
})
export class AssignmentModule { }
