// Angular
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { IntroductionComponent } from './pages/introduction/introduction.component';
import { QuestionComponent } from './pages/question/question.component';
import { AssignmentComponent } from './assignment.component';

const routes: Routes = [
  {
    path: '',
    component: AssignmentComponent,
    children: [
      {
        path: ':subject/:assignment',
        children: [
          { path: 'introductie', component: IntroductionComponent },
          { path: 'vraag/:questionNumber', component: QuestionComponent },
          { path: 'antwoorden', component: IntroductionComponent }
        ]
      },
      { path: '', redirectTo: 'maatschappijleer/1/introductie', pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssignmentRoutingModule {
}
