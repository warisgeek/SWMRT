import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './landing.component';
const routes: Routes = [{
    path: '**',
    component: LandingComponent,
}
];

@NgModule({
    declarations: [LandingComponent],
    entryComponents: [LandingComponent],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
    ],
    providers: [
    ]
})
export class LandingModule { }
