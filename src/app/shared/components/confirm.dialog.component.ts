
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-confirm-dialog',
    template: `
    <h1 mat-dialog-title>
  {{title}}
</h1>


<div mat-dialog-content>
  <p>{{message}}</p>
</div>

<div mat-dialog-actions>
  <button mat-button (click)="onDismiss()">No</button>
  <button mat-raised-button color="primary" (click)="onConfirm()">Yes</button>
</div>`,
    styleUrls: []
})
export class ConfirmDialogComponent implements OnInit {
    title: string;
    message: string;

    constructor(
        public dialogRef: MatDialogRef<ConfirmDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogModel) {
        // Update view with given values
        this.title = data.title;
        this.message = data.message;
    }

    ngOnInit() {
    }

    onConfirm(): void {
        // Close the dialog, return true
        this.dialogRef.close(true);
    }

    onDismiss(): void {
        // Close the dialog, return false
        this.dialogRef.close(false);
    }
}

/**
 * Class to represent confirm dialog model.
 *
 * It has been kept here to keep it as part of shared component.
 */
export class ConfirmDialogModel {

    constructor(public title: string, public message: string) {
    }
}
