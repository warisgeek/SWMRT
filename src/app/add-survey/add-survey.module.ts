import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { AddSurveyComponent } from './add-survey.component';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AddSurveyService } from './add-survey.service';

const routes: Routes = [{
    path: '**',
    component: AddSurveyComponent,
}
];

@NgModule({
    declarations: [AddSurveyComponent],
    entryComponents: [AddSurveyComponent],
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
        MatSnackBarModule
    ],
    providers: [AddSurveyService
    ]
})
export class AddSurveyModule { }
