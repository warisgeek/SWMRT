import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { GreenSpotMapComponent } from './green-spot-map.component';
import { GreenSpotMapService } from './green-spot-map.service';
import { AngularFireDatabase, AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from 'src/environments/environment.prod';
import { AngularFireModule } from '@angular/fire';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
const routes: Routes = [{
  path: '**',
  component: GreenSpotMapComponent,
}
];

@NgModule({
  declarations: [GreenSpotMapComponent],
  entryComponents: [GreenSpotMapComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FlexLayoutModule,
    MatCardModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule
  ],
  providers: [
    GreenSpotMapService,
    AngularFireDatabase
  ]
})
export class GreenSpotMapModule { }
