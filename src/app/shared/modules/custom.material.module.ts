import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../components/confirm.dialog.component';
@NgModule({
    imports: [
        MatButtonModule, MatDialogModule
    ],
    exports: [
        MatButtonModule, MatDialogModule
    ],
    declarations: [ConfirmDialogComponent],
    entryComponents: [ConfirmDialogComponent],
})
export class CustomMaterialModule { }
