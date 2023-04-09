import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageSurveyComponent } from './manage-survey.component';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [{
  path: '**',
  component: ManageSurveyComponent,
}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageSurveyRoutingModule { }
