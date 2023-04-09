import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-more-info-popup',
  templateUrl: './more-info-popup.component.html',
  styleUrls: ['./more-info-popup.component.scss']
})
export class MoreInfoPopupComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }
  close() {
    this.dialogRef.close(false);
  }
}
