import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeoMapComponent } from './geo-map.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
  path: '**',
  component: GeoMapComponent,
}
];

@NgModule({
  declarations: [GeoMapComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class GeoMapModule { }
