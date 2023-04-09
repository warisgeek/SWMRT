import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { BulkUploadService } from './bulk-upload.service';
import * as moment from 'moment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from '../shared/components/confirm.dialog.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-bulk-upload',
  templateUrl: './bulk-upload.component.html',
  styleUrls: ['./bulk-upload.component.scss']
})
export class BulkUploadComponent implements OnInit {
  insert = [];
  update = [];
  data = [];
  next = 0;
  total = 0;
  delay = 100;
  geocoder;
  isUploadStarted = false;
  constructor(
    private bulkUploadService: BulkUploadService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    this.geocoder = new google.maps.Geocoder();
  }

  ngOnInit(): void {
  }
  onCancel() {

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: { title: 'Confirm Action', message: 'Are you sure you want to remove?' }
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      const result = dialogResult;
      if (result) {
        this.isUploadStarted = false;
        this.data = [];
        this.insert = [];
        this.total = 0;
        (document.getElementById('upload') as HTMLInputElement).value = '';
      }
    });
    (document.getElementById('upload') as HTMLInputElement).value = '';
  }
  uploadedCount() {
    console.log(this.total);
    if (this.data.length === this.total) {
      this.snackBar.open('Survey data uploaded.', 'Close');
      this.isUploadStarted = false;
      this.data = [];
      this.insert = [];
      this.total = 0;
      (document.getElementById('upload') as HTMLInputElement).value = '';
    }

  }
  onUpload() {
    console.log(this.data.length);
    if (this.data.length > 0) {
      this.isUploadStarted = true;
      let count = 0;
      this.data.forEach(x => {
        if (x.Key !== undefined && x.Key !== '') {
          this.bulkUploadService.save(x.Key, this.bulkUploadService.updateObject(x)).then(res => {
            this.total++;
            this.uploadedCount();
          }).catch((err) => {
            console.log(err);
            this.total++;
            this.uploadedCount();
          });

        }
        else {
          this.bulkUploadService.exists(x).then(data => {
            if (data !== undefined && data.length > 0) {
              if (data.findIndex(value => value.timestamp === x.Timestamp) === -1) {
                this.insert.push(this.bulkUploadService.addObject(x));
              }
              else {
                let obj: any = '';
                obj = this.bulkUploadService.updateObject(x);
                obj.key = data.find(value => value.timestamp === x.Timestamp).key;
                this.update.push(obj);
              }

            } else {
              this.insert.push(this.bulkUploadService.addObject(x));
            }
            count++;
            if (this.data.length === count) {
              this.updateSurvey();
              this.getGoogleLatTimer();
            }
          });
        }
      });
    } else {
      this.snackBar.open('Choose the excel sheet', 'Close');
    }

  }
  updateSurvey() {
    this.update.forEach(x => {
      this.bulkUploadService.save(x.key, x).then(res => {
        this.total++;
        this.uploadedCount();
      }).catch((err) => {
        console.log(err);
        this.total++;
        this.uploadedCount();
      });
    });

  }
  getGoogleLatTimer() {
    if (this.next < this.insert.length) {
      setTimeout(this.getGoogleLat.bind(this), this.delay, this.insert[this.next], this.getGoogleLatTimer);
      this.next++;
    }
  }
  getGoogleLat(element, nextFn) {
    // let address = element.houseno + ' ' + element.street;
    // if (element.houseno === '' && element.street === '') {
    //   address = element.apartment;
    // }
    const address = element.houseno + ',' + element.apartment + ',' + element.street;
    this.geocoder.geocode({ address, componentRestrictions: { country: element.country === undefined ? 'IN' : element.country, postalCode: element.pincode, locality: element.area } }, (results, status) => {
      if (status === 'OK') {
        const lat = results[0].geometry.location.lat();
        const lang = results[0].geometry.location.lng();
        element.lat = lat;
        element.lang = lang;
        element.formatted_address = results[0].formatted_address;
        this.bulkUploadService.save(element.key, element).then(res => {
          this.total++;
          this.uploadedCount();
        }).catch((err) => {
          console.log(err);
          this.total++;
          this.uploadedCount();
        });

        console.log('found');
      }// === if we were sending the requests to fast, try this one again and increase the delay

      else {
        if (status === google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
          this.next--;
          this.delay++;
          if (this.delay > 4000) {
            this.delay = 200;
          }
        }
        else {
          element.lat = '';
          element.lang = '';
          element.formatted_address = '';
          this.bulkUploadService.save('', element).then(res => {
            this.total++;
            this.uploadedCount();
          }).catch((err) => {
            console.log(err);
            this.total++;
            this.uploadedCount();
          });
          const reason = 'Code ' + status;
          const msg = `Name=${element.name} Address=${address} Pincode =${element.pincode} error=${reason}`;
          console.log(msg);
        }
      }
      if (nextFn !== undefined) {
        const fn = nextFn.bind(this);
        fn();
      }
    });

  }

  onFileChange(evt) {
    const target: DataTransfer = (evt.target) as DataTransfer;
    if (target.files.length !== 1) { throw new Error('Cannot use multiple files'); }
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary', cellDates: true });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.data = XLSX.utils.sheet_to_json(ws, { raw: false, dateNF: 'yyyy-mm-dd' });
      console.log(this.data);
    };
    reader.readAsBinaryString(target.files[0]);
  }
}
