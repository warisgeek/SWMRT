import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoreInfoPopupComponent } from './more-info-popup.component';
import { MoreInfoPopupService } from './more-info-popup.service';
import {MatDialogModule} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import {MatListModule} from '@angular/material/list';

@NgModule({
  declarations: [MoreInfoPopupComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatListModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
  ],
  providers: [MoreInfoPopupService]
})
export class MoreInfoPopupModule { }
