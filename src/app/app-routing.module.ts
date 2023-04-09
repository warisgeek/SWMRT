import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './shared/guards/auth.gurad';

const routes: Routes = [
  {
    path: 'gcsa/dashboard',
    canActivate: [AuthGuard],
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'gcsa/survey/manage',
    canActivate: [AuthGuard],
    loadChildren: () => import('./manage-survey/manage-survey.module').then(m => m.ManageSurveyModule)
  },
  {
    path: 'gcsa/map/swmrtgreenmap',
    canActivate: [AuthGuard],
    loadChildren: () => import('./swmrt-map/swmrt-map.module').then(m => m.SwmrtMapModule)
  },
  {
    path: 'gcsa/map/greenspotmap',
    canActivate: [],
    loadChildren: () => import('./green-spot-map/green-spot-map.module').then(m => m.GreenSpotMapModule)
  },
  {
    path: 'gcsa/map/geomap',
    canActivate: [AuthGuard],
    loadChildren: () => import('./geo-map/geo-map.module').then(m => m.GeoMapModule)
  },
  {
    path: '', redirectTo: 'landing', pathMatch: 'full'
  },
  {
    path: 'gcsa/survey/add',
    canActivate: [AuthGuard],
    loadChildren: () => import('./add-survey/add-survey.module').then(m => m.AddSurveyModule)
  },
  {
    path: 'gcsa/survey/edit/:id',
    canActivate: [AuthGuard],
    loadChildren: () => import('./add-survey/add-survey.module').then(m => m.AddSurveyModule)
  },
  {
    path: 'gcsa/survey/view/:id/:readonly',
    canActivate: [AuthGuard],
    loadChildren: () => import('./add-survey/add-survey.module').then(m => m.AddSurveyModule)
  },
  {
    path: 'gcsa/survey/bulkupload',
    canActivate: [AuthGuard],
    loadChildren: () => import('./bulk-upload/bulk-upload.module').then(m => m.BulkUploadModule)
  },
  {
    path: 'landing',
    canActivate: [AuthGuard],
    loadChildren: () => import('./landing/landing.module').then(m => m.LandingModule)
  },
  {
    path: 'auth/login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: '**', component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
