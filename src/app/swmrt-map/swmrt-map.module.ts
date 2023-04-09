import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SwmrtMapComponent } from './swmrt-map.component';
import { SwmrtMapService } from './swmrt-map.service';
import { AngularFireDatabase, AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from 'src/environments/environment.prod';
import { AngularFireModule } from '@angular/fire';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
const routes: Routes = [{
  path: '**',
  component: SwmrtMapComponent,
}
];

@NgModule({
  declarations: [SwmrtMapComponent],
  entryComponents: [SwmrtMapComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FlexLayoutModule,
    MatCardModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule
  ],
  providers: [
    SwmrtMapService,
    AngularFireDatabase
  ]
})
export class SwmrtMapModule { }
