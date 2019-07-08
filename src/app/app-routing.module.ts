import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssignmentComponent } from './modules/assignment/assignment.component';
import { QuestionComponent } from './modules/assignment/pages/question/question.component';
import { IntroductionComponent } from './modules/assignment/pages/introduction/introduction.component';


const routes: Routes = [
  {
    path: '',
    component: AssignmentComponent,
    children: [
      { path: '', redirectTo: 'introductie', pathMatch: 'full' },
      { path: 'introductie', component: IntroductionComponent },
      { path: 'vraag/:number', component: QuestionComponent },
      { path: 'antwoorden', component: IntroductionComponent }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
