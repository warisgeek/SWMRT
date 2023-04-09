import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppSettingService } from '../shared/services/app.setting.service';
import { AppSettingModel } from '../shared/models/setting.model';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  constructor(
    private router: Router,
    private appSettingService: AppSettingService
  ) { }

  ngOnInit(): void {
  }
  navigate(app) {
    let link = '';
    if (app === 'gcsa') {
      link = 'gcsa/dashboard';
    }
    const model: AppSettingModel = { appName: app, title: 'SWMRT Applications', url: link };
    this.appSettingService.setAppSetting(model);
    this.router.navigate([link]);
  }
}
