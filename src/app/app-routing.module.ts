import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssignmentComponent } from './modules/assignment/assignment.component';
import { QuestionComponent } from './modules/assignment/pages/question/question.component';
import { IntroductionComponent } from './modules/assignment/pages/introduction/introduction.component';


const routes: Routes = [
  {
    path: '',
    loadChildren: './modules/assignment/assignment.module#AssignmentModule',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
