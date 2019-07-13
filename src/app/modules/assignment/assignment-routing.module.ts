// Angular
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { IntroductionComponent } from './pages/introduction/introduction.component';
import { QuestionComponent } from './pages/question/question.component';
import { AnswerOverviewComponent } from './pages/answer-overview/answer-overview.component';
import { AssignmentComponent } from './assignment.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: ':subject/:assignmentType/:assignmentId',
        component: AssignmentComponent,
        children: [
          { path: 'introductie', component: IntroductionComponent },
          { path: 'vraag/:questionNumber', component: QuestionComponent },
          { path: 'antwoorden', component: AnswerOverviewComponent }
        ]
      },
      { path: '', redirectTo: 'maatschappijleer/opdracht/1/introductie', pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssignmentRoutingModule {
}
