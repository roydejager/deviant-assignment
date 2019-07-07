import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssignmentComponent } from './modules/assignment/assignment.component';
import { QuestionComponent } from './modules/assignment/components/question/question.component';
import { IntroductionComponent } from './modules/assignment/components/introduction/introduction.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'opdrachten',
    pathMatch: 'full'
  },
  {
    path: 'opdrachten',
    component: AssignmentComponent,
  },
  {
    path: 'opdracht/:number',
    component: AssignmentComponent,
    children: [
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
