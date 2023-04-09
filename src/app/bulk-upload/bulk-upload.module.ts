import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { BulkUploadComponent } from './bulk-upload.component';
import { BulkUploadService } from './bulk-upload.service';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';

const routes: Routes = [{
    path: '**',
    component: BulkUploadComponent,
}
];

@NgModule({
    declarations: [BulkUploadComponent],
    entryComponents: [BulkUploadComponent],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        FormsModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule,
        MatCardModule,
        FlexLayoutModule,
        MatListModule,
        MatRadioModule,
        MatSnackBarModule,
        MatDialogModule,
        MatProgressBarModule
    ],
    providers: [
        BulkUploadService
    ]
})
export class BulkUploadModule { }
