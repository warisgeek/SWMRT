import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageSurveyComponent } from './manage-survey.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { ManageSurveyService } from './manage-survey.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { ManageSurveyRoutingModule } from './manage-suvery-routing.module';
import { MatSortModule } from '@angular/material/sort';
import {MatDialogModule} from '@angular/material/dialog';
import { CustomMaterialModule } from '../shared/modules/custom.material.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MoreInfoPopupModule } from './more-info-popup/more-info-popup.module';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [ManageSurveyComponent],
  imports: [
    FormsModule,
    CommonModule,
    ManageSurveyRoutingModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    FlexLayoutModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatDialogModule,
    CustomMaterialModule,
    MoreInfoPopupModule,
    MatSelectModule
  ],
  providers: [ManageSurveyService]
})
export class ManageSurveyModule { }
