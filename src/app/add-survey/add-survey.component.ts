import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { AddSurveyService } from './add-survey.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoaderService } from '../shared/services/loader.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ManageSurveyService } from '../manage-survey/manage-survey.service';

@Component({
  selector: 'app-add-survey',
  templateUrl: './add-survey.component.html',
  styleUrls: ['./add-survey.component.scss']
})
export class AddSurveyComponent implements OnInit {
  form: FormGroup;
  doyoucompostIfYes = [];
  doyoucompostIfNo = [];
  key = '';
  isReadOnly = false;
  title = 'Add Survey';
  isPrev = false;
  isNext = false;
  showPrevNext = false;
  constructor(
    private fb: FormBuilder,
    private addSurveyService: AddSurveyService,
    private snackBar: MatSnackBar,
    private loader: LoaderService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.doyoucompostIfNo = this.addSurveyService.doyoucompostIfNo;
    this.doyoucompostIfYes = this.addSurveyService.doyoucompostIfYes;
    this.route.params.subscribe(id => {
      this.key = id.id;
      this.key = this.key === undefined ? '' : this.key;
      if (this.key) {
        this.title = 'Edit Survey';
        if (this.addSurveyService.getCache().length > 0) {
          this.showPrevNext = true;
          const index = this.addSurveyService.getCache().findIndex(x => x.key === this.key);
          if (index > 0) {
            this.isPrev = true;
          } else {
            this.isPrev = false;
          }
          if (index + 1 < this.addSurveyService.getCache().length) {
            this.isNext = true;
          } else {
            this.isNext = false;
          }
        }
        this.getEditData();
      }
      this.initForm();
    });
    if (this.key) {
      this.isReadOnly = this.route.snapshot.params.readonly !== undefined ? this.route.snapshot.params.readonly : false;
      if (this.isReadOnly) {
        this.form.disable();
        this.title = 'View Survey';
      }
    }
    this.form.controls.doyoucompost.valueChanges.subscribe(value => {
      this.form.controls.doyoucompostAns = this.fb.array(this.addSurveyService.buildDoyoucompostAns(value, '', this.isReadOnly));
    });
  }
  initForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      houseno: [''],
      apartment: [''],
      street: [''],
      area: ['', Validators.required],
      city: [''],
      pincode: ['', [Validators.required]],
      state: [''],
      country: [''],
      wardnumber: [''],
      wardname: [],
      constituencyname: [],
      constituencynumber: [],
      lat: [''],
      lang: [''],
      doyoucompost: [''],
      doyoucompostAns: this.fb.array(this.addSurveyService.buildDoyoucompostAns('Yes', '', this.isReadOnly)),
      apartmentcommunitylanehouseholdunit: [''],
      ifathomeans: [''],
      howlongcomposting: [''],
      whatcomposterdoyouuse: [''],
      doyoudowithyourcompost: [''],
      doyouhaveexcesscompost: [''],
      willingsignupswachagraha: [''],
      doyouexclusivelycompostleavesflowers: [''],
      leavesflowerscompostertype: [''],
      stayconnectedwhatsapp: [''],
      contactno: [''],
      source: ['Secondary'],
      customertype: [''],
      timestamp: [this.addSurveyService.getDateTime()]
    });
  }
  get doyoucompostAns() {
    return this.form.get('doyoucompostAns') as FormArray;
  }
  get f() {
    return this.form.controls;
  }
  getEditData() {
    this.loader.show();
    this.addSurveyService.getById(this.key).then(data => {
      if (data) {
        if (data.doyoucompostAns === '' || data.doyoucompostAns == null || data.doyoucompostAns === undefined) {
          data.doyoucompostAns = [];
        }
        this.form.patchValue(data);
        this.form.controls.doyoucompostAns = this.fb.array(this.addSurveyService.buildDoyoucompostAns(data.doyoucompost, data.doyoucompostAns, this.isReadOnly));
      }
      this.loader.hide();
    });
  }
  onDoYouCompostCheckboxChange(item, event) {
    if (this.form.controls.doyoucompost.value === 'Yes') {
      this.addSurveyService.doyoucompostIfYes.find(x => x.text === item.text).selected = event.checked;
    } else {
      this.addSurveyService.doyoucompostIfNo.find(x => x.text === item.text).selected = event.checked;
    }
  }
  async onSubmit() {
    const postObject = this.form.value;
    if (this.form.valid) {
      this.loader.show();
      try {
        const respone = await this.addSurveyService.save(this.key, postObject);
        this.form.controls.lat.setValue(respone.lat);
        this.form.controls.lang.setValue(respone.lang);
        this.loader.hide();
        if (!this.key) {
          this.onReset();
          this.snackBar.open('Survey added successfully.', 'Close');
        } else {
          this.snackBar.open('Survey updated successfully.', 'Close');
        }
      } catch (err) {
        this.loader.hide();
      }
    } else {
      this.snackBar.open('Fill the mandatory field.', 'Close');
      window.scroll(0, 0);
    }
  }
  onReset() {
    this.form.reset();
  }

  previous() {
    const index = this.addSurveyService.getCache().findIndex(x => x.key === this.key);
    const nextKey = this.addSurveyService.getCache()[index - 1];
    let link = ['gcsa/survey/edit/', nextKey.key];
    if (this.isReadOnly) {
      link = ['gcsa/survey/view/', nextKey.key, true];
    }
    this.router.navigate(link);
  }
  next() {
    const index = this.addSurveyService.getCache().findIndex(x => x.key === this.key);
    const nextKey = this.addSurveyService.getCache()[index + 1];
    let link = ['gcsa/survey/edit/', nextKey.key];
    if (this.isReadOnly) {
      link = ['gcsa/survey/view/', nextKey.key, true];
    }
    this.router.navigate(link);
  }
}
