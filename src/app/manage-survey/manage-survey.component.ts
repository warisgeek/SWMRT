import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, } from '@angular/material/table';
import { ManageSurveyService } from './manage-survey.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { LoaderService } from '../shared/services/loader.service';
import { MatSort } from '@angular/material/sort';
import { ConfirmDialogComponent } from '../shared/components/confirm.dialog.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-manage-survey',
  templateUrl: './manage-survey.component.html',
  styleUrls: ['./manage-survey.component.scss']
})
export class ManageSurveyComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['name', 'houseno', 'apartment', 'apartmentcommunitylanehouseholdunit', 'street', 'area', 'wardnumber', 'wardname', 'constituencynumber', 'constituencyname', 'city', 'pinCode', 'actions'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  dataSource = new MatTableDataSource();
  ELEMENT_DATA: any[];
  pageLength: number;
  filterValues = {};
  filterSelectObj = [];
  constructor(
    private manageService: ManageSurveyService,
    private router: Router,
    private loader: LoaderService,
    private dialog: MatDialog) {
    // Object to create Filter for
    const rememberFilter = this.manageService.getRememberFilter();
    this.filterSelectObj = [
      {
        name: 'Name',
        modelValue: rememberFilter.name,
        columnProp: 'name',
        options: []
      }, {
        name: 'Apartment',
        modelValue: rememberFilter.apartment,
        columnProp: 'apartment',
        options: []
      }, {
        name: 'Street',
        modelValue: rememberFilter.street,
        columnProp: 'street',
        options: []
      },
      {
        name: 'Area Name',
        modelValue: rememberFilter.area,
        columnProp: 'area',
        options: []
      }, {
        name: 'Ward No',
        modelValue: rememberFilter.wardnumber,
        columnProp: 'wardnumber',
        options: []
      }, {
        name: 'Ward Name',
        modelValue: rememberFilter.wardname,
        columnProp: 'wardname',
        options: []
      }, {
        name: 'Constituency No',
        modelValue: rememberFilter.constituencynumber,
        columnProp: 'constituencynumber',
        options: []
      }, {
        name: 'Constituency Name',
        modelValue: rememberFilter.constituencyname,
        columnProp: 'constituencyname',
        options: []
      }, {
        name: 'City',
        modelValue: rememberFilter.city,
        columnProp: 'city',
        options: []
      }, {
        name: 'Pin Code',
        modelValue: rememberFilter.pincode,
        columnProp: 'pincode',
        options: []
      }, {
        name: 'User Type',
        modelValue: rememberFilter.customertype,
        columnProp: 'customertype',
        options: []
      }
    ];

  }

  ngOnInit(): void {
    this.getAllSurvey();
  }
  // Get Uniqu values from columns to build filter
  getFilterObject(fullObj, key) {
    const uniqChk = [];
    fullObj.filter((obj) => {
      if (!uniqChk.includes(obj[key])) {
        uniqChk.push(obj[key]);
      }
      return obj;
    });
    return uniqChk;
  }
  createFilter() {
    const filterFunction = (data: any, filter: string): boolean => {
      const searchTerms = JSON.parse(filter);
      let isFilterSet = false;
      for (const col in searchTerms) {
        if (searchTerms[col].toString() !== '') {
          isFilterSet = true;
        } else {
          delete searchTerms[col];
        }
      }

      const nameSearch = () => {
        let found = false;
        if (isFilterSet) {
          let exp = '';
          // tslint:disable-next-line:forin
          for (const col in searchTerms) {
            if (exp.length > 0) {
              exp = exp + '&&';
            }
            if (data[col] !== undefined) {
              exp = exp + `${data[col] !== undefined} && ${data[col].toString().toLowerCase().indexOf(searchTerms[col].trim().toLowerCase()) !== -1} && ${isFilterSet}`;
            }
          }
          // tslint:disable-next-line:no-eval
          if (eval(exp)) {
            found = true;
          }
          return found;
        } else {
          return true;
        }
      };
      return nameSearch();
    };
    return filterFunction;
  }
  // Reset table filters
  resetFilters() {
    this.filterValues = {};
    this.filterSelectObj.forEach((value) => {
      value.modelValue = '';
    });
    this.dataSource.filter = '';
    this.manageService.rememberFilter(JSON.stringify(this.filterValues));
  }
  exportToExcel() {
    this.manageService.downloadExcel(this.dataSource.filteredData);
  }
  getAllSurvey() {
    this.loader.show();
    this.manageService.getAllSurvey().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(survey => {
      this.ELEMENT_DATA = survey;
      this.manageService.setCache(survey);
      this.pageLength = survey.length;
      this.dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource.filterPredicate = this.createFilter();
      this.filterSelectObj.filter((o) => {
        o.options = this.getFilterObject(survey, o.columnProp);
      });
      setTimeout(() => {
        this.searchSurvey();
      }, 100);
      this.loader.hide();
    });
  }
  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => {
      this.paginator.pageIndex = 0;
    });
  }
  searchSurvey() {
    this.filterSelectObj.forEach(filter => {
      this.filterValues[filter.columnProp] = filter.modelValue.trim().toLowerCase();
    });
    this.dataSource.filter = JSON.stringify(this.filterValues);
    this.manageService.rememberFilter(JSON.stringify(this.filterValues));
    this.manageService.setCache(this.dataSource.filteredData);
  }
  surveyMoreInfo(item) {
    // const dialogRef = this.dialog.open(MoreInfoPopupComponent, {
    //   data: item
    // });
    const link = ['gcsa/survey/view/', item.key, true];
    this.router.navigate(link);
  }

  removeSurvey(item) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: { title: 'Confirm Action', message: 'Are you sure you want to remove?' }
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      const result = dialogResult;
      if (result) {
        this.loader.show();
        this.manageService.remove(item.key).then(() => {
          this.loader.hide();
        });
      }
    });
  }
  editSurvey(item) {
    const link = ['gcsa/survey/edit/', item.key];
    this.router.navigate(link);
  }
}
