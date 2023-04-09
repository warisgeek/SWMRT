import { Component, OnInit, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { FireBaseService } from '../shared/services/firebase.service';
import { map } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { LoaderService } from '../shared/services/loader.service';
import * as _ from 'underscore';
import { MatSort, MatSortable } from '@angular/material/sort';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  areaLeveldisplayedColumns: string[] = ['wardname', 'wardnumber', 'area', 'count'];
  wardLeveldisplayedColumns: string[] = ['constituencyname', 'wardname', 'wardnumber', 'count'];
  stateLeveldisplayedColumns: string[] = ['state', 'city', 'count'];
  countryLeveldisplayedColumns: string[] = ['name', 'count'];
  constituencydisplayedColumns: string[] = ['state', 'constituencyname', 'count'];
  data: any[] = [];
  filter = { wardname: '', wardnumber: '', constituencyname: '', constituencyno: '', state: '' };
  areaLevelDataSource = new MatTableDataSource();
  wardLevelDataSource = new MatTableDataSource();
  stateLevelDataSource = new MatTableDataSource();
  countryLevelDataSource = new MatTableDataSource();
  constituencyLevelDataSource = new MatTableDataSource();
  @ViewChildren(MatSort) sort: QueryList<MatSort>;
  constructor(
    private fireBaseService: FireBaseService,
    private loader: LoaderService
  ) {

  }
  ngOnInit(): void {
    this.getReportData();
  }
  getReportData() {
    this.loader.show();
    this.fireBaseService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(survey => {
      this.data = survey;
      this.getCountryLevelReport();
      // this.getAreaLevelReport();
      // this.getWardLevelReport();
      // this.getStateLevelReport();
      // this.getConstituencyLevelReport();
      this.loader.hide();
    });

  }
  getAreaLevelReport() {
    this.loader.show();
    const filters: any = {};
    if (this.filter.wardname !== '') {
      filters.wardname = this.filter.wardname.toString();
    }
    if (this.filter.wardnumber !== '') {
      filters.wardnumber = this.filter.wardnumber.toString();
    }
    const filterData = this.data.filter(x => {
      let exp = '';
      let found = true;
      // tslint:disable-next-line:forin
      for (const col in filters) {
        if (exp.length > 0) {
          exp = exp + '&&';
        }
        if (x[col] !== undefined) {
          exp = exp + `${x[col] !== undefined} && ${x[col].toString().toLowerCase().indexOf(filters[col].trim().toLowerCase()) !== -1}`;
        }
      }
      // tslint:disable-next-line:no-eval
      if (exp.length > 0 && !eval(exp)) {
        found = false;
      }
      return found;
    });

    const groups = _.groupBy(filterData, (value) => {
      return value.wardname + '#' + value.wardnumber + '#' + value.area;
    });
    const result = _.map(groups, (group) => {
      return {
        wardname: group[0].wardname,
        wardnumber: group[0].wardnumber,
        area: group[0].area,
        count: _.pluck(group, 'name').length
      };
    });
    this.areaLevelDataSource = new MatTableDataSource<any>(_.chain(result).sortBy('wardnumber').sortBy('wardname').sortBy('area').value());
    this.areaLevelDataSource.sort = this.sort.toArray()[0];
    this.loader.hide();
  }
  getWardLevelReport() {
    this.loader.show();
    const filters: any = {};
    if (this.filter.constituencyname !== '') {
      filters.constituencyname = this.filter.constituencyname.toString();
    }
    if (this.filter.constituencyno !== '') {
      filters.constituencyno = this.filter.constituencyno.toString();
    }
    const filterData = this.data.filter(x => {
      let exp = '';
      let found = true;
      // tslint:disable-next-line:forin
      for (const col in filters) {
        if (exp.length > 0) {
          exp = exp + '&&';
        }
        if (x[col] !== undefined) {
          exp = exp + `${x[col] !== undefined} && ${x[col].toString().toLowerCase().indexOf(filters[col].trim().toLowerCase()) !== -1}`;
        }
      }
      // tslint:disable-next-line:no-eval
      if (exp.length > 0 && !eval(exp)) {
        found = false;
      }
      return found;
    });

    const groups = _.groupBy(filterData, (value) => {
      return value.wardname + '#' + value.wardnumber + '#' + value.constituencyname;
    });
    const data = _.map(groups, (group) => {
      return {
        wardname: group[0].wardname,
        wardnumber: group[0].wardnumber,
        constituencyname: group[0].constituencyname,
        count: _.pluck(group, 'name').length
      };
    });
    this.wardLevelDataSource = new MatTableDataSource<any>(_.chain(data).sortBy('constituencyname').sortBy('wardnumber').sortBy('wardname').value());
    this.wardLevelDataSource.sort = this.sort.toArray()[1];
    this.loader.hide();
  }
  getConstituencyLevelReport() {
    const filters: any = {};
    if (this.filter.state !== '') {
      filters.state = this.filter.state.toString();
    }
    const filterData = this.data.filter(x => {
      let exp = '';
      let found = true;
      // tslint:disable-next-line:forin
      for (const col in filters) {
        if (exp.length > 0) {
          exp = exp + '&&';
        }
        if (x[col] !== undefined) {
          exp = exp + `${x[col] !== undefined} && ${x[col].toString().toLowerCase().indexOf(filters[col].trim().toLowerCase()) !== -1}`;
        }
      }
      // tslint:disable-next-line:no-eval
      if (exp.length > 0 && !eval(exp)) {
        found = false;
      }
      return found;
    });
    const groups = _.groupBy(filterData, (value) => {
      return value.state + '#' + value.constituencyname;
    });
    const data = _.map(groups, (group) => {
      return {
        state: group[0].state,
        constituencyname: group[0].constituencyname,
        count: _.pluck(group, 'name').length
      };
    });
    this.constituencyLevelDataSource = new MatTableDataSource<any>(_.chain(data).sortBy('state').sortBy('constituencyname').value());
    this.constituencyLevelDataSource.sort = this.sort.toArray()[4];
  }
  getStateLevelReport() {
    this.loader.show();
    const filters: any = {};
    if (this.filter.state !== '') {
      filters.state = this.filter.state.toString();
    }
    const filterData = this.data.filter(x => {
      let exp = '';
      let found = true;
      // tslint:disable-next-line:forin
      for (const col in filters) {
        if (exp.length > 0) {
          exp = exp + '&&';
        }
        if (x[col] !== undefined) {
          exp = exp + `${x[col] !== undefined} && ${x[col].toString().toLowerCase().indexOf(filters[col].trim().toLowerCase()) !== -1}`;
        }
      }
      // tslint:disable-next-line:no-eval
      if (exp.length > 0 && !eval(exp)) {
        found = false;
      }
      return found;
    });

    const groups = _.groupBy(this.data, (value) => {
      return value.state + '#' + value.city;
    });
    const data = _.map(groups, (group) => {
      return {
        state: group[0].state,
        city: group[0].city,
        count: _.pluck(group, 'name').length
      };
    });
    this.stateLevelDataSource = new MatTableDataSource<any>(_.chain(data).sortBy('state').sortBy('city').value());
    this.stateLevelDataSource.sort = this.sort.toArray()[2];
    this.loader.hide();
  }
  getCountryLevelReport() {
    this.loader.show();
    const countBy = _.countBy(this.data, 'state');
    const result = [];
    _.each(countBy, (value, key) => {
      const item = {
        name: key === 'undefined' ? '' : key,
        count: value
      };
      if (result.findIndex(x => x.name === item.name) > -1) {
        result[result.findIndex(x => x.name === item.name)].count = item.count + result[result.findIndex(x => x.name === item.name)].count;
      } else {
        result.push(item);
      }
    });
    this.countryLevelDataSource = new MatTableDataSource<any>(_.sortBy(result, 'state'));
    this.countryLevelDataSource.sort = this.sort.toArray()[3];
    this.loader.hide();
  }
  filterReport(type) {
    if (type === 'area') {
      this.getAreaLevelReport();
    } else if (type === 'ward') {
      this.getWardLevelReport();
    } else if (type === 'state') {
      this.getStateLevelReport();
    } else if (type === 'constituency') {
      this.getConstituencyLevelReport();
    }
  }
  resetFilters(type) {
    if (type === 'area') {
      this.filter.wardname = '';
      this.filter.wardnumber = '';
      this.getAreaLevelReport();
    } else if (type === 'ward') {
      this.filter.constituencyname = '';
      this.filter.constituencyno = '';
      this.getWardLevelReport();
    } else if (type === 'state') {
      this.filter.state = '';
      this.getStateLevelReport();
    } else if (type === 'constituency') {
      this.filter.state = '';
      this.getConstituencyLevelReport();
    }
  }
}
